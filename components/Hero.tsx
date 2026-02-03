import React from "react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
    >
      {/* Full-width background */}
      <div className="absolute inset-0 -z-10 bg-[#07080a]" />
      <div className="absolute inset-0 -z-10 scan-grid" />
      <div className="absolute -top-32 right-[-10%] h-80 w-80 rounded-full bg-[rgba(45,107,255,0.35)] blur-3xl animate-drift" />
      <div className="absolute bottom-[-20%] left-[-5%] h-96 w-96 rounded-full bg-[rgba(255,45,45,0.35)] blur-3xl animate-drift" />
      <div className="absolute inset-0 -z-10 silver-overlay" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          {/* Intro line */}
          <p className="mb-6 text-sm tracking-[0.3em] uppercase text-zinc-400 animate-fadeup">
            Full Stack Developer + Graphic Designer
          </p>

          {/* Main statement */}
          <h1 className="text-[44px] leading-[0.95] sm:text-[62px] md:text-[78px] font-display font-semibold tracking-tight text-white animate-fadeup">
            I design and build
            <span className="text-gradient"> client-ready </span>
            digital products
            <br />
            that look sharp and perform.
          </h1>

          {/* Supporting line */}
          <p className="mt-8 max-w-xl text-base leading-relaxed text-zinc-300 animate-fadeup">
            Black-and-white precision with red and blue energy. I create
            full-stack experiences, visual identities, and marketing-ready sites
            that help businesses win clients.
          </p>

          {/* Subtle actions */}
          <div className="mt-12 flex flex-wrap items-center gap-6 animate-fadeup">
            <a
              href="#contact"
              className="glass px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:text-white"
            >
              Start a project
            </a>

            <a
              href="#skills"
              className="text-sm text-zinc-300 hover:text-white transition"
            >
              View skills →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
