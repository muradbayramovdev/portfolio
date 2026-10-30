import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { apiError, apiSuccess, requireAdminApiSession } from "@/lib/api";
import { slugifyFileName } from "@/lib/utils";

export async function POST(request: Request) {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return apiError("No file provided", 400);
    }

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      return apiError("Unsupported file type", 400);
    }

    if (file.size > 5 * 1024 * 1024) {
      return apiError("File is too large", 400);
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    let fileName = `${Date.now()}-${slugifyFileName(file.name)}`;
    const uploadDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    try {
      await writeFile(join(uploadDir, fileName), buffer, { flag: "wx" });
    } catch {
      fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${slugifyFileName(file.name)}`;
      await writeFile(join(uploadDir, fileName), buffer);
    }

    return apiSuccess({ url: `/uploads/${fileName}` });
  } catch {
    return apiError("Upload failed", 500);
  }
}
