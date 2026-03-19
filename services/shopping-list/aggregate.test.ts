import { describe, expect, it } from "vitest";
import { generateMealPlan } from "../meal-planning/generate-meal-plan";
import { aggregateShoppingList } from "./aggregate";

describe("aggregateShoppingList", () => {
  it("merges duplicate ingredients and subtracts pantry quantities", () => {
    const pantry = [
      { name: "rice", quantity: 500, unit: "g", source: "manual" as const },
      { name: "tomato", quantity: 200, unit: "g", source: "manual" as const },
    ];

    const plan = generateMealPlan({
      userId: "user-1",
      mode: "budget",
      goal: "fat_loss",
      pantrySnapshot: pantry,
      dietaryPreferences: [],
      allergies: [],
      dislikedFoods: [],
      mealsPerDay: 3,
      budgetAmount: 40,
      budgetPeriod: "week",
      maxCookingTimeMinutes: 30,
      targetCalories: 1900,
      weekStartDate: "2026-03-23",
    });

    const shoppingList = aggregateShoppingList(plan, pantry);

    expect(shoppingList.items.length).toBeGreaterThan(0);
    expect(shoppingList.totals.requiredItems).toBeGreaterThan(0);
  });
});
