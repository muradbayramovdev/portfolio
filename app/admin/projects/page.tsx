import { AdminShell } from "@/components/admin/admin-shell";
import { ProjectsManager } from "@/components/admin/projects-manager";
import { getAllProjectsAdmin } from "@/lib/site-data";

export default async function ProjectsAdminPage() {
  const projects = await getAllProjectsAdmin();

  return (
    <AdminShell currentPath="/admin/projects" title="Projects" description="Create, edit, delete, and reorder public portfolio projects.">
      <ProjectsManager initialProjects={projects} />
    </AdminShell>
  );
}
