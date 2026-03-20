import { z } from "zod";
import type { PantryItemInput, PantryMatchResult } from "../pantry/types";
import type { ShoppingList } from "../shopping-list/types";

export const mealModes = ["pantry", "budget"] as const;
export type MealMode = (typeof mealModes)[number];

export const mealGoals = ["fat_loss", "muscle_gain", "maintenance", "general_health"] as const;
export type MealGoal = (typeof mealGoals)[number];

export const mealTypes = ["breakfast", "lunch", "dinner", "snack"] as const;
export type MealType = (typeof mealTypes)[number];

export const ingredientCategories = [
  "protein",
  "vegetable",
  "fruit",
  "carbs_grains",
  "dairy",
  "spices_condiments",
  "other",
] as const;

export type IngredientCategory = (typeof ingredientCategories)[number];

export type NutritionSummary = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sodium?: number;
};

export type RecipeIngredient = {
  name: string;
  normalizedName: string;
  quantity: number;
  unit: string;
  category: IngredientCategory;
  optional?: boolean;
  pantryEligible?: boolean;
};

export type RecipeTemplate = {
  id: string;
  name: string;
  description: string;
  mealType: MealType;
  primaryProtein: string;
  cuisine: string;
  ingredients: RecipeIngredient[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  instructions: string[];
  substitutions: string[];
  tags: string[];
  nutrition: NutritionSummary;
  costEstimate: number;
  difficulty: "easy" | "moderate" | "advanced";
};

export type PlannedMeal = RecipeTemplate & {
  portionMultiplier: number;
  scaledIngredients: RecipeIngredient[];
  estimatedNutrition: NutritionSummary;
  sourceRecipeId: string;
  estimatedCost: number;
  currency: "VND";
};

export type DayPlan = {
  date: string;
  meals: PlannedMeal[];
  dailyCalories: number;
  dailyMacros: NutritionSummary;
  dailyEstimatedCost: number;
  dayNotes: string;
};

export type MealPlanRequest = {
  userId: string;
  mode: MealMode;
  goal: MealGoal;
  pantrySnapshot: PantryItemInput[];
  dietaryPreferences: string[];
  allergies: string[];
  dislikedFoods: string[];
  mealsPerDay: 3 | 4;
  budgetAmount?: number;
  budgetPeriod?: "day" | "week";
  maxCookingTimeMinutes?: number;
  targetCalories?: number;
  targetProteinGrams?: number;
  targetCarbsGrams?: number;
  targetFatGrams?: number;
  preferredCuisines?: string[];
  weekStartDate: string;
};

export type MealPlanMetadata = {
  version: number;
  generatedReason: string;
  fallbackUsed: boolean;
  confidence: number;
  pantryMode: boolean;
  budgetMode: boolean;
  warnings: string[];
};

export type MealPlanCostSummary = {
  totalMealCost: number;
  totalRequiredShoppingCost: number;
  totalCoveredShoppingCost: number;
  totalBuyShoppingCost: number;
  averageDailyCost: number;
  currency: "VND";
  budgetAmount?: number;
  budgetPeriod?: "day" | "week";
  withinBudget: boolean;
};

export type MealPlan = {
  id: string;
  userId: string;
  mode: MealMode;
  goal: MealGoal;
  weekStartDate: string;
  days: DayPlan[];
  weeklyNutritionSummary: NutritionSummary;
  costSummary: MealPlanCostSummary;
  shoppingList: ShoppingList;
  pantryReconciliation: PantryMatchResult;
  metadata: MealPlanMetadata;
};

export const mealPlanRequestSchema = z.object({
  userId: z.string().min(1),
  mode: z.enum(mealModes),
  goal: z.enum(mealGoals),
  pantrySnapshot: z.array(z.object({
    name: z.string().min(1),
    quantity: z.number().positive(),
    unit: z.string().min(1),
    category: z.enum(ingredientCategories).optional(),
    expiresOn: z.string().date().optional(),
    source: z.enum(["manual", "shopping", "recipe", "imported"]).optional(),
  })),
  dietaryPreferences: z.array(z.string()),
  allergies: z.array(z.string()),
  dislikedFoods: z.array(z.string()),
  mealsPerDay: z.union([z.literal(3), z.literal(4)]),
  budgetAmount: z.number().positive().optional(),
  budgetPeriod: z.enum(["day", "week"]).optional(),
  maxCookingTimeMinutes: z.number().positive().optional(),
  targetCalories: z.number().positive().optional(),
  targetProteinGrams: z.number().positive().optional(),
  targetCarbsGrams: z.number().positive().optional(),
  targetFatGrams: z.number().positive().optional(),
  preferredCuisines: z.array(z.string()).optional(),
  weekStartDate: z.string().date(),
});
