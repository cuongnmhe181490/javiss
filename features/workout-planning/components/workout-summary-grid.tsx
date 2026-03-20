import { equipmentLabels, labelForGoal, workoutLevelLabels } from "@/lib/display";
import type { WorkoutPlan, WorkoutPlanSummary } from "@/services/workout-planning";

interface WorkoutSummaryGridProps {
  plan: WorkoutPlan;
  summary: WorkoutPlanSummary;
}

export function WorkoutSummaryGrid({ plan, summary }: WorkoutSummaryGridProps) {
  const cards = [
    { label: "Mục tiêu", value: labelForGoal(plan.goal) },
    { label: "Trình độ", value: workoutLevelLabels[plan.level] },
    { label: "Ngày tập", value: String(summary.trainingDays) },
    { label: "Ngày nghỉ", value: String(summary.restDays) },
    { label: "Tổng thời lượng", value: `${summary.weeklyDurationMin} phút` },
    {
      label: "Thiết bị chính",
      value:
        equipmentLabels[
          (summary.dominantEquipment === "full_gym" ? "full_gym_equipment" : summary.dominantEquipment) as keyof typeof equipmentLabels
        ] ?? summary.dominantEquipment,
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="interactive-card rounded-[1.75rem] border border-black/5 bg-white/80 p-4 shadow-[0_12px_40px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/6"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">{card.label}</p>
          <p className="mt-2 text-lg font-semibold tracking-tight text-zinc-950 dark:text-white">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
