"use client";

import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="glass-panel inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--foreground)] transition-transform duration-300 hover:scale-105"
      aria-label="Toggle color theme"
    >
      {mounted && isDark ? <SunMedium className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
