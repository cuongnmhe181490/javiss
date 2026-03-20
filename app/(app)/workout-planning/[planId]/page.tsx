import { PageIntro } from "@/components/shared/page-intro";
import { WorkoutPlanView } from "@/features/workout-planning";
import { getDashboardState } from "@/lib/demo-data";

export default async function WorkoutPlanDetailPage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  await params;
  const { workoutPlan, settings } = await getDashboardState();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Chi tiết lịch tập"
        title="Lịch tập tuần hiện tại"
        description="Xem từng buổi, bài tập thay thế và hướng dẫn rõ ràng cho mỗi ngày."
        primaryAction={{ label: "Quay lại lịch tập", href: "/workout-planning" }}
        secondaryAction={{ label: "Tổng quan", href: "/dashboard" }}
      />
      <WorkoutPlanView plan={workoutPlan} language={settings.language} />
    </div>
  );
}
