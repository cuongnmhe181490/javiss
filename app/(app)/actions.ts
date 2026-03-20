"use server";

import { revalidatePath } from "next/cache";

import {
  appendPantryInput,
  clearPantryInputs,
  persistOnboardingMode,
  persistPantryInputs,
  persistProfileInput,
  persistSettingsInput,
} from "@/lib/demo-data";
import { settingsInputSchema } from "@/lib/validation/settings";
import type { OnboardingDraft } from "@/types/onboarding";
import type { PantryItemInput } from "@/types/pantry";
import type { ProfileInput } from "@/types/profile";

function revalidateAppState() {
  [
    "/dashboard",
    "/onboarding",
    "/pantry",
    "/profile",
    "/settings",
    "/meal-planning",
    "/meal-planning/pantry",
    "/meal-planning/budget",
    "/shopping-list",
    "/workout-planning",
  ].forEach((path) => revalidatePath(path));
}

export async function saveProfileAction(input: ProfileInput) {
  await persistProfileInput(input);
  revalidateAppState();
}

export async function saveOnboardingAction(input: OnboardingDraft) {
  await persistOnboardingMode(input.setupMode);
  await persistProfileInput(input.profile);
  await persistPantryInputs(input.pantryItems);
  revalidateAppState();
}

export async function addPantryItemAction(input: PantryItemInput) {
  await appendPantryInput(input);
  revalidateAppState();
}

export async function clearPantryAction() {
  await clearPantryInputs();
  revalidateAppState();
}

export async function saveSettingsAction(formData: FormData) {
  const parsed = settingsInputSchema.parse({
    theme: formData.get("theme"),
    currency: formData.get("currency"),
    budgetModeDefault: formData.get("budgetModeDefault"),
    measurementSystem: formData.get("measurementSystem"),
    region: formData.get("region"),
    notificationsEnabled: formData.get("notificationsEnabled") === "on",
    weeklyCheckInDay: formData.get("weeklyCheckInDay"),
    treeAnimationEnabled: formData.get("treeAnimationEnabled") === "on",
  });

  await persistSettingsInput(parsed);
  revalidateAppState();
}
