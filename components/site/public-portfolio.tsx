"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ContactLink, Project } from "@prisma/client";
import { ContactType } from "@prisma/client";
import { Globe, Moon, Sun } from "lucide-react";
import { ContactIcon } from "@/components/site/icons";
import type { ProjectRecord } from "@/lib/project-tags";
import { safeHref } from "@/lib/utils";

type SiteContent = {
  name: string;
  role: string;
  shortIntro: string;
  aboutText: string;
  heroImageUrl?: string | null;
  heroPrimaryLabel: string;
  heroPrimaryHref: string;
  heroSecondaryLabel: string;
  heroSecondaryHref: string;
};

type Language = "az" | "tr";
type Theme = "light" | "dark";

const copy = {
  az: {
    brandTag: "NFC-ready personal brand",
    brandSub: "AI məhsul builder",
    nav: [
      ["Haqqımda", "#about"],
      ["Xidmətlər", "#services"],
      ["Layihələr", "#projects"],
      ["Fokus", "#focus"],
      ["Əlaqə", "#contact"]
    ] as const,
    aboutEyebrow: "Haqqımda",
    aboutTitle: "Məhsul düşüncəsi, dizayn həssaslığı və development eyni sistemdə.",
    highlights: [
      ["AI-focused", "AI imkanlarını real məhsul axınına və istifadəçi dəyərinə çevirən praktik yanaşma."],
      ["Product-minded", "Qərarları yalnız texniki baxımdan deyil, nəticə və istifadə kontekstinə görə verirəm."],
      ["Design-aware", "Vizual keyfiyyət, sadəlik və icra intizamını birlikdə qoruyuram."]
    ],
    servicesEyebrow: "Xidmətlər",
    servicesTitle: "Kiçik ideyadan işlək rəqəmsal məhsula qədər.",
    services: [
      ["Portfolio saytlar", "Güclü ilk təəssürat yaradan şəxsi və peşəkar təqdimat saytları."],
      ["Landing page-lər", "Kampaniya, məhsul və startup təqdimatları üçün yüksək konversiyalı səhifələr."],
      ["Startup MVP", "Sürətli test, real istifadəçi feedback-i və iterasiya üçün minimal məhsul quruluşu."],
      ["AI dəstəkli həllər", "İş axınlarını və məhsul təcrübəsini gücləndirən AI yönümlü inteqrasiyalar."]
    ],
    projectsEyebrow: "Layihələr",
    projectsTitle: "Seçilmiş məhsul işləri və real dünya yönümlü həllər.",
    viewProject: "Layihəni aç",
    viewDetails: "Detallara bax",
    focusEyebrow: "Cari Fokus",
    focusTitle: "Hazırda diqqətim məhsul dəyəri olan daha ağıllı rəqəmsal sistemlərdədir.",
    focusText:
      "Blink üzərində işləyir, eyni zamanda AI dəstəkli məhsulların daha praktik, daha sürətli və daha etibarlı istifadəsinə fokuslanıram.",
    contactEyebrow: "Əlaqə",
    contactTitle: "Sürətli danışaq və ideyanı işlək məhsula çevirək.",
    contactText:
      "İş təklifi, freelance əməkdaşlıq və ya yeni məhsul ideyası üçün birbaşa yazın. Telefon və mesaj action-ları mobil istifadə üçün optimallaşdırılıb.",
    contactCta: "Ən sürətli yol",
    footerText: "AI yönümlü məhsul builder, full stack developer və rəqəmsal təcrübə tərəfdaşı.",
    projectStatus: { live: "Live", concept: "Concept" },
    quickContact: "Sürətli əlaqə"
  },
  tr: {
    brandTag: "NFC-ready personal brand",
    brandSub: "AI ürün builder",
    nav: [
      ["Hakkımda", "#about"],
      ["Hizmetler", "#services"],
      ["Projeler", "#projects"],
      ["Odak", "#focus"],
      ["İletişim", "#contact"]
    ] as const,
    aboutEyebrow: "Hakkımda",
    aboutTitle: "Ürün düşüncesi, tasarım hassasiyeti ve development aynı sistem içinde.",
    highlights: [
      ["AI-focused", "AI imkanlarını gerçek ürün akışına ve kullanıcı değerine dönüştüren pratik yaklaşım."],
      ["Product-minded", "Kararları sadece teknik açıdan değil, sonuç ve kullanım bağlamına göre veriyorum."],
      ["Design-aware", "Görsel kaliteyi, sadeliği ve uygulama disiplinini birlikte koruyorum."]
    ],
    servicesEyebrow: "Hizmetler",
    servicesTitle: "Küçük bir fikirden çalışan dijital ürüne kadar.",
    services: [
      ["Portfolio siteleri", "Güçlü ilk izlenim oluşturan kişisel ve profesyonel sunum siteleri."],
      ["Landing page'ler", "Kampanya, ürün ve startup sunumları için yüksek dönüşüm odaklı sayfalar."],
      ["Startup MVP", "Hızlı test, gerçek kullanıcı geri bildirimi ve iterasyon için minimum ürün yapısı."],
      ["AI destekli çözümler", "İş akışlarını ve ürün deneyimini güçlendiren AI odaklı entegrasyonlar."]
    ],
    projectsEyebrow: "Projeler",
    projectsTitle: "Seçilmiş ürün işleri ve gerçek dünya odaklı dijital çözümler.",
    viewProject: "Projeyi aç",
    viewDetails: "Detaylara bak",
    focusEyebrow: "Güncel Odak",
    focusTitle: "Şu anda odağım ürün değeri taşıyan daha akıllı dijital sistemlerde.",
    focusText:
      "Blink üzerinde çalışıyor, aynı zamanda AI destekli ürünlerin daha pratik, daha hızlı ve daha güvenilir kullanımı üzerine yoğunlaşıyorum.",
    contactEyebrow: "İletişim",
    contactTitle: "Hızlıca konuşalım ve fikri çalışan bir ürüne dönüştürelim.",
    contactText:
      "İş görüşmesi, freelance iş birliği ya da yeni ürün fikri için doğrudan yazabilirsiniz. Telefon ve mesaj aksiyonları mobil kullanım için optimize edildi.",
    contactCta: "En hızlı ulaşım",
    footerText: "AI odaklı ürün builder, full stack developer ve dijital deneyim partneri.",
    projectStatus: { live: "Live", concept: "Concept" },
    quickContact: "Hızlı iletişim"
  }
} as const;

