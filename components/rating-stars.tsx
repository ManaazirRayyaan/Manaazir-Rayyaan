import { Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function RatingStars({ rating, className }: { rating?: number; className?: string }) {
  const normalizedRating = Math.max(0, Math.min(5, Math.round(rating ?? 0)));

  return (
    <div className={cn("flex items-center gap-1", className)} aria-label={`${normalizedRating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => {
        const isFilled = index < normalizedRating;

        return (
          <Star
            key={index}
            className={cn("h-4 w-4", isFilled ? "fill-[var(--accent)] text-[var(--accent)]" : "text-[var(--border)]")}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}
