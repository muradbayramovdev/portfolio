import { AdminShell } from "@/components/admin/admin-shell";
import { HeroForm } from "@/components/admin/hero-form";
import { getSiteContent } from "@/lib/site-data";

export default async function HeroAdminPage() {
  const content = await getSiteContent();

  return (
    <AdminShell currentPath="/admin/hero" title="Hero" description="Manage homepage hero copy, CTA labels, and the right-side image.">
      <HeroForm initial={content} />
    </AdminShell>
  );
}
