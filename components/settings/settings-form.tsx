"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { ChevronDown } from "lucide-react";

import { budgetPeriodLabels, measurementSystemLabels, themeLabels, weekdayLabels } from "@/lib/display";
import { applyThemePreference, type AppTheme } from "@/lib/theme-client";
import type { SettingsRecord } from "@/types/profile";

type SettingsFormProps = {
  initialSettings: SettingsRecord;
  action: (formData: FormData) => Promise<void>;
};

export function SettingsForm({ initialSettings, action }: SettingsFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedTheme, setSelectedTheme] = useState<AppTheme>(() => {
    if (typeof window === "undefined") {
      return initialSettings.theme;
    }

    const storedTheme = window.localStorage.getItem("javiss-theme");
    return storedTheme === "light" || storedTheme === "dark" || storedTheme === "system"
      ? storedTheme
      : initialSettings.theme;
  });
  const [success, setSuccess] = useState<string | null>(null);

  const summaryThemeLabel = useMemo(() => themeLabels[selectedTheme], [selectedTheme]);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="glass-surface rounded-[1.75rem] p-6">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Đang dùng
        </p>
        <div className="mt-4 space-y-3 text-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Theme:</span> {summaryThemeLabel}
          </p>
          <p>
            <span className="font-medium text-foreground">Tiền tệ:</span> VND
          </p>
          <p>
            <span className="font-medium text-foreground">Ngân sách mặc định:</span>{" "}
            {budgetPeriodLabels[initialSettings.budgetModeDefault]}
          </p>
          <p>
            <span className="font-medium text-foreground">Hệ đơn vị:</span>{" "}
            {measurementSystemLabels[initialSettings.measurementSystem]}
          </p>
          <p>
            <span className="font-medium text-foreground">Ngày check-in:</span>{" "}
            {weekdayLabels[initialSettings.weeklyCheckInDay]}
          </p>
        </div>
      </div>

      <form
        className="glass-surface rounded-[1.75rem] p-6"
        onSubmit={(event) => {
          event.preventDefault();
          setSuccess(null);
          const formData = new FormData(event.currentTarget);
          const nextTheme = String(formData.get("theme")) as AppTheme;

          applyThemePreference(nextTheme);
          setSelectedTheme(nextTheme);

          startTransition(async () => {
            await action(formData);
            setSuccess("Đã lưu cài đặt.");
            router.refresh();
          });
        }}
      >
        <div className="space-y-1">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Tùy chỉnh
          </p>
          <p className="text-sm text-muted-foreground">Áp dụng ngay sau khi lưu.</p>
        </div>

        <div className="mt-5 grid gap-4">
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">Theme</span>
            <SelectShell>
              <select
                name="theme"
                value={selectedTheme}
                onChange={(event) => setSelectedTheme(event.target.value as AppTheme)}
                className="app-select"
              >
                <option value="light">{themeLabels.light}</option>
                <option value="dark">{themeLabels.dark}</option>
                <option value="system">{themeLabels.system}</option>
              </select>
            </SelectShell>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">Tiền tệ</span>
            <SelectShell>
              <select name="currency" defaultValue={initialSettings.currency} className="app-select">
                <option value="VND">VND</option>
              </select>
            </SelectShell>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">Ngân sách mặc định</span>
            <SelectShell>
              <select name="budgetModeDefault" defaultValue={initialSettings.budgetModeDefault} className="app-select">
                <option value="daily">{budgetPeriodLabels.daily}</option>
                <option value="weekly">{budgetPeriodLabels.weekly}</option>
              </select>
            </SelectShell>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">Hệ đơn vị</span>
            <SelectShell>
              <select name="measurementSystem" defaultValue={initialSettings.measurementSystem} className="app-select">
                <option value="metric">{measurementSystemLabels.metric}</option>
                <option value="imperial">{measurementSystemLabels.imperial}</option>
              </select>
            </SelectShell>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">Khu vực</span>
            <SelectShell>
              <select name="region" defaultValue={initialSettings.region} className="app-select">
                <option value="vi-VN">Việt Nam</option>
              </select>
            </SelectShell>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">Ngày check-in</span>
            <SelectShell>
              <select name="weeklyCheckInDay" defaultValue={initialSettings.weeklyCheckInDay} className="app-select">
                {Object.entries(weekdayLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </SelectShell>
          </label>

          <label className="interactive-chip flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm text-foreground">
            <input type="checkbox" name="notificationsEnabled" defaultChecked={initialSettings.notificationsEnabled} />
            Bật nhắc nhở
          </label>

          <label className="interactive-chip flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm text-foreground">
            <input type="checkbox" name="treeAnimationEnabled" defaultChecked={initialSettings.treeAnimationEnabled} />
            Bật hiệu ứng cây
          </label>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {success ?? "Thiết lập cá nhân hóa đang hoạt động."}
          </p>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition duration-200 hover:-translate-y-0.5 hover:opacity-95 disabled:opacity-60"
          >
            {isPending ? "Đang lưu..." : "Lưu cài đặt"}
          </button>
        </div>
      </form>
    </div>
  );
}

function SelectShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 dark:text-neutral-300" />
    </div>
  );
}
