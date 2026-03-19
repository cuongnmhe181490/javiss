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
        title="Thu thap cac rang buoc de goi y tro nen huu ich."
        description="Luong nay da duoc dung khung cho onboarding co persistence. Ban nhap hien tai duoc khoi tao tu profile va pantry mock thuc te de cac phan con lai cua app co the su dung ngay."
        primaryAction={{ label: "Tiep tuc den tong quan", href: "/dashboard" }}
        secondaryAction={{ label: "Xem ho so", href: "/profile" }}
      >
        <GlassCard padding="md" className="grid gap-3">
          <div className="rounded-[1.15rem] border border-white/80 bg-white/78 px-4 py-3 text-sm text-muted-foreground">
            Form da co validation va san sang noi vao server actions khi credential Supabase duoc cau hinh.
          </div>
        </GlassCard>
      </PageIntro>

      <OnboardingForm initialValues={onboardingDraft} onSubmit={saveOnboardingAction} />
    </div>
  );
}
