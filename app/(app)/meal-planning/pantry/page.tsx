import { PageIntro } from "@/components/shared/page-intro";
import { MealPlanView } from "@/features/meal-planning";
import { getDashboardState } from "@/lib/demo-data";

export default async function PantryMealPlanPage() {
  const { pantryPlan } = await getDashboardState();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Lập từ đồ sẵn có"
        title="Ưu tiên nguyên liệu đang có trong bếp."
        description="Nếu muốn đổi lại pantry, bạn có thể cập nhật trước khi xem thực đơn."
        primaryAction={{ label: "Cập nhật pantry", href: "/pantry?returnTo=/meal-planning/pantry" }}
        secondaryAction={{ label: "Xem mua sắm", href: "/shopping-list" }}
      />
      <MealPlanView plan={pantryPlan} />
    </div>
  );
}
