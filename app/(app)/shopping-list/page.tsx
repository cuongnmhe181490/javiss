import { PageIntro } from "@/components/shared/page-intro";
import { ShoppingListView } from "@/features/shopping-list";
import { getDashboardState } from "@/lib/demo-data";

export default async function ShoppingListPage() {
  const { pantryPlan } = await getDashboardState();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Danh sách mua sắm"
        title="Những gì cần mua sau khi trừ pantry."
        description="Mọi món đã được gộp và nhóm theo danh mục."
        primaryAction={{ label: "Mở thực đơn", href: "/meal-planning/pantry" }}
        secondaryAction={{ label: "Xem pantry", href: "/pantry" }}
      />
      <ShoppingListView shoppingList={pantryPlan.shoppingList} />
    </div>
  );
}
