import { labelForGoal, workoutLevelLabels } from "@/lib/display";
import type { WorkoutPlan } from "@/services/workout-planning";
import { getWorkoutPlanSummary } from "@/services/workout-planning";
import { WorkoutDayCard } from "./workout-day-card";
import { WorkoutSummaryGrid } from "./workout-summary-grid";

interface WorkoutPlanViewProps {
  plan: WorkoutPlan;
}

export function WorkoutPlanView({ plan }: WorkoutPlanViewProps) {
  const summary = getWorkoutPlanSummary(plan);

  return (
    <div className="grid gap-6">
      <header className="glass-surface rounded-[2rem] p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-300">
          Lịch tập tuần
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
          Chương trình {labelForGoal(plan.goal)} cho mức {workoutLevelLabels[plan.level]}
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          Xem từng buổi tập, ngày hồi phục và tổng thời lượng trong tuần.
        </p>
      </header>

      <WorkoutSummaryGrid plan={plan} summary={summary} />

      <div className="grid gap-5">
        {plan.days.map((day) => (
          <WorkoutDayCard key={`${day.index}-${day.date}`} day={day} />
        ))}
      </div>
    </div>
  );
}
