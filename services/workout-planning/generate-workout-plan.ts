import { addDays, format, parseISO, startOfWeek } from "date-fns";
import { exerciseLibrary } from "../../data/exercises";
import type {
  ExerciseLibraryItem,
  MovementPattern,
  WorkoutDay,
  WorkoutDayKind,
  WorkoutEquipment,
  WorkoutExercise,
  WorkoutExerciseSubstitution,
  WorkoutGoal,
  WorkoutLevel,
  WorkoutLocation,
  WorkoutPlan,
  WorkoutPlanInput,
  WorkoutPlanSummary,
  WeeklySplitDay,
} from "./types";
import { workoutPlanInputSchema } from "./types";

const DEFAULT_WEEK_START = "2026-01-05";
const PLAN_VERSION = "2026.03.mock-1";

const defaultWorkoutIndices: Record<number, number[]> = {
  1: [0],
  2: [0, 3],
  3: [0, 2, 4],
  4: [0, 2, 4, 6],
  5: [0, 1, 3, 4, 6],
  6: [0, 1, 2, 4, 5, 6],
  7: [0, 1, 2, 3, 4, 5, 6],
};

const weekdayAliases: Record<string, number> = {
  sun: 0,
  sunday: 0,
  mon: 1,
  monday: 1,
  tue: 2,
  tues: 2,
  tuesday: 2,
  wed: 3,
  wednesday: 3,
  thu: 4,
  thur: 4,
  thurs: 4,
  thursday: 4,
  fri: 5,
  friday: 5,
  sat: 6,
  saturday: 6,
};

function normalizeWeekStart(value?: string) {
  if (!value) {
    return DEFAULT_WEEK_START;
  }

  const parsed = parseISO(value);
  if (Number.isNaN(parsed.getTime())) {
    return DEFAULT_WEEK_START;
  }

  return format(startOfWeek(parsed, { weekStartsOn: 1 }), "yyyy-MM-dd");
}

function clampWorkoutCount(daysPerWeek: number) {
  return Math.min(7, Math.max(1, daysPerWeek));
}

function resolvePreferredIndices(preferredDays: string[] | undefined) {
  if (!preferredDays?.length) {
    return [];
  }

  return preferredDays
    .map((day) => {
      const normalized = day.trim().toLowerCase();
      const matched = Object.entries(weekdayAliases).find(([label]) => normalized.startsWith(label));
      return matched?.[1];
    })
    .filter((value): value is number => typeof value === "number");
}

function selectWorkoutDayIndices(daysPerWeek: number, preferredDays?: string[]) {
  const count = clampWorkoutCount(daysPerWeek);
  const preferred = Array.from(new Set(resolvePreferredIndices(preferredDays)));
  const fallback = defaultWorkoutIndices[count];
  const merged = [...preferred, ...fallback].filter(
    (value, index, array) => array.indexOf(value) === index,
  );

  return merged.slice(0, count).sort((a, b) => a - b);
}

function buildWorkoutBlueprints(
  goal: WorkoutGoal,
  level: WorkoutLevel,
  workoutCount: number,
): MovementPattern[][] {
  const patterns: Record<WorkoutGoal, Record<WorkoutLevel, MovementPattern[][]>> = {
    fat_loss: {
      beginner: [["squat", "push", "pull", "core", "cardio"]],
      intermediate: [
        ["squat", "push", "pull", "core", "cardio"],
        ["hinge", "push", "pull", "carry"],
      ],
      advanced: [
        ["squat", "hinge", "push", "pull", "core", "cardio"],
        ["squat", "push", "pull", "carry"],
      ],
    },
    muscle_gain: {
      beginner: [
        ["squat", "push", "pull", "core"],
        ["hinge", "push", "pull", "core"],
      ],
      intermediate: [
        ["push", "pull", "squat", "hinge", "core"],
        ["squat", "push", "pull", "carry"],
      ],
      advanced: [
        ["push", "pull", "squat", "hinge", "core"],
        ["push", "pull", "carry", "core"],
      ],
    },
    maintenance: {
      beginner: [["squat", "push", "pull", "core"]],
      intermediate: [["squat", "push", "pull", "hinge", "core"]],
      advanced: [["squat", "hinge", "push", "pull", "carry", "core"]],
    },
    general_health: {
      beginner: [["squat", "push", "pull", "core", "cardio"]],
      intermediate: [["squat", "hinge", "push", "pull", "core", "cardio"]],
      advanced: [["squat", "hinge", "push", "pull", "carry", "core", "cardio"]],
    },
  };

  const base = patterns[goal][level];
  if (workoutCount <= base.length) {
    return base.slice(0, workoutCount);
  }

  return Array.from({ length: workoutCount }, (_, index) => base[index % base.length]);
}

function matchesLocation(exercise: ExerciseLibraryItem, location: WorkoutLocation) {
  return exercise.location === "both" || exercise.location === location;
}

function hasEquipment(exercise: ExerciseLibraryItem, equipment: WorkoutEquipment[]) {
  if (equipment.includes("full_gym")) {
    return true;
  }

  return exercise.requiredEquipment.every((item) => equipment.includes(item));
}

