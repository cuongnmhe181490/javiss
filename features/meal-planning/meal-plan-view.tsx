import { Button } from "../../components/ui/button";
import type { MealPlan } from "../../services/meal-planning/types";

type MealPlanViewProps = {
  plan: MealPlan;
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.75rem] border border-black/5 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
      <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{value}</p>
    </div>
  );
}

export function MealPlanView({ plan }: MealPlanViewProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-500">Weekly meal plan</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              {plan.mode === "pantry" ? "Pantry-first plan" : "Budget-aware plan"}
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              Recipes, nutrition, and shopping outputs are derived from the same structured plan data.
            </p>
          </div>
          <Button variant="outline" className="rounded-full border-slate-200 bg-white px-5">
            Save plan
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Stat label="Calories" value={Math.round(plan.weeklyNutritionSummary.calories).toString()} />
        <Stat label="Protein" value={`${Math.round(plan.weeklyNutritionSummary.protein)}g`} />
        <Stat label="Shopping items" value={plan.shoppingList.items.length.toString()} />
      </section>

      <div className="space-y-4">
        {plan.days.map((day) => (
          <section key={day.date} className="rounded-[2rem] border border-black/5 bg-white p-5 shadow-[0_14px_50px_rgba(15,23,42,0.06)]">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">{day.date}</h3>
                <p className="text-sm text-slate-500">{day.dayNotes}</p>
              </div>
              <div className="text-right text-sm text-slate-600">
                <p>{Math.round(day.dailyCalories)} cal</p>
                <p>
                  {Math.round(day.dailyMacros.protein)}g protein · {Math.round(day.dailyMacros.carbs)}g carbs · {Math.round(day.dailyMacros.fat)}g fat
                </p>
              </div>
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              {day.meals.map((meal) => (
                <article key={meal.id} className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">{meal.mealType}</p>
                      <h4 className="mt-1 text-base font-semibold text-slate-950">{meal.name}</h4>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600">
                      x{meal.portionMultiplier.toFixed(2)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{meal.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {meal.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-slate-700">
                    <p>
                      {meal.prepTimeMinutes} min prep · {meal.cookTimeMinutes} min cook
                    </p>
                    <p>
                      {Math.round(meal.estimatedNutrition.calories)} cal · {Math.round(meal.estimatedNutrition.protein)}g protein
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
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
