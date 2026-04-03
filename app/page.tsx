import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getFeaturedProjects, getPageContent, getSiteSettings } from "@/lib/sanity/api";
import { buildMetadata } from "@/lib/utils/site";
import { CtaSection } from "@/sections/cta-section";
import { ContentSections } from "@/sections/content-sections";
import { HeroSection } from "@/sections/hero-section";
import { ProjectsPreview } from "@/sections/projects-preview";
import { ServicesSection } from "@/sections/services-section";
import { SocialLinks } from "@/sections/social-links";

export async function generateMetadata() {
  const [settings, page] = await Promise.all([getSiteSettings(), getPageContent("home")]);
  return buildMetadata(page, settings, "/");
}

export default async function HomePage() {
  const [settings, page, featuredProjects] = await Promise.all([
    getSiteSettings(),
    getPageContent("home"),
    getFeaturedProjects(),
  ]);

  return (
    <main className="pb-6">
      <SiteHeader name={settings.name} />
      <HeroSection page={page} settings={settings} />
      <CtaSection title="Need a freelance developer who can actually ship?" copy="I work with businesses that want clean execution, clear communication, and a product that is ready to launch." />
      <section className="container-shell mt-10">
        <SocialLinks links={settings.socialLinks} />
      </section>
      <ServicesSection />
      <ProjectsPreview projects={featuredProjects} />
      <CtaSection title="Have a project in mind? Let’s build it." copy="If you need a web app, API, dashboard, or business website, I’m available to help." />
      <ContentSections sections={page.contentSections} />
      <CtaSection title="Ready to talk about your project?" copy="Send a message and I’ll reply with the next step, recommended approach, or a clear starting point." />
      <SiteFooter name={settings.name} socialLinks={settings.socialLinks} />
    </main>
  );
}
