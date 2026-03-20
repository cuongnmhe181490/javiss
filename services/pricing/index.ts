import { getIngredientPriceCatalog, type IngredientPrice, type SupportedCurrency } from "../../data/ingredient-prices";
import { normalizeIngredientName, normalizeUnit, toBaseQuantity } from "../pantry/normalize";
import type { RecipeIngredient } from "../meal-planning/types";

export const DEFAULT_CURRENCY: SupportedCurrency = "VND";
export const DEFAULT_LOCALE = "vi-VN";

type CostResult = {
  estimatedCost: number;
  estimatedUnitPrice: number;
  currency: SupportedCurrency;
  missingPrice: boolean;
};

function roundCurrency(value: number) {
  return Math.round(value);
}

function getPriceIndex() {
  return new Map(getIngredientPriceCatalog().map((item) => [item.normalizedName, item]));
}

function getCompatibleQuantity(quantity: number, unit: string, price: IngredientPrice) {
  const normalizedRequired = normalizeUnit(unit);
  if (normalizedRequired !== price.baseUnit) {
    return undefined;
  }

  return toBaseQuantity(quantity, unit);
}

export function getIngredientPrice(normalizedName: string) {
  return getPriceIndex().get(normalizeIngredientName(normalizedName));
}

export function calculateIngredientCost(input: {
  normalizedName: string;
  quantity: number;
  unit: string;
}): CostResult {
  const price = getIngredientPrice(input.normalizedName);
  if (!price) {
    return {
      estimatedCost: 0,
      estimatedUnitPrice: 0,
      currency: DEFAULT_CURRENCY,
      missingPrice: true,
    };
  }

  const compatibleQuantity = getCompatibleQuantity(input.quantity, input.unit, price);
  if (compatibleQuantity === undefined) {
    return {
      estimatedCost: 0,
      estimatedUnitPrice: 0,
      currency: price.currency,
      missingPrice: true,
    };
  }

  const estimatedUnitPrice = price.price / price.baseQuantity;
  return {
    estimatedCost: roundCurrency(compatibleQuantity * estimatedUnitPrice),
    estimatedUnitPrice,
    currency: price.currency,
    missingPrice: false,
  };
}

export function calculateRecipeCost(ingredients: RecipeIngredient[]) {
  return ingredients.reduce(
    (summary, ingredient) => {
      const result = calculateIngredientCost({
        normalizedName: ingredient.normalizedName,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      });

      return {
        estimatedCost: summary.estimatedCost + result.estimatedCost,
        currency: result.currency,
        missingPrice: summary.missingPrice || result.missingPrice,
      };
    },
    {
      estimatedCost: 0,
      currency: DEFAULT_CURRENCY as SupportedCurrency,
      missingPrice: false,
    },
  );
}

export function formatCurrency(amount: number, currency: SupportedCurrency = DEFAULT_CURRENCY) {
  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
