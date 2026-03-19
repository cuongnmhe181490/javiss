import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  tone?: "default" | "soft" | "accent";
  padding?: "none" | "sm" | "md" | "lg";
};

const toneClasses: Record<NonNullable<GlassCardProps["tone"]>, string> = {
  default: "glass-surface",
  soft: "border border-white/60 bg-white/58 shadow-[0_14px_48px_-24px_rgba(12,18,28,0.14)] backdrop-blur-lg",
  accent:
    "border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(243,249,246,0.76))] shadow-[0_20px_56px_-28px_rgba(12,18,28,0.18)] backdrop-blur-xl",
};

const paddingClasses: Record<NonNullable<GlassCardProps["padding"]>, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function GlassCard({
  className,
  tone = "default",
  padding = "md",
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] text-foreground",
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-white/70",
        toneClasses[tone],
        paddingClasses[padding],
        className,
      )}
      {...props}
    />
  );
}
