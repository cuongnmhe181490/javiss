import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { appNavItems } from "@/lib/app-config";

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell
      navItems={appNavItems}
      primaryAction={{ label: "Tao ke hoach", href: "/meal-planning/pantry" }}
      secondaryAction={{ label: "Ho so", href: "/profile" }}
      statusLabel="Trang thai"
      statusValue="Da noi planner deterministic"
    >
      {children}
    </AppShell>
  );
}
