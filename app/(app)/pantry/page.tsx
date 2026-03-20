import { addPantryItemAction } from "@/app/(app)/actions";
import { GlassCard } from "@/components/shared/glass-card";
import { PageIntro } from "@/components/shared/page-intro";
import { PantryWorkspace } from "@/features/pantry";
import { getDashboardState } from "@/lib/demo-data";

export default async function PantryPage({
  searchParams,
}: {
  searchParams?: Promise<{ returnTo?: string }>;
}) {
  const { pantryItems } = await getDashboardState();
  const params = await searchParams;
  const returnTo = params?.returnTo;

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Pantry"
        title="Thêm nguyên liệu sẵn có trước khi lập thực đơn."
        description="Bạn chỉ cần nhập vài món đang có trong bếp."
        primaryAction={{ label: "Tiếp tục lập thực đơn", href: returnTo ?? "/meal-planning/pantry" }}
        secondaryAction={{ label: "Mở mua sắm", href: "/shopping-list" }}
      />

      <PantryWorkspace items={pantryItems} onSubmit={addPantryItemAction} returnTo={returnTo} />

      <GlassCard padding="md" className="interactive-card flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">Gợi ý nhanh</p>
          <p className="text-sm text-muted-foreground">
            Bắt đầu với trứng, gạo, sữa chua, rau xanh hoặc ức gà.
          </p>
        </div>
        <a
          href={returnTo ?? "/meal-planning/pantry"}
          className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-white/80 px-4 text-sm font-medium text-foreground transition duration-200 hover:-translate-y-0.5 hover:bg-white dark:bg-white/10 dark:hover:bg-white/12"
        >
          Tiếp tục
        </a>
      </GlassCard>
    </div>
  );
}
