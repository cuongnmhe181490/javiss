import {
  translateIngredientName,
  translateMealTag,
  translateMealType,
  translateRecipeDescription,
  translateRecipeInstructions,
  translateRecipeName,
} from "@/lib/display";

import { Button } from "../../components/ui/button";
import { formatCurrency } from "../../services/pricing";
import type { MealPlan } from "../../services/meal-planning/types";

type MealPlanViewProps = {
  plan: MealPlan;
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="interactive-card rounded-[1.75rem] border border-slate-200/80 bg-white/92 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.07)] dark:border-white/10 dark:bg-[#1f2733]/88">
      <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
        {value}
      </p>
    </div>
  );
}

export function MealPlanView({ plan }: MealPlanViewProps) {
  const periodLabel =
    plan.costSummary.budgetPeriod === "day"
      ? "ngày"
      : plan.costSummary.budgetPeriod === "week"
        ? "tuần"
        : null;

  return (
    <div className="space-y-6">
      <section className="glass-surface rounded-[2rem] p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">
              Kế hoạch tuần
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
              {plan.mode === "pantry" ? "Thực đơn ưu tiên đồ sẵn có" : "Thực đơn theo ngân sách"}
            </h2>
            <p className="max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              Xem nhanh món ăn, chi phí và cách nấu trong 7 ngày.
            </p>
            {plan.costSummary.budgetAmount && periodLabel ? (
              <p className="inline-flex w-fit rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 dark:bg-white/10 dark:text-slate-100">
                Mục tiêu: {formatCurrency(plan.costSummary.budgetAmount)} / {periodLabel}
              </p>
            ) : null}
          </div>
          <Button
            variant="outline"
            className="rounded-full border-slate-200 bg-white px-5 text-slate-900 hover:bg-slate-50 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/14"
          >
            Lưu kế hoạch
          </Button>
        </div>
      </section>

      {!plan.costSummary.withinBudget || plan.metadata.warnings.length > 0 ? (
        <section className="rounded-[1.75rem] border border-amber-200/70 bg-amber-50/90 p-4 text-sm text-amber-950 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
          <p className="font-semibold">Kế hoạch này đang cần điều chỉnh thêm.</p>
          <ul className="mt-2 space-y-1">
            {plan.metadata.warnings.map((warning) => (
              <li key={warning}>• {warning}</li>
            ))}
            {!plan.costSummary.withinBudget ? (
              <li>
                • Tổng chi phí hiện tại là {formatCurrency(plan.costSummary.totalMealCost)}, vẫn cao hơn ngân sách mục tiêu.
              </li>
            ) : null}
          </ul>
        </section>
      ) : null}

      <section className="grid gap-4 md:grid-cols-3">
        <Stat label="Calo tuần" value={Math.round(plan.weeklyNutritionSummary.calories).toString()} />
        <Stat label="Chi phí tuần" value={formatCurrency(plan.costSummary.totalMealCost)} />
        <Stat label="Cần mua" value={formatCurrency(plan.costSummary.totalBuyShoppingCost)} />
      </section>

      <div className="space-y-4">
        {plan.days.map((day) => (
          <section key={day.date} className="glass-surface rounded-[2rem] p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-950 dark:text-slate-50">{day.date}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-300">{day.dayNotes}</p>
              </div>
              <div className="text-right text-sm text-slate-700 dark:text-slate-200">
                <p>{Math.round(day.dailyCalories)} calo</p>
                <p>
                  {Math.round(day.dailyMacros.protein)}g đạm / {Math.round(day.dailyMacros.carbs)}g carb /{" "}
                  {Math.round(day.dailyMacros.fat)}g béo
                </p>
                <p>{formatCurrency(day.dailyEstimatedCost)}</p>
              </div>
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              {day.meals.map((meal) => {
                const mealName = translateRecipeName(meal.id, meal.name);
                const mealDescription = translateRecipeDescription(meal.id, meal.description);
                const mealInstructions = translateRecipeInstructions(meal.id, meal.instructions);

                return (
                  <article
                    key={meal.id}
                    className="interactive-card rounded-3xl border border-slate-200/80 bg-slate-50/92 p-4 shadow-[0_14px_34px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-[#2a3341]/92"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                          {translateMealType(meal.mealType)}
                        </p>
                        <h4 className="mt-1 text-base font-semibold text-slate-950 dark:text-slate-50">
                          {mealName}
                        </h4>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 dark:bg-white/12 dark:text-slate-100">
                        x{meal.portionMultiplier.toFixed(2)}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{mealDescription}</p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {meal.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="interactive-chip rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 dark:bg-white/10 dark:text-slate-100"
                        >
                          {translateMealTag(tag)}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                      <p>
                        {meal.prepTimeMinutes} phút sơ chế • {meal.cookTimeMinutes} phút nấu
                      </p>
                      <p>
                        {Math.round(meal.estimatedNutrition.calories)} calo •{" "}
                        {Math.round(meal.estimatedNutrition.protein)}g đạm
                      </p>
                      <p>{formatCurrency(meal.estimatedCost)}</p>
                    </div>

                    <div className="mt-4 rounded-2xl bg-white/78 p-3 dark:bg-white/7">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                        Nguyên liệu chính
                      </p>
                      <ul className="mt-2 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                        {meal.scaledIngredients.slice(0, 4).map((ingredient) => (
                          <li key={`${meal.id}-${ingredient.normalizedName}`}>
                            {ingredient.quantity} {ingredient.unit} {translateIngredientName(ingredient.name)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 rounded-2xl bg-emerald-50/80 p-3 dark:bg-emerald-500/10">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                        Cách làm
                      </p>
                      <ol className="mt-2 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                        {mealInstructions.slice(0, 5).map((step, index) => (
                          <li key={`${meal.id}-${step}`} className="flex gap-2">
                            <span className="mt-0.5 h-5 w-5 rounded-full bg-white text-center text-xs font-semibold leading-5 text-emerald-700 dark:bg-white/12 dark:text-emerald-300">
                              {index + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
