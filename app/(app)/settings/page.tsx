import { saveSettingsAction } from "@/app/(app)/actions";
import { GlassCard } from "@/components/shared/glass-card";
import { PageIntro } from "@/components/shared/page-intro";
import { getDashboardState } from "@/lib/demo-data";
import { hasSupabaseCredentials } from "@/lib/env";

const weekdayLabels: Record<string, string> = {
  monday: "Thu hai",
  tuesday: "Thu ba",
  wednesday: "Thu tu",
  thursday: "Thu nam",
  friday: "Thu sau",
  saturday: "Thu bay",
  sunday: "Chu nhat",
};

export default async function SettingsPage() {
  const { settings } = await getDashboardState();
  const supabaseReady = hasSupabaseCredentials();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Cai dat"
        title="Tuy chon ung dung va trang thai ket noi persistence."
        description="Trang nay hien thi muc do san sang cua scaffold cho auth va database Supabase, cung hop dong settings dang duoc luu cho nguoi dung."
        primaryAction={{ label: "Ve tong quan", href: "/dashboard" }}
        secondaryAction={{ label: "Xem ho so", href: "/profile" }}
      />

      <section className="grid gap-4 lg:grid-cols-2">
        <GlassCard padding="md">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Cai dat ung dung
          </p>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p><span className="font-medium text-foreground">Giao dien:</span> {settings.theme}</p>
            <p><span className="font-medium text-foreground">He don vi:</span> {settings.measurementSystem}</p>
            <p><span className="font-medium text-foreground">Thong bao:</span> {settings.notificationsEnabled ? "Bat" : "Tat"}</p>
            <p><span className="font-medium text-foreground">Ngay check-in tuan:</span> {weekdayLabels[settings.weeklyCheckInDay] ?? settings.weeklyCheckInDay}</p>
            <p><span className="font-medium text-foreground">Hieu ung cay:</span> {settings.treeAnimationEnabled ? "Bat" : "Tat"}</p>
          </div>
        </GlassCard>
        <GlassCard padding="md">
          <form action={saveSettingsAction} className="space-y-4">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Persistence demo
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Cac tuy chon duoi day dang duoc luu bang cookie server-side de ban co the test persistence ngay tren ban deploy hien tai.
              </p>
            </div>
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Giao dien</span>
              <select
                name="theme"
                defaultValue={settings.theme}
                className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm text-neutral-950 outline-none transition focus:border-neutral-400"
              >
                <option value="light">Sang</option>
                <option value="system">Theo he thong</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">He don vi</span>
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
              <span className="text-sm font-medium text-foreground">Ngay check-in hang tuan</span>
              <select
                name="weeklyCheckInDay"
                defaultValue={settings.weeklyCheckInDay}
                className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm text-neutral-950 outline-none transition focus:border-neutral-400"
              >
                {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                  <option key={day} value={day}>
                    {weekdayLabels[day] ?? day}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-700">
              <input type="checkbox" name="notificationsEnabled" defaultChecked={settings.notificationsEnabled} />
              Bat thong bao
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-700">
              <input type="checkbox" name="treeAnimationEnabled" defaultChecked={settings.treeAnimationEnabled} />
              Bat hieu ung cay
            </label>
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              Luu cai dat
            </button>
          </form>
        </GlassCard>
        <GlassCard padding="md">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Trang thai tich hop
          </p>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p><span className="font-medium text-foreground">Thong tin Supabase:</span> {supabaseReady ? "Da cau hinh" : "Chua cau hinh"}</p>
            <p><span className="font-medium text-foreground">SSR clients:</span> Da dung khung browser, server, admin va middleware</p>
            <p><span className="font-medium text-foreground">SQL schema:</span> Da dinh nghia profiles, pantry, generated plans, streaks, settings va RLS</p>
            <p><span className="font-medium text-foreground">Trang thai planner:</span> Dang dung generator mock deterministic cho toi khi bo sung credential provider</p>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
