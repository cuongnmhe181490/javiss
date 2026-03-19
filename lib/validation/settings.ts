import { z } from "zod";

import { weekdaySchema } from "./shared";

export const settingsInputSchema = z.object({
  theme: z.enum(["light", "system"]).default("light"),
  measurementSystem: z.enum(["metric", "imperial"]).default("metric"),
  notificationsEnabled: z.coerce.boolean().default(true),
  weeklyCheckInDay: weekdaySchema.default("sunday"),
  treeAnimationEnabled: z.coerce.boolean().default(true),
});

export type SettingsInput = z.infer<typeof settingsInputSchema>;
