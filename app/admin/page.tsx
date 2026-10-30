import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminDashboardPage() {
  const [projectsCount, linksCount, hasContent] = await Promise.all([
    prisma.project.count().catch(() => 0),
    prisma.contactLink.count().catch(() => 0),
    prisma.siteContent.findUnique({ where: { id: "singleton" } }).catch(() => null)
  ]);

  return (
    <AdminShell currentPath="/admin" title="Dashboard" description="Quick overview of the portfolio content manager.">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Projects", String(projectsCount)],
          ["Contact links", String(linksCount)],
          ["Profile ready", hasContent ? "Yes" : "Fallback"]
        ].map(([label, value]) => (
          <article key={label} className="bg-panel rounded-[1.5rem] p-5">
            <p className="text-sm text-stone-500">{label}</p>
            <p className="mt-3 text-3xl font-extrabold tracking-[-0.05em] text-stone-950">{value}</p>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
