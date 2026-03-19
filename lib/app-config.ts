import type { AppNavItem } from "@/components/layout/app-shell";

export const appNavItems: AppNavItem[] = [
  { label: "Tong quan", href: "/dashboard", description: "Tien do va chuoi ngay", exact: true },
  { label: "Bua an", href: "/meal-planning", description: "Theo pantry va ngan sach" },
  { label: "Mua sam", href: "/shopping-list", description: "Danh sach can mua" },
  { label: "Tap luyen", href: "/workout-planning", description: "Lich tap theo thiet bi" },
  { label: "Pantry", href: "/pantry", description: "Nguyen lieu va han dung" },
  { label: "Ho so", href: "/profile", description: "Muc tieu va so thich" },
  { label: "Cai dat", href: "/settings", description: "Trang thai luu du lieu" },
];
