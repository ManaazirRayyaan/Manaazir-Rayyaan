import Image from "next/image";
import Link from "next/link";
import { Quote } from "lucide-react";
import { RatingStars } from "@/components/rating-stars";
import type { Testimonial } from "@/lib/sanity/types";
import { cn } from "@/lib/utils/cn";

export function TestimonialCard({
  testimonial,
  compact = false,
  showProjectLink = false,
}: {
  testimonial: Testimonial;
  compact?: boolean;
  showProjectLink?: boolean;
}) {
  const clientMeta = [testimonial.clientRole, testimonial.companyName].filter(Boolean).join(", ");
  const initials = testimonial.clientName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article
      className={cn(
        "glass-panel group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-5 sm:p-6",
        compact ? "gap-5" : "gap-6",
      )}
    >
      <div className="absolute right-5 top-5 text-[var(--accent)]/20 transition-transform duration-300 group-hover:scale-110">
        <Quote className="h-10 w-10" aria-hidden="true" />
      </div>

      <div className="flex items-center gap-4 pr-12">
        {testimonial.clientPhotoUrl ? (
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface-strong)]">
            <Image
              src={testimonial.clientPhotoUrl}
              alt={testimonial.clientPhotoAlt ?? testimonial.clientName}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--accent-soft)] text-sm font-semibold text-[var(--foreground)]">
            {initials || "C"}
          </div>
        )}

        <div className="min-w-0">
          <h3 className="text-base font-semibold text-[var(--foreground)]">{testimonial.clientName}</h3>
          {clientMeta ? <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{clientMeta}</p> : null}
        </div>
      </div>

      <RatingStars rating={testimonial.rating} />

      <blockquote className="flex-1 text-sm leading-7 text-[var(--foreground)] sm:text-base sm:leading-8">
        &ldquo;{testimonial.content}&rdquo;
      </blockquote>

      {showProjectLink && testimonial.projectReference?.slug ? (
        <Link
          href={`/projects/${testimonial.projectReference.slug}`}
          className="inline-flex w-fit items-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:border-[var(--accent)]"
        >
          View related project
        </Link>
      ) : null}
    </article>
  );
}
