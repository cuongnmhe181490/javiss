import { z } from "zod";

import { onboardingDraftSchema } from "@/lib/validation/onboarding";

export type OnboardingDraft = z.infer<typeof onboardingDraftSchema>;

export interface OnboardingState {
  completed: boolean;
  step: "profile" | "preferences" | "pantry" | "finish";
  draft: OnboardingDraft;
}
