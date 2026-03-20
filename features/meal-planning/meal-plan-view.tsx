import { Button } from "../../components/ui/button";
import { formatCurrency } from "../../services/pricing";
import type { MealPlan } from "../../services/meal-planning/types";

type MealPlanViewProps = {
  plan: MealPlan;
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="interactive-card rounded-[1.75rem] border border-black/5 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/6">
      <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">{value}</p>
    </div>
  );
}

export function MealPlanView({ plan }: MealPlanViewProps) {
  return (
    <div className="space-y-6">
      <section className="glass-surface rounded-[2rem] p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-500">
              Kế hoạch tuần
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {plan.mode === "pantry" ? "Thực đơn ưu tiên pantry" : "Thực đơn theo ngân sách"}
            </h2>
            <p className="max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              Xem nhanh từng ngày, chi phí và món cần chuẩn bị.
            </p>
          </div>
          <Button variant="outline" className="rounded-full border-slate-200 bg-white px-5 dark:border-white/10 dark:bg-white/8">
            Lưu kế hoạch
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Stat label="Calo tuần" value={Math.round(plan.weeklyNutritionSummary.calories).toString()} />
        <Stat label="Chi phí tuần" value={formatCurrency(plan.costSummary.totalMealCost)} />
        <Stat label="Cần mua" value={formatCurrency(plan.costSummary.totalBuyShoppingCost)} />
      </section>

      <div className="space-y-4">
        {plan.days.map((day) => (
          <section
            key={day.date}
            className="glass-surface rounded-[2rem] p-5"
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{day.date}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-300">{day.dayNotes}</p>
              </div>
              <div className="text-right text-sm text-slate-600 dark:text-slate-300">
                <p>{Math.round(day.dailyCalories)} calo</p>
                <p>
                  {Math.round(day.dailyMacros.protein)}g đạm / {Math.round(day.dailyMacros.carbs)}g carb / {Math.round(day.dailyMacros.fat)}g béo
                </p>
                <p>{formatCurrency(day.dailyEstimatedCost)}</p>
              </div>
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              {day.meals.map((meal) => (
                <article
                  key={meal.id}
                  className="interactive-card rounded-3xl border border-slate-200/80 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/8"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
                        {meal.mealType}
                      </p>
                      <h4 className="mt-1 text-base font-semibold text-slate-950 dark:text-white">{meal.name}</h4>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 dark:bg-white/12 dark:text-white">
                      x{meal.portionMultiplier.toFixed(2)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{meal.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {meal.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="interactive-chip rounded-full bg-white px-3 py-1 text-xs text-slate-700 dark:bg-white/10 dark:text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                    <p>
                      {meal.prepTimeMinutes} phút sơ chế · {meal.cookTimeMinutes} phút nấu
                    </p>
                    <p>
                      {Math.round(meal.estimatedNutrition.calories)} calo · {Math.round(meal.estimatedNutrition.protein)}g đạm
                    </p>
                    <p>{formatCurrency(meal.estimatedCost)}</p>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    {meal.scaledIngredients.slice(0, 4).map((ingredient) => (
                      <li key={`${meal.id}-${ingredient.normalizedName}`}>
                        {ingredient.quantity} {ingredient.unit} {ingredient.name}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
