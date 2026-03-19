import { PageIntro } from "@/components/shared/page-intro";
import { MealPlanView } from "@/features/meal-planning";
import { getDashboardState } from "@/lib/demo-data";

export default async function PantryMealPlanPage() {
  const { pantryPlan } = await getDashboardState();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Lap tu pantry"
        title="Uu tien nguyen lieu dang co va giam lang phi trong ca tuan."
        description="Ke hoach tuan nay duoc tao boi meal engine deterministic dua tren muc do trung pantry, thoi gian nau, mon khong thich va diem tai su dung nguyen lieu."
        primaryAction={{ label: "Xem danh sach mua sam", href: "/shopping-list" }}
        secondaryAction={{ label: "Chuyen sang che do ngan sach", href: "/meal-planning/budget" }}
      />
      <MealPlanView plan={pantryPlan} />
    </div>
  );
}
