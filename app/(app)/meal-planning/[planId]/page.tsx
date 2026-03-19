import { PageIntro } from "@/components/shared/page-intro";
import { MealPlanView } from "@/features/meal-planning";
import { getDashboardState } from "@/lib/demo-data";

export default async function MealPlanDetailPage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;
  const { pantryPlan, budgetPlan } = await getDashboardState();
  const plan = planId === "budget" ? budgetPlan : pantryPlan;

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Chi tiet ke hoach bua an"
        title={`${plan.mode === "pantry" ? "Ke hoach uu tien pantry" : "Ke hoach toi uu ngan sach"} trong tuan`}
        description="Route chi tiet ke hoach bua an da hoat dong day du, du scaffold hien tai van dang tra ve snapshot mock deterministic."
        primaryAction={{ label: "Danh sach mua sam", href: "/shopping-list" }}
        secondaryAction={{ label: "Trung tam bua an", href: "/meal-planning" }}
      />
      <MealPlanView plan={plan} />
    </div>
  );
}
