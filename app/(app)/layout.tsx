import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { appNavItems } from "@/lib/app-config";

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell
      navItems={appNavItems}
      primaryAction={{ label: "Tạo kế hoạch", href: "/meal-planning/pantry" }}
      secondaryAction={{ label: "Hồ sơ", href: "/profile" }}
      statusLabel="Hôm nay"
      statusValue="Sẵn sàng dùng ngay"
    >
      {children}
    </AppShell>
  );
}
