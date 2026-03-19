import {
  mockAuthUser,
  mockOnboardingDraft,
  mockPantryItems,
  mockProfile,
  mockSettings,
} from "@/data/mock-user";
import { generateMealPlan, type MealPlan } from "@/services/meal-planning";
import type { PantryItemInput } from "@/services/pantry";
import {
  generateWorkoutPlan,
  type WorkoutEquipment,
  type WorkoutPlan,
} from "@/services/workout-planning";

const pantryCategoryMap = {
  proteins: "protein",
  vegetables: "vegetable",
  fruits: "fruit",
  carbs_grains: "carbs_grains",
  dairy: "dairy",
  spices_condiments: "spices_condiments",
  other: "other",
} as const;

const equipmentMap: Record<string, WorkoutEquipment> = {
  bodyweight: "bodyweight",
  dumbbells: "dumbbells",
  resistance_bands: "resistance_bands",
  bench: "bench",
  barbells: "barbell",
  cable_machines: "cable_machine",
  leg_press: "leg_press",
  treadmill: "treadmill",
  full_gym_equipment: "full_gym",
};

export function getPlannerPantrySnapshot(): PantryItemInput[] {
  return mockPantryItems.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    unit: item.unit === "bags" ? "piece" : item.unit,
    category: pantryCategoryMap[item.category],
    expiresOn: item.expiresOn ?? undefined,
    source: item.source,
  }));
}

export function getDemoMealPlans(): { pantryPlan: MealPlan; budgetPlan: MealPlan } {
  const pantrySnapshot = getPlannerPantrySnapshot();

  const commonInput = {
    userId: mockAuthUser.id,
    goal: mockProfile.goal,
    pantrySnapshot,
    dietaryPreferences: mockProfile.dietaryTags,
    allergies: mockProfile.allergies,
    dislikedFoods: mockProfile.dislikedFoods,
    mealsPerDay: mockProfile.mealsPerDay === 4 ? 4 : 3,
    maxCookingTimeMinutes: mockProfile.maxCookingTimeMin,
    preferredCuisines: mockProfile.cuisinePreferences,
    weekStartDate: "2026-03-23",
  } as const;

  const pantryPlan = generateMealPlan({
    ...commonInput,
    mode: "pantry",
    targetCalories: 2050,
    budgetAmount: 78,
    budgetPeriod: "week",
  });

  const budgetPlan = generateMealPlan({
    ...commonInput,
    mode: "budget",
    targetCalories: 2100,
    budgetAmount: 70,
    budgetPeriod: "week",
  });

  return { pantryPlan, budgetPlan };
}

export function getDemoWorkoutPlan(): WorkoutPlan {
  const equipment = mockProfile.availableWorkoutEquipment
    .map((item) => equipmentMap[item])
    .filter((item): item is WorkoutEquipment => Boolean(item));

  return generateWorkoutPlan({
    userId: mockAuthUser.id,
    goal: mockProfile.goal,
    level: "intermediate",
    location: "home",
    equipment,
    daysPerWeek: mockProfile.preferredWorkoutDays.length,
    preferredDays: mockProfile.preferredWorkoutDays,
    sessionLengthMin: 45,
    weekStartDate: "2026-03-23",
  });
}

export function getDashboardState() {
  const { pantryPlan, budgetPlan } = getDemoMealPlans();
  const workoutPlan = getDemoWorkoutPlan();

  return {
    authUser: mockAuthUser,
    profile: mockProfile,
    settings: mockSettings,
    pantryItems: mockPantryItems,
    onboardingDraft: mockOnboardingDraft,
    pantryPlan,
    budgetPlan,
    workoutPlan,
    streak: {
      current: 12,
      best: 28,
      weeklyConsistency: 86,
      stage: "young_tree" as const,
      progress: 68,
    },
  };
}
