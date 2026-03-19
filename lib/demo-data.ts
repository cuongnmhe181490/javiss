import { cookies } from "next/headers";
import { z } from "zod";

import {
  mockAuthUser,
  mockOnboardingDraft,
  mockPantryItems,
  mockProfile,
  mockSettings,
} from "@/data/mock-user";
import { settingsInputSchema, type SettingsInput } from "@/lib/validation/settings";
import { onboardingDraftSchema, pantryItemInputSchema, profileInputSchema } from "@/lib/validation";
import { generateMealPlan, type MealPlan } from "@/services/meal-planning";
import type { PantryItemInput as PlannerPantryItemInput } from "@/services/pantry";
import {
  generateWorkoutPlan,
  type WorkoutEquipment,
  type WorkoutPlan,
} from "@/services/workout-planning";
import type { OnboardingDraft } from "@/types/onboarding";
import type { PantryItemInput, PantryItemRecord } from "@/types/pantry";
import type { ProfileInput, ProfileRecord, SettingsRecord } from "@/types/profile";

const cookieKeys = {
  profile: "javiss-demo-profile",
  pantry: "javiss-demo-pantry",
  settings: "javiss-demo-settings",
  onboardingMode: "javiss-demo-onboarding-mode",
} as const;

const pantryCookieSchema = z.array(pantryItemInputSchema);
const onboardingModeSchema = onboardingDraftSchema.shape.setupMode;

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

function fallbackProfileInput(): ProfileInput {
  return {
    displayName: mockProfile.displayName,
    age: mockProfile.age,
    sex: mockProfile.sex,
    heightCm: mockProfile.heightCm,
    weightKg: mockProfile.weightKg,
    targetWeightKg: mockProfile.targetWeightKg,
    goal: mockProfile.goal,
    activityLevel: mockProfile.activityLevel,
    mealsPerDay: mockProfile.mealsPerDay,
    maxCookingTimeMin: mockProfile.maxCookingTimeMin,
    budgetAmount: mockProfile.budgetAmount,
    budgetPeriod: mockProfile.budgetPeriod,
    dietaryTags: mockProfile.dietaryTags,
    allergies: mockProfile.allergies,
    dislikedFoods: mockProfile.dislikedFoods,
    cuisinePreferences: mockProfile.cuisinePreferences,
    availableWorkoutEquipment: mockProfile.availableWorkoutEquipment,
    preferredWorkoutDays: mockProfile.preferredWorkoutDays,
    location: mockProfile.location,
  };
}

function fallbackSettingsInput(): SettingsInput {
  return {
    theme: mockSettings.theme,
    measurementSystem: mockSettings.measurementSystem,
    notificationsEnabled: mockSettings.notificationsEnabled,
    weeklyCheckInDay: mockSettings.weeklyCheckInDay as SettingsInput["weeklyCheckInDay"],
    treeAnimationEnabled: mockSettings.treeAnimationEnabled,
  };
}

function fallbackPantryInputs(): PantryItemInput[] {
  return mockPantryItems.map((item) => ({
    name: item.name,
    normalizedName: item.normalizedName,
    quantity: item.quantity,
    unit: item.unit,
    category: item.category,
    expiresOn: item.expiresOn,
    source: item.source,
    isEstimated: item.isEstimated,
  }));
}

async function readJsonCookie<T>(
  key: string,
  schema: z.ZodType<T>,
  fallback: T,
): Promise<T> {
  const store = await cookies();
  const raw = store.get(key)?.value;

  if (!raw) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    return schema.parse(parsed);
  } catch {
    return fallback;
  }
}

async function readStringCookie<T extends string>(
  key: string,
  schema: z.ZodType<T>,
  fallback: T,
): Promise<T> {
  const store = await cookies();
  const raw = store.get(key)?.value;
  const parsed = schema.safeParse(raw);
  return parsed.success ? parsed.data : fallback;
}

function buildProfileRecord(input: ProfileInput): ProfileRecord {
  return {
    id: mockProfile.id,
    userId: mockAuthUser.id,
    avatarUrl: mockProfile.avatarUrl,
    createdAt: mockProfile.createdAt,
    updatedAt: new Date().toISOString(),
    ...input,
  };
}

function buildSettingsRecord(input: SettingsInput): SettingsRecord {
  return {
    userId: mockAuthUser.id,
    createdAt: mockSettings.createdAt,
    updatedAt: new Date().toISOString(),
    ...input,
  };
}

function buildPantryRecords(inputs: PantryItemInput[]): PantryItemRecord[] {
  return inputs.map((item, index) => {
    const existing = mockPantryItems[index];
    return {
      id:
        existing?.id ??
        `pantry_demo_${index}_${item.normalizedName.replaceAll(" ", "_").slice(0, 24)}`,
      userId: mockAuthUser.id,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...item,
    };
  });
}

