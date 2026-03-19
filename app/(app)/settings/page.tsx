import { GlassCard } from "@/components/shared/glass-card";
import { PageIntro } from "@/components/shared/page-intro";
import { hasSupabaseCredentials } from "@/lib/env";
import { getDashboardState } from "@/lib/demo-data";

export default function SettingsPage() {
  const { settings } = getDashboardState();
  const supabaseReady = hasSupabaseCredentials();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Settings"
        title="App preferences and persistence wiring."
        description="This page shows the scaffold status for Supabase auth and database integration as well as the stored user-facing settings contract."
        primaryAction={{ label: "Back to dashboard", href: "/dashboard" }}
        secondaryAction={{ label: "Review profile", href: "/profile" }}
      />

      <section className="grid gap-4 lg:grid-cols-2">
        <GlassCard padding="md">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            App settings
          </p>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p><span className="font-medium text-foreground">Theme:</span> {settings.theme}</p>
            <p><span className="font-medium text-foreground">Measurement:</span> {settings.measurementSystem}</p>
            <p><span className="font-medium text-foreground">Notifications:</span> {settings.notificationsEnabled ? "Enabled" : "Disabled"}</p>
            <p><span className="font-medium text-foreground">Weekly check-in:</span> {settings.weeklyCheckInDay}</p>
            <p><span className="font-medium text-foreground">Tree animation:</span> {settings.treeAnimationEnabled ? "Enabled" : "Disabled"}</p>
          </div>
        </GlassCard>
        <GlassCard padding="md">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Integration status
          </p>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p><span className="font-medium text-foreground">Supabase credentials:</span> {supabaseReady ? "Configured" : "Not configured"}</p>
            <p><span className="font-medium text-foreground">SSR clients:</span> Browser, server, admin, and middleware utilities scaffolded</p>
            <p><span className="font-medium text-foreground">SQL schema:</span> Profiles, pantry, generated plans, streaks, settings, and RLS policies defined</p>
            <p><span className="font-medium text-foreground">Planner state:</span> Using deterministic mock generators until provider credentials are added</p>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
