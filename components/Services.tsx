import React from "react";
import { Code, Palette, Layout, Zap } from "lucide-react";

const services = [
  {
    index: "01",
    title: "Frontend Development",
    icon: Layout,
    desc: "Clean, responsive interfaces built with modern web standards, focusing on clarity, speed, and long-term maintainability.",
  },
  {
    index: "02",
    title: "Full Stack Systems",
    icon: Code,
    desc: "Thoughtfully structured stacks with clear data flow, reliable APIs, and a launch-ready deployment plan.",
  },
  {
    index: "03",
    title: "Brand & Visual Design",
    icon: Palette,
    desc: "Identity and visual systems that feel premium — typography, layout, and color that reinforce your brand.",
  },
  {
    index: "04",
    title: "Conversion-Ready UX",
    icon: Zap,
    desc: "Streamlined flows, sharp messaging, and fast performance that help clients take action.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative w-full py-32">
      {/* Full-width background */}
      <div className="absolute inset-0 -z-10 bg-[#07080a]" />
      <div className="absolute inset-0 -z-10 scan-grid" />
      <div className="absolute inset-0 -z-10 silver-overlay" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Section intro */}
        <div className="mb-24 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-white">
            Services
          </h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-400">
            A focused set of services for brands that need a clean, premium
            digital presence and reliable full-stack delivery.
          </p>
        </div>

        {/* Editorial services list */}
        <div className="space-y-20">
          {services.map(({ index, title, icon: Icon, desc }) => (
            <div
              key={title}
              className="group grid gap-8 md:grid-cols-[80px_1fr] items-start"
            >
              {/* Index + icon */}
              <div className="flex items-start gap-4 text-zinc-500">
                <span className="text-sm tracking-widest text-zinc-400">
                  {index}
                </span>
                <Icon className="h-5 w-5 text-[var(--blue)] opacity-80 group-hover:opacity-100 transition" />
              </div>

              {/* Content */}
              <div className="max-w-2xl">
                <h3 className="text-2xl font-display tracking-tight text-white">
                  {title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-zinc-400">
                  {desc}
                </p>

                {/* Subtle action */}
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm text-zinc-300 underline-offset-8 hover:underline transition"
                >
                  Request details
                  <span className="h-px w-6 bg-[var(--red)]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
