import { addPantryItemAction, clearPantryAction } from "@/app/(app)/actions";
import { GlassCard } from "@/components/shared/glass-card";
import { PageIntro } from "@/components/shared/page-intro";
import { PantryForm, PantryItemList } from "@/features/pantry";
import { getDashboardState } from "@/lib/demo-data";

export default async function PantryPage() {
  const { pantryItems } = await getDashboardState();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Pantry"
        title="Keep inventory current so meals and shopping stay accurate."
        description="Pantry items are the first structured input in the meal planning engine. The scaffold already normalizes ingredients before matching them to recipes and shopping needs."
        primaryAction={{ label: "Generate pantry plan", href: "/meal-planning/pantry" }}
        secondaryAction={{ label: "Open shopping list", href: "/shopping-list" }}
      />
      <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <PantryForm
            initialValues={{ source: "manual", category: "other", unit: "item", quantity: 1 }}
            onSubmit={addPantryItemAction}
          />
          <form action={clearPantryAction}>
            <GlassCard padding="md" className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-foreground">Reset pantry demo state</p>
                <p className="text-sm text-muted-foreground">
                  Xoa toan bo pantry da luu trong trinh duyet hien tai.
                </p>
              </div>
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-white/80 px-4 text-sm font-medium text-foreground transition hover:bg-white"
              >
                Clear pantry
              </button>
            </GlassCard>
          </form>
        </div>
        <PantryItemList items={pantryItems} />
      </section>
    </div>
  );
}
