"use client";

import type { ReactNode } from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sprout } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { GlassCard } from "@/components/shared/glass-card";
import { cn } from "@/lib/utils";

type HeroAction = {
  label: string;
  href: string;
};

type HeroStat = {
  label: string;
  value: string;
};

type HeroSectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  stats?: HeroStat[];
  children?: ReactNode;
  className?: string;
};

export function HeroSection({
  eyebrow = "Tro ly song lanh manh",
  title,
  description,
  primaryAction,
  secondaryAction,
  stats = [],
  children,
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/72 p-6 shadow-[0_24px_72px_-28px_rgba(12,18,28,0.18)] sm:p-8 lg:p-10",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(110,208,174,0.16),transparent_30%),radial-gradient(circle_at_90%_10%,rgba(244,250,246,0.95),transparent_35%)]" />
      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-emerald-800">
            <Sprout className="size-3.5" />
            {eyebrow}
          </div>

          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance text-foreground md:text-6xl">
              {title}
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {primaryAction ? (
              <Link href={primaryAction.href} className={buttonVariants({ size: "lg" })}>
                {primaryAction.label}
                <ArrowRight className="ml-2 size-4" />
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

          <div className="grid gap-3 sm:grid-cols-3">
            <FeatureBadge text="Uu tien pantry" />
            <FeatureBadge text="Theo ngan sach" />
            <FeatureBadge text="Dong bo tap luyen" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
          className="space-y-4"
        >
          <GlassCard padding="md" tone="accent" className="grid gap-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Hom nay
                </p>
                <p className="text-lg font-semibold tracking-tight text-foreground">
                  Goi y muot ma va thuc te
                </p>
              </div>
              <div className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
                San sang
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.2rem] border border-white/80 bg-white/75 p-4"
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-xl font-semibold tracking-tight text-foreground">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-[1.4rem] border border-emerald-100 bg-[linear-gradient(180deg,rgba(244,250,246,0.96),rgba(255,255,255,0.9))] p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-900">
                <CheckCircle2 className="size-4" />
                Thiet ke de de hanh dong, khong phai de trinh dien
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Tao ke hoach theo cau truc ro rang, lien ket logic mua sam voi pantry,
                va chi hien thi buoc tiep theo thuc su can thiet.
              </p>
            </div>
          </GlassCard>

          {children ? <div>{children}</div> : null}
        </motion.div>
      </div>
    </section>
  );
}

function FeatureBadge({ text }: { text: string }) {
  return (
    <div className="rounded-full border border-white/80 bg-white/80 px-3 py-2 text-center text-sm font-medium text-foreground shadow-sm">
      {text}
    </div>
  );
}
