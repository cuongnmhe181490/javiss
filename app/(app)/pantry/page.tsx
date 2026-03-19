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
        title="Cap nhat ton kho de bua an va mua sam luon chinh xac."
        description="Pantry la dau vao co cau truc dau tien trong bo may lap ke hoach bua an. Scaffold da chuan hoa nguyen lieu truoc khi doi chieu voi cong thuc va nhu cau mua sam."
        primaryAction={{ label: "Tao ke hoach pantry", href: "/meal-planning/pantry" }}
        secondaryAction={{ label: "Mo danh sach mua sam", href: "/shopping-list" }}
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
                <p className="text-sm font-semibold text-foreground">Dat lai pantry demo</p>
                <p className="text-sm text-muted-foreground">
                  Xoa toan bo pantry da luu trong trinh duyet hien tai.
                </p>
              </div>
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-white/80 px-4 text-sm font-medium text-foreground transition hover:bg-white"
              >
                Xoa pantry
              </button>
            </GlassCard>
          </form>
        </div>
        <PantryItemList items={pantryItems} />
      </section>
    </div>
  );
}
