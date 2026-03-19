import type { AppNavItem } from "@/components/layout/app-shell";

export const appNavItems: AppNavItem[] = [
  { label: "Dashboard", href: "/dashboard", description: "Overview and streaks", exact: true },
  { label: "Meals", href: "/meal-planning", description: "Pantry and budget modes" },
  { label: "Shopping", href: "/shopping-list", description: "Aggregated grocery list" },
  { label: "Workout", href: "/workout-planning", description: "Equipment-based training" },
  { label: "Pantry", href: "/pantry", description: "Inventory and expiry" },
  { label: "Profile", href: "/profile", description: "Goals and preferences" },
  { label: "Settings", href: "/settings", description: "Persistence and app state" },
];
