import { describe, expect, it } from "vitest";
import { generateWorkoutPlan, listAvailableExercises } from "./generate-workout-plan";

describe("generateWorkoutPlan", () => {
  it("builds a deterministic 7-day schedule with rest days", () => {
    const plan = generateWorkoutPlan({
      userId: "user-1",
      goal: "muscle_gain",
      level: "intermediate",
      location: "gym",
      equipment: ["full_gym"],
      daysPerWeek: 4,
      sessionLengthMin: 60,
      weekStartDate: "2026-03-16",
    });

    expect(plan.days).toHaveLength(7);
    expect(plan.days.filter((day) => day.kind === "workout")).toHaveLength(4);
    expect(plan.metadata.source).toBe("deterministic-mock");
    expect(plan.days[0]?.exercises.length).toBeGreaterThan(0);
  });

  it("filters exercises by equipment and location", () => {
    const available = listAvailableExercises({
      userId: "user-1",
      goal: "general_health",
      level: "beginner",
      location: "home",
      equipment: ["bodyweight"],
      daysPerWeek: 3,
      sessionLengthMin: 45,
      weekStartDate: "2026-03-16",
    });

    expect(
      available.every((exercise) => exercise.location === "home" || exercise.location === "both"),
    ).toBe(true);
    expect(available.some((exercise) => exercise.id === "push-up")).toBe(true);
    expect(available.some((exercise) => exercise.id === "bench-press")).toBe(false);
  });
});
