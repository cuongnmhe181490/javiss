import Link from "next/link";
import {
  CalendarCheck2,
  ChefHat,
  ShoppingBasket,
  Target,
  Timer,
  Trees,
} from "lucide-react";

import { MetricCard } from "@/components/dashboard/metric-card";
import { TreeProgress } from "@/components/dashboard/tree-progress";
import { GlassCard } from "@/components/shared/glass-card";
import { PageIntro } from "@/components/shared/page-intro";
import { outlineLinkButtonClass } from "@/lib/button-link-styles";
import { getDashboardState } from "@/lib/demo-data";

export default async function DashboardPage() {
  const state = await getDashboardState();
  const todayMeals = state.pantryPlan.days[0].meals.slice(0, 3);
  const nextWorkout = state.workoutPlan.days.find((day) => day.kind === "workout");

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Dashboard"
        title={`Healthy momentum for ${state.profile.displayName}`}
        description="Meals, workouts, shopping, and consistency all read from the same structured mock profile so the architecture is ready for real persistence."
        primaryAction={{ label: "Plan from pantry", href: "/meal-planning/pantry" }}
        secondaryAction={{ label: "Review shopping list", href: "/shopping-list" }}
      >
        <GlassCard padding="md" className="grid gap-3">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Today at a glance
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.2rem] border border-white/80 bg-white/78 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Calories
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {Math.round(state.pantryPlan.days[0].dailyCalories)}
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-white/80 bg-white/78 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Workout
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {nextWorkout?.estimatedDurationMin ?? 20} min
              </p>
            </div>
          </div>
        </GlassCard>
      </PageIntro>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Current streak"
          value={`${state.streak.current} days`}
          detail="Meals and workouts completed this week are feeding the tree progression."
          delta={`Best ${state.streak.best}`}
          icon={Trees}
          accent="positive"
        />
        <MetricCard
          label="Weekly budget"
          value={`$${state.profile.budgetAmount}`}
          detail="Budget-aware planning keeps cost aligned with cooking time and macro goals."
          icon={Target}
        />
        <MetricCard
          label="Pantry coverage"
          value={`${state.pantryPlan.shoppingList.totals.pantryCoveredItems} items`}
          detail="Existing inventory is subtracted before the buy list is finalized."
          icon={ShoppingBasket}
        />
        <MetricCard
          label="Training week"
          value={`${state.workoutPlan.daysPerWeek} sessions`}
          detail="Equipment-aware sessions are distributed across preferred training days."
          icon={CalendarCheck2}
        />
      </section>

      <TreeProgress
        stage={state.streak.stage}
        streak={state.streak.current}
        bestStreak={state.streak.best}
        weeklyConsistency={state.streak.weeklyConsistency}
        progress={state.streak.progress}
      />

      <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <GlassCard padding="md">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Today&apos;s meals
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                Pantry-first schedule
              </h2>
            </div>
            <Link
              href="/meal-planning/pantry"
              className={outlineLinkButtonClass}
            >
              Open meal plan
            </Link>
          </div>
          <div className="mt-5 grid gap-3">
            {todayMeals.map((meal) => (
              <div
                key={meal.id}
                className="rounded-[1.25rem] border border-white/80 bg-white/74 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      {meal.mealType}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-foreground">{meal.name}</h3>
                  </div>
                  <ChefHat className="size-5 text-emerald-700" />
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{meal.description}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span>{Math.round(meal.estimatedNutrition.calories)} cal</span>
                  <span>{Math.round(meal.estimatedNutrition.protein)}g protein</span>
                  <span>{meal.prepTimeMinutes + meal.cookTimeMinutes} min total</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard padding="md">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Next session
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {nextWorkout?.label ?? "Recovery day"}
              </h2>
            </div>
            <Link
              href="/workout-planning"
              className={outlineLinkButtonClass}
            >
              Open workouts
            </Link>
          </div>
          <div className="mt-5 grid gap-3">
            <div className="rounded-[1.25rem] border border-white/80 bg-white/74 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-foreground">{nextWorkout?.focus ?? "Light movement"}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Timer className="size-4" />
                  {nextWorkout?.estimatedDurationMin ?? 20} min
                </div>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {nextWorkout?.notes ?? "Walk, mobility, and a lower-stress recovery block."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(nextWorkout?.targetPatterns ?? []).map((pattern) => (
                  <span
                    key={pattern}
                    className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800"
                  >
                    {pattern}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-[1.25rem] border border-white/80 bg-white/74 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Integration status
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Dashboard cards are already reading from the same typed meal and workout generators used by the dedicated planning routes.
              </p>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
