import type { Prisma } from "@prisma/client";

export type ProjectRecord = {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string | null;
  imageUrl: string | null;
  projectUrl: string | null;
  githubUrl: string | null;
  tags: string[];
  status: "ACTIVE" | "HIDDEN";
  displayOrder: number;
};

export function normalizeProjectTags(value: Prisma.JsonValue | null | undefined) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

export function normalizeProjectRecord<T extends {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string | null;
  imageUrl: string | null;
  projectUrl: string | null;
  githubUrl: string | null;
  tags: Prisma.JsonValue;
  status: "ACTIVE" | "HIDDEN";
  displayOrder: number;
}>(project: T): ProjectRecord {
  return {
    ...project,
    tags: normalizeProjectTags(project.tags)
  };
}
