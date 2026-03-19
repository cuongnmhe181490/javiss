import { z } from "zod";

import { pantryItemInputSchema } from "@/lib/validation/profile";
import { pantryCategorySchema, pantrySourceSchema } from "@/lib/validation/shared";

export type PantryCategory = z.infer<typeof pantryCategorySchema>;
export type PantrySource = z.infer<typeof pantrySourceSchema>;
export type PantryItemInput = z.infer<typeof pantryItemInputSchema>;

export interface PantryItemRecord extends PantryItemInput {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PantryEventRecord {
  id: string;
  userId: string;
  pantryItemId: string | null;
  eventType: "added" | "updated" | "removed" | "consumed" | "marked_available";
  deltaQuantity: number | null;
  payload: Record<string, unknown>;
  createdAt: string;
}
