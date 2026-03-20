"use client";

import type { ReactNode } from "react";

import { motion } from "framer-motion";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { GlassCard } from "@/components/shared/glass-card";
import { cn } from "@/lib/utils";

type IntroAction = {
  label: string;
  href: string;
};

type PageIntroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryAction?: IntroAction;
  secondaryAction?: IntroAction;
  children?: ReactNode;
  className?: string;
};

export function PageIntro({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  children,
  className,
}: PageIntroProps) {
  return (
    <GlassCard
      padding="lg"
      className={cn(
        "relative overflow-hidden border-white/75 bg-white/76",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(107,196,166,0.14),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(235,246,241,0.95),transparent_36%)]" />
      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-5"
        >
          {eyebrow ? (
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              {eyebrow}
            </p>
          ) : null}
          <div className="space-y-3">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance text-foreground md:text-5xl">
              {title}
            </h1>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {primaryAction ? (
              <Link
                href={primaryAction.href}
                className={buttonVariants({ size: "lg" })}
              >
                {primaryAction.label}
              </Link>
            ) : null}
            {secondaryAction ? (
              <Link
                href={secondaryAction.href}
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                {secondaryAction.label}
              </Link>
            ) : null}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
          className="grid gap-4 self-center"
        >
          {children}
        </motion.div>
      </div>
    </GlassCard>
  );
}
