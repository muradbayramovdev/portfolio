import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fallbackSiteContent } from "@/lib/site-data";
import { apiError, apiSuccess, requireAdminApiSession } from "@/lib/api";
import { siteContentSchema } from "@/lib/validators";

export async function PUT(request: Request) {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;

  try {
    const json = await request.json();
    const parsed = siteContentSchema.safeParse(json);

    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten());
    }

    const data = parsed.data;
    const record = await prisma.siteContent.upsert({
      where: { id: "singleton" },
      update: { ...data, heroImageUrl: data.heroImageUrl || null },
      create: { id: "singleton", ...fallbackSiteContent, ...data, heroImageUrl: data.heroImageUrl || null }
    });

    return apiSuccess(record);
  } catch {
    return apiError("Site content could not be updated", 500);
  }
}
