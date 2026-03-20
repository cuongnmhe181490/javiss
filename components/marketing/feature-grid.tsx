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
    title: "Bữa ăn bám pantry",
    description: "Ưu tiên món từ nguyên liệu sẵn có.",
    icon: ShoppingBasket,
  },
  {
    title: "Ngân sách rõ ràng",
    description: "Tính tiền từ nguyên liệu, không ước lượng mơ hồ.",
    icon: ChefHat,
  },
  {
    title: "Lịch tập đúng thiết bị",
    description: "Ở nhà hay phòng gym đều có phương án hợp lý.",
    icon: Dumbbell,
  },
  {
    title: "Tiến độ dễ theo dõi",
    description: "Chuỗi ngày và cây phát triển vừa đủ tinh tế.",
    icon: Sprout,
  },
];

export function FeatureGrid() {
  return (
    <div className="space-y-5">
      <SectionHeader
        eyebrow="Giá trị cốt lõi"
        title="Ít chữ. Rõ việc. Dễ bám."
        description="Một nơi để ăn, tập và mua sắm."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <GlassCard key={feature.title} padding="md" className="interactive-card h-full">
            <div className="flex size-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white">
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
