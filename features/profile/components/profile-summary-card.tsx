"use client";

import { labelForActivityLevel, labelForBudgetPeriod, labelForGoal } from "@/lib/display";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/services/pricing";
import type { ProfileRecord } from "@/types/profile";

type ProfileSummaryCardProps = {
  profile: ProfileRecord;
  className?: string;
};

export function ProfileSummaryCard({ profile, className }: ProfileSummaryCardProps) {
  return (
    <section
      className={cn(
        "interactive-card rounded-3xl border border-black/5 bg-white/90 p-6 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.25)] backdrop-blur-sm dark:border-white/10 dark:bg-white/6",
        className,
      )}
    >
      <p className="text-xs font-medium uppercase tracking-[0.28em] text-neutral-500">
        Hồ sơ đã lưu
      </p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold text-neutral-950 dark:text-white">{profile.displayName}</h3>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
            {labelForGoal(profile.goal)} · {labelForActivityLevel(profile.activityLevel)}
          </p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-white/10 dark:text-white">
          Đã lưu
        </span>
      </div>
      <dl className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-neutral-500">Tuổi</dt>
          <dd className="mt-1 font-medium text-neutral-950 dark:text-white">{profile.age}</dd>
        </div>
        <div>
          <dt className="text-neutral-500">Bữa ăn</dt>
          <dd className="mt-1 font-medium text-neutral-950 dark:text-white">{profile.mealsPerDay}/ngày</dd>
        </div>
        <div>
          <dt className="text-neutral-500">Ngân sách</dt>
          <dd className="mt-1 font-medium text-neutral-950 dark:text-white">
            {profile.budgetAmount
              ? `${formatCurrency(profile.budgetAmount)} · ${labelForBudgetPeriod(profile.budgetPeriod ?? "weekly")}`
              : "Linh hoạt"}
          </dd>
        </div>
        <div>
          <dt className="text-neutral-500">Nấu ăn</dt>
          <dd className="mt-1 font-medium text-neutral-950 dark:text-white">{profile.maxCookingTimeMin} phút</dd>
        </div>
      </dl>
    </section>
  );
}
