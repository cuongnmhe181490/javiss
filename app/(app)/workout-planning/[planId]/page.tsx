import { PageIntro } from "@/components/shared/page-intro";
import { WorkoutPlanView } from "@/features/workout-planning";
import { getDashboardState } from "@/lib/demo-data";

export default async function WorkoutPlanDetailPage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  await params;
  const { workoutPlan } = await getDashboardState();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Chi tiet lich tap"
        title="Lich tap hang tuan hien tai"
        description="Route lich tap dong da tra ve day du lich tuan co typing, chi tiet bai tap va cac phuong an thay the cho tung buoi."
        primaryAction={{ label: "Quay lai lich tap", href: "/workout-planning" }}
        secondaryAction={{ label: "Tong quan", href: "/dashboard" }}
      />
      <WorkoutPlanView plan={workoutPlan} />
    </div>
  );
}
