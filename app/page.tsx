import Link from "next/link";
import { ArrowRight, Bot, HeartPulse, ShoppingBasket, Sparkles, Trees } from "lucide-react";

import { FeatureGrid } from "@/components/marketing/feature-grid";
import { HeroSection } from "@/components/marketing/hero";
import { GlassCard } from "@/components/shared/glass-card";
import { SectionHeader } from "@/components/shared/section-header";
import { outlineLinkButtonClass } from "@/lib/button-link-styles";

const stages = [
  {
    title: "Lap ke hoach tu pantry",
    description:
      "Uu tien nguyen lieu dang co san trong nha, sau do moi tinh phan thuc su can mua them.",
    icon: ShoppingBasket,
  },
  {
    title: "Toi uu ca tuan theo ngan sach",
    description:
      "Can bang calo, macro, thoi gian che bien va chi phi ma van giu duoc tinh thuc te.",
    icon: HeartPulse,
  },
  {
    title: "Giup lich tap thuc te hon",
    description:
      "Tao lich tap hang tuan cho o nha hoac phong gym, co bai thay the khi thieu dung cu.",
    icon: Bot,
  },
  {
    title: "Bien su deu dan thanh tien bo de nhin thay",
    description:
      "Chuoi ngay va cay phat trien giup ban thay tien bo ro rang ma van giu giao dien thanh lich.",
    icon: Trees,
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8">
      <HeroSection
        title="Len ke hoach song lanh manh cho ca tuan voi bua an theo pantry, lich tap thuc te va giao dien cao cap, de dung."
        description="Javiss xem pantry, ngan sach, thoi gian nau, so thich ca nhan va thiet bi tap luyen la du lieu cau truc ngay tu dau. Ket qua la mot san pham thuc su huu dung, khong phai demo AI don thuan."
        primaryAction={{ label: "Mo tong quan", href: "/dashboard" }}
        secondaryAction={{ label: "Tao tai khoan", href: "/auth/sign-up" }}
        stats={[
          { label: "Che do lap ke hoach", value: "Pantry + Ngan sach" },
          { label: "Pham vi tap luyen", value: "O nha + Gym" },
          { label: "Vong lap dong luc", value: "Chuoi ngay + Cay" },
          { label: "Kien truc", value: "Deterministic truoc" },
        ]}
      >
        <GlassCard padding="md" className="grid gap-3">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Cac giai doan thuc hien
          </p>
          <div className="grid gap-2">
            {["Len ke hoach", "Dung khung", "Tinh nang cot loi", "Tich hop", "Hoan thien QA"].map(
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
        eyebrow="Chien luoc san pham"
        title="Logic ung dung co cau truc truoc, diem mo rong AI sau"
        description="Bo khung hien tai da tach route, domain service, data contract va ranh gioi provider de co the nang cap de xuat AI ma khong phai viet lai ung dung."
        action={
          <Link href="/dashboard" className={outlineLinkButtonClass}>
            Kham pha ung dung
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
            Bo khung chat luong startup
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            San sang de demo voi nguoi dung ngay bay gio va mo rong AI sau nay.
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            Bo khung hien tai da co kien truc route, bo lap ke hoach mock theo huong deterministic,
            ranh gioi persistence voi Supabase, validation, UI primitive dung chung,
            va service co the test duoc cho bua an, danh sach mua sam, pantry va tap luyen.
          </p>
        </div>
        <div className="grid gap-3">
          {[
            "Next.js App Router + TypeScript",
            "Tailwind CSS + shadcn/ui + Framer Motion",
            "Khung auth va database voi Supabase",
            "Service tao ke hoach bua an va tap luyen co typing day du",
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
