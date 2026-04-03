import { ContactForm } from "@/components/contact-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CtaSection } from "@/sections/cta-section";
import { getPageContent, getSiteSettings } from "@/lib/sanity/api";
import { buildMetadata } from "@/lib/utils/site";
import { ContentSections } from "@/sections/content-sections";
import { PageIntro } from "@/sections/page-intro";
import { SocialLinks } from "@/sections/social-links";

export async function generateMetadata() {
  const [settings, page] = await Promise.all([getSiteSettings(), getPageContent("contact")]);
  return buildMetadata(page, settings, "/contact");
}

export default async function ContactPage() {
  const [settings, page] = await Promise.all([getSiteSettings(), getPageContent("contact")]);
  const links = page.socialLinks?.length ? page.socialLinks : settings.socialLinks;

  return (
    <main className="pb-6">
      <SiteHeader name={settings.name} />
      <PageIntro eyebrow="Contact" title={page.title} copy={page.intro ?? page.subtitle} />
      <section className="container-shell mt-10 grid gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <ContactForm />
        <div className="space-y-6">
          <div className="glass-panel rounded-[1.25rem] p-5 sm:rounded-[1.5rem] sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] sm:text-sm sm:tracking-[0.28em]">Why Reach Out</p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">Simple conversations close faster than complicated forms.</h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--muted)]">
              <p>Tell me what you need built, fixed, or improved. I’ll reply with the best next step, not a long questionnaire.</p>
              <p>This is designed to make starting easy, especially if you already know the problem but not the exact technical solution.</p>
            </div>
          </div>
          <div className="glass-panel rounded-[1.25rem] p-5 sm:rounded-[1.5rem] sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] sm:text-sm sm:tracking-[0.28em]">Direct contact</p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">Reach out directly or through your preferred platform.</h2>
            <div className="mt-6">
              <SocialLinks links={links} />
            </div>
          </div>
        </div>
      </section>
      <ContentSections sections={page.contentSections} />
      <CtaSection title="Have a project in mind? Let’s build it." copy="A short message is enough to start the conversation." />
      <SiteFooter name={settings.name} socialLinks={settings.socialLinks} />
    </main>
  );
}
