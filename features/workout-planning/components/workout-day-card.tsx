import { CalendarDays, MoonStar, TimerReset } from "lucide-react";

import { workoutKindLabels } from "@/lib/display";
import type { WorkoutDay } from "@/services/workout-planning";
import { WorkoutExerciseRow } from "./workout-exercise-row";

interface WorkoutDayCardProps {
  day: WorkoutDay;
}

export function WorkoutDayCard({ day }: WorkoutDayCardProps) {
  const isRest = day.kind === "rest";

  return (
    <section className="interactive-card rounded-[2rem] border border-black/5 bg-white/90 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm dark:border-white/10 dark:bg-white/6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            <CalendarDays className="h-4 w-4" />
            Ngày {day.index + 1}
          </div>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            {day.label}
          </h3>
          <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{day.focus}</p>
        </div>
        <div className="rounded-2xl bg-zinc-100/90 px-4 py-3 text-right dark:bg-white/10">
          <div className="flex items-center gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-100">
            <TimerReset className="h-4 w-4" />
            {day.estimatedDurationMin} phút
          </div>
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
            {workoutKindLabels[day.kind]}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{day.notes}</p>

      {isRest ? (
        <div className="mt-5 rounded-3xl bg-sky-50 p-4 text-sm text-sky-950 dark:bg-white/8 dark:text-zinc-100">
          <div className="flex items-center gap-2 font-semibold">
            <MoonStar className="h-4 w-4" />
            Ngày hồi phục
          </div>
          <p className="mt-2">Dành thời gian đi bộ, giãn cơ hoặc nghỉ ngơi nhẹ.</p>
        </div>
      ) : (
        <div className="mt-5 grid gap-4">
          {day.exercises.map((exercise) => (
            <WorkoutExerciseRow key={exercise.id} exercise={exercise} />
          ))}
        </div>
      )}
    </section>
  );
}
