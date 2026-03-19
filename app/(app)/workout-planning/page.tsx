import { PageIntro } from "@/components/shared/page-intro";
import { WorkoutPlanView } from "@/features/workout-planning";
import { getDashboardState } from "@/lib/demo-data";

export default async function WorkoutPlanningPage() {
  const { workoutPlan } = await getDashboardState();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Lap ke hoach tap luyen"
        title="Tao lich tap theo thiet bi, dia diem va lich ca nhan."
        description="Bo lap ke hoach tap dung thu vien bai tap co typing, do phu movement pattern, ngay tap uu tien va logic thay the de lich tap o nha hay phong gym van thuc te."
        primaryAction={{ label: "Xem chi tiet lich tap", href: "/workout-planning/current" }}
        secondaryAction={{ label: "Mo tong quan", href: "/dashboard" }}
      />
      <WorkoutPlanView plan={workoutPlan} />
    </div>
  );
}
