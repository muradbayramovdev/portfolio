import { AdminShell } from "@/components/admin/admin-shell";
import { ContactLinksManager } from "@/components/admin/contact-links-manager";
import { getContactLinksAdmin } from "@/lib/site-data";

export default async function ContactLinksAdminPage() {
  const links = await getContactLinksAdmin();

  return (
    <AdminShell currentPath="/admin/contact-links" title="Contact Links" description="Manage social links, phone, email, WhatsApp, and custom actions.">
      <ContactLinksManager initialLinks={links} />
    </AdminShell>
  );
}
