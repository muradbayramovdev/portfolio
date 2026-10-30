import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess, requireAdminApiSession } from "@/lib/api";
import { contactLinkSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;

  try {
    const json = await request.json();
    const parsed = contactLinkSchema.safeParse(json);

    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten());
    }

    const { id: _, ...data } = parsed.data;
    const created = await prisma.contactLink.create({ data });
    return apiSuccess(created, { status: 201 });
  } catch {
    return apiError("Contact link could not be created", 500);
  }
}
