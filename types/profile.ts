import { z } from "zod";

import { profileInputSchema } from "@/lib/validation/profile";
import { settingsInputSchema } from "@/lib/validation/settings";
import { activityLevelSchema, budgetPeriodSchema, goalSchema, sexSchema } from "@/lib/validation/shared";

export type Goal = z.infer<typeof goalSchema>;
export type ActivityLevel = z.infer<typeof activityLevelSchema>;
export type Sex = z.infer<typeof sexSchema>;
export type BudgetPeriod = z.infer<typeof budgetPeriodSchema>;

export type ProfileInput = z.infer<typeof profileInputSchema>;

export interface ProfileRecord extends ProfileInput {
  id: string;
  userId: string;
  avatarUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProfilePreferences {
  dietaryTags: string[];
  allergies: string[];
  dislikedFoods: string[];
  cuisinePreferences: string[];
  availableWorkoutEquipment: string[];
  preferredWorkoutDays: string[];
}

export interface SettingsRecord {
  userId: string;
  theme: z.infer<typeof settingsInputSchema>["theme"];
  measurementSystem: z.infer<typeof settingsInputSchema>["measurementSystem"];
  notificationsEnabled: z.infer<typeof settingsInputSchema>["notificationsEnabled"];
  weeklyCheckInDay: z.infer<typeof settingsInputSchema>["weeklyCheckInDay"];
  treeAnimationEnabled: z.infer<typeof settingsInputSchema>["treeAnimationEnabled"];
  createdAt: string;
  updatedAt: string;
}
