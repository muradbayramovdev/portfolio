"use client";

import { useState } from "react";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { FormField, TextArea, TextInput } from "@/components/admin/form-field";
import { useToast } from "@/components/admin/toast-provider";

export function HeroForm({ initial }: { initial: Record<string, string | null> }) {
  const { push } = useToast();
  const [form, setForm] = useState({
    name: initial.name ?? "",
    role: initial.role ?? "",
    shortIntro: initial.shortIntro ?? "",
    heroImageUrl: initial.heroImageUrl ?? "",
    heroPrimaryLabel: initial.heroPrimaryLabel ?? "",
    heroPrimaryHref: initial.heroPrimaryHref ?? "",
    heroSecondaryLabel: initial.heroSecondaryLabel ?? "",
    heroSecondaryHref: initial.heroSecondaryHref ?? ""
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch("/api/admin/site-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...initial, ...form, aboutText: initial.aboutText })
      });
      const data = await response.json();

      if (!response.ok) {
        push(data.error ?? "Hero content could not be saved", "error");
        return;
      }

      push("Hero updated");
    } catch {
      push("Hero content could not be saved", "error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-panel rounded-[1.75rem] p-5 sm:p-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <FormField label="Name">
          <TextInput value={form.name} onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))} />
        </FormField>
        <FormField label="Role / Title">
          <TextInput value={form.role} onChange={(e) => setForm((c) => ({ ...c, role: e.target.value }))} />
        </FormField>
        <FormField label="Short intro" className="lg:col-span-2">
          <TextArea rows={4} value={form.shortIntro} onChange={(e) => setForm((c) => ({ ...c, shortIntro: e.target.value }))} />
        </FormField>
        <FormField label="Primary CTA label">
          <TextInput value={form.heroPrimaryLabel} onChange={(e) => setForm((c) => ({ ...c, heroPrimaryLabel: e.target.value }))} />
        </FormField>
        <FormField label="Primary CTA link">
          <TextInput value={form.heroPrimaryHref} onChange={(e) => setForm((c) => ({ ...c, heroPrimaryHref: e.target.value }))} />
        </FormField>
        <FormField label="Secondary CTA label">
          <TextInput value={form.heroSecondaryLabel} onChange={(e) => setForm((c) => ({ ...c, heroSecondaryLabel: e.target.value }))} />
        </FormField>
        <FormField label="Secondary CTA link">
          <TextInput value={form.heroSecondaryHref} onChange={(e) => setForm((c) => ({ ...c, heroSecondaryHref: e.target.value }))} />
        </FormField>
      </div>
      <div className="mt-5">
        <ImageUploadField value={form.heroImageUrl} onChange={(next) => setForm((c) => ({ ...c, heroImageUrl: next }))} label="Hero / right-side image" />
      </div>
      <button className="mt-5 inline-flex min-h-12 items-center justify-center rounded-2xl bg-stone-950 px-5 text-sm font-semibold text-white">
        Save hero
      </button>
    </form>
  );
}
