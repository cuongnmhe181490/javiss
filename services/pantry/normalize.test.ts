import { describe, expect, it } from "vitest";
import { normalizePantryItems } from "./normalize";

describe("normalizePantryItems", () => {
  it("normalizes units and ingredient names", () => {
    const [item] = normalizePantryItems([
      { name: "Scallions", quantity: 2, unit: "tablespoons", source: "manual" },
    ]);

    expect(item.normalizedName).toBe("green onion");
    expect(item.normalizedUnit).toBe("tbsp");
  });
});

