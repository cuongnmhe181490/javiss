import { z } from "zod";

export const goalValues = [
  "fat_loss",
  "muscle_gain",
  "maintenance",
  "general_health",
] as const;
export const activityLevelValues = [
  "sedentary",
  "lightly_active",
  "moderately_active",
  "very_active",
  "athlete",
] as const;
export const sexValues = ["female", "male", "intersex", "nonbinary", "prefer_not_to_say"] as const;
export const budgetPeriodValues = ["daily", "weekly"] as const;
export const planModeValues = ["pantry", "budget"] as const;
export const pantrySourceValues = ["manual", "imported", "shopping", "recipe"] as const;
export const pantryCategoryValues = [
  "proteins",
  "vegetables",
  "fruits",
  "carbs_grains",
  "dairy",
  "spices_condiments",
  "other",
] as const;
export const workoutLocationValues = ["home", "gym"] as const;
export const workoutLevelValues = ["beginner", "intermediate", "advanced"] as const;
export const workoutGoalValues = [
  "fat_loss",
  "muscle_gain",
  "maintenance",
  "general_health",
] as const;
export const workoutEquipmentValues = [
  "bodyweight",
  "dumbbells",
  "resistance_bands",
  "bench",
  "barbells",
  "cable_machines",
  "leg_press",
  "treadmill",
  "full_gym_equipment",
] as const;
export const weekdayValues = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;
export const treeStageValues = [
  "seed",
  "sprout",
  "young_tree",
  "mature_tree",
  "flowering_tree",
] as const;

export const goalSchema = z.enum(goalValues);
export const activityLevelSchema = z.enum(activityLevelValues);
export const sexSchema = z.enum(sexValues);
export const budgetPeriodSchema = z.enum(budgetPeriodValues);
export const planModeSchema = z.enum(planModeValues);
export const pantrySourceSchema = z.enum(pantrySourceValues);
export const pantryCategorySchema = z.enum(pantryCategoryValues);
export const workoutLocationSchema = z.enum(workoutLocationValues);
export const workoutLevelSchema = z.enum(workoutLevelValues);
export const workoutGoalSchema = z.enum(workoutGoalValues);
export const workoutEquipmentSchema = z.enum(workoutEquipmentValues);
export const weekdaySchema = z.enum(weekdayValues);
export const treeStageSchema = z.enum(treeStageValues);

export function splitCsvList(value: string | null | undefined) {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .filter((entry, index, all) => all.indexOf(entry) === index);
}

export function joinCsvList(values: string[]) {
  return values.join(", ");
}
