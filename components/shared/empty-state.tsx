import type { ComponentType, ReactNode } from "react";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { GlassCard } from "@/components/shared/glass-card";
import { cn } from "@/lib/utils";

type EmptyStateAction = {
  label: string;
  href: string;
};

type EmptyStateProps = {
  icon?: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  primaryAction?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  children?: ReactNode;
  className?: string;
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  children,
  className,
}: EmptyStateProps) {
  return (
    <GlassCard
      padding="lg"
      className={cn("mx-auto max-w-xl text-center", className)}
    >
      <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700 shadow-sm">
        {Icon ? <Icon className="size-6" /> : null}
      </div>
      <div className="mt-5 space-y-2">
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mx-auto max-w-md text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
      {children ? <div className="mt-5">{children}</div> : null}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
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
    </GlassCard>
  );
}
