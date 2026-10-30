"use client";

import { useState } from "react";
import { ProjectStatus } from "@prisma/client";
import { FormField, Select, TextArea, TextInput } from "@/components/admin/form-field";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import type { ProjectRecord } from "@/lib/project-tags";
import { useToast } from "@/components/admin/toast-provider";

type EditableProject = ProjectRecord;

const emptyProject: EditableProject = {
  id: "",
  title: "",
  shortDescription: "",
  longDescription: "",
  imageUrl: "",
  projectUrl: "",
  githubUrl: "",
  tags: [],
  status: ProjectStatus.ACTIVE,
  displayOrder: 0
};

export function ProjectsManager({ initialProjects }: { initialProjects: EditableProject[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [editing, setEditing] = useState<EditableProject>(emptyProject);
  const { push } = useToast();

  function setField<Key extends keyof EditableProject>(key: Key, value: EditableProject[Key]) {
    setEditing((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      const payload = { ...editing, tags: editing.tags };
      const url = editing.id ? `/api/admin/projects/${editing.id}` : "/api/admin/projects";
      const method = editing.id ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (!response.ok) {
        push(result.error ?? "Project save failed", "error");
        return;
      }

      const saved = result.data;
      const next = editing.id ? projects.map((item) => (item.id === saved.id ? saved : item)) : [...projects, saved];
      setProjects(next.sort((a, b) => a.displayOrder - b.displayOrder));
      setEditing(emptyProject);
      push("Project saved");
    } catch {
      push("Project save failed", "error");
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this project?")) return;
    try {
      const response = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) {
        push(result.error ?? "Project delete failed", "error");
        return;
      }
      setProjects((current) => current.filter((item) => item.id !== id));
      push("Project deleted");
    } catch {
      push("Project delete failed", "error");
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
      <form onSubmit={handleSubmit} className="bg-panel rounded-[1.75rem] p-5 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <FormField label="Title">
            <TextInput value={editing.title} onChange={(e) => setField("title", e.target.value)} />
          </FormField>
          <FormField label="Display order">
            <TextInput type="number" value={editing.displayOrder} onChange={(e) => setField("displayOrder", Number(e.target.value))} />
          </FormField>
          <FormField label="Short description" className="lg:col-span-2">
            <TextArea rows={4} value={editing.shortDescription} onChange={(e) => setField("shortDescription", e.target.value)} />
          </FormField>
          <FormField label="Long description" className="lg:col-span-2">
            <TextArea rows={5} value={editing.longDescription ?? ""} onChange={(e) => setField("longDescription", e.target.value)} />
          </FormField>
          <FormField label="Project link">
            <TextInput value={editing.projectUrl ?? ""} onChange={(e) => setField("projectUrl", e.target.value)} />
          </FormField>
          <FormField label="GitHub link">
            <TextInput value={editing.githubUrl ?? ""} onChange={(e) => setField("githubUrl", e.target.value)} />
          </FormField>
          <FormField label="Tags / technologies" description="Comma separated" className="lg:col-span-2">
            <TextInput value={editing.tags.join(", ")} onChange={(e) => setField("tags", e.target.value.split(",").map((item) => item.trim()).filter(Boolean))} />
          </FormField>
          <FormField label="Status">
            <Select value={editing.status} onChange={(e) => setField("status", e.target.value as ProjectStatus)}>
              <option value={ProjectStatus.ACTIVE}>Active</option>
              <option value={ProjectStatus.HIDDEN}>Hidden</option>
            </Select>
          </FormField>
        </div>
        <div className="mt-5">
          <ImageUploadField value={editing.imageUrl ?? ""} onChange={(next) => setField("imageUrl", next)} label="Project image" />
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-stone-950 px-5 text-sm font-semibold text-white">
            {editing.id ? "Update project" : "Add project"}
          </button>
          <button type="button" onClick={() => setEditing(emptyProject)} className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-stone-900/10 bg-white px-5 text-sm font-semibold text-stone-700">
            Reset form
          </button>
        </div>
      </form>

      <section className="bg-panel rounded-[1.75rem] p-5 sm:p-6">
        <h3 className="text-xl font-bold tracking-[-0.04em] text-stone-950">Current projects</h3>
        <div className="mt-4 grid gap-3">
          {!projects.length ? <p className="text-sm text-stone-500">No projects yet. Add your first one.</p> : null}
          {projects.map((project) => (
            <article key={project.id} className="rounded-[1.4rem] border border-stone-900/10 bg-white/55 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-semibold text-stone-950">{project.title}</h4>
                  <p className="mt-1 text-xs text-stone-500">Order: {project.displayOrder}</p>
                </div>
                <span className="rounded-full bg-stone-950 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                  {project.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-stone-600">{project.shortDescription}</p>
              <div className="mt-4 flex gap-2">
                <button type="button" onClick={() => setEditing(project)} className="inline-flex min-h-10 items-center justify-center rounded-xl bg-stone-950 px-4 text-sm font-semibold text-white">
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(project.id)} className="inline-flex min-h-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-700">
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
