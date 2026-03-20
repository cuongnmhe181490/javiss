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
        eyebrow="Chi tiết thực đơn"
        title={`${plan.mode === "pantry" ? "Thực đơn ưu tiên đồ sẵn có" : "Thực đơn tối ưu ngân sách"} trong tuần`}
        description="Xem món ăn, nguyên liệu chính và cách nấu cho từng ngày."
        primaryAction={{ label: "Danh sách mua sắm", href: "/shopping-list" }}
        secondaryAction={{ label: "Kế hoạch bữa ăn", href: "/meal-planning" }}
      />
      <MealPlanView plan={plan} />
    </div>
  );
}
