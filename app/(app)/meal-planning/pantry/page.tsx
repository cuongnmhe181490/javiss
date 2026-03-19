import { PageIntro } from "@/components/shared/page-intro";
import { MealPlanView } from "@/features/meal-planning";
import { getDashboardState } from "@/lib/demo-data";

export default function PantryMealPlanPage() {
  const { pantryPlan } = getDashboardState();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Plan from pantry"
        title="Use existing ingredients first and reduce waste across the week."
        description="This weekly plan is produced by the deterministic meal engine using pantry overlap, cooking time, disliked foods, and ingredient reuse scoring."
        primaryAction={{ label: "View shopping list", href: "/shopping-list" }}
        secondaryAction={{ label: "Switch to budget mode", href: "/meal-planning/budget" }}
      />
      <MealPlanView plan={pantryPlan} />
    </div>
  );
}
