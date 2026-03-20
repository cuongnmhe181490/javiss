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
  displayName: z.string().trim().min(2, "Tên hiển thị cần ít nhất 2 ký tự.").max(80),
  age: z.coerce.number().int().min(10, "Tuổi phải từ 10 trở lên.").max(100, "Tuổi không được vượt quá 100."),
  sex: sexSchema.nullable().optional(),
  heightCm: z.coerce.number().min(100, "Chiều cao phải từ 100 cm.").max(250, "Chiều cao không hợp lệ.").optional(),
  weightKg: z.coerce.number().gt(20, "Cân nặng phải lớn hơn 20 kg.").max(300, "Cân nặng không hợp lệ.").optional(),
  targetWeightKg: z.coerce.number().gt(20, "Cân nặng mục tiêu phải lớn hơn 20 kg.").max(300, "Cân nặng mục tiêu không hợp lệ.").optional(),
  goal: goalSchema,
  activityLevel: activityLevelSchema,
  mealsPerDay: z.coerce.number().int().min(2, "Số bữa mỗi ngày phải từ 2 đến 6.").max(6, "Số bữa mỗi ngày phải từ 2 đến 6.").default(3),
  maxCookingTimeMin: z.coerce.number().int().min(5, "Thời gian nấu tối thiểu là 5 phút.").max(180, "Thời gian nấu không nên vượt quá 180 phút.").default(30),
  budgetAmount: z.coerce.number().gt(0, "Ngân sách phải lớn hơn 0.").optional(),
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
  displayName: z.string().trim().min(2, "Tên hiển thị cần ít nhất 2 ký tự.").max(80).optional(),
});

export const pantryItemInputSchema = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập tên nguyên liệu.").max(120),
  normalizedName: z.string().trim().min(1, "Tên chuẩn hoá không được để trống.").max(120),
  quantity: z.coerce.number().gt(0, "Số lượng phải lớn hơn 0."),
  unit: z.string().trim().min(1, "Vui lòng chọn đơn vị.").max(24),
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
  displayName: "An Vy",
  age: 31,
  sex: "prefer_not_to_say",
  heightCm: 172,
  weightKg: 68,
  targetWeightKg: 65,
  goal: "general_health",
  activityLevel: "moderately_active",
  mealsPerDay: 3,
  maxCookingTimeMin: 30,
  budgetAmount: 700000,
  budgetPeriod: "weekly",
  dietaryTags: ["high_protein", "balanced"],
  allergies: [],
  dislikedFoods: ["okra"],
  cuisinePreferences: ["mediterranean", "japanese"],
  availableWorkoutEquipment: ["bodyweight", "dumbbells", "resistance_bands"],
  preferredWorkoutDays: ["monday", "wednesday", "friday"],
  location: "Bangkok",
});
