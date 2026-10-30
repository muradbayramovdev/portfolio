import { PrismaClient, ContactType, ProjectStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Sample public content to make the portfolio usable right after migration.
  await prisma.siteContent.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      name: "Murad",
      role: "AI yönümlü rəqəmsal məhsullar quran full stack developer",
      shortIntro:
        "Məhsul düşüncəsini, dizayn keyfiyyətini və development icrasını birləşdirərək real istifadə üçün web təcrübələri və AI dəstəkli sistemlər hazırlayıram.",
      aboutText:
        "Mən özümü yalnız kod yazan biri kimi deyil, problemi anlayıb onu işlək və dəyərli məhsula çevirən builder kimi görürəm. Fokusum launch etməkdən çox, real istifadədə özünü doğruldan rəqəmsal həllər qurmaqdır.",
      heroPrimaryLabel: "Seçilmiş işlərə baxın",
      heroPrimaryHref: "#projects",
      heroSecondaryLabel: "Layihənizi danışaq",
      heroSecondaryHref: "#contact"
    }
  });

  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: [
      {
        title: "Blink",
        shortDescription: "NFC əsaslı hədiyyə kartı təcrübəsini rəqəmsal məhsul axınına çevirən konsept.",
        longDescription: "İlk təmas, aktivləşdirmə və paylaşıla bilən digital gifting flow üçün düşünülmüş məhsul işi.",
        projectUrl: "#contact",
        githubUrl: "",
        tags: ["Product", "UI/UX", "JavaScript"],
        status: ProjectStatus.ACTIVE,
        displayOrder: 0
      },
      {
        title: "Personal Finance App Concept",
        shortDescription: "Maliyyə göstəricilərini daha aydın qərarlara çevirən mobil-first app konsepti.",
        longDescription: "Sadə dashboard strukturu, xərclərin vizuallaşdırılması və qərar dəstəyi üzərində qurulub.",
        projectUrl: "#contact",
        githubUrl: "",
        tags: ["Dashboard", "Figma", "Frontend"],
        status: ProjectStatus.ACTIVE,
        displayOrder: 1
      },
      {
        title: "3D / AR Menu System Concept",
        shortDescription: "Hospitality sahəsi üçün daha canlı və daha inandırıcı menyu təcrübəsi.",
        longDescription: "3D obyekt təqdimatı və AR yönümlü interaction flow ilə fərqli məhsul təqdimatı.",
        projectUrl: "#contact",
        githubUrl: "",
        tags: ["3D", "AR", "UX"],
        status: ProjectStatus.ACTIVE,
        displayOrder: 2
      },
      {
        title: "Portfolio / Landing Page Project",
        shortDescription: "Şəxsi brand və məhsul təqdimatı üçün premium, sürətli və conversion-aware web təcrübəsi.",
        longDescription: "Təmiz struktur, güclü vizual iyerarxiya və mobil-first təqdimat keyfiyyəti ilə hazırlanıb.",
        projectUrl: "#contact",
        githubUrl: "",
        tags: ["Next.js", "Tailwind", "Brand UI"],
        status: ProjectStatus.ACTIVE,
        displayOrder: 3
      }
    ]
  });

  await prisma.contactLink.deleteMany();
  await prisma.contactLink.createMany({
    data: [
      { type: ContactType.EMAIL, label: "Email", value: "murad@example.com", href: "mailto:murad@example.com", enabled: true, displayOrder: 0 },
      { type: ContactType.WHATSAPP, label: "WhatsApp", value: "+994 50 000 00 00", href: "https://wa.me/994500000000", enabled: true, displayOrder: 1 },
      { type: ContactType.LINKEDIN, label: "LinkedIn", value: "linkedin.com/in/murad", href: "https://linkedin.com/in/murad", enabled: true, displayOrder: 2 },
      { type: ContactType.GITHUB, label: "GitHub", value: "github.com/murad", href: "https://github.com/murad", enabled: true, displayOrder: 3 },
      { type: ContactType.INSTAGRAM, label: "Instagram", value: "@murad.dev", href: "https://instagram.com/murad.dev", enabled: true, displayOrder: 4 },
      { type: ContactType.PHONE, label: "Phone", value: "+994 50 000 00 00", href: "tel:+994500000000", enabled: true, displayOrder: 5 }
    ]
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
