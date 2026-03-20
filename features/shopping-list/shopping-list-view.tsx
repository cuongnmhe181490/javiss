import { Button } from "../../components/ui/button";
import { pantryCategoryLabels } from "../../lib/display";
import { formatCurrency } from "../../services/pricing";
import type { ShoppingList } from "../../services/shopping-list/types";

type ShoppingListViewProps = {
  shoppingList: ShoppingList;
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="interactive-card rounded-[1.75rem] border border-black/5 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/6">
      <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">{value}</p>
    </div>
  );
}

export function ShoppingListView({ shoppingList }: ShoppingListViewProps) {
  return (
    <div className="space-y-6">
      <section className="glass-surface rounded-[2rem] p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-500">Mua sắm</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Tổng hợp từ thực đơn tuần</h2>
            <p className="max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              Xem nhanh món cần mua, món đã có và tổng chi phí.
            </p>
          </div>
          <Button variant="outline" className="rounded-full border-slate-200 bg-white px-5 dark:border-white/10 dark:bg-white/8">
            Đánh dấu đã mua
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Stat label="Tổng số món" value={shoppingList.items.length.toString()} />
        <Stat label="Giá trị đã có" value={formatCurrency(shoppingList.totals.totalCoveredCost)} />
        <Stat label="Cần mua" value={formatCurrency(shoppingList.totals.totalBuyCost)} />
      </section>

      <div className="space-y-4">
        {shoppingList.groupedByCategory.map((group) => (
          <section key={group.category} className="glass-surface rounded-[2rem] p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
                {pantryCategoryLabels[group.category as keyof typeof pantryCategoryLabels] ?? group.category}
              </h3>
              <p className="text-sm text-slate-500">{formatCurrency(group.totalBuyCost)}</p>
            </div>
            <div className="grid gap-3">
              {group.items.map((item) => (
                <article key={item.normalizedName} className="interactive-card flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/8 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-medium text-slate-950 dark:text-white">{item.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-300">{item.sourceMeals.join(", ")}</p>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    <p>
                      Cần {item.buyQuantity} {item.unit}
                    </p>
                    <p>
                      Đang có {item.availableQuantity} {item.unit}
                    </p>
                    <p>{formatCurrency(item.buyCost)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
