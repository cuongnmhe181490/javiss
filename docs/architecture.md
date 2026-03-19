# Javiss Architecture

## 1. Product Summary
Javiss is a personalized healthy lifestyle web app that helps users plan meals, plan workouts, manage pantry inventory, stay within budget, generate shopping lists, and build healthy consistency through streaks and elegant tree-growth gamification.

## 2. Assumptions
- The first production scaffold uses deterministic mock recommendation services rather than a live AI provider.
- Supabase Auth and Postgres are the long-term source of truth for identity and user-owned data.
- The first implementation should work well without secrets configured by using mock data and graceful fallbacks.
- All generated outputs are strongly typed and validated before rendering.
- Meal and workout planning are generated weekly and saved as immutable snapshots.
- Shopping lists are derived from a saved meal plan plus current pantry state.
- The app targets mobile first, then expands into a denser desktop dashboard.
- The initial auth flow supports email-based sign-in first, with social providers deferred.

## 3. Architecture

### Frontend
- Next.js App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui primitives
- Framer Motion for measured transitions

### Domains
- `auth`
- `onboarding`
- `profile`
- `pantry`
- `meal-planning`
- `shopping-list`
- `workout-planning`
- `gamification`
- `dashboard`
- `settings`

### Folder Strategy
- `app/`: route composition and server boundaries
- `components/`: shared visual primitives and layout
- `features/`: domain-specific UI modules
- `services/`: deterministic business logic and generation engines
- `types/`: cross-domain contracts
- `lib/`: shared infrastructure, validation, and utilities
- `data/`: mock catalogs and fixtures
- `supabase/`: schema and policy SQL

### AI Strategy
- Structured inputs drive workflows.
- Deterministic planners own plan assembly.
- AI is an optional provider behind interfaces for recipe enrichment, substitutions, or sparse catalog gaps.
- Provider metadata is designed to fit later without changing the UI contracts.

## 4. Database Schema

### `profiles`
- `id uuid primary key references auth.users(id)`
- `display_name text`
- `avatar_url text`
- `age int`
- `sex text null`
- `height_cm numeric`
- `weight_kg numeric`
- `target_weight_kg numeric`
- `goal text`
- `activity_level text`
- `dietary_tags text[]`
- `allergies text[]`
- `disliked_foods text[]`
- `budget_amount numeric`
- `budget_period text`
- `max_cooking_time_min int`
- `meals_per_day int`
- `preferred_workout_days text[]`
- `available_equipment text[]`
- `created_at timestamptz`
- `updated_at timestamptz`

### `settings`
- `user_id uuid primary key`
- `measurement_system text`
- `notifications_enabled boolean`
- `weekly_check_in_day text`
- `tree_animation_enabled boolean`
- `created_at timestamptz`
- `updated_at timestamptz`

### `pantry_items`
- `id uuid primary key`
- `user_id uuid`
- `name text`
- `normalized_name text`
- `category text`
- `quantity numeric`
- `unit text`
- `is_estimated boolean`
- `expires_on date null`
- `source text`
- `created_at timestamptz`
- `updated_at timestamptz`

### `pantry_events`
- `id uuid primary key`
- `user_id uuid`
- `pantry_item_id uuid null`
- `event_type text`
- `delta_quantity numeric null`
- `payload jsonb`
- `created_at timestamptz`

### `generated_plans`
- `id uuid primary key`
- `user_id uuid`
- `plan_type text`
- `mode text`
- `input_snapshot jsonb`
- `output_snapshot jsonb`
- `status text`
- `created_at timestamptz`
- `updated_at timestamptz`

### `user_streaks`
- `user_id uuid primary key`
- `current_streak int`
- `best_streak int`
- `last_completed_on date`
- `weekly_score int`
- `tree_stage text`
- `updated_at timestamptz`

### `completion_logs`
- `id uuid primary key`
- `user_id uuid`
- `log_type text`
- `reference_id uuid null`
- `completed_on date`
- `payload jsonb`
- `created_at timestamptz`

## 5. Route Map
- `/`: marketing landing page
- `/auth/sign-in`: sign-in
- `/auth/sign-up`: account creation
- `/onboarding`: first-run profile setup
- `/dashboard`: daily overview and progress
- `/pantry`: pantry inventory management
- `/meal-planning`: planning hub and mode selector
- `/meal-planning/pantry`: pantry-based planning flow
- `/meal-planning/budget`: budget-based planning flow
- `/meal-planning/[planId]`: weekly meal plan detail
- `/shopping-list`: aggregated shopping list
- `/workout-planning`: workout planner
- `/workout-planning/[planId]`: workout plan detail
- `/profile`: persistent goals and preferences
- `/settings`: account and app settings

## 6. Component Map

### Shared
- `AppShell`
- `GlassCard`
- `PageIntro`
- `MetricCard`
- `EmptyState`
- `SectionHeader`
- `StickyActionBar`

### Marketing
- `HeroSection`
- `FeatureBand`
- `JourneyTimeline`

### Dashboard
- `DailySummaryPanel`
- `TreeProgress`
- `QuickActionsGrid`
- `WeeklyScoreCard`

### Meal Planning
- `MealPlannerForm`
- `MealPlanBoard`
- `RecipeDrawer`
- `NutritionSummaryCard`

### Shopping List
- `ShoppingListBoard`
- `ShoppingCategoryGroup`
- `PantryReconciliationCard`

### Workout Planning
- `WorkoutPlannerForm`
- `WorkoutPlanBoard`
- `ExerciseListCard`

### Profile and Onboarding
- `ProfileForm`
- `PreferencesPanel`
- `PantryEditor`

## 7. Agent Task Breakdown
- Lead Architect: route composition, architecture, integration, docs, final consistency
- UI / Design: theme tokens, layout shell, shared visual components, motion patterns
- Meal Planning: recipes, meal plan generator, shopping list aggregation, reconciliation
- Workout Planning: exercise catalog, workout planner, substitutions, plan rendering
- Data / Auth / Persistence: domain types, validation, mock user data, Supabase scaffolding
- QA / Integration: lint, typecheck, tests, responsive and route smoke checks

## 8. Implementation Plan

### Phase 1: Planning
- Lock assumptions, routes, schema, and ownership.

### Phase 2: Scaffolding
- Initialize Next.js app.
- Add design system dependencies.
- Create route structure and shared app shell.
- Add domain folders, typed contracts, mock data, and Supabase scaffolding.

### Phase 3: Core Features
- Onboarding and profile preferences
- Pantry management
- Pantry and budget meal planning
- Shopping list and reconciliation
- Workout planning
- Dashboard and gamification panels

### Phase 4: Integration
- Connect domain outputs into the dashboard
- Ensure pantry updates affect shopping list results
- Ensure profile preferences influence generated plans

### Phase 5: QA and Refinement
- Typecheck
- Lint
- Add unit coverage for planners
- Improve loading, error, and empty states
- Prepare git push and Vercel deployment
