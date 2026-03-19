import { PageIntro } from "@/components/shared/page-intro";
import { ShoppingListView } from "@/features/shopping-list";
import { getDashboardState } from "@/lib/demo-data";

export default async function ShoppingListPage() {
  const { pantryPlan } = await getDashboardState();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Danh sach mua sam"
        title="Nhung gi can mua sau khi doi chieu pantry."
        description="Danh sach duoc tong hop tu ke hoach bua an da luu, cac nguyen lieu trung lap duoc gop lai, va so luong dang co trong pantry duoc tru ra truoc khi nhom theo danh muc."
        primaryAction={{ label: "Mo ke hoach pantry", href: "/meal-planning/pantry" }}
        secondaryAction={{ label: "Xem pantry", href: "/pantry" }}
      />
      <ShoppingListView shoppingList={pantryPlan.shoppingList} />
    </div>
  );
}
