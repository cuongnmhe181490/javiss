"use client";

import { motion } from "framer-motion";
import { Flower2, Leaf, Sprout, TreePine } from "lucide-react";

import { GlassCard } from "@/components/shared/glass-card";
import { cn } from "@/lib/utils";

type TreeStage = "seed" | "sprout" | "young_tree" | "mature_tree" | "flowering_tree";

type TreeProgressProps = {
  stage: TreeStage;
  streak: number;
  bestStreak: number;
  weeklyConsistency: number;
  progress: number;
  className?: string;
};

const stageMeta: Record<
  TreeStage,
  {
    label: string;
    description: string;
    Icon: typeof Sprout;
  }
> = {
  seed: {
    label: "Seed",
    description: "The habit is starting to anchor.",
    Icon: Sprout,
  },
  sprout: {
    label: "Sprout",
    description: "Consistency is showing visible growth.",
    Icon: Leaf,
  },
  young_tree: {
    label: "Young tree",
    description: "The routine is taking root.",
    Icon: TreePine,
  },
  mature_tree: {
    label: "Mature tree",
    description: "Reliable momentum with stable rewards.",
    Icon: TreePine,
  },
  flowering_tree: {
    label: "Flowering tree",
    description: "A durable system with strong follow-through.",
    Icon: Flower2,
  },
};

const treeStages: TreeStage[] = [
  "seed",
  "sprout",
  "young_tree",
  "mature_tree",
  "flowering_tree",
];

export function TreeProgress({
  stage,
  streak,
  bestStreak,
  weeklyConsistency,
  progress,
  className,
}: TreeProgressProps) {
  const meta = stageMeta[stage];
  const stageIndex = treeStages.indexOf(stage);

  return (
    <GlassCard
      padding="md"
      className={cn("overflow-hidden border-white/80", className)}
    >
      <div className="grid gap-6 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
        <div className="relative flex min-h-[18rem] items-center justify-center overflow-hidden rounded-[1.5rem] border border-emerald-100/80 bg-[radial-gradient(circle_at_top,rgba(201,241,224,0.65),rgba(245,251,247,0.95))]">
          <div className="premium-grid absolute inset-0 opacity-45" />
          <div className="relative flex h-full w-full items-center justify-center">
            <div className="relative flex h-56 w-40 items-end justify-center">
              <motion.div
                className="absolute bottom-0 h-32 w-4 rounded-full bg-[linear-gradient(180deg,rgba(92,70,51,0.9),rgba(123,93,66,0.72))] shadow-[0_10px_24px_-12px_rgba(92,70,51,0.65)]"
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ transformOrigin: "bottom" }}
              />
              <motion.div
                className="absolute bottom-24 h-28 w-28 rounded-[50%] bg-[radial-gradient(circle_at_30%_30%,rgba(116,212,168,0.92),rgba(58,151,113,0.88))]"
                initial={{ scale: 0.85, opacity: 0.75 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
              <motion.div
                className="absolute bottom-[8.5rem] left-8 h-12 w-12 rounded-full bg-[rgba(162,225,192,0.92)] blur-[2px]"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-[7.5rem] right-9 h-10 w-10 rounded-full bg-[rgba(123,214,180,0.88)] blur-[1px]"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700 shadow-sm">
              <meta.Icon className="size-5" />
            </div>
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                Tree stage
              </p>
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                {meta.label}
              </h3>
            </div>
          </div>

          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            {meta.description}
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            <StatRow label="Current streak" value={`${streak} days`} />
            <StatRow label="Best streak" value={`${bestStreak} days`} />
            <StatRow label="Weekly consistency" value={`${weeklyConsistency}%`} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">Growth progress</span>
              <span className="text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-emerald-50">
              <motion.div
                className="h-full rounded-full bg-[linear-gradient(90deg,rgba(76,175,121,0.95),rgba(138,216,181,0.95))]"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, progress)}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {treeStages.map((item, index) => {
              const active = index <= stageIndex;
              return (
                <span
                  key={item}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium capitalize tracking-wide",
                    active
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-border bg-white/70 text-muted-foreground",
                  )}
                >
                  {item.replaceAll("_", " ")}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-white/80 bg-white/70 px-4 py-3">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-base font-semibold tracking-tight text-foreground">
        {value}
      </p>
    </div>
  );
}
