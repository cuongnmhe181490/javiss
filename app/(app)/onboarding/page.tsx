import { saveOnboardingAction } from "@/app/(app)/actions";
import { GlassCard } from "@/components/shared/glass-card";
import { PageIntro } from "@/components/shared/page-intro";
import { OnboardingForm } from "@/features/onboarding";
import { getDashboardState } from "@/lib/demo-data";

export default async function OnboardingPage() {
  const { onboardingDraft } = await getDashboardState();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Onboarding"
        title="Thiết lập vài thông tin để bắt đầu."
        description="Chỉ cần mục tiêu, ngân sách và vài nguyên liệu cơ bản."
        primaryAction={{ label: "Đi tới tổng quan", href: "/dashboard" }}
        secondaryAction={{ label: "Xem hồ sơ", href: "/profile" }}
      >
        <GlassCard padding="md" className="grid gap-3">
          <div className="rounded-[1.15rem] border border-white/80 bg-white/78 px-4 py-3 text-sm text-muted-foreground dark:border-white/10 dark:bg-white/8">
            Thiết lập này sẽ được dùng ngay cho thực đơn và lịch tập.
          </div>
        </GlassCard>
      </PageIntro>

      <OnboardingForm initialValues={onboardingDraft} onSubmit={saveOnboardingAction} />
    </div>
  );
}
