import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { MediaItem } from "@/lib/sanity/types";

export function RichMedia({ items, compact = false }: { items?: MediaItem[]; compact?: boolean }) {
  if (!items?.length) {
    return null;
  }

  return (
    <div className={cn("grid gap-4", compact ? "md:grid-cols-1" : "md:grid-cols-2")}>
      {items.map((item) => {
        if (item.mediaType === "image" && item.imageUrl) {
          return (
            <figure
              key={item._key ?? item.imageUrl}
              className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-strong)] shadow-[0_14px_40px_rgba(15,23,42,0.12)]"
            >
              <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <div className="ml-3 rounded-full border border-[var(--border)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  Browser Preview
                </div>
              </div>
              <div className="relative aspect-[16/10] bg-black/5">
                <Image src={item.imageUrl} alt={item.alt ?? "Portfolio media"} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              {item.caption ? <figcaption className="px-4 py-3 text-sm text-[var(--muted)]">{item.caption}</figcaption> : null}
            </figure>
          );
        }

        if ((item.mediaType === "video" || item.mediaType === "audio") && item.fileUrl) {
          const MediaTag = item.mediaType;
          return (
            <figure key={item._key ?? item.fileUrl} className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-strong)] p-4">
              <MediaTag controls preload="metadata" className={cn("w-full rounded-2xl", item.mediaType === "audio" ? "h-14" : "aspect-video")}>
                <source src={item.fileUrl} />
              </MediaTag>
              {item.caption ? <figcaption className="mt-3 text-sm text-[var(--muted)]">{item.caption}</figcaption> : null}
            </figure>
          );
        }

        return null;
      })}
    </div>
  );
}
