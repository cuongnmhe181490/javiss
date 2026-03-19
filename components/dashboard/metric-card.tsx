import type { LucideIcon } from "lucide-react";

import { GlassCard } from "@/components/shared/glass-card";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  label: string;
  value: string;
  detail?: string;
  delta?: string;
  icon?: LucideIcon;
  accent?: "default" | "positive" | "warning";
  className?: string;
};

const accentStyles: Record<NonNullable<MetricCardProps["accent"]>, string> = {
  default: "text-foreground",
  positive: "text-emerald-700",
  warning: "text-amber-700",
};

export function MetricCard({
  label,
  value,
  detail,
  delta,
  icon: Icon,
  accent = "default",
  className,
}: MetricCardProps) {
  return (
    <div className={className}>
      <GlassCard padding="md" className="h-full">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {label}
            </p>
            <div className="flex items-baseline gap-3">
              <span className={cn("text-2xl font-semibold tracking-tight", accentStyles[accent])}>
                {value}
              </span>
              {delta ? (
                <span className="text-xs font-medium text-emerald-700">
                  {delta}
                </span>
              ) : null}
            </div>
          </div>
          {Icon ? (
            <div className="flex size-11 items-center justify-center rounded-2xl border border-white/75 bg-white/80 text-primary shadow-sm">
              <Icon className="size-5" />
            </div>
          ) : null}
        </div>
        {detail ? (
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            {detail}
          </p>
        ) : null}
      </GlassCard>
    </div>
  );
}
