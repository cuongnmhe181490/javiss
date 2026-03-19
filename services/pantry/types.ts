import { z } from "zod";

export const pantryCategories = [
  "protein",
  "vegetable",
  "fruit",
  "carbs_grains",
  "dairy",
  "spices_condiments",
  "other",
] as const;

export type PantryCategory = (typeof pantryCategories)[number];

export const pantryItemInputSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().positive(),
  unit: z.string().min(1),
  category: z.enum(pantryCategories).optional(),
  expiresOn: z.string().date().optional(),
  source: z.enum(["manual", "shopping", "recipe", "imported"]).optional(),
});

export type PantryItemInput = z.infer<typeof pantryItemInputSchema>;

export type PantryItem = PantryItemInput & {
  normalizedName: string;
  normalizedUnit: string;
  baseQuantity: number;
  baseUnit: string;
  category: PantryCategory;
};

export type PantryMatchLine = {
  normalizedName: string;
  requiredQuantity: number;
  availableQuantity: number;
  missingQuantity: number;
  unit: string;
  category: PantryCategory;
};

export type PantryMatchResult = {
  matches: PantryMatchLine[];
  missingItems: PantryMatchLine[];
  surplusItems: PantryMatchLine[];
  consumedFromPantry: PantryMatchLine[];
  estimatedWasteReduction: number;
};

