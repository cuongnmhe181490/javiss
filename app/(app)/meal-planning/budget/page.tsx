import { PageIntro } from "@/components/shared/page-intro";
import { MealPlanView } from "@/features/meal-planning";
import { getDashboardState } from "@/lib/demo-data";

export default async function BudgetMealPlanPage() {
  const { budgetPlan } = await getDashboardState();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Lap tu ngan sach"
        title="Can bang chi phi, thoi gian va dinh duong trong mot tuan 7 ngay thuc te."
        description="Cung bo planner co typing nay duoc rang buoc boi ngan sach tuan, gioi han thoi gian chuan bi, so thich nguoi dung va co che giam trung lap de giu ke hoach huu dung."
        primaryAction={{ label: "Mo danh sach mua sam", href: "/shopping-list" }}
        secondaryAction={{ label: "So sanh voi che do pantry", href: "/meal-planning/pantry" }}
      />
      <MealPlanView plan={budgetPlan} />
    </div>
  );
}
