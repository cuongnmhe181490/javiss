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
        eyebrow="Lập thực đơn"
        title="Chọn cách lập kế hoạch phù hợp."
        description="Bắt đầu từ nguyên liệu sẵn có hoặc đi theo ngân sách tuần."
        primaryAction={{ label: "Lập từ đồ sẵn có", href: "/pantry?returnTo=/meal-planning/pantry" }}
        secondaryAction={{ label: "Lập theo ngân sách", href: "/meal-planning/budget" }}
      >
        <GlassCard padding="md" className="grid gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="interactive-card rounded-[1.2rem] border border-white/80 bg-white/76 p-4 dark:border-white/10 dark:bg-white/8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Pantry đang có
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {pantryPlan.shoppingList.totals.pantryCoveredItems}
              </p>
            </div>
            <div className="interactive-card rounded-[1.2rem] border border-white/80 bg-white/76 p-4 dark:border-white/10 dark:bg-white/8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Món cần mua
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {budgetPlan.shoppingList.totals.buyItems} món
              </p>
            </div>
          </div>
        </GlassCard>
      </PageIntro>

      <section className="grid gap-4 lg:grid-cols-2">
        <GlassCard padding="lg" className="interactive-card">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white">
            <Refrigerator className="size-5" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
            Lập từ đồ sẵn có
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Nhập nguyên liệu đang có rồi tiếp tục lập thực đơn.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Ít lãng phí", "Dễ dùng đồ sẵn có", "Tự tính món cần mua"].map((item) => (
              <span key={item} className="interactive-chip rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-900 dark:border-white/10 dark:bg-white/10 dark:text-white">
                {item}
              </span>
            ))}
          </div>
          <Link href="/pantry?returnTo=/meal-planning/pantry" className={`${primaryLinkButtonClass} mt-6`}>
            Nhập pantry trước
          </Link>
        </GlassCard>

        <GlassCard padding="lg" className="interactive-card">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white">
            <Coins className="size-5" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
            Lập theo ngân sách
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Chọn thực đơn phù hợp chi phí và thời gian nấu.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Rõ chi phí", "Theo thời gian nấu", "Giữ độ đa dạng"].map((item) => (
              <span key={item} className="interactive-chip rounded-full border border-white/80 bg-white/76 px-3 py-1 text-xs font-medium text-foreground dark:border-white/10 dark:bg-white/10 dark:text-white">
                {item}
              </span>
            ))}
          </div>
          <Link href="/meal-planning/budget" className={`${outlineLinkButtonClass} mt-6`}>
            Mở chế độ này
          </Link>
        </GlassCard>
      </section>
    </div>
  );
}
