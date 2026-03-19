import { z } from "zod";

export const workoutGoalSchema = z.enum([
  "fat_loss",
  "muscle_gain",
  "maintenance",
  "general_health",
]);

export const workoutLevelSchema = z.enum([
  "beginner",
  "intermediate",
  "advanced",
]);

export const workoutLocationSchema = z.enum(["home", "gym"]);

export const workoutEquipmentSchema = z.enum([
  "bodyweight",
  "dumbbells",
  "resistance_bands",
  "bench",
  "barbell",
  "cable_machine",
  "leg_press",
  "treadmill",
  "full_gym",
]);

export const movementPatternSchema = z.enum([
  "squat",
  "hinge",
  "push",
  "pull",
  "carry",
  "core",
  "cardio",
]);

export const muscleGroupSchema = z.enum([
  "chest",
  "back",
  "shoulders",
  "upper_back",
  "rear_delts",
  "biceps",
  "triceps",
  "quads",
  "hamstrings",
  "glutes",
  "calves",
  "core",
  "hip_flexors",
  "grip",
  "cardio",
  "full_body",
]);

export const workoutDayKindSchema = z.enum(["workout", "rest"]);

export const workoutPlanInputSchema = z.object({
  userId: z.string().min(1),
  goal: workoutGoalSchema,
  level: workoutLevelSchema,
  location: workoutLocationSchema,
  equipment: z.array(workoutEquipmentSchema).default([]),
  daysPerWeek: z.number().int().min(1).max(7),
  sessionLengthMin: z.number().int().min(15).max(180),
  preferredDays: z.array(z.string().min(1)).optional(),
  injuriesOrLimitations: z.array(z.string().min(1)).optional(),
  weekStartDate: z.string().optional(),
});

export type WorkoutGoal = z.infer<typeof workoutGoalSchema>;
export type WorkoutLevel = z.infer<typeof workoutLevelSchema>;
export type WorkoutLocation = z.infer<typeof workoutLocationSchema>;
export type WorkoutEquipment = z.infer<typeof workoutEquipmentSchema>;
export type MovementPattern = z.infer<typeof movementPatternSchema>;
export type MuscleGroup = z.infer<typeof muscleGroupSchema>;
export type WorkoutDayKind = z.infer<typeof workoutDayKindSchema>;
export type WorkoutPlanInput = z.infer<typeof workoutPlanInputSchema>;

export interface ExerciseLibraryItem {
  id: string;
  name: string;
  movementPattern: MovementPattern;
  primaryMuscles: MuscleGroup[];
  secondaryMuscles: MuscleGroup[];
  location: WorkoutLocation | "both";
  requiredEquipment: WorkoutEquipment[];
  idealLevels: WorkoutLevel[];
  goalTags: WorkoutGoal[];
  description: string;
  instructions: string[];
  cues: string[];
  estimatedMinutes: number;
  substitutions: string[];
}

export interface WorkoutExercise {
  id: string;
  name: string;
  movementPattern: MovementPattern;
  primaryMuscles: MuscleGroup[];
  secondaryMuscles: MuscleGroup[];
  sets: number;
  reps: string;
  restSeconds: number;
  estimatedMinutes: number;
  instructions: string[];
  cues: string[];
  substitutions: WorkoutExerciseSubstitution[];
  requiredEquipment: WorkoutEquipment[];
  description: string;
}

export interface WorkoutExerciseSubstitution {
  id: string;
  name: string;
  reason: string;
  requiredEquipment: WorkoutEquipment[];
  movementPattern: MovementPattern;
}

export interface WorkoutDay {
  index: number;
  date: string;
  kind: WorkoutDayKind;
  label: string;
  focus: string;
  targetPatterns: MovementPattern[];
  estimatedDurationMin: number;
  exercises: WorkoutExercise[];
  notes: string;
}

export interface WeeklySplitDay {
  index: number;
  label: string;
  kind: WorkoutDayKind;
  focus: string;
  targetPatterns: MovementPattern[];
}

export interface WorkoutPlanMetadata {
  version: string;
  source: "deterministic-mock";
  generatedAt: string;
  fallbackUsed: boolean;
  notes: string[];
}

export interface WorkoutPlan {
  id: string;
  userId: string;
  goal: WorkoutGoal;
  level: WorkoutLevel;
  location: WorkoutLocation;
  equipment: WorkoutEquipment[];
  daysPerWeek: number;
  sessionLengthMin: number;
  weekStartDate: string;
  weeklySplit: WeeklySplitDay[];
  days: WorkoutDay[];
  metadata: WorkoutPlanMetadata;
}

export interface WorkoutPlanSummary {
  trainingDays: number;
  restDays: number;
  weeklyDurationMin: number;
  targetPatterns: MovementPattern[];
  dominantEquipment: string;
}
