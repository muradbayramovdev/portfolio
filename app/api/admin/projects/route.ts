import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess, requireAdminApiSession } from "@/lib/api";
import { normalizeProjectRecord } from "@/lib/project-tags";
import { projectSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;

  try {
    const json = await request.json();
    const parsed = projectSchema.safeParse(json);

    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten());
    }

    const { id: _, ...data } = parsed.data;
    const created = await prisma.project.create({
      data: {
        ...data,
        longDescription: data.longDescription || null,
        imageUrl: data.imageUrl || null,
        projectUrl: data.projectUrl || null,
        githubUrl: data.githubUrl || null
      }
    });

    return apiSuccess(normalizeProjectRecord(created), { status: 201 });
  } catch {
    return apiError("Project could not be created", 500);
  }
}
