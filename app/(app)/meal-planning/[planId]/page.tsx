import { PageIntro } from "@/components/shared/page-intro";
import { MealPlanView } from "@/features/meal-planning";
import { getDashboardState } from "@/lib/demo-data";

export default async function MealPlanDetailPage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;
  const { pantryPlan, budgetPlan } = getDashboardState();
  const plan = planId === "budget" ? budgetPlan : pantryPlan;

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Meal plan detail"
        title={`${plan.mode === "pantry" ? "Pantry-first" : "Budget-aware"} weekly plan`}
        description="Dynamic meal plan detail is already routed, even though the scaffold currently resolves to deterministic mock snapshots."
        primaryAction={{ label: "Shopping list", href: "/shopping-list" }}
        secondaryAction={{ label: "Meals hub", href: "/meal-planning" }}
      />
      <MealPlanView plan={plan} />
    </div>
  );
}
