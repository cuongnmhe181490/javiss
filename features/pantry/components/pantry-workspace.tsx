"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { AppLanguage } from "@/lib/display";
import type { PantryItemInput, PantryItemRecord } from "@/types/pantry";
import { PantryForm } from "./pantry-form";
import { PantryItemList } from "./pantry-item-list";

type PantryWorkspaceProps = {
  items: PantryItemRecord[];
  onSubmit: (values: PantryItemInput) => Promise<void> | void;
  returnTo?: string;
  language?: AppLanguage;
};

export function PantryWorkspace({ items, onSubmit, returnTo, language = "vi" }: PantryWorkspaceProps) {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return items;

    return items.filter((item) =>
      [item.name, item.normalizedName].some((value) => value.toLowerCase().includes(keyword)),
    );
  }, [items, query]);

  return (
    <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      <div className="space-y-4">
        <div className="glass-surface rounded-[1.75rem] p-5">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Bước 1</p>
          <h2 className="mt-2 text-xl font-semibold text-foreground">Thêm nguyên liệu sẵn có</h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Nhập vài món đang có trong bếp rồi tiếp tục lập thực đơn.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href="#pantry-form" className="interactive-chip rounded-full border px-4 py-2 text-sm font-medium text-foreground">
              Thêm nguyên liệu
            </a>
            <Link href={returnTo ?? "/meal-planning/pantry"} className="interactive-chip rounded-full border px-4 py-2 text-sm font-medium text-foreground">
              Tiếp tục lập thực đơn
            </Link>
            <Link href="/meal-planning/pantry" className="interactive-chip rounded-full border px-4 py-2 text-sm font-medium text-foreground">
              Bỏ qua và dùng dữ liệu mẫu
            </Link>
          </div>
        </div>

        <div id="pantry-form">
          <PantryForm
            initialValues={{ source: "manual", category: "other", unit: "quả", quantity: 1 }}
            onSubmit={onSubmit}
            submitLabel="Thêm nguyên liệu"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="glass-surface rounded-[1.75rem] p-5">
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">Tìm nguyên liệu đã thêm</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ví dụ: trứng, gạo, ức gà"
              className="app-input"
            />
          </label>
        </div>
        <PantryItemList items={filteredItems} language={language} />
      </div>
    </section>
  );
}
