import { z } from "zod";

import { weekdaySchema } from "./shared";

export const settingsInputSchema = z.object({
  theme: z.enum(["light", "dark", "system"]).default("system"),
  currency: z.enum(["VND"]).default("VND"),
  budgetModeDefault: z.enum(["daily", "weekly"]).default("weekly"),
  measurementSystem: z.enum(["metric", "imperial"]).default("metric"),
  region: z.enum(["vi-VN"]).default("vi-VN"),
  notificationsEnabled: z.coerce.boolean().default(true),
  weeklyCheckInDay: weekdaySchema.default("sunday"),
  treeAnimationEnabled: z.coerce.boolean().default(true),
});

export type SettingsInput = z.infer<typeof settingsInputSchema>;
