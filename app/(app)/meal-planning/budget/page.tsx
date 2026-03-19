import { PageIntro } from "@/components/shared/page-intro";
import { MealPlanView } from "@/features/meal-planning";
import { getDashboardState } from "@/lib/demo-data";

export default function BudgetMealPlanPage() {
  const { budgetPlan } = getDashboardState();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Plan from budget"
        title="Balance cost, time, and nutrition over a realistic seven-day week."
        description="The same typed planner is constrained by weekly spend, prep-time budget, user preferences, and variety penalties to keep the plan practical."
        primaryAction={{ label: "Open shopping list", href: "/shopping-list" }}
        secondaryAction={{ label: "Compare pantry mode", href: "/meal-planning/pantry" }}
      />
      <MealPlanView plan={budgetPlan} />
    </div>
  );
}
