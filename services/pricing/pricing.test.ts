import { describe, expect, it } from "vitest";

import { calculateIngredientCost, calculateRecipeCost, formatCurrency } from "./index";

describe("pricing", () => {
  it("calculates ingredient costs from the Vietnam price catalog", () => {
    const eggCost = calculateIngredientCost({
      normalizedName: "egg",
      quantity: 3,
      unit: "piece",
    });

    expect(eggCost.estimatedCost).toBe(9000);
    expect(eggCost.currency).toBe("VND");
    expect(eggCost.missingPrice).toBe(false);
  });

  it("calculates recipe cost from ingredient rows", () => {
    const recipeCost = calculateRecipeCost([
      { name: "Trứng", normalizedName: "egg", quantity: 2, unit: "piece", category: "protein" },
      { name: "Gạo trắng", normalizedName: "white rice", quantity: 100, unit: "g", category: "carbs_grains" },
    ]);

    expect(recipeCost.estimatedCost).toBeGreaterThan(0);
    expect(recipeCost.missingPrice).toBe(false);
  });

  it("formats VND cleanly", () => {
    expect(formatCurrency(1000000)).toContain("₫");
  });
});
