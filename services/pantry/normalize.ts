import type { PantryCategory, PantryItem, PantryItemInput } from "./types";

const categoryFallbacks: Record<string, PantryCategory> = {
  egg: "protein",
  eggs: "protein",
  chicken: "protein",
  salmon: "protein",
  tuna: "protein",
  tofu: "protein",
  yogurt: "dairy",
  cheese: "dairy",
  milk: "dairy",
  apple: "fruit",
  banana: "fruit",
  berries: "fruit",
  lemon: "fruit",
  rice: "carbs_grains",
  oats: "carbs_grains",
  quinoa: "carbs_grains",
  pasta: "carbs_grains",
  lentil: "carbs_grains",
  lentils: "carbs_grains",
  broccoli: "vegetable",
  carrot: "vegetable",
  cucumber: "vegetable",
  tomato: "vegetable",
  spinach: "vegetable",
};

const ingredientAliases: Record<string, string> = {
  "rolled oats": "oats",
  scallions: "green onion",
  "spring onions": "green onion",
  "bell peppers": "bell pepper",
  "mixed berries": "berries",
  tomatoes: "tomato",
  potatoes: "potato",
  chickpea: "chickpeas",
  "garbanzo beans": "chickpeas",
  rice: "white rice",
  "canned tuna": "tuna",
  "plain yogurt": "greek yogurt",
  yoghurt: "greek yogurt",
  yogurt: "greek yogurt",
};

const massUnits = new Set(["g", "gram", "grams", "kg", "kilogram", "kilograms", "mg", "milligram", "milligrams"]);
const volumeUnits = new Set(["ml", "milliliter", "milliliters", "l", "liter", "liters", "tbsp", "tablespoon", "tablespoons", "tsp", "teaspoon", "teaspoons", "cup", "cups"]);
const countUnits = new Set(["piece", "pieces", "egg", "eggs", "clove", "cloves", "slice", "slices", "can", "cans"]);

export function normalizeIngredientName(value: string) {
  const cleaned = value
    .toLowerCase()
    .replace(/[(),.%]/g, " ")
    .replace(/\b(fresh|organic|large|small|diced|chopped|minced|sliced)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return ingredientAliases[cleaned] ?? cleaned;
}

export function normalizeUnit(unit: string) {
  const cleaned = unit.toLowerCase().trim();
  if (cleaned === "kg" || cleaned === "kilogram" || cleaned === "kilograms") return "g";
  if (cleaned === "mg" || cleaned === "milligram" || cleaned === "milligrams") return "g";
  if (cleaned === "l" || cleaned === "liter" || cleaned === "liters") return "ml";
  if (cleaned === "tablespoon" || cleaned === "tablespoons") return "tbsp";
  if (cleaned === "teaspoon" || cleaned === "teaspoons") return "tsp";
  if (cleaned === "cup" || cleaned === "cups") return "cup";
  if (cleaned === "egg" || cleaned === "eggs") return "piece";
  if (cleaned === "clove" || cleaned === "cloves") return "clove";
  if (cleaned === "slice" || cleaned === "slices") return "slice";
  if (cleaned === "can" || cleaned === "cans") return "can";
  if (cleaned === "gram" || cleaned === "grams") return "g";
  if (cleaned === "milliliter" || cleaned === "milliliters") return "ml";
  return cleaned;
}

export function toBaseQuantity(quantity: number, unit: string) {
  const normalized = normalizeUnit(unit);
  if (normalized === "g") return unit.toLowerCase().startsWith("k") ? quantity * 1000 : quantity;
  if (normalized === "ml") return unit.toLowerCase().startsWith("l") ? quantity * 1000 : quantity;
  if (normalized === "tbsp") return quantity * 15;
  if (normalized === "tsp") return quantity * 5;
  if (normalized === "cup") return quantity * 240;
  return quantity;
}

export function inferPantryCategory(name: string): PantryCategory {
  const normalizedName = normalizeIngredientName(name);
  for (const [needle, category] of Object.entries(categoryFallbacks)) {
    if (normalizedName.includes(needle)) return category;
  }
  return "other";
}

export function normalizePantryItems(items: PantryItemInput[]): PantryItem[] {
  return items.map((item) => {
    const normalizedUnit = normalizeUnit(item.unit);
    return {
      ...item,
      normalizedName: normalizeIngredientName(item.name),
      normalizedUnit,
      baseQuantity: toBaseQuantity(item.quantity, item.unit),
      baseUnit: normalizedUnit,
      category: item.category ?? inferPantryCategory(item.name),
    };
  });
}

export function matchPantryQuantity(requiredQuantity: number, requiredUnit: string, pantryItem: PantryItem) {
  const normalizedRequiredUnit = normalizeUnit(requiredUnit);
  const requiredBase = toBaseQuantity(requiredQuantity, requiredUnit);
  const pantryMatchesUnitFamily =
    (massUnits.has(normalizedRequiredUnit) && massUnits.has(pantryItem.normalizedUnit)) ||
    (volumeUnits.has(normalizedRequiredUnit) && volumeUnits.has(pantryItem.normalizedUnit)) ||
    (countUnits.has(normalizedRequiredUnit) && countUnits.has(pantryItem.normalizedUnit)) ||
    normalizedRequiredUnit === pantryItem.normalizedUnit;

  if (!pantryMatchesUnitFamily) return 0;
  return Math.min(requiredBase, pantryItem.baseQuantity);
}
