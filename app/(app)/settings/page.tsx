import { saveSettingsAction } from "@/app/(app)/actions";
import { GlassCard } from "@/components/shared/glass-card";
import { PageIntro } from "@/components/shared/page-intro";
import { hasSupabaseCredentials } from "@/lib/env";
import { getDashboardState } from "@/lib/demo-data";

export default async function SettingsPage() {
  const { settings } = await getDashboardState();
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
          <form action={saveSettingsAction} className="space-y-4">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Demo persistence
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Cac tuy chon duoi day dang duoc luu bang cookie server-side de ban co the test persistence ngay tren ban deploy hien tai.
              </p>
            </div>
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Theme</span>
              <select
                name="theme"
                defaultValue={settings.theme}
                className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm text-neutral-950 outline-none transition focus:border-neutral-400"
              >
                <option value="light">Light</option>
                <option value="system">System</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Measurement system</span>
              <select
                name="measurementSystem"
                defaultValue={settings.measurementSystem}
                className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm text-neutral-950 outline-none transition focus:border-neutral-400"
              >
                <option value="metric">Metric</option>
                <option value="imperial">Imperial</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Weekly check-in day</span>
              <select
                name="weeklyCheckInDay"
                defaultValue={settings.weeklyCheckInDay}
                className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm text-neutral-950 outline-none transition focus:border-neutral-400"
              >
                {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-700">
              <input type="checkbox" name="notificationsEnabled" defaultChecked={settings.notificationsEnabled} />
              Notifications enabled
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-700">
              <input type="checkbox" name="treeAnimationEnabled" defaultChecked={settings.treeAnimationEnabled} />
              Tree animation enabled
            </label>
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              Save settings
            </button>
          </form>
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
