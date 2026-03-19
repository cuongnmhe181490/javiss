import { ChefHat, Dumbbell, ShoppingBasket, Sprout } from "lucide-react";

import { GlassCard } from "@/components/shared/glass-card";
import { SectionHeader } from "@/components/shared/section-header";

type Feature = {
  title: string;
  description: string;
  icon: typeof ChefHat;
};

const features: Feature[] = [
  {
    title: "Thuc don ton trong pantry thuc te",
    description: "Uu tien nguyen lieu dang co san, sau do moi bo sung danh sach can mua da duoc chuan hoa.",
    icon: ShoppingBasket,
  },
  {
    title: "Lap ke hoach theo ngan sach ca tuan",
    description: "Can bang chi phi, thoi gian nau va dinh duong ma khong bien thanh de xuat chung chung.",
    icon: ChefHat,
  },
  {
    title: "Lich tap phu hop dung cu ban co",
    description: "Ca o nha lan phong gym deu thuc te hon nho logic thay the bai tap va tien trinh ro rang.",
    icon: Dumbbell,
  },
  {
    title: "Hien thi tien do thanh lich",
    description: "Chuoi ngay va cay phat trien tao dong luc ma van giu phong cach truong thanh, de nhin.",
    icon: Sprout,
  },
];

export function FeatureGrid() {
  return (
    <div className="space-y-5">
      <SectionHeader
        eyebrow="Gia tri cot loi"
        title="Mot he thong nhe nhang cho quyet dinh moi ngay"
        description="Giao dien duoc thiet ke de giam ma sat: mot noi cho ke hoach, mot noi cho pantry, va mot noi de thay tien do."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <GlassCard key={feature.title} padding="md" className="h-full">
            <div className="flex size-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700 shadow-sm">
              <feature.icon className="size-5" />
            </div>
            <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {feature.description}
            </p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
