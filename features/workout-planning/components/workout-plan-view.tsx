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
      <header className="rounded-[2rem] border border-black/5 bg-gradient-to-br from-white via-white to-emerald-50/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
          Lich tap hang tuan
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
          Chuong trinh {plan.goal.replaceAll("_", " ")} cho muc do {plan.level}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
          Ke hoach mock deterministic ton trong dia diem, thiet bi va thoi luong moi buoi, dong thoi du thuc te de nguoi dung co the ap dung.
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
