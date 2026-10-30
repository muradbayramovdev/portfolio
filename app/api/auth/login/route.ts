import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createAdminSession } from "@/lib/auth";
import { loginSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const parsed = loginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password")
    });

    if (!parsed.success) {
      return NextResponse.redirect(new URL("/admin/login?error=invalid", request.url), { status: 303 });
    }

    const admin = await prisma.adminUser.findUnique({ where: { email: parsed.data.email } });
    if (!admin) {
      return NextResponse.redirect(new URL("/admin/login?error=invalid", request.url), { status: 303 });
    }

    const valid = await bcrypt.compare(parsed.data.password, admin.passwordHash);
    if (!valid) {
      return NextResponse.redirect(new URL("/admin/login?error=invalid", request.url), { status: 303 });
    }

    await createAdminSession(admin.id);
    return NextResponse.redirect(new URL("/admin", request.url), { status: 303 });
  } catch {
    return NextResponse.redirect(new URL("/admin/login?error=server", request.url), { status: 303 });
  }
}
