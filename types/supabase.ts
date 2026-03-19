export interface GeneratedPlanRecord {
  id: string;
  userId: string;
  planType: "meal" | "workout";
  mode: "pantry" | "budget" | "goal_based";
  inputSnapshot: Record<string, unknown>;
  outputSnapshot: Record<string, unknown>;
  status: "draft" | "active" | "archived";
  createdAt: string;
  updatedAt: string;
}

export interface UserStreakRecord {
  userId: string;
  currentStreak: number;
  bestStreak: number;
  lastCompletedOn: string | null;
  weeklyScore: number;
  treeStage: "seed" | "sprout" | "young_tree" | "mature_tree" | "flowering_tree";
  updatedAt: string;
}

export interface CompletionLogRecord {
  id: string;
  userId: string;
  logType: "meal_completed" | "workout_completed" | "check_in";
  referenceId: string | null;
  completedOn: string;
  payload: Record<string, unknown>;
  createdAt: string;
}

export type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
export interface JsonObject {
  [key: string]: JsonValue;
}

export interface ProfileRow {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  age: number;
  sex: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  target_weight_kg: number | null;
  goal: string;
  activity_level: string;
  meals_per_day: number;
  max_cooking_time_min: number;
  budget_amount: number | null;
  budget_period: string | null;
  dietary_tags: string[];
  allergies: string[];
  disliked_foods: string[];
  cuisine_preferences: string[];
  available_workout_equipment: string[];
  preferred_workout_days: string[];
  location: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfileInsertRow {
  id: string;
  display_name: string;
  avatar_url?: string | null;
  age: number;
  sex?: string | null;
  height_cm?: number | null;
  weight_kg?: number | null;
  target_weight_kg?: number | null;
  goal: string;
  activity_level: string;
  meals_per_day?: number;
  max_cooking_time_min?: number;
  budget_amount?: number | null;
  budget_period?: string | null;
  dietary_tags?: string[];
  allergies?: string[];
  disliked_foods?: string[];
  cuisine_preferences?: string[];
  available_workout_equipment?: string[];
  preferred_workout_days?: string[];
  location?: string | null;
}

export interface ProfileUpdateRow {
  display_name?: string;
  avatar_url?: string | null;
  age?: number;
  sex?: string | null;
  height_cm?: number | null;
  weight_kg?: number | null;
  target_weight_kg?: number | null;
  goal?: string;
  activity_level?: string;
  meals_per_day?: number;
  max_cooking_time_min?: number;
  budget_amount?: number | null;
  budget_period?: string | null;
  dietary_tags?: string[];
  allergies?: string[];
  disliked_foods?: string[];
  cuisine_preferences?: string[];
  available_workout_equipment?: string[];
  preferred_workout_days?: string[];
  location?: string | null;
}

export interface SettingsRow {
  user_id: string;
  theme: "light" | "system";
  measurement_system: "metric" | "imperial";
  notifications_enabled: boolean;
  weekly_check_in_day: string;
  tree_animation_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export type SettingsInsertRow = SettingsRow;

export type SettingsUpdateRow = Partial<SettingsRow>;

export interface PantryItemRow {
  id: string;
  user_id: string;
  name: string;
  normalized_name: string;
  quantity: number;
  unit: string;
  category: string;
  expires_on: string | null;
  source: string;
  is_estimated: boolean;
  created_at: string;
  updated_at: string;
}

export interface PantryItemInsertRow {
  user_id: string;
  name: string;
  normalized_name: string;
  quantity: number;
  unit: string;
  category: string;
  expires_on?: string | null;
  source?: string;
  is_estimated?: boolean;
}

export type PantryItemUpdateRow = Partial<PantryItemInsertRow>;

export interface PantryEventRow {
  id: string;
  user_id: string;
  pantry_item_id: string | null;
  event_type: string;
  delta_quantity: number | null;
  payload: JsonObject;
  created_at: string;
}

export interface PantryEventInsertRow {
  user_id: string;
  pantry_item_id?: string | null;
  event_type: string;
  delta_quantity?: number | null;
  payload?: JsonObject;
}

export type PantryEventUpdateRow = Partial<PantryEventInsertRow>;

export interface GeneratedPlanRow {
  id: string;
  user_id: string;
  plan_type: "meal" | "workout";
  mode: "pantry" | "budget" | "goal_based";
  input_snapshot: JsonObject;
  output_snapshot: JsonObject;
  status: "draft" | "active" | "archived";
  created_at: string;
  updated_at: string;
}

export interface GeneratedPlanInsertRow {
  user_id: string;
  plan_type: "meal" | "workout";
  mode: "pantry" | "budget" | "goal_based";
  input_snapshot?: JsonObject;
  output_snapshot?: JsonObject;
  status?: "draft" | "active" | "archived";
}

export type GeneratedPlanUpdateRow = Partial<GeneratedPlanInsertRow>;

export interface UserStreakRow {
  user_id: string;
  current_streak: number;
  best_streak: number;
  last_completed_on: string | null;
  weekly_score: number;
  tree_stage: "seed" | "sprout" | "young_tree" | "mature_tree" | "flowering_tree";
  updated_at: string;
}

export type UserStreakInsertRow = UserStreakRow;

export type UserStreakUpdateRow = Partial<UserStreakRow>;

export interface CompletionLogRow {
  id: string;
  user_id: string;
  log_type: "meal_completed" | "workout_completed" | "check_in";
  reference_id: string | null;
  completed_on: string;
  payload: JsonObject;
  created_at: string;
}

export interface CompletionLogInsertRow {
  user_id: string;
  log_type: "meal_completed" | "workout_completed" | "check_in";
  reference_id?: string | null;
  completed_on: string;
  payload?: JsonObject;
}

export type CompletionLogUpdateRow = Partial<CompletionLogInsertRow>;

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: ProfileInsertRow;
        Update: ProfileUpdateRow;
        Relationships: [];
      };
      settings: {
        Row: SettingsRow;
        Insert: SettingsInsertRow;
        Update: SettingsUpdateRow;
        Relationships: [];
      };
      pantry_items: {
        Row: PantryItemRow;
        Insert: PantryItemInsertRow;
        Update: PantryItemUpdateRow;
        Relationships: [];
      };
      pantry_events: {
        Row: PantryEventRow;
        Insert: PantryEventInsertRow;
        Update: PantryEventUpdateRow;
        Relationships: [];
      };
      generated_plans: {
        Row: GeneratedPlanRow;
        Insert: GeneratedPlanInsertRow;
        Update: GeneratedPlanUpdateRow;
        Relationships: [];
      };
      user_streaks: {
        Row: UserStreakRow;
        Insert: UserStreakInsertRow;
        Update: UserStreakUpdateRow;
        Relationships: [];
      };
      completion_logs: {
        Row: CompletionLogRow;
        Insert: CompletionLogInsertRow;
        Update: CompletionLogUpdateRow;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