function matchesLimitations(exercise: ExerciseLibraryItem, limitations: string[]) {
  const text = `${exercise.name} ${exercise.description}`.toLowerCase();
  return limitations.every((limitation) => !text.includes(limitation.toLowerCase()));
}

function scoreExercise(
  exercise: ExerciseLibraryItem,
  input: WorkoutPlanInput,
  targetPattern: MovementPattern,
) {
  let score = 0;

  if (exercise.movementPattern === targetPattern) {
    score += 50;
  }

  if (exercise.idealLevels.includes(input.level)) {
    score += 18;
  }

  if (exercise.goalTags.includes(input.goal)) {
    score += 12;
  }

  if (exercise.location === "both" || exercise.location === input.location) {
    score += 12;
  }

  const equipmentMatchCount = exercise.requiredEquipment.filter((item) => input.equipment.includes(item)).length;
  score += equipmentMatchCount * 8;

  if (input.equipment.includes("full_gym")) {
    score += exercise.requiredEquipment.length > 1 ? 8 : 3;
  }

  score += Math.max(0, 10 - exercise.estimatedMinutes);
  return score;
}

function pickExercise(
  targetPattern: MovementPattern,
  input: WorkoutPlanInput,
  usedIds: Set<string>,
): ExerciseLibraryItem | undefined {
  const limitations = input.injuriesOrLimitations ?? [];

  const candidates = exerciseLibrary
    .filter((exercise) => exercise.movementPattern === targetPattern)
    .filter((exercise) => matchesLocation(exercise, input.location))
    .filter((exercise) => hasEquipment(exercise, input.equipment))
    .filter((exercise) => matchesLimitations(exercise, limitations))
    .filter((exercise) => !usedIds.has(exercise.id))
    .sort((a, b) => scoreExercise(b, input, targetPattern) - scoreExercise(a, input, targetPattern));

  return candidates[0];
}

function buildSubstitutions(
  exercise: ExerciseLibraryItem,
  input: WorkoutPlanInput,
): WorkoutExerciseSubstitution[] {
  const options = exerciseLibrary
    .filter((candidate) => candidate.id !== exercise.id)
    .filter((candidate) => candidate.movementPattern === exercise.movementPattern)
    .filter((candidate) => matchesLocation(candidate, input.location))
    .filter((candidate) => hasEquipment(candidate, input.equipment))
    .sort((a, b) => a.requiredEquipment.length - b.requiredEquipment.length || a.name.localeCompare(b.name));

  const fallbackIds = exercise.substitutions
    .map((id) => exerciseLibrary.find((item) => item.id === id))
    .filter((item): item is ExerciseLibraryItem => Boolean(item))
    .filter((candidate) => matchesLocation(candidate, input.location))
    .filter((candidate) => hasEquipment(candidate, input.equipment));

  const merged = [...options, ...fallbackIds].filter(
    (item, index, array) => array.findIndex((candidate) => candidate.id === item.id) === index,
  );

  return merged.slice(0, 3).map((candidate) => ({
    id: candidate.id,
    name: candidate.name,
    reason:
      candidate.movementPattern === exercise.movementPattern
        ? "Same movement pattern"
        : "Closest available substitution",
    requiredEquipment: candidate.requiredEquipment,
    movementPattern: candidate.movementPattern,
  }));
}

function createWorkoutExercise(
  exercise: ExerciseLibraryItem,
  input: WorkoutPlanInput,
): WorkoutExercise {
  const sets = input.level === "beginner" ? 3 : input.level === "intermediate" ? 4 : 5;
  const reps =
    exercise.movementPattern === "cardio"
      ? "8-12 min"
      : input.goal === "muscle_gain"
        ? "6-10"
        : "8-15";
  const restSeconds =
    exercise.movementPattern === "cardio" ? 30 : input.goal === "muscle_gain" ? 90 : 60;

  return {
    id: exercise.id,
    name: exercise.name,
    movementPattern: exercise.movementPattern,
    primaryMuscles: exercise.primaryMuscles,
    secondaryMuscles: exercise.secondaryMuscles,
    sets,
    reps,
    restSeconds,
    estimatedMinutes: exercise.estimatedMinutes,
    instructions: exercise.instructions,
    cues: exercise.cues,
    substitutions: buildSubstitutions(exercise, input),
    requiredEquipment: exercise.requiredEquipment,
    description: exercise.description,
  };
}

