import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess, requireAdminApiSession } from "@/lib/api";
import { contactLinkSchema } from "@/lib/validators";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const existing = await prisma.contactLink.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Contact link not found", 404);
    }

    const json = await request.json();
    const parsed = contactLinkSchema.safeParse(json);

    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten());
    }

    const { id: _, ...data } = parsed.data;
    const updated = await prisma.contactLink.update({ where: { id }, data });
    return apiSuccess(updated);
  } catch {
    return apiError("Contact link could not be updated", 500);
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const existing = await prisma.contactLink.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Contact link not found", 404);
    }

    await prisma.contactLink.delete({ where: { id } });
    return apiSuccess({ id });
  } catch {
    return apiError("Contact link could not be deleted", 500);
  }
}
