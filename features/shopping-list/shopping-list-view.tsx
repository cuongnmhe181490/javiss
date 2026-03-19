import { Button } from "../../components/ui/button";
import type { ShoppingList } from "../../services/shopping-list/types";

type ShoppingListViewProps = {
  shoppingList: ShoppingList;
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.75rem] border border-black/5 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
      <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{value}</p>
    </div>
  );
}

export function ShoppingListView({ shoppingList }: ShoppingListViewProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-500">Danh sach mua sam</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Tong hop tu toan bo ke hoach</h2>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              So luong co doi chieu pantry duoc gop, chuan hoa va nhom thanh cac khu mua sam de su dung.
            </p>
          </div>
          <Button variant="outline" className="rounded-full border-slate-200 bg-white px-5">
            Danh dau da mua
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Stat label="Tong so mon" value={shoppingList.items.length.toString()} />
        <Stat label="Da co san" value={shoppingList.totals.pantryCoveredItems.toString()} />
        <Stat label="Can mua" value={shoppingList.totals.buyItems.toString()} />
      </section>

      <div className="space-y-4">
        {shoppingList.groupedByCategory.map((group) => (
          <section key={group.category} className="rounded-[2rem] border border-black/5 bg-white p-5 shadow-[0_14px_50px_rgba(15,23,42,0.06)]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-950">{group.category.replaceAll("_", " / ")}</h3>
              <p className="text-sm text-slate-500">{Math.round(group.totalBuyQuantity)} can mua</p>
            </div>
            <div className="grid gap-3">
              {group.items.map((item) => (
                <article key={item.normalizedName} className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-medium text-slate-950">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.sourceMeals.join(", ")}</p>
                  </div>
                  <div className="text-sm text-slate-600">
                    <p>
                      Can {item.buyQuantity} {item.unit}
                    </p>
                    <p>
                      Dang co {item.availableQuantity} {item.unit}
                    </p>
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