function buildWorkoutDay(
  dayTemplate: { kind: WorkoutDayKind; focus: string; targetPatterns: MovementPattern[] },
  date: string,
  input: WorkoutPlanInput,
  dayIndex: number,
): WorkoutDay {
  if (dayTemplate.kind === "rest") {
    return {
      index: dayIndex,
      date,
      kind: "rest",
      label: "Hồi phục",
      focus: dayTemplate.focus,
      targetPatterns: [],
      estimatedDurationMin: 20,
      exercises: [],
      notes: "Ưu tiên đi bộ nhẹ, giãn cơ và nghỉ ngơi để cơ thể hồi phục.",
    };
  }

  const usedIds = new Set<string>();
  const exercises = dayTemplate.targetPatterns
    .map((pattern) => pickExercise(pattern, input, usedIds))
    .filter((exercise): exercise is ExerciseLibraryItem => Boolean(exercise))
    .map((exercise) => {
      usedIds.add(exercise.id);
      return createWorkoutExercise(exercise, input);
    });

  const estimatedDurationMin =
    exercises.reduce((sum, exercise) => sum + exercise.estimatedMinutes, 0) + 10;

  return {
    index: dayIndex,
    date,
    kind: "workout",
    label: dayTemplate.focus,
    focus: dayTemplate.focus,
    targetPatterns: dayTemplate.targetPatterns,
    estimatedDurationMin: Math.min(input.sessionLengthMin, estimatedDurationMin),
    exercises,
    notes:
      input.goal === "fat_loss"
        ? "Giữ nhịp chuyển động đều, nghỉ ngắn và tập liền mạch."
        : "Tập chắc ở các hiệp chính và giữ thời gian nghỉ hợp lý.",
  };
}

function getSummary(days: WorkoutDay[]): WorkoutPlanSummary {
  const trainingDays = days.filter((day) => day.kind === "workout").length;
  const restDays = days.filter((day) => day.kind === "rest").length;
  const weeklyDurationMin = days.reduce((sum, day) => sum + day.estimatedDurationMin, 0);
  const targetPatterns = Array.from(new Set(days.flatMap((day) => day.targetPatterns)));
  const dominantEquipment =
    days
      .flatMap((day) => day.exercises.flatMap((exercise) => exercise.requiredEquipment))
      .sort((a, b) => a.localeCompare(b))[0] ?? "bodyweight";

  return {
    trainingDays,
    restDays,
    weeklyDurationMin,
    targetPatterns,
    dominantEquipment,
  };
}

function createWeeklySplit(
  input: WorkoutPlanInput,
  workoutIndices: number[],
  blueprints: MovementPattern[][],
): WeeklySplitDay[] {
  const split = Array.from({ length: 7 }, (_, index) => {
    const workoutPosition = workoutIndices.indexOf(index);
    if (workoutPosition === -1) {
      return {
        index,
        label: "Hồi phục",
        kind: "rest" as const,
        focus: "Hồi phục",
        targetPatterns: [],
      };
    }

    const targetPatterns: MovementPattern[] =
      blueprints[workoutPosition] ?? blueprints[blueprints.length - 1] ?? ["squat", "push", "pull", "core"];

    return {
      index,
      label: `Buổi ${workoutPosition + 1}`,
      kind: "workout" as const,
      focus:
        targetPatterns.includes("cardio")
          ? "Cardio"
          : targetPatterns.includes("hinge")
            ? "Chuỗi sau"
            : targetPatterns.includes("pull") && targetPatterns.includes("push")
              ? "Toàn thân"
              : targetPatterns.includes("push")
                ? "Đẩy thân trên"
                : "Buổi tập",
      targetPatterns,
    };
  });

  return split;
}

export function generateWorkoutPlan(rawInput: WorkoutPlanInput): WorkoutPlan {
  const input = workoutPlanInputSchema.parse(rawInput);
  const weekStartDate = normalizeWeekStart(input.weekStartDate);
  const workoutCount = clampWorkoutCount(input.daysPerWeek);
  const workoutIndices = selectWorkoutDayIndices(input.daysPerWeek, input.preferredDays);
  const blueprints = buildWorkoutBlueprints(input.goal, input.level, workoutCount);
  const weeklySplit = createWeeklySplit(input, workoutIndices, blueprints);
  const days = weeklySplit.map((template, index) =>
    buildWorkoutDay(
      template,
      format(addDays(parseISO(weekStartDate), index), "yyyy-MM-dd"),
      input,
      index,
    ),
  );
  const summary = getSummary(days);

  return {
    id: `workout-${input.userId}-${weekStartDate}`,
    userId: input.userId,
    goal: input.goal,
    level: input.level,
    location: input.location,
    equipment: input.equipment,
    daysPerWeek: input.daysPerWeek,
    sessionLengthMin: input.sessionLengthMin,
    weekStartDate,
    weeklySplit,
    days,
    metadata: {
      version: PLAN_VERSION,
      source: "deterministic-mock",
      generatedAt: weekStartDate,
      fallbackUsed: summary.trainingDays === 0,
      notes:
        summary.trainingDays === 0
          ? ["Không đủ điều kiện để tạo buổi tập phù hợp, hệ thống tạm chuyển sang lịch hồi phục."]
          : [],
    },
  };
}

export function getWorkoutPlanSummary(plan: WorkoutPlan): WorkoutPlanSummary {
  return getSummary(plan.days);
}

export function listAvailableExercises(input: WorkoutPlanInput) {
  const parsed = workoutPlanInputSchema.parse(input);

  return exerciseLibrary.filter((exercise) =>
    matchesLocation(exercise, parsed.location) &&
    hasEquipment(exercise, parsed.equipment) &&
    matchesLimitations(exercise, parsed.injuriesOrLimitations ?? []),
  );
}
