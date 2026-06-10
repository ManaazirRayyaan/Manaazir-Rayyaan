import { AnimatedSection } from "@/components/animated-section";
import { TestimonialCard } from "@/components/testimonial-card";
import type { Testimonial } from "@/lib/sanity/types";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials?.length) {
    return null;
  }

  return (
    <AnimatedSection className="container-shell mt-14 scroll-mt-28 sm:mt-20" delay={0.05}>
      <section id="testimonials" aria-labelledby="testimonials-heading">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">Testimonials</p>
            <h2 id="testimonials-heading" className="section-title mt-3 max-w-3xl">
              Client feedback from projects built around practical business outcomes.
            </h2>
          </div>
          <p className="section-copy sm:max-w-sm">
            Real reviews connected to the same CMS project records that power the portfolio.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial._id} testimonial={testimonial} />
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
}
