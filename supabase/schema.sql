create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  user_id uuid generated always as (id) stored,
  display_name text not null,
  avatar_url text,
  age integer not null check (age between 13 and 120),
  sex text,
  height_cm numeric,
  weight_kg numeric,
  target_weight_kg numeric,
  goal text not null,
  activity_level text not null,
  meals_per_day integer not null default 3 check (meals_per_day between 1 and 8),
  max_cooking_time_min integer not null default 30 check (max_cooking_time_min between 5 and 240),
  budget_amount numeric,
  budget_period text,
  dietary_tags text[] not null default '{}',
  allergies text[] not null default '{}',
  disliked_foods text[] not null default '{}',
  cuisine_preferences text[] not null default '{}',
  available_workout_equipment text[] not null default '{}',
  preferred_workout_days text[] not null default '{}',
  location text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  theme text not null default 'light',
  measurement_system text not null default 'metric',
  notifications_enabled boolean not null default true,
  weekly_check_in_day text not null default 'sunday',
  tree_animation_enabled boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.pantry_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  normalized_name text not null,
  quantity numeric not null default 0 check (quantity >= 0),
  unit text not null,
  category text not null,
  expires_on date,
  source text not null default 'manual',
  is_estimated boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.pantry_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  pantry_item_id uuid references public.pantry_items(id) on delete set null,
  event_type text not null,
  delta_quantity numeric,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.generated_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_type text not null,
  mode text not null,
  input_snapshot jsonb not null default '{}'::jsonb,
  output_snapshot jsonb not null default '{}'::jsonb,
  status text not null default 'draft',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.user_streaks (
  user_id uuid primary key references auth.users(id) on delete cascade,
  current_streak integer not null default 0 check (current_streak >= 0),
  best_streak integer not null default 0 check (best_streak >= 0),
  last_completed_on date,
  weekly_score integer not null default 0 check (weekly_score >= 0),
  tree_stage text not null default 'seed',
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.completion_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  log_type text not null,
  reference_id uuid,
  completed_on date not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_settings_updated_at on public.settings;
create trigger set_settings_updated_at
before update on public.settings
for each row execute function public.set_updated_at();

drop trigger if exists set_pantry_items_updated_at on public.pantry_items;
create trigger set_pantry_items_updated_at
before update on public.pantry_items
for each row execute function public.set_updated_at();

drop trigger if exists set_generated_plans_updated_at on public.generated_plans;
create trigger set_generated_plans_updated_at
before update on public.generated_plans
for each row execute function public.set_updated_at();

drop trigger if exists set_user_streaks_updated_at on public.user_streaks;
create trigger set_user_streaks_updated_at
before update on public.user_streaks
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.settings enable row level security;
alter table public.pantry_items enable row level security;
alter table public.pantry_events enable row level security;
alter table public.generated_plans enable row level security;
alter table public.user_streaks enable row level security;
alter table public.completion_logs enable row level security;

create policy "profiles_select_own" on public.profiles
for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles
for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "settings_select_own" on public.settings
for select using (auth.uid() = user_id);
create policy "settings_insert_own" on public.settings
for insert with check (auth.uid() = user_id);
create policy "settings_update_own" on public.settings
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "pantry_items_select_own" on public.pantry_items
for select using (auth.uid() = user_id);
create policy "pantry_items_insert_own" on public.pantry_items
for insert with check (auth.uid() = user_id);
create policy "pantry_items_update_own" on public.pantry_items
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "pantry_items_delete_own" on public.pantry_items
for delete using (auth.uid() = user_id);

create policy "pantry_events_select_own" on public.pantry_events
for select using (auth.uid() = user_id);
create policy "pantry_events_insert_own" on public.pantry_events
for insert with check (auth.uid() = user_id);

create policy "generated_plans_select_own" on public.generated_plans
for select using (auth.uid() = user_id);
create policy "generated_plans_insert_own" on public.generated_plans
for insert with check (auth.uid() = user_id);
create policy "generated_plans_update_own" on public.generated_plans
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "user_streaks_select_own" on public.user_streaks
for select using (auth.uid() = user_id);
create policy "user_streaks_insert_own" on public.user_streaks
for insert with check (auth.uid() = user_id);
create policy "user_streaks_update_own" on public.user_streaks
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "completion_logs_select_own" on public.completion_logs
for select using (auth.uid() = user_id);
create policy "completion_logs_insert_own" on public.completion_logs
for insert with check (auth.uid() = user_id);

create index if not exists pantry_items_user_normalized_idx
  on public.pantry_items(user_id, normalized_name);

create index if not exists pantry_items_user_category_idx
  on public.pantry_items(user_id, category);

create index if not exists generated_plans_user_plan_created_idx
  on public.generated_plans(user_id, plan_type, created_at desc);

create index if not exists pantry_events_user_created_idx
  on public.pantry_events(user_id, created_at desc);

create index if not exists completion_logs_user_completed_idx
  on public.completion_logs(user_id, completed_on desc);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    display_name,
    age,
    goal,
    activity_level,
    meals_per_day,
    max_cooking_time_min,
    dietary_tags,
    allergies,
    disliked_foods,
    cuisine_preferences,
    available_workout_equipment,
    preferred_workout_days
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    coalesce((new.raw_user_meta_data->>'age')::integer, 30),
    coalesce(new.raw_user_meta_data->>'goal', 'general_health'),
    coalesce(new.raw_user_meta_data->>'activity_level', 'moderately_active'),
    coalesce((new.raw_user_meta_data->>'meals_per_day')::integer, 3),
    coalesce((new.raw_user_meta_data->>'max_cooking_time_min')::integer, 30),
    coalesce(string_to_array(new.raw_user_meta_data->>'dietary_tags', ','), '{}'),
    coalesce(string_to_array(new.raw_user_meta_data->>'allergies', ','), '{}'),
    coalesce(string_to_array(new.raw_user_meta_data->>'disliked_foods', ','), '{}'),
    coalesce(string_to_array(new.raw_user_meta_data->>'cuisine_preferences', ','), '{}'),
    coalesce(string_to_array(new.raw_user_meta_data->>'available_workout_equipment', ','), '{}'),
    coalesce(string_to_array(new.raw_user_meta_data->>'preferred_workout_days', ','), '{}')
  );

  insert into public.settings (user_id) values (new.id);
  insert into public.user_streaks (user_id) values (new.id);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
