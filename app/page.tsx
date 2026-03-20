import Link from "next/link";
import { ArrowRight, HeartPulse, ShoppingBasket, Sparkles, Trees } from "lucide-react";

import { FeatureGrid } from "@/components/marketing/feature-grid";
import { HeroSection } from "@/components/marketing/hero";
import { GlassCard } from "@/components/shared/glass-card";
import { SectionHeader } from "@/components/shared/section-header";
import { outlineLinkButtonClass } from "@/lib/button-link-styles";

const stages = [
  {
    title: "Lập từ pantry",
    description: "Ưu tiên món từ đồ sẵn có.",
    icon: ShoppingBasket,
  },
  {
    title: "Bám ngân sách tuần",
    description: "Tính tiền từ nguyên liệu thật.",
    icon: HeartPulse,
  },
  {
    title: "Giữ nhịp đều",
    description: "Theo dõi chuỗi ngày và tiến độ.",
    icon: Trees,
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8">
      <HeroSection
        title="Lập kế hoạch ăn uống và tập luyện gọn, đẹp, dùng được mỗi ngày."
        description="Từ pantry, ngân sách đến lịch tập, mọi quyết định đều đi theo dữ liệu cá nhân của bạn."
        primaryAction={{ label: "Mở tổng quan", href: "/dashboard" }}
        secondaryAction={{ label: "Tạo tài khoản", href: "/auth/sign-up" }}
        stats={[
          { label: "Chế độ", value: "Pantry + Ngân sách" },
          { label: "Tập luyện", value: "Ở nhà + Gym" },
          { label: "Động lực", value: "Chuỗi ngày + Cây" },
          { label: "Mua sắm", value: "Tự gộp theo tuần" },
        ]}
      >
        <GlassCard padding="md" className="grid gap-3">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Bắt đầu
          </p>
          <div className="grid gap-2">
            {["Nhập pantry", "Chọn mục tiêu", "Xem thực đơn tuần"].map((step, index) => (
              <div
                key={step}
                className="interactive-card flex items-center justify-between rounded-[1.15rem] border border-white/80 bg-white/75 px-4 py-3 dark:border-white/10 dark:bg-white/8"
              >
                <span className="text-sm font-medium text-foreground">{step}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  0{index + 1}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </HeroSection>

      <FeatureGrid />

      <SectionHeader
        eyebrow="Dễ dùng mỗi ngày"
        title="Ít chữ hơn. Quyết định nhanh hơn."
        description="Chỉ giữ lại những gì bạn cần để ăn, tập và mua sắm."
        action={
          <Link href="/dashboard" className={outlineLinkButtonClass}>
            Khám phá ứng dụng
            <ArrowRight className="ml-2 size-4" />
          </Link>
        }
      />

      <section className="grid gap-4 md:grid-cols-3">
        {stages.map((stage) => (
          <GlassCard key={stage.title} padding="md" className="interactive-card h-full">
            <div className="flex size-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white">
              <stage.icon className="size-5" />
            </div>
            <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
              {stage.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {stage.description}
            </p>
          </GlassCard>
        ))}
      </section>

      <GlassCard padding="lg" className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-3">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
            Sẵn sàng dùng
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            Có thể dùng ngay cho bữa ăn, mua sắm và tập luyện.
          </h2>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Mỗi phần đều hướng về hành động tiếp theo, không làm bạn phải đọc quá nhiều.
          </p>
        </div>
        <div className="grid gap-3">
          {[
            "Lập thực đơn 7 ngày",
            "Tự trừ pantry khi mua sắm",
            "Theo dõi chi phí tuần",
            "Lịch tập rõ theo ngày",
          ].map((item) => (
            <div
              key={item}
              className="interactive-card rounded-[1.2rem] border border-white/80 bg-white/78 px-4 py-3 text-sm font-medium text-foreground dark:border-white/10 dark:bg-white/8"
            >
              <Sparkles className="mr-2 inline size-4 text-emerald-700 dark:text-emerald-300" />
              {item}
            </div>
          ))}
        </div>
      </GlassCard>
    </main>
  );
}
