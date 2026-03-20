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
import { formatCurrency } from "@/services/pricing";

export default async function DashboardPage() {
  const state = await getDashboardState();
  const todayMeals = state.pantryPlan.days[0].meals.slice(0, 3);
  const nextWorkout = state.workoutPlan.days.find((day) => day.kind === "workout");

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Tổng quan"
        title={`Tiến độ hôm nay của ${state.profile.displayName}`}
        description="Ăn, tập và mua sắm trong một nơi."
        primaryAction={{ label: "Lập từ pantry", href: "/meal-planning/pantry" }}
        secondaryAction={{ label: "Mở mua sắm", href: "/shopping-list" }}
      >
        <GlassCard padding="md" className="grid gap-3">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Hôm nay
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="interactive-card rounded-[1.2rem] border border-white/80 bg-white/78 p-4 dark:border-white/10 dark:bg-white/8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Calo
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {Math.round(state.pantryPlan.days[0].dailyCalories)}
              </p>
            </div>
            <div className="interactive-card rounded-[1.2rem] border border-white/80 bg-white/78 p-4 dark:border-white/10 dark:bg-white/8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Tập luyện
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {nextWorkout?.estimatedDurationMin ?? 20} phút
              </p>
            </div>
          </div>
        </GlassCard>
      </PageIntro>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Chuỗi hiện tại"
          value={`${state.streak.current} ngày`}
          detail="Đều đặn hơn qua từng ngày."
          delta={`Kỷ lục ${state.streak.best}`}
          icon={Trees}
          accent="positive"
        />
        <MetricCard
          label="Ngân sách tuần"
          value={formatCurrency(state.profile.budgetAmount ?? 0)}
          detail={`Cần mua ${formatCurrency(state.pantryPlan.costSummary.totalBuyShoppingCost)} cho kế hoạch hiện tại.`}
          icon={Target}
        />
        <MetricCard
          label="Độ phủ pantry"
          value={`${state.pantryPlan.shoppingList.totals.pantryCoveredItems} món`}
          detail="Nguyên liệu sẵn có được trừ trước."
          icon={ShoppingBasket}
        />
        <MetricCard
          label="Lịch tập tuần"
          value={`${state.workoutPlan.daysPerWeek} buổi`}
          detail="Phù hợp với thiết bị hiện có."
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
        <GlassCard padding="md" className="interactive-card">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Bữa ăn hôm nay
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                Ưu tiên pantry
              </h2>
            </div>
            <Link href="/meal-planning/pantry" className={outlineLinkButtonClass}>
              Mở thực đơn
            </Link>
          </div>
          <div className="mt-5 grid gap-3">
            {todayMeals.map((meal) => (
              <div
                key={meal.id}
                className="interactive-card rounded-[1.25rem] border border-white/80 bg-white/74 p-4 dark:border-white/10 dark:bg-white/8"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      {meal.mealType}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-foreground">{meal.name}</h3>
                  </div>
                  <ChefHat className="size-5 text-emerald-700 dark:text-emerald-300" />
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{meal.description}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span>{Math.round(meal.estimatedNutrition.calories)} calo</span>
                  <span>{Math.round(meal.estimatedNutrition.protein)}g đạm</span>
                  <span>{meal.prepTimeMinutes + meal.cookTimeMinutes} phút</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard padding="md" className="interactive-card">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Buổi tập tiếp theo
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {nextWorkout?.label ?? "Ngày hồi phục"}
              </h2>
            </div>
            <Link href="/workout-planning" className={outlineLinkButtonClass}>
              Mở lịch tập
            </Link>
          </div>
          <div className="mt-5 grid gap-3">
            <div className="interactive-card rounded-[1.25rem] border border-white/80 bg-white/74 p-4 dark:border-white/10 dark:bg-white/8">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-foreground">{nextWorkout?.focus ?? "Vận động nhẹ"}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Timer className="size-4" />
                  {nextWorkout?.estimatedDurationMin ?? 20} phút
                </div>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {nextWorkout?.notes ?? "Đi bộ, giãn cơ và một nhịp hồi phục nhẹ hơn."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(nextWorkout?.targetPatterns ?? []).map((pattern) => (
                  <span
                    key={pattern}
                    className="interactive-chip rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 dark:border-white/10 dark:bg-white/10 dark:text-white"
                  >
                    {pattern}
                  </span>
                ))}
              </div>
            </div>
            <div className="interactive-card rounded-[1.25rem] border border-white/80 bg-white/74 p-4 dark:border-white/10 dark:bg-white/8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Trạng thái
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Dữ liệu cá nhân hóa đang hoạt động.
              </p>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
