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
        eyebrow="Lap ke hoach bua an"
        title="Hai che do lap ke hoach, mot bo may bua an co typing ro rang."
        description="Che do pantry toi da hoa viec tai su dung nguyen lieu va giam lang phi. Che do ngan sach dung cung bo generator do nhung rang buoc thuc te ve chi phi va thoi gian nau."
        primaryAction={{ label: "Lap tu pantry", href: "/meal-planning/pantry" }}
        secondaryAction={{ label: "Lap theo ngan sach", href: "/meal-planning/budget" }}
      >
        <GlassCard padding="md" className="grid gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.2rem] border border-white/80 bg-white/76 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Do phu pantry
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {pantryPlan.shoppingList.totals.pantryCoveredItems}
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-white/80 bg-white/76 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Danh sach theo ngan sach
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {budgetPlan.shoppingList.totals.buyItems} mon
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
            Che do A: Lap tu pantry
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Uu tien nguyen lieu dang co, nhung mon sap het han, va kha nang tai su dung xuyen suot ca tuan truoc khi them mon con thieu vao danh sach mua sam.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Giam lang phi", "Uu tien do san trong nha", "Sinh mon con thieu"].map((item) => (
              <span key={item} className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
                {item}
              </span>
            ))}
          </div>
          <Link href="/meal-planning/pantry" className={`${primaryLinkButtonClass} mt-6`}>
            Mo che do pantry
          </Link>
        </GlassCard>

        <GlassCard padding="lg">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700 shadow-sm">
            <Coins className="size-5" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
            Che do B: Lap tu ngan sach
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Toi uu chi phi tuan, thoi gian nau, muc tieu suc khoe va do da dang mon an, dong thoi van tao day du danh sach mua sam va doi chieu pantry.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Co y thuc chi phi", "Rang buoc thoi gian", "Can bang do da dang"].map((item) => (
              <span key={item} className="rounded-full border border-white/80 bg-white/76 px-3 py-1 text-xs font-medium text-foreground">
                {item}
              </span>
            ))}
          </div>
          <Link href="/meal-planning/budget" className={`${outlineLinkButtonClass} mt-6`}>
            Mo che do ngan sach
          </Link>
        </GlassCard>
      </section>
    </div>
  );
}
