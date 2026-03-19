import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { appNavItems } from "@/lib/app-config";

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell
      navItems={appNavItems}
      primaryAction={{ label: "Generate plan", href: "/meal-planning/pantry" }}
      secondaryAction={{ label: "Profile", href: "/profile" }}
      statusLabel="Scaffold"
      statusValue="Deterministic planners wired"
    >
      {children}
    </AppShell>
  );
}
