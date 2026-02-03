import React from "react";

const skills = [
  {
    title: "Full Stack Craft",
    desc: "Systems thinking from UI to API. Fast, stable, and scalable builds.",
    tags: ["React", "TypeScript", "Node.js", "REST APIs", "SQL"],
  },
  {
    title: "Database Design",
    desc: "Clean schemas, optimized queries, and dependable data layers.",
    tags: ["PostgreSQL", "MySQL", "MongoDB", "Prisma", "Migrations"],
  },
  {
    title: "Visual Direction",
    desc: "Brand-forward design with bold typography and clean hierarchy.",
    tags: ["Visual Identity", "Layout Systems", "Design Tokens", "Figma"],
  },
  {
    title: "Interface Design",
    desc: "Pixel-precise UI for web apps, dashboards, and marketing sites.",
    tags: ["UI Design", "Responsive", "Prototyping", "Accessibility"],
  },
  {
    title: "Client Delivery",
    desc: "Clear communication, structured handoff, and launch support.",
    tags: ["Discovery", "Documentation", "QA", "Launch Support"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative w-full py-32">
      <div className="absolute inset-0 -z-10 bg-[#07080a]" />
      <div className="absolute inset-0 -z-10 silver-overlay" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-white">
            Skills
          </h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-300">
            A balanced set of engineering and design skills to deliver
            professional, client-ready work.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {skills.map((skill) => (
            <div key={skill.title} className="glass p-7">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[var(--red)]" />
                <span className="text-xs uppercase tracking-[0.3em] text-zinc-400">
                  Core Focus
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-display text-white">
                {skill.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                {skill.desc}
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-zinc-400">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
