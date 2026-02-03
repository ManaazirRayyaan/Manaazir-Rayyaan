import React from "react";

const tools = [
  {
    group: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React", "TypeScript"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Django"],
  },
  {
    group: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
  },
  {
    group: "Design",
    items: ["Figma", "Photoshop", "Illustrator"],
  },
  {
    group: "Version Control",
    items: ["Git", "GitHub"],
  },
];

export default function Tools() {
  return (
    <section id="tools" className="relative w-full py-32">
      {/* Full-width background */}
      <div className="absolute inset-0 -z-10 bg-[#07080a]" />
      <div className="absolute inset-0 -z-10 silver-overlay" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Section intro */}
        <div className="mb-24 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-white">
            Tools
          </h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-400">
            The tools I work with daily — chosen for reliability, clarity, and
            long-term usefulness rather than trends.
          </p>
        </div>

        {/* Tool list */}
        <div className="grid gap-8 md:grid-cols-2">
          {tools.map(({ group, items }) => (
            <div
              key={group}
              className="glass p-7"
            >
              {/* Group name */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm tracking-[0.3em] uppercase text-zinc-300">
                  {group}
                </h3>
                <span className="h-2 w-2 rounded-full bg-[var(--blue)]" />
              </div>

              {/* Tools inline list */}
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-300">
                {items.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
