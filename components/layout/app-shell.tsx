"use client";

import type { ReactNode } from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { GlassCard } from "@/components/shared/glass-card";
import { cn } from "@/lib/utils";

export type AppNavItem = {
  label: string;
  href: string;
  description?: string;
  exact?: boolean;
};

type AppShellProps = {
  brandName?: string;
  tagline?: string;
  navItems: AppNavItem[];
  primaryAction?: AppNavItem;
  secondaryAction?: AppNavItem;
  statusLabel?: string;
  statusValue?: string;
  children: ReactNode;
  className?: string;
};

export function AppShell({
  brandName = "Javiss",
  tagline = "Ăn uống, tập luyện và theo dõi đều đặn.",
  navItems,
  primaryAction,
  secondaryAction,
  statusLabel = "Hôm nay",
  statusValue = "Kế hoạch đã sẵn sàng",
  children,
  className,
}: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className={cn("mx-auto w-full max-w-[1600px] px-4 py-4 sm:px-6 lg:px-8", className)}>
      <div className="grid gap-4 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <GlassCard padding="md" className="sticky top-4 space-y-6">
            <div className="space-y-2">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                {brandName}
              </p>
              <p className="max-w-xs text-sm leading-6 text-muted-foreground">
                {tagline}
              </p>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const active = isActive(pathname, item.href, item.exact);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-start gap-3 rounded-[1.1rem] border px-3 py-3 transition-all duration-200",
                      active
                        ? "border-white/85 bg-[linear-gradient(180deg,rgba(244,250,246,0.96),rgba(255,255,255,0.82))] text-emerald-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_18px_40px_-26px_rgba(28,63,51,0.35)] dark:border-white/10 dark:bg-white/8 dark:text-white"
                        : "border-transparent bg-white/52 text-foreground hover:border-white/70 hover:bg-white/78 dark:bg-white/6 dark:hover:border-white/10 dark:hover:bg-white/10",
                    )}
                  >
                    <span className="mt-1 size-2 rounded-full bg-current opacity-60" />
                    <span className="space-y-0.5">
                      <span className="block text-sm font-medium">{item.label}</span>
                      {item.description ? (
                        <span className="block text-xs leading-5 text-muted-foreground">
                          {item.description}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="space-y-3 rounded-[1.4rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(242,248,244,0.92))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.74),0_18px_40px_-28px_rgba(16,24,36,0.2)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_48px_-30px_rgba(0,0,0,0.55)]">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                {statusLabel}
              </p>
              <p className="text-lg font-semibold tracking-tight text-foreground">
                {statusValue}
              </p>
            </div>
          </GlassCard>
        </aside>

        <div className="space-y-4">
          <header className="glass-surface flex flex-wrap items-center justify-between gap-3 rounded-[1.6rem] px-4 py-3 sm:px-5">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground lg:hidden">
                {brandName}
              </p>
              <p className="text-sm text-muted-foreground">{tagline}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {secondaryAction ? (
                <Link
                  href={secondaryAction.href}
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  {secondaryAction.label}
                </Link>
              ) : null}
              {primaryAction ? (
                <Link href={primaryAction.href} className={buttonVariants({ size: "sm" })}>
                  {primaryAction.label}
                </Link>
              ) : null}
            </div>
          </header>

          <main className="space-y-4">{children}</main>
        </div>
      </div>

      <motion.nav
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.04 }}
        className="glass-surface fixed inset-x-4 bottom-4 z-40 grid grid-cols-2 gap-2 rounded-[1.4rem] p-2 shadow-[0_18px_60px_-24px_rgba(12,18,28,0.24)] lg:hidden"
      >
        {navItems.slice(0, 4).map((item) => {
          const active = isActive(pathname, item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-[1rem] px-3 py-2 text-center text-sm font-medium transition-colors",
                active
                  ? "bg-emerald-50 text-emerald-900 dark:bg-white/12 dark:text-white"
                  : "text-muted-foreground hover:bg-white/80 hover:text-foreground dark:hover:bg-white/10 dark:hover:text-white",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}

function isActive(pathname: string | null, href: string, exact?: boolean) {
  if (!pathname) {
    return false;
  }

  if (exact) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
