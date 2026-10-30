"use client";

import { useState } from "react";
import { ContactType, type ContactLink } from "@prisma/client";
import { FormField, Select, TextInput } from "@/components/admin/form-field";
import { useToast } from "@/components/admin/toast-provider";

type EditableLink = Pick<ContactLink, "id" | "type" | "label" | "value" | "href" | "enabled" | "displayOrder">;

const emptyLink: EditableLink = {
  id: "",
  type: ContactType.CUSTOM,
  label: "",
  value: "",
  href: "",
  enabled: true,
  displayOrder: 0
};

export function ContactLinksManager({ initialLinks }: { initialLinks: EditableLink[] }) {
  const { push } = useToast();
  const [links, setLinks] = useState(initialLinks);
  const [editing, setEditing] = useState<EditableLink>(emptyLink);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      const url = editing.id ? `/api/admin/contact-links/${editing.id}` : "/api/admin/contact-links";
      const method = editing.id ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing)
      });
      const result = await response.json();

      if (!response.ok) {
        push(result.error ?? "Contact link save failed", "error");
        return;
      }

      const saved = result.data;
      const next = editing.id ? links.map((item) => (item.id === saved.id ? saved : item)) : [...links, saved];
      setLinks(next.sort((a, b) => a.displayOrder - b.displayOrder));
      setEditing(emptyLink);
      push("Contact link saved");
    } catch {
      push("Contact link save failed", "error");
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this link?")) return;
    try {
      const response = await fetch(`/api/admin/contact-links/${id}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) {
        push(result.error ?? "Delete failed", "error");
        return;
      }
      setLinks((current) => current.filter((item) => item.id !== id));
      push("Contact link deleted");
    } catch {
      push("Delete failed", "error");
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
      <form onSubmit={handleSubmit} className="bg-panel rounded-[1.75rem] p-5 sm:p-6">
        <div className="grid gap-4">
          <FormField label="Type">
            <Select value={editing.type} onChange={(e) => setEditing((c) => ({ ...c, type: e.target.value as ContactType }))}>
              {Object.values(ContactType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField label="Label">
            <TextInput value={editing.label} onChange={(e) => setEditing((c) => ({ ...c, label: e.target.value }))} />
          </FormField>
          <FormField label="Visible value">
            <TextInput value={editing.value} onChange={(e) => setEditing((c) => ({ ...c, value: e.target.value }))} />
          </FormField>
          <FormField label="Href">
            <TextInput value={editing.href} onChange={(e) => setEditing((c) => ({ ...c, href: e.target.value }))} />
          </FormField>
          <FormField label="Display order">
            <TextInput type="number" value={editing.displayOrder} onChange={(e) => setEditing((c) => ({ ...c, displayOrder: Number(e.target.value) }))} />
          </FormField>
          <label className="inline-flex items-center gap-3 rounded-2xl border border-stone-900/10 bg-white/70 px-4 py-3 text-sm font-semibold text-stone-900">
            <input type="checkbox" checked={editing.enabled} onChange={(e) => setEditing((c) => ({ ...c, enabled: e.target.checked }))} />
            Enabled
          </label>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-stone-950 px-5 text-sm font-semibold text-white">
            {editing.id ? "Update link" : "Add link"}
          </button>
          <button type="button" onClick={() => setEditing(emptyLink)} className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-stone-900/10 bg-white px-5 text-sm font-semibold text-stone-700">
            Reset form
          </button>
        </div>
      </form>

      <section className="bg-panel rounded-[1.75rem] p-5 sm:p-6">
        <h3 className="text-xl font-bold tracking-[-0.04em] text-stone-950">Current links</h3>
        <div className="mt-4 grid gap-3">
          {!links.length ? <p className="text-sm text-stone-500">No links yet. Add one to get started.</p> : null}
          {links.map((link) => (
            <article key={link.id} className="rounded-[1.4rem] border border-stone-900/10 bg-white/55 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-semibold text-stone-950">{link.label}</h4>
                  <p className="mt-1 text-xs text-stone-500">{link.href}</p>
                </div>
                <span className="rounded-full bg-stone-950 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                  {link.type}
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <button type="button" onClick={() => setEditing(link)} className="inline-flex min-h-10 items-center justify-center rounded-xl bg-stone-950 px-4 text-sm font-semibold text-white">
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(link.id)} className="inline-flex min-h-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-700">
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
