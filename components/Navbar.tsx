import React, { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* subtle backdrop */}
      <div className="absolute inset-0 bg-[#07080a]/80 backdrop-blur-md" />

      <nav className="relative mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Name / Logo */}
        <a
          href="#home"
          className="text-sm font-semibold tracking-[0.2em] uppercase text-zinc-200 hover:text-white transition"
        >
          Manaazir Rayyaan
        </a>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.3em] text-zinc-400">
          <a
            href="#home"
            className="hover:text-white transition"
          >
            Home
          </a>
          <a
            href="#skills"
            className="hover:text-white transition"
          >
            Skills
          </a>
          <a
            href="#services"
            className="hover:text-zinc-200 transition"
          >
            Services
          </a>
          <a
            href="#tools"
            className="hover:text-zinc-200 transition"
          >
            Tools
          </a>
          <a
            href="#contact"
            className="hover:text-zinc-200 transition"
          >
            Contact
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <span className="w-6 h-px bg-zinc-200" />
          <span className="w-6 h-px bg-zinc-200" />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden relative px-6 pb-6 pt-2 text-sm text-zinc-300 bg-[#07080a]/95 backdrop-blur-md">
          <div className="space-y-4">
            <a
              href="#home"
              className="block hover:text-white transition"
              onClick={() => setOpen(false)}
            >
              Home
            </a>
            <a
              href="#skills"
              className="block hover:text-white transition"
              onClick={() => setOpen(false)}
            >
              Skills
            </a>
            <a
              href="#services"
              className="block hover:text-white transition"
              onClick={() => setOpen(false)}
            >
              Services
            </a>
            <a
              href="#tools"
              className="block hover:text-white transition"
              onClick={() => setOpen(false)}
            >
              Tools
            </a>
            <a
              href="#contact"
              className="block hover:text-white transition"
              onClick={() => setOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
