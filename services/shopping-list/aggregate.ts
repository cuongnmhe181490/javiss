import type { MealPlan } from "../meal-planning/types";
import { normalizePantryItems, matchPantryQuantity } from "../pantry";
import type { PantryItemInput } from "../pantry/types";
import { calculateIngredientCost, DEFAULT_CURRENCY } from "../pricing";
import type { ShoppingList, ShoppingListGroup, ShoppingListLine } from "./types";

function round(value: number) {
  return Math.round(value * 100) / 100;
}

function groupByCategory(lines: ShoppingListLine[]): ShoppingListGroup[] {
  const categories = new Map<string, ShoppingListLine[]>();
  for (const line of lines) {
    const bucket = categories.get(line.category) ?? [];
    bucket.push(line);
    categories.set(line.category, bucket);
  }

  return Array.from(categories.entries()).map(([category, items]) => ({
    category: category as ShoppingListGroup["category"],
    items,
    totalRequiredQuantity: round(items.reduce((sum, item) => sum + item.requiredQuantity, 0)),
    totalAvailableQuantity: round(items.reduce((sum, item) => sum + item.availableQuantity, 0)),
    totalBuyQuantity: round(items.reduce((sum, item) => sum + item.buyQuantity, 0)),
    totalRequiredCost: round(items.reduce((sum, item) => sum + item.requiredCost, 0)),
    totalCoveredCost: round(items.reduce((sum, item) => sum + item.coveredCost, 0)),
    totalBuyCost: round(items.reduce((sum, item) => sum + item.buyCost, 0)),
  }));
}

export function aggregateShoppingList(plan: MealPlan, pantrySnapshot: PantryItemInput[]): ShoppingList {
  const pantry = normalizePantryItems(pantrySnapshot);
  const ingredientMap = new Map<
    string,
    {
      name: string;
      normalizedName: string;
      requiredQuantity: number;
      unit: string;
      category: ShoppingListLine["category"];
      sourceMeals: string[];
    }
  >();

  for (const day of plan.days) {
    for (const meal of day.meals) {
      for (const ingredient of meal.scaledIngredients) {
        const existing = ingredientMap.get(ingredient.normalizedName);
        ingredientMap.set(ingredient.normalizedName, {
          name: ingredient.name,
          normalizedName: ingredient.normalizedName,
          requiredQuantity: round((existing?.requiredQuantity ?? 0) + ingredient.quantity),
          unit: ingredient.unit,
          category: ingredient.category,
          sourceMeals: Array.from(new Set([...(existing?.sourceMeals ?? []), meal.name])),
        });
      }
    }
  }

  const items = Array.from(ingredientMap.values()).map((ingredient) => {
    const pantryMatch = pantry.find((item) => item.normalizedName === ingredient.normalizedName);
    const availableQuantity = pantryMatch ? matchPantryQuantity(ingredient.requiredQuantity, ingredient.unit, pantryMatch) : 0;
    const buyQuantity = Math.max(ingredient.requiredQuantity - availableQuantity, 0);
    const checkedState: ShoppingListLine["checkedState"] = buyQuantity > 0 ? "none" : "already_have";
    const requiredCost = calculateIngredientCost({
      normalizedName: ingredient.normalizedName,
      quantity: ingredient.requiredQuantity,
      unit: ingredient.unit,
    });
    const coveredCost = calculateIngredientCost({
      normalizedName: ingredient.normalizedName,
      quantity: availableQuantity,
      unit: ingredient.unit,
    });
    const buyCost = calculateIngredientCost({
      normalizedName: ingredient.normalizedName,
      quantity: buyQuantity,
      unit: ingredient.unit,
    });

    return {
      name: ingredient.name,
      normalizedName: ingredient.normalizedName,
      requiredQuantity: round(ingredient.requiredQuantity),
      availableQuantity: round(availableQuantity),
      buyQuantity: round(buyQuantity),
      estimatedUnitPrice: requiredCost.estimatedUnitPrice,
      requiredCost: requiredCost.estimatedCost,
      coveredCost: coveredCost.estimatedCost,
      buyCost: buyCost.estimatedCost,
      currency: DEFAULT_CURRENCY,
      unit: ingredient.unit,
      category: ingredient.category,
      checkedState,
      sourceMeals: ingredient.sourceMeals,
    } satisfies ShoppingListLine;
  });

  return {
    items,
    groupedByCategory: groupByCategory(items),
    totals: {
      requiredItems: items.length,
      pantryCoveredItems: items.filter((item) => item.buyQuantity === 0).length,
      buyItems: items.filter((item) => item.buyQuantity > 0).length,
      totalRequiredCost: round(items.reduce((sum, item) => sum + item.requiredCost, 0)),
      totalCoveredCost: round(items.reduce((sum, item) => sum + item.coveredCost, 0)),
      totalBuyCost: round(items.reduce((sum, item) => sum + item.buyCost, 0)),
      currency: DEFAULT_CURRENCY,
    },
    pantryReconciliation: {
      matches: items.filter((item) => item.availableQuantity > 0).map((item) => ({
        normalizedName: item.normalizedName,
        requiredQuantity: item.requiredQuantity,
        availableQuantity: item.availableQuantity,
        missingQuantity: item.buyQuantity,
        unit: item.unit,
        category: item.category,
      })),
      missingItems: items.filter((item) => item.buyQuantity > 0).map((item) => ({
        normalizedName: item.normalizedName,
        requiredQuantity: item.requiredQuantity,
        availableQuantity: item.availableQuantity,
        missingQuantity: item.buyQuantity,
        unit: item.unit,
        category: item.category,
      })),
      surplusItems: [],
      consumedFromPantry: items.filter((item) => item.availableQuantity > 0).map((item) => ({
        normalizedName: item.normalizedName,
        requiredQuantity: item.requiredQuantity,
        availableQuantity: item.availableQuantity,
        missingQuantity: item.buyQuantity,
        unit: item.unit,
        category: item.category,
      })),
      estimatedWasteReduction: round(items.reduce((sum, item) => sum + item.availableQuantity, 0)),
    },
  };
}
