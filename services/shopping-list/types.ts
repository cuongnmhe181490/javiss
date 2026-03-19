import type { PantryCategory, PantryMatchResult } from "../pantry/types";

export type ShoppingListLine = {
  name: string;
  normalizedName: string;
  requiredQuantity: number;
  availableQuantity: number;
  buyQuantity: number;
  unit: string;
  category: PantryCategory;
  checkedState: "none" | "already_have" | "bought";
  sourceMeals: string[];
};

export type ShoppingListGroup = {
  category: PantryCategory;
  items: ShoppingListLine[];
  totalRequiredQuantity: number;
  totalAvailableQuantity: number;
  totalBuyQuantity: number;
};

export type ShoppingListTotals = {
  requiredItems: number;
  pantryCoveredItems: number;
  buyItems: number;
};

export type ShoppingList = {
  items: ShoppingListLine[];
  groupedByCategory: ShoppingListGroup[];
  totals: ShoppingListTotals;
  pantryReconciliation: PantryMatchResult;
};
