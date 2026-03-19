import Link from "next/link";
import { ArrowRight, Bot, HeartPulse, ShoppingBasket, Sparkles, Trees } from "lucide-react";

import { FeatureGrid } from "@/components/marketing/feature-grid";
import { HeroSection } from "@/components/marketing/hero";
import { GlassCard } from "@/components/shared/glass-card";
import { SectionHeader } from "@/components/shared/section-header";
import { outlineLinkButtonClass } from "@/lib/button-link-styles";

const stages = [
  {
    title: "Plan from pantry",
    description:
      "Use what is already at home first, then calculate only what still needs to be bought.",
    icon: ShoppingBasket,
  },
  {
    title: "Shape the week around budget",
    description:
      "Balance calories, macros, prep time, and cost without dropping into generic AI output.",
    icon: HeartPulse,
  },
  {
    title: "Keep workouts realistic",
    description:
      "Generate weekly sessions for home or gym with substitutions when equipment is limited.",
    icon: Bot,
  },
  {
    title: "Turn consistency into visible progress",
    description:
      "Elegant streak tracking and tree growth make adherence tangible without becoming childish.",
    icon: Trees,
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8">
      <HeroSection
        title="Plan healthier weeks with pantry-aware meals, realistic workouts, and a calm premium interface."
        description="Javiss treats pantry items, budget, prep time, profile preferences, and workout equipment as structured inputs first. The result is a product-shaped planning system, not an LLM demo."
        primaryAction={{ label: "Open Dashboard", href: "/dashboard" }}
        secondaryAction={{ label: "Create Account", href: "/auth/sign-up" }}
        stats={[
          { label: "Planning modes", value: "Pantry + Budget" },
          { label: "Workout coverage", value: "Home + Gym" },
          { label: "Consistency loop", value: "Streak + Tree" },
          { label: "Architecture", value: "Deterministic-first" },
        ]}
      >
        <GlassCard padding="md" className="grid gap-3">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Implementation phases
          </p>
          <div className="grid gap-2">
            {["Planning", "Scaffolding", "Core features", "Integration", "QA polish"].map(
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
        eyebrow="Product strategy"
        title="Structured app logic first, AI extension points second"
        description="The scaffold already separates route composition, domain services, data contracts, and the future provider boundary so recommendations can be upgraded without rewriting the app."
        action={
          <Link href="/dashboard" className={outlineLinkButtonClass}>
            Explore the app
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
            Startup-grade scaffold
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            Built to be shown to users now and extended with AI providers later.
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            The current scaffold includes route architecture, deterministic mock planners,
            Supabase persistence boundaries, validation, shared premium UI primitives, and
            testable domain services for meals, shopping lists, pantry matching, and workouts.
          </p>
        </div>
        <div className="grid gap-3">
          {[
            "Next.js App Router + TypeScript",
            "Tailwind CSS + shadcn/ui + Framer Motion",
            "Supabase auth and database scaffold",
            "Typed meal and workout generation services",
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
