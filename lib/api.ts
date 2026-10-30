import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

export function apiSuccess<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, data }, init);
}

export function apiError(message: string, status = 400, details?: unknown) {
  return NextResponse.json({ ok: false, error: message, details }, { status });
}

export async function requireAdminApiSession() {
  const session = await getAdminSession();
  if (!session?.adminId) {
    return apiError("Unauthorized", 401);
  }
  return null;
}
