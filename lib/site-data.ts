import { ContactType, ProjectStatus, type ContactLink, type SiteContent } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { normalizeProjectRecord, type ProjectRecord } from "@/lib/project-tags";

export const fallbackSiteContent: Pick<
  SiteContent,
  | "name"
  | "role"
  | "shortIntro"
  | "aboutText"
  | "heroImageUrl"
  | "heroPrimaryLabel"
  | "heroPrimaryHref"
  | "heroSecondaryLabel"
  | "heroSecondaryHref"
> = {
  name: "Murad",
  role: "AI yönümlü rəqəmsal məhsullar quran full stack developer",
  shortIntro:
    "Mən məhsul düşüncəsini, dizayn dəqiqliyini və development icrasını birləşdirərək real istifadə üçün web təcrübələri və AI dəstəkli sistemlər hazırlayıram.",
  aboutText:
    "Mən özümü yalnız kod yazan biri kimi yox, problemi anlayıb onu işlək və dəyərli məhsula çevirən builder kimi görürəm. Fokusum yalnız launch deyil, real istifadədə özünü doğruldan rəqəmsal həllərdir.",
  heroImageUrl: null as string | null,
  heroPrimaryLabel: "Seçilmiş işlərə baxın",
  heroPrimaryHref: "#projects",
  heroSecondaryLabel: "Layihənizi danışaq",
  heroSecondaryHref: "#contact"
};

export const fallbackProjects: ProjectRecord[] = [
  {
    id: "fallback-blink",
    title: "Blink",
    shortDescription:
      "Fiziki hədiyyə anını rəqəmsal məhsul təcrübəsinə çevirən NFC əsaslı konsept.",
    longDescription:
      "Onboarding axını, aktivləşdirmə məntiqi və istifadəçinin ilk təmasdan etibarən dəyəri hiss etməsi üzərində fokuslanmış məhsul işi.",
    imageUrl: null,
    projectUrl: "#contact",
    githubUrl: "",
    tags: ["UI/UX", "JavaScript", "Product Strategy"],
    status: ProjectStatus.ACTIVE,
    displayOrder: 0
  },
  {
    id: "fallback-finance",
    title: "Personal Finance App Concept",
    shortDescription:
      "Şəxsi maliyyəni daha aydın və daha idarəolunan göstərən məhsul konsepti.",
    longDescription:
      "Mürəkkəb göstəriciləri sadə qərar sisteminə çevirən mobil-first dashboard və təcrübə strukturu.",
    imageUrl: null,
    projectUrl: "#contact",
    githubUrl: "",
    tags: ["Figma", "Dashboard UX", "Frontend Architecture"],
    status: ProjectStatus.ACTIVE,
    displayOrder: 1
  },
  {
    id: "fallback-ar-menu",
    title: "3D / AR Menu System Concept",
    shortDescription:
      "Restoran və hospitality sahəsi üçün daha təcrübə yönümlü menyu təqdimatı.",
    longDescription:
      "Seçim prosesini daha canlı və inandırıcı edən 3D / AR məhsul təqdimat konsepti.",
    imageUrl: null,
    projectUrl: "#contact",
    githubUrl: "",
    tags: ["Spline", "AR", "UX Flow"],
    status: ProjectStatus.ACTIVE,
    displayOrder: 2
  },
  {
    id: "fallback-portfolio",
    title: "Portfolio / Landing Page Project",
    shortDescription:
      "Şəxsi brend və məhsul təqdimatı üçün minimal, premium və mobil-first web təcrübəsi.",
    longDescription:
      "Vizual iyerarxiya, sürətli təqdimat və güclü ilk təəssürat üçün qurulmuş portfolio strukturu.",
    imageUrl: null,
    projectUrl: "#contact",
    githubUrl: "",
    tags: ["Next.js", "Tailwind", "Brand UI"],
    status: ProjectStatus.ACTIVE,
    displayOrder: 3
  }
];

export const fallbackContactLinks: Pick<
  ContactLink,
  "id" | "type" | "label" | "value" | "href" | "enabled" | "displayOrder"
>[] = [
  { id: "fallback-email", type: ContactType.EMAIL, label: "Email", value: "murad@example.com", href: "mailto:murad@example.com", enabled: true, displayOrder: 0 },
  { id: "fallback-whatsapp", type: ContactType.WHATSAPP, label: "WhatsApp", value: "+994 50 000 00 00", href: "https://wa.me/994500000000", enabled: true, displayOrder: 1 },
  { id: "fallback-linkedin", type: ContactType.LINKEDIN, label: "LinkedIn", value: "linkedin.com/in/murad", href: "https://linkedin.com/in/murad", enabled: true, displayOrder: 2 },
  { id: "fallback-instagram", type: ContactType.INSTAGRAM, label: "Instagram", value: "@murad.dev", href: "https://instagram.com/murad.dev", enabled: true, displayOrder: 3 },
  { id: "fallback-github", type: ContactType.GITHUB, label: "GitHub", value: "github.com/murad", href: "https://github.com/murad", enabled: true, displayOrder: 4 },
  { id: "fallback-phone", type: ContactType.PHONE, label: "Telefon", value: "+994 50 000 00 00", href: "tel:+994500000000", enabled: true, displayOrder: 5 }
];

export async function getSiteContent() {
  try {
    const content = await prisma.siteContent.findUnique({
      where: { id: "singleton" },
      select: {
        name: true,
        role: true,
        shortIntro: true,
        aboutText: true,
        heroImageUrl: true,
        heroPrimaryLabel: true,
        heroPrimaryHref: true,
        heroSecondaryLabel: true,
        heroSecondaryHref: true
      }
    });
    return content ?? fallbackSiteContent;
  } catch {
    return fallbackSiteContent;
  }
}

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: { status: ProjectStatus.ACTIVE },
      select: {
        id: true,
        title: true,
        shortDescription: true,
        longDescription: true,
        imageUrl: true,
        projectUrl: true,
        githubUrl: true,
        tags: true,
        status: true,
        displayOrder: true
      },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }]
    });
    return projects.length ? projects.map(normalizeProjectRecord) : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export async function getAllProjectsAdmin() {
  try {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        title: true,
        shortDescription: true,
        longDescription: true,
        imageUrl: true,
        projectUrl: true,
        githubUrl: true,
        tags: true,
        status: true,
        displayOrder: true
      },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }]
    });
    return projects.map(normalizeProjectRecord);
  } catch {
    return [];
  }
}

export async function getContactLinks() {
  try {
    const links = await prisma.contactLink.findMany({
      where: { enabled: true },
      select: {
        id: true,
        type: true,
        label: true,
        value: true,
        href: true,
        enabled: true,
        displayOrder: true
      },
      orderBy: { displayOrder: "asc" }
    });
    return links.length ? links : fallbackContactLinks;
  } catch {
    return fallbackContactLinks;
  }
}

export async function getContactLinksAdmin() {
  try {
    return await prisma.contactLink.findMany({
      select: {
        id: true,
        type: true,
        label: true,
        value: true,
        href: true,
        enabled: true,
        displayOrder: true
      },
      orderBy: { displayOrder: "asc" }
    });
  } catch {
    return [];
  }
}