function pickHeroLinks(links: ContactLink[]) {
  return links
    .filter((item) => [ContactType.EMAIL, ContactType.WHATSAPP, ContactType.LINKEDIN, ContactType.GITHUB].includes(item.type))
    .slice(0, 4);
}

function getProjectStatusLabel(project: Pick<ProjectRecord, "projectUrl">, language: Language) {
  return project.projectUrl && project.projectUrl !== "#contact" ? copy[language].projectStatus.live : copy[language].projectStatus.concept;
}

export function PublicPortfolio({
  content,
  projects,
  contactLinks
}: {
  content: SiteContent;
  projects: ProjectRecord[];
  contactLinks: Pick<ContactLink, "id" | "label" | "value" | "href" | "type">[];
}) {
  const [language, setLanguage] = useState<Language>("az");
  const [theme, setTheme] = useState<Theme>("light");
  const heroLinks = pickHeroLinks(contactLinks as ContactLink[]);
  const dictionary = copy[language];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("murad-language");
    const savedTheme = window.localStorage.getItem("murad-theme");

    if (savedLanguage === "az" || savedLanguage === "tr") {
      setLanguage(savedLanguage);
    }

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.lang = language;
    window.localStorage.setItem("murad-language", language);
    window.localStorage.setItem("murad-theme", theme);
  }, [language, theme]);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-4 sm:gap-8 sm:px-6 lg:px-8">
      <header className="bg-panel sticky top-3 z-30 rounded-[1.6rem] px-4 py-3 dark:bg-white/6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="inline-grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-sm font-extrabold text-white dark:bg-white dark:text-stone-950">
              M
            </span>
            <span>
              <span className="block text-sm font-bold text-slate-900 dark:text-white">{content.name}</span>
              <span className="block text-xs text-gray-800 dark:text-gray-300">{dictionary.brandSub}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {dictionary.nav.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-xl px-3 py-2 text-sm font-semibold text-gray-800 hover:text-slate-900 transition-colors duration-200 dark:text-gray-300 dark:hover:bg-white/8 dark:hover:text-white"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLanguage((current) => (current === "az" ? "tr" : "az"))}
              className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm font-semibold text-slate-900 hover:bg-indigo-50/50 hover:border-gray-300 transition-colors duration-200 dark:border-white/10 dark:bg-white/6 dark:text-stone-100"
              aria-label="Switch language"
            >
              <Globe className="h-4 w-4 text-cyan-600 dark:text-teal-300" />
              {language.toUpperCase()}
            </button>
            <button
              type="button"
              onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 text-slate-900 hover:bg-indigo-50/50 hover:border-gray-300 transition-colors duration-200 dark:border-white/10 dark:bg-white/6 dark:text-stone-100"
              aria-label="Toggle color theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-cyan-600" />}
            </button>
          </div>
        </div>
      </header>

      <section className="bg-panel overflow-hidden rounded-[2rem] p-5 dark:bg-white/6 sm:p-8 lg:p-10">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-5">
            <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700 dark:border-white/10 dark:bg-white/8 dark:text-teal-300">
              {dictionary.brandTag}
            </span>
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-600 dark:text-teal-300">{content.name}</p>
              <h1 className="max-w-[13ch] text-4xl font-extrabold leading-[1.02] tracking-[-0.055em] text-slate-900 dark:text-white sm:text-5xl lg:text-[3.65rem]">
                {content.role}
              </h1>
              <p className="max-w-xl text-sm leading-7 text-gray-800 dark:text-gray-300 sm:text-base">{content.shortIntro}</p>
            </div>
            <div className="grid gap-3 sm:max-w-xl sm:grid-cols-2">
              <Link href={content.heroPrimaryHref} className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-indigo-50/50 hover:border-gray-300 hover:text-indigo-950 transition-colors duration-200 dark:border-white/10 dark:bg-white dark:text-stone-950">
                {content.heroPrimaryLabel}
              </Link>
              <Link href={content.heroSecondaryHref} className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-indigo-50/50 hover:border-gray-300 hover:text-indigo-950 transition-colors duration-200 dark:border-white/10 dark:bg-white/8 dark:text-white">
                {content.heroSecondaryLabel}
              </Link>
            </div>
            <div className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-800 dark:text-gray-300">{dictionary.quickContact}</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {heroLinks.map((link) => (
                <a
                  key={link.id}
                  href={safeHref(link.href)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-gray-50/80 px-3 text-sm font-semibold text-slate-900 hover:bg-indigo-50/50 hover:border-gray-300 transition-colors duration-200 dark:border-white/10 dark:bg-white/7 dark:text-white"
                >
                  <ContactIcon type={link.type} />
                  <span className="hidden sm:inline">{link.label}</span>
                </a>
              ))}
            </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="pointer-events-none absolute -left-6 top-6 h-24 w-24 rounded-full bg-cyan-500/15 blur-2xl dark:bg-teal-400/20" />
            <div className="pointer-events-none absolute -right-8 bottom-10 h-28 w-28 rounded-full bg-amber-400/15 blur-2xl dark:bg-amber-300/15" />
            <div className="bg-panel rounded-[2rem] p-3 dark:bg-white/7 sm:p-4">
              <div className="rounded-[1.7rem] border border-gray-200 bg-gray-50 p-3 dark:border-white/10 dark:bg-black/20">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] border border-gray-200 bg-[linear-gradient(145deg,rgba(6,182,212,0.1),rgba(255,255,255,0.95),rgba(245,158,11,0.08))] dark:border-white/10 dark:bg-[linear-gradient(145deg,rgba(45,212,191,0.18),rgba(17,24,39,0.8),rgba(245,158,11,0.14))]">
              {content.heroImageUrl ? (
                <Image src={content.heroImageUrl} alt={content.name} fill className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-900 text-4xl font-extrabold text-white dark:bg-white dark:text-stone-950 shadow-xl">
                    M
                  </div>
                </div>
              )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-950/80 to-transparent px-5 pb-5 pt-12 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">{content.name}</p>
                    <p className="mt-2 max-w-[18ch] text-lg font-semibold leading-6">{content.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="bg-panel rounded-[1.75rem] p-6 dark:bg-white/6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-600 dark:text-teal-300">{dictionary.aboutEyebrow}</p>
          <h2 className="mt-3 max-w-[16ch] text-3xl font-extrabold tracking-[-0.05em] text-slate-900 dark:text-white">{dictionary.aboutTitle}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-800 dark:text-gray-300 sm:text-base">{content.aboutText}</p>
        </article>
        <div className="grid gap-4">
          {dictionary.highlights.map(([title, text]) => (
            <article key={title} className="bg-panel rounded-[1.5rem] p-5 dark:bg-white/6">
              <h3 className="text-lg font-bold tracking-[-0.04em] text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-gray-800 dark:text-gray-300">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="services" className="space-y-4">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-600 dark:text-teal-300">{dictionary.servicesEyebrow}</p>
          <h2 className="max-w-[18ch] text-3xl font-extrabold tracking-[-0.05em] text-slate-900 dark:text-white">{dictionary.servicesTitle}</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {dictionary.services.map(([title, text]) => (
            <article key={title} className="bg-panel rounded-[1.5rem] p-5 dark:bg-white/6">
              <h3 className="text-lg font-bold tracking-[-0.04em] text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-gray-800 dark:text-gray-300">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="space-y-4">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-600 dark:text-teal-300">{dictionary.projectsEyebrow}</p>
          <h2 className="max-w-[18ch] text-3xl font-extrabold tracking-[-0.05em] text-slate-900 dark:text-white">{dictionary.projectsTitle}</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <article key={project.id} className="bg-panel group flex min-h-full flex-col overflow-hidden rounded-[1.75rem] dark:bg-white/6">
              <div className="relative aspect-[16/10] overflow-hidden border-b border-gray-200 bg-gradient-to-br from-teal-900 via-gray-900 to-amber-500 dark:border-white/10">
                {project.imageUrl ? (
                  <Image src={project.imageUrl} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_18%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_50%)]" />
                    <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/90">{project.tags[0] ?? "Project"}</p>
                      <p className="mt-2 text-lg font-semibold text-white">{project.title}</p>
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6 bg-white dark:bg-transparent">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-700 dark:border-teal-300/20 dark:bg-teal-400/10 dark:text-teal-200">
                    {project.tags[0] ?? "Project"}
                  </div>
                  <div className="inline-flex rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-800 dark:border-white/10 dark:bg-white/8 dark:text-stone-200">
                    {getProjectStatusLabel(project, language)}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold tracking-[-0.05em] text-slate-900 dark:text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-800 dark:text-gray-300">{project.shortDescription}</p>
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-800 dark:border-white/10 dark:bg-white/8 dark:text-stone-200">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <a href={safeHref(project.projectUrl || "#contact")} className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 text-sm font-semibold text-slate-900 hover:bg-indigo-50/50 hover:border-gray-300 hover:text-indigo-950 transition-colors duration-200 dark:border-white/10 dark:bg-white/8 dark:text-white">
                    {dictionary.viewProject}
                  </a>
                  <a href={safeHref(project.githubUrl || project.projectUrl || "#contact")} className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-gray-900 px-4 text-sm font-semibold text-white hover:bg-slate-800 transition-colors duration-200 dark:bg-white dark:text-stone-950">
                    {dictionary.viewDetails}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="focus" className="bg-panel rounded-[1.75rem] p-6 dark:bg-white/6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-600 dark:text-teal-300">{dictionary.focusEyebrow}</p>
        <div className="mt-3 grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <h2 className="max-w-[16ch] text-3xl font-extrabold tracking-[-0.05em] text-slate-900 dark:text-white">{dictionary.focusTitle}</h2>
          <p className="text-sm leading-7 text-gray-800 dark:text-gray-300 sm:text-base">{dictionary.focusText}</p>
        </div>
      </section>

      <section id="contact" className="bg-panel rounded-[1.75rem] p-6 dark:bg-white/6 sm:p-8">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-600 dark:text-teal-300">{dictionary.contactEyebrow}</p>
            <h2 className="mt-3 max-w-[15ch] text-3xl font-extrabold tracking-[-0.05em] text-slate-900 dark:text-white">{dictionary.contactTitle}</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-800 dark:text-gray-300">
              {dictionary.contactText}
            </p>
            <div className="mt-5 inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700 dark:border-white/10 dark:bg-white/8 dark:text-stone-200">
              {dictionary.contactCta}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {contactLinks.map((link) => (
              <a
                key={link.id}
                href={safeHref(link.href)}
                className="inline-flex min-h-16 items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50/90 px-4 py-3 hover:bg-indigo-50/40 hover:border-gray-300 transition-colors duration-200 dark:border-white/10 dark:bg-black/20"
              >
                <span className="inline-grid h-11 w-11 place-items-center rounded-full bg-cyan-50 text-cyan-700 dark:bg-teal-400/15 dark:text-white">
                  <ContactIcon type={link.type} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-slate-900 dark:text-white">{link.label}</span>
                  <span className="block truncate text-xs font-semibold text-gray-800 dark:text-gray-300">{link.value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="pb-6 pt-2 text-center text-sm text-gray-800 dark:text-gray-300">
        <p className="font-bold text-slate-900 dark:text-stone-200">{content.name}</p>
        <p className="mt-2">{dictionary.footerText}</p>
      </footer>
    </main>
  );
}




