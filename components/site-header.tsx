"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils/cn";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ name }: { name: string }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const brandName = name || "Portfolio";

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40">
      <div className="container-shell pt-3 sm:pt-4">
        <div className="glass-panel rounded-[1.25rem] px-3 py-3 sm:rounded-[1.5rem] sm:px-5">
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            <Link href="/" className="min-w-0 flex-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--foreground)] sm:flex-none sm:text-sm sm:tracking-[0.22em]">
              <span className="block truncate pr-2">{brandName}</span>
            </Link>
            <div className="flex items-center gap-2">
              <nav className="hidden items-center gap-1 lg:flex">
                {navigation.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm transition-colors",
                        active ? "bg-[var(--accent)] text-white" : "text-[var(--muted)] hover:text-[var(--foreground)]",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="hidden lg:block">
                <ThemeToggle />
              </div>
              <button
                type="button"
                onClick={() => setIsOpen((current) => !current)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] text-[var(--foreground)] lg:hidden sm:h-11 sm:w-11"
                aria-expanded={isOpen}
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {isOpen ? (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 w-full overflow-hidden rounded-xl bg-[var(--background)] p-3 shadow-md lg:hidden sm:p-4"
              >
                <nav className="space-y-4">
                  {navigation.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex min-h-11 w-full items-center rounded-xl px-4 py-3 text-sm transition-colors",
                          active ? "bg-[var(--accent)] text-white" : "bg-[var(--surface-strong)] text-[var(--foreground)]",
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
                <div className="mt-4 flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3">
                  <span className="text-sm text-[var(--muted)]">Theme</span>
                  <ThemeToggle />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
