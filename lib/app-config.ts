import type { AppNavItem } from "@/components/layout/app-shell";

export const appNavItems: AppNavItem[] = [
  { label: "Tổng quan", href: "/dashboard", description: "Hôm nay", exact: true },
  { label: "Bữa ăn", href: "/meal-planning", description: "Pantry và ngân sách" },
  { label: "Mua sắm", href: "/shopping-list", description: "Những món cần mua" },
  { label: "Tập luyện", href: "/workout-planning", description: "Lịch theo thiết bị" },
  { label: "Pantry", href: "/pantry", description: "Nguyên liệu sẵn có" },
  { label: "Hồ sơ", href: "/profile", description: "Mục tiêu cá nhân" },
  { label: "Cài đặt", href: "/settings", description: "Giao diện và vùng" },
];
