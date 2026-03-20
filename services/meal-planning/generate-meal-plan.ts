import { getRecipeCatalog } from "../../data/recipes";
import { aggregateShoppingList } from "../shopping-list";
import { normalizePantryItems, matchPantryQuantity } from "../pantry";
import type { PantryItem } from "../pantry/types";
import { calculateRecipeCost, DEFAULT_CURRENCY } from "../pricing";
import type {
  DayPlan,
  MealPlan,
  MealPlanRequest,
  MealType,
  NutritionSummary,
  PlannedMeal,
  RecipeIngredient,
  RecipeTemplate,
} from "./types";
import { mealPlanRequestSchema } from "./types";

const mealTypeOrder: Record<3 | 4, MealType[]> = {
  3: ["breakfast", "lunch", "dinner"],
  4: ["breakfast", "lunch", "snack", "dinner"],
};

type MealCandidate = {
  recipe: RecipeTemplate;
  baseCost: number;
  multiplier: number;
  scaledCost: number;
  score: number;
  affordable: boolean;
  missingPrice: boolean;
};

function round(value: number) {
  return Math.round(value * 100) / 100;
}

function roundMoney(value: number) {
  return Math.round(value);
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function scaleNutrition(nutrition: NutritionSummary, multiplier: number): NutritionSummary {
  return {
    calories: round(nutrition.calories * multiplier),
    protein: round(nutrition.protein * multiplier),
    carbs: round(nutrition.carbs * multiplier),
    fat: round(nutrition.fat * multiplier),
    fiber: nutrition.fiber === undefined ? undefined : round(nutrition.fiber * multiplier),
    sodium: nutrition.sodium === undefined ? undefined : round(nutrition.sodium * multiplier),
  };
}

function scaleIngredients(ingredients: RecipeIngredient[], multiplier: number) {
  return ingredients.map((ingredient) => ({
    ...ingredient,
    quantity: round(ingredient.quantity * multiplier),
  }));
}

function buildPlannedMeal(recipe: RecipeTemplate, multiplier: number, estimatedCost: number): PlannedMeal {
  return {
    ...recipe,
    portionMultiplier: multiplier,
    scaledIngredients: scaleIngredients(recipe.ingredients, multiplier),
    estimatedNutrition: scaleNutrition(recipe.nutrition, multiplier),
    sourceRecipeId: recipe.id,
    estimatedCost: roundMoney(estimatedCost),
    currency: DEFAULT_CURRENCY,
  };
}

function getMealTargetCalories(request: MealPlanRequest, mealType: MealType) {
  const target =
    request.targetCalories ??
    (request.goal === "fat_loss"
      ? 1800
      : request.goal === "muscle_gain"
        ? 2400
        : 2100);
  const ratio =
    mealType === "breakfast"
      ? 0.25
      : mealType === "lunch"
        ? 0.3
        : mealType === "dinner"
          ? 0.35
          : 0.1;
  return target * ratio;
}

function getWeeklyBudgetCap(request: MealPlanRequest) {
  if (!request.budgetAmount || !request.budgetPeriod) {
    return undefined;
  }

  return request.budgetPeriod === "week" ? request.budgetAmount : request.budgetAmount * 7;
}

function matchesConstraints(recipe: RecipeTemplate, request: MealPlanRequest) {
  const text = `${recipe.name} ${recipe.description} ${recipe.ingredients
    .map((item) => item.name)
    .join(" ")}`.toLowerCase();
  const constraints = [...request.allergies, ...request.dislikedFoods]
    .map((value) => value.toLowerCase().trim())
    .filter(Boolean);

  if (constraints.some((value) => text.includes(value))) return false;
  if (
    request.preferredCuisines?.length &&
    !request.preferredCuisines.some((value) =>
      recipe.cuisine.toLowerCase().includes(value.toLowerCase()),
    )
  ) {
    return false;
  }
  if (
    request.maxCookingTimeMinutes &&
    recipe.prepTimeMinutes + recipe.cookTimeMinutes > request.maxCookingTimeMinutes
  ) {
    return false;
  }
  return true;
}

function getPantryRatio(recipe: RecipeTemplate, pantry: PantryItem[]) {
  const pantryMap = new Map(pantry.map((item) => [item.normalizedName, item]));
  const pantryHits = recipe.ingredients.reduce((sum, ingredient) => {
    const pantryItem = pantryMap.get(ingredient.normalizedName);
    if (!pantryItem) return sum;
    const matched = matchPantryQuantity(ingredient.quantity, ingredient.unit, pantryItem);
    return matched > 0 ? sum + 1 : sum;
  }, 0);

  return pantryHits / recipe.ingredients.length;
}

function getBudgetAwareMultiplier(
  recipe: RecipeTemplate,
  request: MealPlanRequest,
  mealType: MealType,
  slotBudgetCap?: number,
) {
  const targetCalories = getMealTargetCalories(request, mealType);
  const targetMultiplier = targetCalories / recipe.nutrition.calories;
  const lowerBound = request.mode === "budget" ? 0.6 : 0.85;
  const upperBound = 1.25;

  const baseCost = calculateRecipeCost(recipe.ingredients).estimatedCost;
  if (!slotBudgetCap || baseCost <= 0) {
    return clamp(targetMultiplier, lowerBound, upperBound);
  }

  const maxAffordableMultiplier = slotBudgetCap / baseCost;
  return clamp(Math.min(targetMultiplier, maxAffordableMultiplier), lowerBound, upperBound);
}

function scoreRecipe(
  recipe: RecipeTemplate,
  request: MealPlanRequest,
  pantry: PantryItem[],
  mealType: MealType,
  usageCount: number,
  scaledCost: number,
  slotBudgetCap?: number,
) {
  const pantryRatio = getPantryRatio(recipe, pantry);
  const targetCalories = getMealTargetCalories(request, mealType);
  const caloriesScore =
    1 - clamp(Math.abs(recipe.nutrition.calories - targetCalories) / targetCalories, 0, 1);
  const timeScore = request.maxCookingTimeMinutes
    ? 1 -
      clamp(
        (recipe.prepTimeMinutes + recipe.cookTimeMinutes) / request.maxCookingTimeMinutes,
        0,
        1,
      )
    : 0.5;
  const budgetScore = slotBudgetCap
    ? 1 - clamp(scaledCost / Math.max(slotBudgetCap, 1), 0, 1.25)
    : 0.5;
  const varietyPenalty = usageCount * 0.65;

  return pantryRatio * 4 + caloriesScore * 2 + timeScore + budgetScore - varietyPenalty;
}

function buildMealCandidate(
  recipe: RecipeTemplate,
  request: MealPlanRequest,
  pantry: PantryItem[],
  mealType: MealType,
  usageMap: Map<string, number>,
  slotBudgetCap?: number,
): MealCandidate {
  const baseCostResult = calculateRecipeCost(recipe.ingredients);
  const multiplier = getBudgetAwareMultiplier(recipe, request, mealType, slotBudgetCap);
  const scaledCost = roundMoney(baseCostResult.estimatedCost * multiplier);
  const affordable = slotBudgetCap === undefined || scaledCost <= roundMoney(slotBudgetCap);

  return {
    recipe,
    baseCost: baseCostResult.estimatedCost,
    multiplier,
    scaledCost,
    affordable,
    missingPrice: baseCostResult.missingPrice,
    score: scoreRecipe(
      recipe,
      request,
      pantry,
      mealType,
      usageMap.get(recipe.id) ?? 0,
      scaledCost,
      slotBudgetCap,
    ),
  };
}

function chooseRecipe(
  recipes: RecipeTemplate[],
  request: MealPlanRequest,
  pantry: PantryItem[],
  mealType: MealType,
  usageMap: Map<string, number>,
  dayIndex: number,
  slotIndex: number,
  slotBudgetCap?: number,
) {
  const candidates = recipes
    .filter((recipe) => recipe.mealType === mealType && matchesConstraints(recipe, request))
    .map((recipe) =>
      buildMealCandidate(recipe, request, pantry, mealType, usageMap, slotBudgetCap),
    );

  const affordable = candidates
    .filter((candidate) => candidate.affordable)
    .sort((a, b) => b.score - a.score || a.scaledCost - b.scaledCost);

  if (affordable.length > 0) {
    const top = affordable.slice(0, Math.min(3, affordable.length));
    return {
      ...top[(dayIndex + slotIndex) % top.length],
      budgetCompromised: false,
    };
  }

  const fallback = candidates.sort((a, b) => a.scaledCost - b.scaledCost || b.score - a.score)[0];
  if (fallback) {
    return {
      ...fallback,
      budgetCompromised: slotBudgetCap !== undefined,
    };
  }

  const recipe = recipes.find((item) => item.mealType === mealType) ?? recipes[0];
  const candidate = buildMealCandidate(recipe, request, pantry, mealType, usageMap, slotBudgetCap);
  return {
    ...candidate,
    budgetCompromised: true,
  };
}

function buildDayMacros(meals: PlannedMeal[]): NutritionSummary {
  return meals.reduce(
    (summary, meal) => ({
      calories: round(summary.calories + meal.estimatedNutrition.calories),
      protein: round(summary.protein + meal.estimatedNutrition.protein),
      carbs: round(summary.carbs + meal.estimatedNutrition.carbs),
      fat: round(summary.fat + meal.estimatedNutrition.fat),
      fiber: round((summary.fiber ?? 0) + (meal.estimatedNutrition.fiber ?? 0)),
      sodium: round((summary.sodium ?? 0) + (meal.estimatedNutrition.sodium ?? 0)),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sodium: 0 },
  );
}

function summarizeWeeklyNutrition(days: DayPlan[]) {
  return days.reduce(
    (summary, day) => ({
      calories: round(summary.calories + day.dailyMacros.calories),
      protein: round(summary.protein + day.dailyMacros.protein),
      carbs: round(summary.carbs + day.dailyMacros.carbs),
      fat: round(summary.fat + day.dailyMacros.fat),
      fiber: round((summary.fiber ?? 0) + (day.dailyMacros.fiber ?? 0)),
      sodium: round((summary.sodium ?? 0) + (day.dailyMacros.sodium ?? 0)),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sodium: 0 },
  );
}

function buildDays(request: MealPlanRequest, pantry: PantryItem[]) {
  const catalog = getRecipeCatalog();
  const usageMap = new Map<string, number>();
  const warnings = new Set<string>();
  const days: DayPlan[] = [];
  const weeklyBudgetCap = getWeeklyBudgetCap(request);
  const totalSlots = request.mealsPerDay * 7;
  let spentCost = 0;

  for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
    const date = new Date(request.weekStartDate);
    date.setDate(date.getDate() + dayIndex);

    const meals = mealTypeOrder[request.mealsPerDay].map((mealType, slotIndex) => {
      const slotPosition = dayIndex * request.mealsPerDay + slotIndex;
      const remainingSlots = Math.max(1, totalSlots - slotPosition);
      const remainingBudget =
        weeklyBudgetCap === undefined ? undefined : Math.max(weeklyBudgetCap - spentCost, 0);
      const slotBudgetCap =
        remainingBudget === undefined ? undefined : remainingBudget / remainingSlots;

      const candidate = chooseRecipe(
        catalog,
        request,
        pantry,
        mealType,
        usageMap,
        dayIndex,
        slotIndex,
        slotBudgetCap,
      );

      if (candidate.budgetCompromised) {
        warnings.add("Ngân sách hiện tại khá thấp, hệ thống đã chọn phương án tiết kiệm nhất có thể.");
      }

      if (candidate.missingPrice) {
        warnings.add("Một số nguyên liệu chưa có giá chuẩn, cần bổ sung bảng giá.");
      }

      usageMap.set(candidate.recipe.id, (usageMap.get(candidate.recipe.id) ?? 0) + 1);
      spentCost += candidate.scaledCost;

      return buildPlannedMeal(candidate.recipe, round(candidate.multiplier), candidate.scaledCost);
    });

    const dailyEstimatedCost = meals.reduce((sum, meal) => sum + meal.estimatedCost, 0);
    days.push({
      date: date.toISOString().slice(0, 10),
      meals,
      dailyCalories: round(meals.reduce((sum, meal) => sum + meal.estimatedNutrition.calories, 0)),
      dailyMacros: buildDayMacros(meals),
      dailyEstimatedCost: roundMoney(dailyEstimatedCost),
      dayNotes:
        request.mode === "pantry"
          ? "Ưu tiên món tận dụng nguyên liệu sẵn có."
          : "Giữ chi phí tuần trong mức ngân sách đã chọn.",
    });
  }

  return {
    days,
    totalMealCost: roundMoney(spentCost),
    warnings: Array.from(warnings),
    withinBudget: weeklyBudgetCap === undefined ? true : spentCost <= weeklyBudgetCap,
    weeklyBudgetCap,
  };
}

export function generateMealPlan(input: MealPlanRequest): MealPlan {
  const request = mealPlanRequestSchema.parse(input);
  const pantry = normalizePantryItems(request.pantrySnapshot);
  const built = buildDays(request, pantry);
  const weeklyNutritionSummary = summarizeWeeklyNutrition(built.days);

  const basePlan: MealPlan = {
    id: `meal-plan-${request.userId}-${request.weekStartDate}`,
    userId: request.userId,
    mode: request.mode,
    goal: request.goal,
    weekStartDate: request.weekStartDate,
    days: built.days,
    weeklyNutritionSummary,
    costSummary: {
      totalMealCost: built.totalMealCost,
      totalRequiredShoppingCost: 0,
      totalCoveredShoppingCost: 0,
      totalBuyShoppingCost: 0,
      averageDailyCost: roundMoney(built.totalMealCost / 7),
      currency: DEFAULT_CURRENCY,
      budgetAmount: request.budgetAmount,
      budgetPeriod: request.budgetPeriod,
      withinBudget: built.withinBudget,
    },
    pantryReconciliation: {
      matches: [],
      missingItems: [],
      surplusItems: [],
      consumedFromPantry: [],
      estimatedWasteReduction: 0,
    },
    shoppingList: {
      items: [],
      groupedByCategory: [],
      totals: {
        requiredItems: 0,
        pantryCoveredItems: 0,
        buyItems: 0,
        totalRequiredCost: 0,
        totalCoveredCost: 0,
        totalBuyCost: 0,
        currency: DEFAULT_CURRENCY,
      },
      pantryReconciliation: {
        matches: [],
        missingItems: [],
        surplusItems: [],
        consumedFromPantry: [],
        estimatedWasteReduction: 0,
      },
    },
    metadata: {
      version: 2,
      generatedReason:
        request.mode === "pantry"
          ? "Lập kế hoạch ưu tiên đồ sẵn có"
          : "Lập kế hoạch theo ngân sách",
      fallbackUsed: built.warnings.length > 0,
      confidence: 0.9,
      pantryMode: request.mode === "pantry",
      budgetMode: request.mode === "budget",
      warnings: built.warnings,
    },
  };

  const shoppingList = aggregateShoppingList(basePlan, request.pantrySnapshot);
  return {
    ...basePlan,
    shoppingList,
    costSummary: {
      ...basePlan.costSummary,
      totalRequiredShoppingCost: shoppingList.totals.totalRequiredCost,
      totalCoveredShoppingCost: shoppingList.totals.totalCoveredCost,
      totalBuyShoppingCost: shoppingList.totals.totalBuyCost,
    },
    pantryReconciliation: shoppingList.pantryReconciliation,
  };
}
