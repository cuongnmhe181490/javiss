import { getRecipeCatalog } from "../../data/recipes";
import { aggregateShoppingList } from "../shopping-list";
import { normalizePantryItems, matchPantryQuantity } from "../pantry";
import type { PantryItem } from "../pantry/types";
import type { MealPlan, MealPlanRequest, MealType, NutritionSummary, PlannedMeal, RecipeIngredient, RecipeTemplate } from "./types";
import { mealPlanRequestSchema } from "./types";

const mealTypeOrder: Record<3 | 4, MealType[]> = {
  3: ["breakfast", "lunch", "dinner"],
  4: ["breakfast", "lunch", "snack", "dinner"],
};

function round(value: number) {
  return Math.round(value * 100) / 100;
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

function buildPlannedMeal(recipe: RecipeTemplate, multiplier: number): PlannedMeal {
  return {
    ...recipe,
    portionMultiplier: multiplier,
    scaledIngredients: scaleIngredients(recipe.ingredients, multiplier),
    estimatedNutrition: scaleNutrition(recipe.nutrition, multiplier),
    sourceRecipeId: recipe.id,
  };
}

function getMealTargetCalories(request: MealPlanRequest, mealType: MealType) {
  const target = request.targetCalories ?? (request.goal === "fat_loss" ? 1800 : request.goal === "muscle_gain" ? 2400 : 2100);
  const ratio = mealType === "breakfast" ? 0.25 : mealType === "lunch" ? 0.3 : mealType === "dinner" ? 0.35 : 0.1;
  return target * ratio;
}

function matchesConstraints(recipe: RecipeTemplate, request: MealPlanRequest) {
  const text = `${recipe.name} ${recipe.description} ${recipe.ingredients.map((item) => item.name).join(" ")}`.toLowerCase();
  const constraints = [...request.allergies, ...request.dislikedFoods].map((value) => value.toLowerCase().trim()).filter(Boolean);
  if (constraints.some((value) => text.includes(value))) return false;
  if (request.preferredCuisines?.length && !request.preferredCuisines.some((value) => recipe.cuisine.toLowerCase().includes(value.toLowerCase()))) return false;
  if (request.maxCookingTimeMinutes && recipe.prepTimeMinutes + recipe.cookTimeMinutes > request.maxCookingTimeMinutes) return false;
  return true;
}

function scoreRecipe(recipe: RecipeTemplate, request: MealPlanRequest, pantry: PantryItem[], mealType: MealType, usageCount: number) {
  const pantryMap = new Map(pantry.map((item) => [item.normalizedName, item]));
  const pantryHits = recipe.ingredients.reduce((sum, ingredient) => {
    const pantryItem = pantryMap.get(ingredient.normalizedName);
    if (!pantryItem) return sum;
    const matched = matchPantryQuantity(ingredient.quantity, ingredient.unit, pantryItem);
    return matched > 0 ? sum + 1 : sum;
  }, 0);

  const pantryRatio = pantryHits / recipe.ingredients.length;
  const targetCalories = getMealTargetCalories(request, mealType);
  const caloriesScore = 1 - clamp(Math.abs(recipe.nutrition.calories - targetCalories) / targetCalories, 0, 1);
  const timeScore = request.maxCookingTimeMinutes
    ? 1 - clamp((recipe.prepTimeMinutes + recipe.cookTimeMinutes) / request.maxCookingTimeMinutes, 0, 1)
    : 0.5;
  const budgetPerMeal = request.budgetAmount && request.budgetPeriod
    ? request.budgetPeriod === "week"
      ? request.budgetAmount / 7 / request.mealsPerDay
      : request.budgetAmount / request.mealsPerDay
    : undefined;
  const budgetScore = budgetPerMeal ? 1 - clamp(recipe.costEstimate / budgetPerMeal, 0, 1) : 0.5;
  const varietyPenalty = usageCount * 0.65;

  return pantryRatio * 4 + caloriesScore * 2 + timeScore + budgetScore - varietyPenalty;
}

function chooseRecipe(
  recipes: RecipeTemplate[],
  request: MealPlanRequest,
  pantry: PantryItem[],
  mealType: MealType,
  usageMap: Map<string, number>,
  dayIndex: number,
  slotIndex: number,
) {
  const ranked = recipes
    .filter((recipe) => recipe.mealType === mealType && matchesConstraints(recipe, request))
    .map((recipe) => ({
      recipe,
      score: scoreRecipe(recipe, request, pantry, mealType, usageMap.get(recipe.id) ?? 0),
    }))
    .sort((a, b) => b.score - a.score);

  const fallback = recipes.find((recipe) => recipe.mealType === mealType) ?? recipes[0];
  if (ranked.length === 0 && fallback) {
    return fallback;
  }

  const top = ranked.slice(0, Math.min(3, ranked.length));
  if (top.length === 0) {
    return fallback;
  }

  return top[(dayIndex + slotIndex) % top.length]?.recipe ?? ranked[0]?.recipe ?? fallback;
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

function summarizeWeeklyNutrition(days: MealPlan["days"]) {
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
  const days: MealPlan["days"] = [];

  for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
    const date = new Date(request.weekStartDate);
    date.setDate(date.getDate() + dayIndex);

    const meals = mealTypeOrder[request.mealsPerDay].map((mealType, slotIndex) => {
      const recipe = chooseRecipe(catalog, request, pantry, mealType, usageMap, dayIndex, slotIndex);
      const targetCalories = getMealTargetCalories(request, mealType);
      const multiplier = clamp(targetCalories / recipe.nutrition.calories, 0.85, 1.25);
      usageMap.set(recipe.id, (usageMap.get(recipe.id) ?? 0) + 1);
      return buildPlannedMeal(recipe, round(multiplier));
    });

    days.push({
      date: date.toISOString().slice(0, 10),
      meals,
      dailyCalories: round(meals.reduce((sum, meal) => sum + meal.estimatedNutrition.calories, 0)),
      dailyMacros: buildDayMacros(meals),
      dayNotes:
        request.mode === "pantry"
          ? "Pantry-first selection prioritized ingredients already on hand."
          : "Budget-aware selection kept the week practical and balanced.",
    });
  }

  return days;
}

export function generateMealPlan(input: MealPlanRequest): MealPlan {
  const request = mealPlanRequestSchema.parse(input);
  const pantry = normalizePantryItems(request.pantrySnapshot);
  const days = buildDays(request, pantry);
  const weeklyNutritionSummary = summarizeWeeklyNutrition(days);
  const basePlan: MealPlan = {
    id: `meal-plan-${request.userId}-${request.weekStartDate}`,
    userId: request.userId,
    mode: request.mode,
    goal: request.goal,
    weekStartDate: request.weekStartDate,
    days,
    weeklyNutritionSummary,
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
      totals: { requiredItems: 0, pantryCoveredItems: 0, buyItems: 0 },
      pantryReconciliation: {
        matches: [],
        missingItems: [],
        surplusItems: [],
        consumedFromPantry: [],
        estimatedWasteReduction: 0,
      },
    },
    metadata: {
      version: 1,
      generatedReason: request.mode === "pantry" ? "Pantry-first weekly planning" : "Budget-aware weekly planning",
      fallbackUsed: false,
      confidence: 0.84,
      pantryMode: request.mode === "pantry",
      budgetMode: request.mode === "budget",
    },
  };

  const shoppingList = aggregateShoppingList(basePlan, request.pantrySnapshot);
  return {
    ...basePlan,
    shoppingList,
    pantryReconciliation: shoppingList.pantryReconciliation,
  };
}