export async function readProfileInput(): Promise<ProfileInput> {
  return readJsonCookie(cookieKeys.profile, profileInputSchema, fallbackProfileInput());
}

export async function readSettingsInput(): Promise<SettingsInput> {
  return readJsonCookie(cookieKeys.settings, settingsInputSchema, fallbackSettingsInput());
}

export async function readPantryInputs(): Promise<PantryItemInput[]> {
  return readJsonCookie(cookieKeys.pantry, pantryCookieSchema, fallbackPantryInputs());
}

export async function readOnboardingMode(): Promise<OnboardingDraft["setupMode"]> {
  return readStringCookie(
    cookieKeys.onboardingMode,
    onboardingModeSchema,
    mockOnboardingDraft.setupMode,
  );
}

export async function persistProfileInput(input: ProfileInput) {
  const store = await cookies();
  store.set(cookieKeys.profile, JSON.stringify(input), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function persistSettingsInput(input: SettingsInput) {
  const store = await cookies();
  store.set(cookieKeys.settings, JSON.stringify(input), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function persistPantryInputs(inputs: PantryItemInput[]) {
  const store = await cookies();
  store.set(cookieKeys.pantry, JSON.stringify(inputs), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function persistOnboardingMode(mode: OnboardingDraft["setupMode"]) {
  const store = await cookies();
  store.set(cookieKeys.onboardingMode, mode, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function appendPantryInput(input: PantryItemInput) {
  const current = await readPantryInputs();
  await persistPantryInputs([...current, input]);
}

export async function clearPantryInputs() {
  const store = await cookies();
  store.delete(cookieKeys.pantry);
}

export async function getPlannerPantrySnapshot(): Promise<PlannerPantryItemInput[]> {
  const pantryItems = await readPantryInputs();

  return pantryItems.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    unit: item.unit === "bags" ? "piece" : item.unit,
    category: pantryCategoryMap[item.category],
    expiresOn: item.expiresOn ?? undefined,
    source: item.source,
  }));
}

async function getDemoMealPlansFor(
  profile: ProfileRecord,
): Promise<{ pantryPlan: MealPlan; budgetPlan: MealPlan }> {
  const pantrySnapshot = await getPlannerPantrySnapshot();

  const commonInput = {
    userId: mockAuthUser.id,
    goal: profile.goal,
    pantrySnapshot,
    dietaryPreferences: profile.dietaryTags,
    allergies: profile.allergies,
    dislikedFoods: profile.dislikedFoods,
    mealsPerDay: profile.mealsPerDay === 4 ? 4 : 3,
    maxCookingTimeMinutes: profile.maxCookingTimeMin,
    preferredCuisines: profile.cuisinePreferences,
    weekStartDate: "2026-03-23",
  } as const;

  const pantryPlan = generateMealPlan({
    ...commonInput,
    mode: "pantry",
    targetCalories: 2050,
    budgetAmount: profile.budgetAmount ?? 78,
    budgetPeriod: profile.budgetPeriod === "daily" ? "day" : "week",
  });

  const budgetPlan = generateMealPlan({
    ...commonInput,
    mode: "budget",
    targetCalories: 2100,
    budgetAmount: profile.budgetAmount ?? 70,
    budgetPeriod: profile.budgetPeriod === "daily" ? "day" : "week",
  });

  return { pantryPlan, budgetPlan };
}

async function getDemoWorkoutPlanFor(profile: ProfileRecord): Promise<WorkoutPlan> {
  const equipment = profile.availableWorkoutEquipment
    .map((item) => (item in equipmentMap ? equipmentMap[item] : undefined))
    .filter((item): item is WorkoutEquipment => Boolean(item));

  return generateWorkoutPlan({
    userId: mockAuthUser.id,
    goal: profile.goal,
    level: "intermediate",
    location: "home",
    equipment,
    daysPerWeek: Math.max(1, profile.preferredWorkoutDays.length),
    preferredDays: profile.preferredWorkoutDays,
    sessionLengthMin: 45,
    weekStartDate: "2026-03-23",
  });
}

export async function getDashboardState() {
  const [profileInput, settingsInput, pantryInputs, onboardingMode] = await Promise.all([
    readProfileInput(),
    readSettingsInput(),
    readPantryInputs(),
    readOnboardingMode(),
  ]);

  const profile = buildProfileRecord(profileInput);
  const settings = buildSettingsRecord(settingsInput);
  const pantryItems = buildPantryRecords(pantryInputs);
  const onboardingDraft: OnboardingDraft = {
    setupMode: onboardingMode,
    profile: profileInput,
    pantryItems,
  };

  const [{ pantryPlan, budgetPlan }, workoutPlan] = await Promise.all([
    getDemoMealPlansFor(profile),
    getDemoWorkoutPlanFor(profile),
  ]);

  return {
    authUser: mockAuthUser,
    profile,
    settings,
    pantryItems,
    onboardingDraft,
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
