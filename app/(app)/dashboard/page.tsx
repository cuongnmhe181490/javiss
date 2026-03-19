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
        eyebrow="Tong quan"
        title={`Tien do song lanh manh cua ${state.profile.displayName}`}
        description="Bua an, lich tap, mua sam va muc do deu dan dang cung doc tu mot nguon du lieu co cau truc, san sang cho persistence that."
        primaryAction={{ label: "Lap tu pantry", href: "/meal-planning/pantry" }}
        secondaryAction={{ label: "Xem danh sach mua sam", href: "/shopping-list" }}
      >
        <GlassCard padding="md" className="grid gap-3">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Tong quan hom nay
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.2rem] border border-white/80 bg-white/78 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Calo
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {Math.round(state.pantryPlan.days[0].dailyCalories)}
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-white/80 bg-white/78 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Tap luyen
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {nextWorkout?.estimatedDurationMin ?? 20} phut
              </p>
            </div>
          </div>
        </GlassCard>
      </PageIntro>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Chuoi hien tai"
          value={`${state.streak.current} ngay`}
          detail="Bua an va buoi tap da hoan thanh trong tuan dang dong gop vao tien do phat trien cua cay."
          delta={`Ky luc ${state.streak.best}`}
          icon={Trees}
          accent="positive"
        />
        <MetricCard
          label="Ngan sach tuan"
          value={`$${state.profile.budgetAmount}`}
          detail="Lap ke hoach theo ngan sach giup giu chi phi phu hop voi thoi gian nau va muc tieu macro."
          icon={Target}
        />
        <MetricCard
          label="Do phu pantry"
          value={`${state.pantryPlan.shoppingList.totals.pantryCoveredItems} mon`}
          detail="Nguyen lieu dang co duoc tru ra truoc khi chot danh sach can mua."
          icon={ShoppingBasket}
        />
        <MetricCard
          label="Lich tap tuan"
          value={`${state.workoutPlan.daysPerWeek} buoi`}
          detail="Cac buoi tap duoc phan bo theo so thich va thiet bi san co."
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
                Bua an hom nay
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                Lich uu tien pantry
              </h2>
            </div>
            <Link
              href="/meal-planning/pantry"
              className={outlineLinkButtonClass}
            >
              Mo thuc don
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
                  <span>{Math.round(meal.estimatedNutrition.calories)} calo</span>
                  <span>{Math.round(meal.estimatedNutrition.protein)}g dam</span>
                  <span>{meal.prepTimeMinutes + meal.cookTimeMinutes} phut tong</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard padding="md">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Buoi tap tiep theo
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {nextWorkout?.label ?? "Ngay hoi phuc"}
              </h2>
            </div>
            <Link
              href="/workout-planning"
              className={outlineLinkButtonClass}
            >
              Mo lich tap
            </Link>
          </div>
          <div className="mt-5 grid gap-3">
            <div className="rounded-[1.25rem] border border-white/80 bg-white/74 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-foreground">{nextWorkout?.focus ?? "Van dong nhe"}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Timer className="size-4" />
                  {nextWorkout?.estimatedDurationMin ?? 20} phut
                </div>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {nextWorkout?.notes ?? "Di bo, gian co va mot khung hoi phuc nhe nhang hon."}
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
                Trang thai tich hop
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Cac the trong trang tong quan dang doc cung bo generator co typing duoc dung o cac trang lap ke hoach chuyen biet.
              </p>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
