import { PageIntro } from "@/components/shared/page-intro";
import { WorkoutPlanView } from "@/features/workout-planning";
import { getDashboardState } from "@/lib/demo-data";

export default async function WorkoutPlanningPage() {
  const { workoutPlan } = await getDashboardState();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Lập kế hoạch tập luyện"
        title="Tạo lịch tập theo thiết bị và lịch cá nhân."
        description="Lịch tập được chia theo ngày, thời lượng và độ phù hợp."
        primaryAction={{ label: "Xem lịch tập", href: "/workout-planning/current" }}
        secondaryAction={{ label: "Mở tổng quan", href: "/dashboard" }}
      />
      <WorkoutPlanView plan={workoutPlan} />
    </div>
  );
}
