import { PageIntro } from "@/components/shared/page-intro";
import { WorkoutPlanView } from "@/features/workout-planning";
import { getDashboardState } from "@/lib/demo-data";

export default function WorkoutPlanningPage() {
  const { workoutPlan } = getDashboardState();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Workout planning"
        title="Generate weekly training around equipment, location, and schedule."
        description="The workout planner uses a typed exercise library, movement-pattern coverage, preferred days, and substitution logic so home and gym plans stay realistic."
        primaryAction={{ label: "View workout detail", href: "/workout-planning/current" }}
        secondaryAction={{ label: "Open dashboard", href: "/dashboard" }}
      />
      <WorkoutPlanView plan={workoutPlan} />
    </div>
  );
}
