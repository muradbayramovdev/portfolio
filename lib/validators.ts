import { ContactType, ProjectStatus } from "@prisma/client";
import { z } from "zod";
import { isSafeHref } from "@/lib/utils";

const optionalUrl = z.string().trim().optional().or(z.literal("")).refine((value) => {
  if (!value) return true;
  return isSafeHref(value);
}, "Link düzgün formatda olmalıdır.");

export const siteContentSchema = z.object({
  name: z.string().trim().min(2).max(80),
  role: z.string().trim().min(4).max(140),
  shortIntro: z.string().trim().min(10).max(320),
  aboutText: z.string().trim().min(10).max(700),
  heroImageUrl: z.string().trim().optional().or(z.literal("")),
  heroPrimaryLabel: z.string().trim().min(2).max(40),
  heroPrimaryHref: z.string().trim().min(1).max(120).refine((value) => isSafeHref(value), "Link düzgün formatda olmalıdır."),
  heroSecondaryLabel: z.string().trim().min(2).max(40),
  heroSecondaryHref: z.string().trim().min(1).max(120).refine((value) => isSafeHref(value), "Link düzgün formatda olmalıdır.")
});

export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(2).max(120),
  shortDescription: z.string().trim().min(10).max(260),
  longDescription: z.string().trim().max(1200).optional().or(z.literal("")),
  imageUrl: z.string().trim().optional().or(z.literal("")),
  projectUrl: optionalUrl,
  githubUrl: optionalUrl,
  tags: z.array(z.string().trim().min(1).max(30)).min(1),
  status: z.nativeEnum(ProjectStatus),
  displayOrder: z.coerce.number().int().min(0)
});

export const contactLinkSchema = z.object({
  id: z.string().optional(),
  type: z.nativeEnum(ContactType),
  label: z.string().trim().min(2).max(40),
  value: z.string().trim().min(2).max(120),
  href: z.string().trim().min(2).max(220).refine((value) => isSafeHref(value), "Link düzgün formatda olmalıdır."),
  enabled: z.coerce.boolean().default(true),
  displayOrder: z.coerce.number().int().min(0)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});
