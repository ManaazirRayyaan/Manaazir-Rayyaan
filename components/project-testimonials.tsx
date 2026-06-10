import { TestimonialCard } from "@/components/testimonial-card";
import type { Testimonial } from "@/lib/sanity/types";

function mergeTestimonials(testimonials: Testimonial[] = [], relatedTestimonials: Testimonial[] = []) {
  const seen = new Set<string>();

  return [...testimonials, ...relatedTestimonials].filter((testimonial) => {
    if (!testimonial?._id || seen.has(testimonial._id) || testimonial.published === false) {
      return false;
    }

    seen.add(testimonial._id);
    return true;
  });
}

export function ProjectTestimonials({
  testimonials,
  relatedTestimonials,
}: {
  testimonials?: Testimonial[];
  relatedTestimonials?: Testimonial[];
}) {
  const visibleTestimonials = mergeTestimonials(testimonials, relatedTestimonials);

  if (!visibleTestimonials.length) {
    return null;
  }

  return (
    <section className="mt-10" aria-labelledby="client-says-heading">
      <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">Client Says</p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="client-says-heading" className="section-title">
            Related Testimonials
          </h2>
          <p className="section-copy sm:max-w-md">
            Client feedback connected directly to this project through Sanity.
          </p>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {visibleTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial._id} testimonial={testimonial} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
