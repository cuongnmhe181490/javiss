import { PageIntro } from "@/components/shared/page-intro";
import { WorkoutPlanView } from "@/features/workout-planning";
import { getDashboardState } from "@/lib/demo-data";

export default async function WorkoutPlanDetailPage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  await params;
  const { workoutPlan } = getDashboardState();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Workout detail"
        title="Current weekly workout plan"
        description="The dynamic workout route already resolves a typed weekly schedule, exercise details, and substitution options for each session."
        primaryAction={{ label: "Back to workouts", href: "/workout-planning" }}
        secondaryAction={{ label: "Dashboard", href: "/dashboard" }}
      />
      <WorkoutPlanView plan={workoutPlan} />
    </div>
  );
}
