import { describe, expect, it } from "vitest";
import { generateMealPlan } from "./generate-meal-plan";

describe("generateMealPlan", () => {
  it("creates a stable 7-day plan", () => {
    const plan = generateMealPlan({
      userId: "user-1",
      mode: "pantry",
      goal: "general_health",
      pantrySnapshot: [
        { name: "chicken breast", quantity: 700, unit: "g", source: "manual" },
        { name: "rice", quantity: 1200, unit: "g", source: "manual" },
        { name: "tomato", quantity: 600, unit: "g", source: "manual" },
      ],
      dietaryPreferences: ["high-protein"],
      allergies: [],
      dislikedFoods: [],
      mealsPerDay: 3,
      maxCookingTimeMinutes: 35,
      targetCalories: 2100,
      weekStartDate: "2026-03-23",
    });

    expect(plan.days).toHaveLength(7);
    expect(plan.shoppingList.items.length).toBeGreaterThan(0);
    expect(plan.pantryReconciliation.matches.length).toBeGreaterThan(0);
  });
});
