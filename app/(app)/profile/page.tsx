import { PageIntro } from "@/components/shared/page-intro";
import { ProfileForm, ProfileSummaryCard } from "@/features/profile";
import { saveProfileAction } from "@/app/(app)/actions";
import { getDashboardState } from "@/lib/demo-data";

export default async function ProfilePage() {
  const { profile } = await getDashboardState();

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow="Profile"
        title="Persistent health preferences and planning constraints."
        description="Profile data is the shared source for future plan generation, pantry defaults, workout preferences, and dashboard personalization."
        primaryAction={{ label: "Edit onboarding draft", href: "/onboarding" }}
        secondaryAction={{ label: "Settings", href: "/settings" }}
      />
      <ProfileSummaryCard profile={profile} />
      <ProfileForm initialValues={profile} onSubmit={saveProfileAction} />
    </div>
  );
}
