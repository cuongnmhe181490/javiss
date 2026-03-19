import Link from "next/link";
import { Coins, Refrigerator } from "lucide-react";

import { GlassCard } from "@/components/shared/glass-card";
import { PageIntro } from "@/components/shared/page-intro";
import {
  outlineLinkButtonClass,
  primaryLinkButtonClass,
} from "@/lib/button-link-styles";
import { getDashboardState } from "@/lib/demo-data";

export default async function MealPlanningPage() {
  const { pantryPlan, budgetPlan } = await getDashboardState();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Meal planning"
        title="Two planning modes, one typed meal engine."
        description="Pantry mode maximizes ingredient reuse and waste reduction. Budget mode steers the same generator toward practical cost and prep-time constraints."
        primaryAction={{ label: "Plan from pantry", href: "/meal-planning/pantry" }}
        secondaryAction={{ label: "Plan from budget", href: "/meal-planning/budget" }}
      >
        <GlassCard padding="md" className="grid gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.2rem] border border-white/80 bg-white/76 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Pantry coverage
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {pantryPlan.shoppingList.totals.pantryCoveredItems}
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-white/80 bg-white/76 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Budget list
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {budgetPlan.shoppingList.totals.buyItems} items
              </p>
            </div>
          </div>
        </GlassCard>
      </PageIntro>

      <section className="grid gap-4 lg:grid-cols-2">
        <GlassCard padding="lg">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700 shadow-sm">
            <Refrigerator className="size-5" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
            Mode A: Plan from pantry
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Prioritizes pantry overlap, expiry-sensitive ingredients, and ingredient reuse across the week before adding missing items to the shopping list.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Minimize waste", "Use what is at home", "Generate missing items"].map((item) => (
              <span key={item} className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
                {item}
              </span>
            ))}
          </div>
          <Link href="/meal-planning/pantry" className={`${primaryLinkButtonClass} mt-6`}>
            Open pantry mode
          </Link>
        </GlassCard>

        <GlassCard padding="lg">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700 shadow-sm">
            <Coins className="size-5" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
            Mode B: Plan from budget
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Optimizes for weekly spend, cooking time, health goals, and variety while still producing a full shopping list and pantry reconciliation.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Cost aware", "Time constrained", "Variety balanced"].map((item) => (
              <span key={item} className="rounded-full border border-white/80 bg-white/76 px-3 py-1 text-xs font-medium text-foreground">
                {item}
              </span>
            ))}
          </div>
          <Link href="/meal-planning/budget" className={`${outlineLinkButtonClass} mt-6`}>
            Open budget mode
          </Link>
        </GlassCard>
      </section>
    </div>
  );
}
