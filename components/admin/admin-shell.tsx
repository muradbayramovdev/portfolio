import Link from "next/link";
import { LayoutDashboard, Image as ImageIcon, FolderKanban, Link2, UserRound, LogOut } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/hero", label: "Hero", icon: ImageIcon },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/contact-links", label: "Contact Links", icon: Link2 },
  { href: "/admin/profile-content", label: "Profile Content", icon: UserRound }
];

export function AdminShell({
  currentPath,
  title,
  description,
  children
}: {
  currentPath: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid min-h-screen w-full max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[250px_1fr] lg:px-8">
      <aside className="bg-panel rounded-[1.75rem] p-4 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">Murad Admin</p>
          <h1 className="mt-2 text-xl font-extrabold tracking-[-0.05em] text-stone-950">Content Manager</h1>
        </div>
        <nav className="grid gap-2">
          {links.map((item) => {
            const Icon = item.icon;
            const active = currentPath === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex min-h-11 items-center gap-3 rounded-2xl px-4 text-sm font-semibold transition ${
                  active ? "bg-stone-950 text-white" : "bg-white/40 text-stone-700 hover:bg-white/70"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <form action="/api/auth/logout" method="post" className="mt-6">
          <button className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl border border-stone-900/10 bg-white/60 px-4 text-sm font-semibold text-stone-700">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </form>
      </aside>

      <section className="space-y-5">
        <header className="bg-panel rounded-[1.75rem] p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">Admin</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.05em] text-stone-950">{title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">{description}</p>
        </header>
        {children}
      </section>
    </div>
  );
}
