import { BadgeCheck, Dumbbell } from "lucide-react";

import { equipmentLabels } from "@/lib/display";
import type { WorkoutExercise } from "@/services/workout-planning";

interface WorkoutExerciseRowProps {
  exercise: WorkoutExercise;
}

export function WorkoutExerciseRow({ exercise }: WorkoutExerciseRowProps) {
  return (
    <div className="interactive-card rounded-3xl border border-black/5 bg-white/80 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm dark:border-white/10 dark:bg-white/8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4 text-zinc-500" />
            <h4 className="text-sm font-semibold text-zinc-950 dark:text-white">{exercise.name}</h4>
          </div>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{exercise.description}</p>
        </div>
        <div className="text-right text-sm text-zinc-600 dark:text-zinc-300">
          <div>
            {exercise.sets} hiệp x {exercise.reps}
          </div>
          <div>Nghỉ {exercise.restSeconds} giây</div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Hướng dẫn</p>
          <ol className="mt-2 space-y-1 text-sm text-zinc-700 dark:text-zinc-200">
            {exercise.instructions.map((step) => (
              <li key={step} className="flex gap-2">
                <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-500" />
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Lưu ý</p>
          <ul className="mt-2 space-y-1 text-sm text-zinc-700 dark:text-zinc-200">
            {exercise.cues.map((cue) => (
              <li key={cue}>- {cue}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {exercise.requiredEquipment.map((item) => (
          <span
            key={item}
            className="interactive-chip rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-white/10 dark:text-white"
          >
            {equipmentLabels[
              (item === "full_gym" ? "full_gym_equipment" : item === "barbell" ? "barbells" : item === "cable_machine" ? "cable_machines" : item) as keyof typeof equipmentLabels
            ] ?? item}
          </span>
        ))}
      </div>

      {exercise.substitutions.length > 0 ? (
        <div className="mt-4 rounded-2xl bg-emerald-50/80 p-3 dark:bg-white/8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
            Bài thay thế
          </p>
          <div className="mt-2 flex flex-wrap gap-2 text-sm text-emerald-950 dark:text-white">
            {exercise.substitutions.map((substitution) => (
              <span key={substitution.id} className="rounded-full bg-white/80 px-3 py-1 dark:bg-white/12">
                {substitution.name}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
