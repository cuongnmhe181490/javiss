import Link from "next/link";
import { ArrowRight, Bot, HeartPulse, ShoppingBasket, Sparkles, Trees } from "lucide-react";

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
    title: "Lịch tập đúng ngữ cảnh",
    description: "Ở nhà hay gym đều có bài phù hợp.",
    icon: Bot,
  },
  {
    title: "Tiến độ nhìn thấy được",
    description: "Chuỗi ngày và cây phát triển đủ tinh tế.",
    icon: Trees,
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8">
      <HeroSection
        title="Lập kế hoạch ăn uống và tập luyện gọn, đẹp, dùng được mỗi ngày."
        description="Từ pantry, ngân sách đến lịch tập, mọi quyết định đều đi theo dữ liệu có cấu trúc."
        primaryAction={{ label: "Mở tổng quan", href: "/dashboard" }}
        secondaryAction={{ label: "Tạo tài khoản", href: "/auth/sign-up" }}
        stats={[
          { label: "Chế độ", value: "Pantry + Ngân sách" },
          { label: "Tập luyện", value: "Ở nhà + Gym" },
          { label: "Động lực", value: "Chuỗi ngày + Cây" },
          { label: "Kiến trúc", value: "Deterministic trước" },
        ]}
      >
        <GlassCard padding="md" className="grid gap-3">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Lộ trình
          </p>
          <div className="grid gap-2">
            {["Lập kế hoạch", "Dựng khung", "Tính năng cốt lõi", "Tích hợp", "Hoàn thiện QA"].map(
              (step, index) => (
                <div
                  key={step}
                  className="flex items-center justify-between rounded-[1.15rem] border border-white/80 bg-white/75 px-4 py-3"
                >
                  <span className="text-sm font-medium text-foreground">{step}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
              ),
            )}
          </div>
        </GlassCard>
      </HeroSection>

      <FeatureGrid />

      <SectionHeader
        eyebrow="Chiến lược"
        title="Logic có cấu trúc trước. AI mở rộng sau."
        description="Ưu tiên workflow rõ ràng, typed và dễ bảo trì."
        action={
          <Link href="/dashboard" className={outlineLinkButtonClass}>
            Khám phá ứng dụng
            <ArrowRight className="ml-2 size-4" />
          </Link>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stages.map((stage) => (
          <GlassCard key={stage.title} padding="md" className="h-full">
            <div className="flex size-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700 shadow-sm">
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
            Nền tảng hiện tại
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            Đủ tốt để demo, đủ sạch để mở rộng.
          </h2>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Kiến trúc route, planner, validation và persistence boundary đã sẵn để đi tiếp vào bản production.
          </p>
        </div>
        <div className="grid gap-3">
          {[
            "Next.js App Router + TypeScript",
            "Tailwind CSS + shadcn/ui + Framer Motion",
            "Khung auth và database với Supabase",
            "Service tạo kế hoạch bữa ăn và tập luyện có typing đầy đủ",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[1.2rem] border border-white/80 bg-white/78 px-4 py-3 text-sm font-medium text-foreground"
            >
              <Sparkles className="mr-2 inline size-4 text-emerald-700" />
              {item}
            </div>
          ))}
        </div>
      </GlassCard>
    </main>
  );
}
