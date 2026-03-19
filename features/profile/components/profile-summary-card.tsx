"use client";

import { cn } from "@/lib/utils";
import type { ProfileRecord } from "@/types/profile";

type ProfileSummaryCardProps = {
  profile: ProfileRecord;
  className?: string;
};

export function ProfileSummaryCard({ profile, className }: ProfileSummaryCardProps) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-black/5 bg-white/90 p-6 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.25)] backdrop-blur-sm",
        className,
      )}
    >
      <p className="text-xs font-medium uppercase tracking-[0.28em] text-neutral-500">
        Ho so luu tru
      </p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold text-neutral-950">{profile.displayName}</h3>
          <p className="mt-1 text-sm text-neutral-600">
            {profile.goal.replaceAll("_", " ")} / {profile.activityLevel.replaceAll("_", " ")}
          </p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          Da luu
        </span>
      </div>
      <dl className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-neutral-500">Tuoi</dt>
          <dd className="mt-1 font-medium text-neutral-950">{profile.age}</dd>
        </div>
        <div>
          <dt className="text-neutral-500">Bua an</dt>
          <dd className="mt-1 font-medium text-neutral-950">{profile.mealsPerDay}/ngay</dd>
        </div>
        <div>
          <dt className="text-neutral-500">Ngan sach</dt>
          <dd className="mt-1 font-medium text-neutral-950">
            {profile.budgetAmount ? `${profile.budgetAmount} / ${profile.budgetPeriod}` : "Linh hoat"}
          </dd>
        </div>
        <div>
          <dt className="text-neutral-500">Nau an</dt>
          <dd className="mt-1 font-medium text-neutral-950">{profile.maxCookingTimeMin} phut</dd>
        </div>
      </dl>
    </section>
  );
}
