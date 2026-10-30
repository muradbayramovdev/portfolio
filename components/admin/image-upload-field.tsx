"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { useToast } from "@/components/admin/toast-provider";

export function ImageUploadField({
  value,
  onChange,
  label
}: {
  value: string;
  onChange: (next: string) => void;
  label: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const { push } = useToast();

  async function handleFile(file?: File) {
    if (!file) return;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await response.json();

      if (!response.ok) {
        push(data.error ?? "Upload failed", "error");
        return;
      }

      onChange(data.data.url);
      push("Image uploaded");
    } catch {
      push("Upload failed", "error");
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="grid gap-3">
      <p className="text-sm font-semibold text-stone-900">{label}</p>
      <div className="relative overflow-hidden rounded-[1.5rem] border border-stone-900/10 bg-white/70 p-3">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.2rem] bg-stone-100">
          {value ? (
            <Image src={value} alt="Uploaded preview" fill className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-stone-500">No image uploaded</div>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-stone-950 px-4 text-sm font-semibold text-white"
          >
            <Upload className="h-4 w-4" />
            {uploading ? "Uploading..." : "Upload image"}
          </button>
          {value ? (
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-stone-900/10 bg-white px-4 text-sm font-semibold text-stone-700"
            >
              <X className="h-4 w-4" />
              Remove
            </button>
          ) : null}
        </div>
        <input
          ref={inputRef}
          hidden
          type="file"
          accept="image/*"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
      </div>
    </div>
  );
}
