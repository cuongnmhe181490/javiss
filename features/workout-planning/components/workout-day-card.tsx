import { CalendarDays, MoonStar, TimerReset } from "lucide-react";
import type { WorkoutDay } from "@/services/workout-planning";
import { WorkoutExerciseRow } from "./workout-exercise-row";

interface WorkoutDayCardProps {
  day: WorkoutDay;
}

export function WorkoutDayCard({ day }: WorkoutDayCardProps) {
  const isRest = day.kind === "rest";

  return (
    <section className="rounded-[2rem] border border-black/5 bg-white/90 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            <CalendarDays className="h-4 w-4" />
            Ngay {day.index + 1}
          </div>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-zinc-950">{day.label}</h3>
          <p className="mt-1 text-sm text-zinc-600">{day.focus}</p>
        </div>
        <div className="rounded-2xl bg-zinc-100/80 px-4 py-3 text-right">
          <div className="flex items-center gap-2 text-sm font-medium text-zinc-700">
            <TimerReset className="h-4 w-4" />
            {day.estimatedDurationMin} phut
          </div>
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-500">{day.kind}</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-zinc-600">{day.notes}</p>

      {isRest ? (
        <div className="mt-5 rounded-3xl bg-sky-50 p-4 text-sm text-sky-950">
          <div className="flex items-center gap-2 font-semibold">
            <MoonStar className="h-4 w-4" />
            Ngay hoi phuc
          </div>
          <p className="mt-2">
            Tan dung thoi gian nay de di bo, gian co, ngu du va them van dong nhe neu phu hop.
          </p>
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
