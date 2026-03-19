import { PageIntro } from "@/components/shared/page-intro";
import { PantryItemList } from "@/features/pantry";
import { getDashboardState } from "@/lib/demo-data";

export default function PantryPage() {
  const { pantryItems } = getDashboardState();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Pantry"
        title="Keep inventory current so meals and shopping stay accurate."
        description="Pantry items are the first structured input in the meal planning engine. The scaffold already normalizes ingredients before matching them to recipes and shopping needs."
        primaryAction={{ label: "Generate pantry plan", href: "/meal-planning/pantry" }}
        secondaryAction={{ label: "Open shopping list", href: "/shopping-list" }}
      />
      <PantryItemList items={pantryItems} />
    </div>
  );
}
