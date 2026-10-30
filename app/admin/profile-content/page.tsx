import { AdminShell } from "@/components/admin/admin-shell";
import { ProfileForm } from "@/components/admin/profile-form";
import { getSiteContent } from "@/lib/site-data";

export default async function ProfileContentAdminPage() {
  const content = await getSiteContent();

  return (
    <AdminShell currentPath="/admin/profile-content" title="Profile Content" description="Edit your name, role, about copy, and CTA texts.">
      <ProfileForm initial={content} />
    </AdminShell>
  );
}
