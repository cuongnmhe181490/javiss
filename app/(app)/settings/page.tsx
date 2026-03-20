import { saveSettingsAction } from "@/app/(app)/actions";
import { SettingsForm } from "@/components/settings/settings-form";
import { GlassCard } from "@/components/shared/glass-card";
import { PageIntro } from "@/components/shared/page-intro";
import { getDashboardState } from "@/lib/demo-data";

export default async function SettingsPage() {
  const { settings } = await getDashboardState();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Cài đặt"
        title="Giao diện và tùy chọn hệ thống"
        description="Chọn theme, tiền tệ và chế độ mặc định theo cách bạn muốn dùng mỗi ngày."
        primaryAction={{ label: "Về tổng quan", href: "/dashboard" }}
        secondaryAction={{ label: "Xem hồ sơ", href: "/profile" }}
      />

      <SettingsForm initialSettings={settings} action={saveSettingsAction} />

      <GlassCard padding="md">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Trạng thái
        </p>
        <div className="mt-4 grid gap-3 text-sm text-muted-foreground md:grid-cols-3">
          <p>
            <span className="font-medium text-foreground">Giao diện:</span> đổi ngay sau khi lưu
          </p>
          <p>
            <span className="font-medium text-foreground">Cá nhân hóa:</span> đang hoạt động
          </p>
          <p>
            <span className="font-medium text-foreground">Ngôn ngữ:</span> {settings.language === "en" ? "English" : "Tiếng Việt"}
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
