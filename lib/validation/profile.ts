import { z } from "zod";

import {
  activityLevelSchema,
  budgetPeriodSchema,
  goalSchema,
  sexSchema,
  weekdaySchema,
  workoutEquipmentSchema,
} from "./shared";

export const profileInputSchema = z.object({
  displayName: z.string().min(2).max(80),
  age: z.coerce.number().int().min(13).max(120),
  sex: sexSchema.nullable().optional(),
  heightCm: z.coerce.number().positive().max(260).optional(),
  weightKg: z.coerce.number().positive().max(500).optional(),
  targetWeightKg: z.coerce.number().positive().max(500).optional(),
  goal: goalSchema,
  activityLevel: activityLevelSchema,
  mealsPerDay: z.coerce.number().int().min(1).max(8).default(3),
  maxCookingTimeMin: z.coerce.number().int().min(5).max(240).default(30),
  budgetAmount: z.coerce.number().nonnegative().optional(),
  budgetPeriod: budgetPeriodSchema.optional(),
  dietaryTags: z.array(z.string().min(1)).default([]),
  allergies: z.array(z.string().min(1)).default([]),
  dislikedFoods: z.array(z.string().min(1)).default([]),
  cuisinePreferences: z.array(z.string().min(1)).default([]),
  availableWorkoutEquipment: z.array(workoutEquipmentSchema).default([]),
  preferredWorkoutDays: z.array(weekdaySchema).default([]),
  location: z.string().max(120).optional(),
});

export const profileUpdateSchema = profileInputSchema.partial().extend({
  displayName: z.string().min(2).max(80).optional(),
});

export const pantryItemInputSchema = z.object({
  name: z.string().min(1).max(120),
  normalizedName: z.string().min(1).max(120),
  quantity: z.coerce.number().nonnegative(),
  unit: z.string().min(1).max(24),
  category: z.enum([
    "proteins",
    "vegetables",
    "fruits",
    "carbs_grains",
    "dairy",
    "spices_condiments",
    "other",
  ]),
  expiresOn: z.union([z.string().datetime(), z.string().date()]).optional(),
  source: z.enum(["manual", "imported", "shopping", "recipe"]).default("manual"),
  isEstimated: z.coerce.boolean().default(false),
});

export const pantryItemUpdateSchema = pantryItemInputSchema.partial().extend({
  name: z.string().min(1).max(120).optional(),
  normalizedName: z.string().min(1).max(120).optional(),
  quantity: z.coerce.number().nonnegative().optional(),
  unit: z.string().min(1).max(24).optional(),
  category: z.enum([
    "proteins",
    "vegetables",
    "fruits",
    "carbs_grains",
    "dairy",
    "spices_condiments",
    "other",
  ]).optional(),
});

export const onboardingDraftSchema = z.object({
  profile: profileInputSchema,
  pantryItems: z.array(pantryItemInputSchema).default([]),
  setupMode: z.enum(["guided", "manual", "imported"]).default("guided"),
});

export const profileFormDefaults = profileInputSchema.parse({
  displayName: "Avery",
  age: 31,
  sex: "prefer_not_to_say",
  heightCm: 172,
  weightKg: 68,
  targetWeightKg: 65,
  goal: "general_health",
  activityLevel: "moderately_active",
  mealsPerDay: 3,
  maxCookingTimeMin: 30,
  budgetAmount: 70,
  budgetPeriod: "weekly",
  dietaryTags: ["high_protein", "balanced"],
  allergies: [],
  dislikedFoods: ["okra"],
  cuisinePreferences: ["mediterranean", "japanese"],
  availableWorkoutEquipment: ["bodyweight", "dumbbells", "resistance_bands"],
  preferredWorkoutDays: ["monday", "wednesday", "friday"],
  location: "Bangkok",
});
