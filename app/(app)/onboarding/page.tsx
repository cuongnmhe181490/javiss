import { GlassCard } from "@/components/shared/glass-card";
import { PageIntro } from "@/components/shared/page-intro";
import { OnboardingForm } from "@/features/onboarding";
import { saveOnboardingAction } from "@/app/(app)/actions";
import { getDashboardState } from "@/lib/demo-data";

export default async function OnboardingPage() {
  const { onboardingDraft } = await getDashboardState();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Onboarding"
        title="Capture the constraints that make recommendations useful."
        description="This flow is scaffolded for persistent onboarding. The current draft is seeded from realistic mock profile and pantry data so the rest of the app can already consume it."
        primaryAction={{ label: "Continue to dashboard", href: "/dashboard" }}
        secondaryAction={{ label: "Review profile", href: "/profile" }}
      >
        <GlassCard padding="md" className="grid gap-3">
          <div className="rounded-[1.15rem] border border-white/80 bg-white/78 px-4 py-3 text-sm text-muted-foreground">
            The form is validation-backed and ready to connect to server actions once Supabase credentials are configured.
          </div>
        </GlassCard>
      </PageIntro>

      <OnboardingForm initialValues={onboardingDraft} onSubmit={saveOnboardingAction} />
    </div>
  );
}
