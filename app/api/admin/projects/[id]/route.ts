import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess, requireAdminApiSession } from "@/lib/api";
import { normalizeProjectRecord } from "@/lib/project-tags";
import { projectSchema } from "@/lib/validators";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Project not found", 404);
    }

    const json = await request.json();
    const parsed = projectSchema.safeParse(json);

    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten());
    }

    const { id: _, ...data } = parsed.data;
    const updated = await prisma.project.update({
      where: { id },
      data: {
        ...data,
        longDescription: data.longDescription || null,
        imageUrl: data.imageUrl || null,
        projectUrl: data.projectUrl || null,
        githubUrl: data.githubUrl || null
      }
    });

    return apiSuccess(normalizeProjectRecord(updated));
  } catch {
    return apiError("Project could not be updated", 500);
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Project not found", 404);
    }

    await prisma.project.delete({ where: { id } });
    return apiSuccess({ id });
  } catch {
    return apiError("Project could not be deleted", 500);
  }
}
