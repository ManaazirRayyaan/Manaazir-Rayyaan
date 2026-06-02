import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import type { PageContent, SiteSettings } from "@/lib/sanity/types";

export function HeroSection({ page, settings }: { page: PageContent; settings: SiteSettings }) {
  return (
    <AnimatedSection className="container-shell pt-6 sm:pt-8 md:pt-10 lg:pt-12">
      <div className="glass-panel relative overflow-hidden rounded-[1.25rem] px-4 py-6 sm:rounded-[1.5rem] sm:px-6 sm:py-10 md:px-8 md:py-12">
        
        {/* Main Content & Portrait Top Section Grid */}
        <div className="relative grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          
          {/* Left Content Column */}
          <div className="max-w-4xl">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] sm:text-sm sm:tracking-[0.28em]">
              Digital Product Developer & Brand Strategist
            </p>
            
            <h1 className="mt-3 font-[var(--font-display)] text-3xl font-semibold tracking-tight sm:mt-4 sm:text-5xl md:text-6xl lg:text-7xl whitespace-nowrap">
              Manaazir Rayyaan
            </h1>
            
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--foreground)] sm:text-lg md:text-xl md:leading-8">
              Hi, I&apos;m Manaazir Rayyaan — a digital product engineer blending full-stack development, SEO, and marketing to scale brands.
            </p>
            
            <h2 className="mt-4 font-[var(--font-display)] text-lg font-semibold tracking-tight sm:text-xl md:text-2xl lg:text-3xl">
              I build scalable web applications using Django & React
            </h2>
            
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)] sm:text-lg md:text-xl md:leading-8">
              Helping businesses launch fast, reliable digital products.
            </p>
            
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)] sm:mt-5 sm:text-base md:text-lg">
              {page.intro ?? settings.shortIntroduction}
            </p>
            
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link 
                href="/contact" 
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white sm:w-auto sm:px-6"
              >
                Hire Me
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link 
                href="/projects" 
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[var(--border)] px-5 py-3 text-sm text-[var(--foreground)] sm:w-auto sm:px-6"
              >
                View Projects
              </Link>
            </div>
          </div>

          {/* Right Column (Standalone Portrait Card) */}
          <div className="w-full flex justify-center lg:justify-end">
            <div className="relative aspect-[3/4] w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[340px] overflow-hidden rounded-[1.1rem] border border-[var(--border)] bg-[var(--surface-strong)] sm:rounded-[1.25rem]">
              <Image
                src="/Manaazir in Suit.jpeg"
                alt="Manaazir Rayyaan"
                fill
                priority
                className="object-cover object-top transition-transform duration-500 ease-in-out hover:scale-[1.02]"
                sizes="(max-w-768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Bottom Cards Row (Stretched all the way across the bottom) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full items-stretch mt-8 pt-6 border-t border-[var(--border)]/30">
          
          <div className="rounded-[0.9rem] bg-[var(--accent-soft)] p-4 sm:rounded-[1rem] sm:p-5 flex flex-col justify-center">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] sm:text-sm sm:tracking-[0.24em]">
              Best fit
            </p>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground)] sm:text-base">
              Business websites, dashboards, custom portals, internal tools, and API-powered products.
            </p>
          </div>
          
          <div className="rounded-[0.9rem] border border-[var(--border)] bg-[var(--surface-strong)] p-4 sm:rounded-[1rem] sm:p-5 flex flex-col justify-center">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] sm:text-sm sm:tracking-[0.24em]">
              What clients want
                </p>
                <ul className="mt-3 space-y-1.5 text-xs leading-5 text-[var(--muted)] sm:text-sm sm:leading-6">
                  <li>• Fast delivery without fragile code</li>
                  <li>• Clear communication & predictable execution</li>
                  <li>• Products easy to maintain post-launch</li>
                </ul>
          </div>
          
        </div>

      </div>
    </AnimatedSection>
  );
}