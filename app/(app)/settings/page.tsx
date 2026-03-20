import { saveSettingsAction } from "@/app/(app)/actions";
import { GlassCard } from "@/components/shared/glass-card";
import { PageIntro } from "@/components/shared/page-intro";
import { getDashboardState } from "@/lib/demo-data";
import { hasSupabaseCredentials } from "@/lib/env";

const weekdayLabels: Record<string, string> = {
  monday: "Thứ hai",
  tuesday: "Thứ ba",
  wednesday: "Thứ tư",
  thursday: "Thứ năm",
  friday: "Thứ sáu",
  saturday: "Thứ bảy",
  sunday: "Chủ nhật",
};

export default async function SettingsPage() {
  const { settings } = await getDashboardState();
  const supabaseReady = hasSupabaseCredentials();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Cài đặt"
        title="Giao diện và tuỳ chọn hệ thống"
        description="Chọn theme, tiền tệ và chế độ mặc định."
        primaryAction={{ label: "Về tổng quan", href: "/dashboard" }}
        secondaryAction={{ label: "Xem hồ sơ", href: "/profile" }}
      />

      <section className="grid gap-4 lg:grid-cols-2">
        <GlassCard padding="md">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Tuỳ chọn hiện tại
          </p>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p><span className="font-medium text-foreground">Theme:</span> {settings.theme}</p>
            <p><span className="font-medium text-foreground">Tiền tệ:</span> {settings.currency}</p>
            <p><span className="font-medium text-foreground">Ngân sách mặc định:</span> {settings.budgetModeDefault}</p>
            <p><span className="font-medium text-foreground">Khu vực:</span> {settings.region}</p>
            <p><span className="font-medium text-foreground">Ngày check-in:</span> {weekdayLabels[settings.weeklyCheckInDay] ?? settings.weeklyCheckInDay}</p>
          </div>
        </GlassCard>

        <GlassCard padding="md">
          <form action={saveSettingsAction} className="space-y-4">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Tuỳ chỉnh
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Lưu trực tiếp vào cấu hình hiện tại.
              </p>
            </div>

            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Theme</span>
              <select
                name="theme"
                defaultValue={settings.theme}
                className="h-12 w-full rounded-2xl border border-black/10 bg-white/90 px-4 text-sm text-neutral-950 outline-none transition focus:border-neutral-400 dark:border-white/10 dark:bg-white/6 dark:text-neutral-50"
              >
                <option value="light">Sáng</option>
                <option value="dark">Tối</option>
                <option value="system">Theo hệ thống</option>
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Tiền tệ</span>
              <select
                name="currency"
                defaultValue={settings.currency}
                className="h-12 w-full rounded-2xl border border-black/10 bg-white/90 px-4 text-sm text-neutral-950 outline-none transition focus:border-neutral-400 dark:border-white/10 dark:bg-white/6 dark:text-neutral-50"
              >
                <option value="VND">VND</option>
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Ngân sách mặc định</span>
              <select
                name="budgetModeDefault"
                defaultValue={settings.budgetModeDefault}
                className="h-12 w-full rounded-2xl border border-black/10 bg-white/90 px-4 text-sm text-neutral-950 outline-none transition focus:border-neutral-400 dark:border-white/10 dark:bg-white/6 dark:text-neutral-50"
              >
                <option value="daily">Theo ngày</option>
                <option value="weekly">Theo tuần</option>
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Hệ đơn vị</span>
              <select
                name="measurementSystem"
                defaultValue={settings.measurementSystem}
                className="h-12 w-full rounded-2xl border border-black/10 bg-white/90 px-4 text-sm text-neutral-950 outline-none transition focus:border-neutral-400 dark:border-white/10 dark:bg-white/6 dark:text-neutral-50"
              >
                <option value="metric">Metric</option>
                <option value="imperial">Imperial</option>
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Khu vực</span>
              <select
                name="region"
                defaultValue={settings.region}
                className="h-12 w-full rounded-2xl border border-black/10 bg-white/90 px-4 text-sm text-neutral-950 outline-none transition focus:border-neutral-400 dark:border-white/10 dark:bg-white/6 dark:text-neutral-50"
              >
                <option value="vi-VN">Việt Nam</option>
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Ngày check-in</span>
              <select
                name="weeklyCheckInDay"
                defaultValue={settings.weeklyCheckInDay}
                className="h-12 w-full rounded-2xl border border-black/10 bg-white/90 px-4 text-sm text-neutral-950 outline-none transition focus:border-neutral-400 dark:border-white/10 dark:bg-white/6 dark:text-neutral-50"
              >
                {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                  <option key={day} value={day}>
                    {weekdayLabels[day] ?? day}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-neutral-700 dark:border-white/10 dark:bg-white/6 dark:text-neutral-200">
              <input type="checkbox" name="notificationsEnabled" defaultChecked={settings.notificationsEnabled} />
              Bật thông báo
            </label>

            <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-neutral-700 dark:border-white/10 dark:bg-white/6 dark:text-neutral-200">
              <input type="checkbox" name="treeAnimationEnabled" defaultChecked={settings.treeAnimationEnabled} />
              Bật hiệu ứng cây
            </label>

            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              Lưu cài đặt
            </button>
          </form>
        </GlassCard>

        <GlassCard padding="md">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Trạng thái tích hợp
          </p>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p><span className="font-medium text-foreground">Supabase:</span> {supabaseReady ? "Đã cấu hình" : "Chưa cấu hình"}</p>
            <p><span className="font-medium text-foreground">Schema:</span> Đã có profile, pantry, plans, streaks, settings</p>
            <p><span className="font-medium text-foreground">Planner:</span> Đang dùng engine typed + pricing mock</p>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
