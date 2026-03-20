import { saveProfileAction } from "@/app/(app)/actions";
import { PageIntro } from "@/components/shared/page-intro";
import { ProfileForm, ProfileSummaryCard } from "@/features/profile";
import { getDashboardState } from "@/lib/demo-data";

export default async function ProfilePage() {
  const { profile } = await getDashboardState();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Hồ sơ"
        title="Thông tin này giúp gợi ý sát hơn với bạn."
        description="Bạn có thể cập nhật mục tiêu, ngân sách và thời gian nấu bất cứ lúc nào."
        primaryAction={{ label: "Sửa thiết lập", href: "/onboarding" }}
        secondaryAction={{ label: "Cài đặt", href: "/settings" }}
      />
      <ProfileSummaryCard profile={profile} />
      <ProfileForm initialValues={profile} onSubmit={saveProfileAction} />
    </div>
  );
}
