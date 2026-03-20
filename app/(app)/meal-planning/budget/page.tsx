import { PageIntro } from "@/components/shared/page-intro";
import { MealPlanView } from "@/features/meal-planning";
import { getDashboardState } from "@/lib/demo-data";

export default async function BudgetMealPlanPage() {
  const { budgetPlan } = await getDashboardState();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Lập theo ngân sách"
        title="Giữ chi phí, thời gian nấu và dinh dưỡng ở mức hợp lý."
        description="Danh sách mua sắm sẽ tự tính theo kế hoạch tuần."
        primaryAction={{ label: "Mở mua sắm", href: "/shopping-list" }}
        secondaryAction={{ label: "So sánh với pantry", href: "/meal-planning/pantry" }}
      />
      <MealPlanView plan={budgetPlan} />
    </div>
  );
}
