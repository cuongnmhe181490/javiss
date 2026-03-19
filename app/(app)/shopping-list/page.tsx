import { PageIntro } from "@/components/shared/page-intro";
import { ShoppingListView } from "@/features/shopping-list";
import { getDashboardState } from "@/lib/demo-data";

export default function ShoppingListPage() {
  const { pantryPlan } = getDashboardState();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Shopping list"
        title="What to buy after pantry reconciliation."
        description="The list is aggregated from the saved meal plan, duplicate ingredients are merged, and pantry quantities are subtracted before final grouping by category."
        primaryAction={{ label: "Open pantry plan", href: "/meal-planning/pantry" }}
        secondaryAction={{ label: "Review pantry", href: "/pantry" }}
      />
      <ShoppingListView shoppingList={pantryPlan.shoppingList} />
    </div>
  );
}
