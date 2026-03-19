"use client";

import { cn } from "@/lib/utils";
import type { PantryItemRecord } from "@/types/pantry";

type PantryItemListProps = {
  items: PantryItemRecord[];
  className?: string;
  onToggleHave?: (item: PantryItemRecord) => void;
  onMarkBought?: (item: PantryItemRecord) => void;
};

export function PantryItemList({ items, className, onToggleHave, onMarkBought }: PantryItemListProps) {
  const grouped = items.reduce<Record<string, PantryItemRecord[]>>((accumulator, item) => {
    accumulator[item.category] ??= [];
    accumulator[item.category].push(item);
    return accumulator;
  }, {});

  return (
    <section
      className={cn(
        "space-y-6 rounded-3xl border border-black/5 bg-white/90 p-6 shadow-[0_20px_60px_-42px_rgba(0,0,0,0.22)] backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-neutral-500">Pantry</p>
          <h2 className="mt-2 text-2xl font-semibold text-neutral-950">What is already at home</h2>
        </div>
        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
          {items.length} items
        </span>
      </div>

      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 px-4 py-8 text-sm text-neutral-600">
          No pantry items yet. Add a few staples to improve the first plan.
        </p>
      ) : null}

      <div className="space-y-4">
        {Object.entries(grouped).map(([category, groupedItems]) => (
          <div key={category} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
                {category.replaceAll("_", " ")}
              </h3>
              <span className="text-xs text-neutral-500">{groupedItems.length}</span>
            </div>
            <div className="grid gap-3">
              {groupedItems.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col gap-3 rounded-2xl border border-black/5 bg-neutral-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h4 className="font-medium text-neutral-950">{item.name}</h4>
                    <p className="text-sm text-neutral-600">
                      {item.quantity} {item.unit}
                      {item.expiresOn ? ` · expires ${item.expiresOn}` : ""}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {onToggleHave ? (
                      <button
                        className="rounded-full border border-neutral-200 px-3 py-2 text-sm text-neutral-700 transition hover:border-neutral-300 hover:bg-white"
                        onClick={() => onToggleHave(item)}
                        type="button"
                      >
                        Already have
                      </button>
                    ) : null}
                    {onMarkBought ? (
                      <button
                        className="rounded-full bg-neutral-900 px-3 py-2 text-sm text-white transition hover:bg-neutral-800"
                        onClick={() => onMarkBought(item)}
                        type="button"
                      >
                        Bought
                      </button>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
