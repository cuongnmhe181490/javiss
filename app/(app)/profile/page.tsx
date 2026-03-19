import { PageIntro } from "@/components/shared/page-intro";
import { ProfileForm, ProfileSummaryCard } from "@/features/profile";
import { saveProfileAction } from "@/app/(app)/actions";
import { getDashboardState } from "@/lib/demo-data";

export default async function ProfilePage() {
  const { profile } = await getDashboardState();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Ho so"
        title="So thich suc khoe va cac rang buoc lap ke hoach duoc luu lau dai."
        description="Du lieu ho so la nguon dung chung cho viec tao ke hoach sau nay, gia tri mac dinh cua pantry, so thich tap luyen va ca nhan hoa trang tong quan."
        primaryAction={{ label: "Sua onboarding", href: "/onboarding" }}
        secondaryAction={{ label: "Cai dat", href: "/settings" }}
      />
      <ProfileSummaryCard profile={profile} />
      <ProfileForm initialValues={profile} onSubmit={saveProfileAction} />
    </div>
  );
}
