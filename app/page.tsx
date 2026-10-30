import { getContactLinks, getProjects, getSiteContent } from "@/lib/site-data";
import { PublicPortfolio } from "@/components/site/public-portfolio";

export default async function HomePage() {
  const [content, projects, contactLinks] = await Promise.all([
    getSiteContent(),
    getProjects(),
    getContactLinks()
  ]);

  return <PublicPortfolio content={content} projects={projects} contactLinks={contactLinks} />;
}
