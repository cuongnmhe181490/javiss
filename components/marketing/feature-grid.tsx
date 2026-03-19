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
    title: "Meal plans that respect pantry reality",
    description: "Use what is already at home first, then fill gaps with a normalized shopping list.",
    icon: ShoppingBasket,
  },
  {
    title: "Budget-aware weekly planning",
    description: "Hold the line on cost, prep time, and nutrition without falling back to a generic output.",
    icon: ChefHat,
  },
  {
    title: "Workout plans that fit the equipment you have",
    description: "Home and gym flows stay realistic with substitutions and progression logic baked in.",
    icon: Dumbbell,
  },
  {
    title: "Consistency visuals that stay elegant",
    description: "Streaks and tree growth reinforce progress without slipping into childish game UI.",
    icon: Sprout,
  },
];

export function FeatureGrid() {
  return (
    <div className="space-y-5">
      <SectionHeader
        eyebrow="Core product value"
        title="A calm system for daily decisions"
        description="The interface should remove friction: one place for plans, one place for pantry truth, and one place to see consistency."
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
