import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TestimonialCard } from "@/components/testimonial-card";
import { getAllTestimonials, getSiteSettings } from "@/lib/sanity/api";
import { buildMetadata } from "@/lib/utils/site";
import { AnimatedSection } from "@/components/animated-section";
import { CtaSection } from "@/sections/cta-section";

export const revalidate = 0;

export async function generateMetadata() {
  const settings = await getSiteSettings();

  return buildMetadata(
    {
      title: "Testimonials",
      subtitle: "Trusted by businesses and professionals through practical, CMS-driven project delivery.",
      seo: {
        title: "Testimonials | Portfolio",
        description: "Client testimonials and project feedback from businesses and professionals.",
      },
    },
    settings,
    "/testimonials",
  );
}

export default async function TestimonialsPage() {
  const [settings, testimonials] = await Promise.all([getSiteSettings(), getAllTestimonials()]);
  const testimonialCount = testimonials.length;

  return (
    <main className="pb-6">
      <SiteHeader name={settings.name} />

      <AnimatedSection className="container-shell pt-12 sm:pt-16">
        <section aria-labelledby="testimonials-page-heading">
          <p className="text-sm uppercase tracking-[0.32em] text-[var(--muted)]">Testimonials</p>
          <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_14rem] lg:items-end">
            <div>
              <h1 id="testimonials-page-heading" className="font-[var(--font-display)] text-5xl font-semibold tracking-tight sm:text-6xl">
                Trusted by Businesses and Professionals
              </h1>
              <p className="section-copy mt-5">
                Client feedback from CMS-backed portfolio projects, including business websites, content-managed builds, and practical digital products.
              </p>
            </div>

            <div className="glass-panel rounded-[1.5rem] p-5 text-center">
              <p className="text-4xl font-semibold text-[var(--accent)]">{testimonialCount}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.22em] text-[var(--muted)]">
                {testimonialCount === 1 ? "Review" : "Reviews"}
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection className="container-shell mt-10 sm:mt-12" delay={0.05}>
        {testimonials.length ? (
          <section aria-label="Client testimonials" className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial._id} testimonial={testimonial} showProjectLink />
            ))}
          </section>
        ) : (
          <section className="glass-panel rounded-[2rem] p-8 text-center sm:p-10" aria-labelledby="empty-testimonials-heading">
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">No Published Reviews</p>
            <h2 id="empty-testimonials-heading" className="mt-3 text-2xl font-semibold">
              Testimonials will appear here once they are published in Sanity.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">
              Add or publish testimonial documents in Sanity Studio to populate this page automatically.
            </p>
          </section>
        )}
      </AnimatedSection>

      <CtaSection title="Want a result your clients can trust?" copy="Send the project details and I’ll help you shape a practical path from requirement to launch." />
      <SiteFooter name={settings.name} socialLinks={settings.socialLinks} />
    </main>
  );
}
