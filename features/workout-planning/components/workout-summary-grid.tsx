import type { WorkoutPlan, WorkoutPlanSummary } from "@/services/workout-planning";

interface WorkoutSummaryGridProps {
  plan: WorkoutPlan;
  summary: WorkoutPlanSummary;
}

export function WorkoutSummaryGrid({ plan, summary }: WorkoutSummaryGridProps) {
  const cards = [
    { label: "Muc tieu", value: plan.goal.replaceAll("_", " ") },
    { label: "Trinh do", value: plan.level },
    { label: "Ngay tap", value: String(summary.trainingDays) },
    { label: "Ngay nghi", value: String(summary.restDays) },
    { label: "Tong thoi luong tuan", value: `${summary.weeklyDurationMin} phut` },
    { label: "Thiet bi chinh", value: summary.dominantEquipment.replaceAll("_", " ") },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-[1.75rem] border border-black/5 bg-white/80 p-4 shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">{card.label}</p>
          <p className="mt-2 text-lg font-semibold tracking-tight text-zinc-950">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
