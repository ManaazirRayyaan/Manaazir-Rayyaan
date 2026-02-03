import React, { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || "Something went wrong.");
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <section id="contact" className="relative w-full py-32">
      {/* Full-width background */}
      <div className="absolute inset-0 -z-10 bg-[#07080a]" />
      <div className="absolute inset-0 -z-10 scan-grid" />
      <div className="absolute inset-0 -z-10 silver-overlay" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Intro */}
        <div className="mb-20 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-white">
            Let’s build something sharp
          </h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-400">
            If you have an idea, a project, or just want to start a conversation,
            feel free to reach out. I’m always open to thoughtful collaborations.
          </p>
        </div>

        {/* Contact content */}
        <div className="grid gap-16 md:grid-cols-2 items-start">
          {/* Left: direct contact */}
          <div className="space-y-8">
            <div>
              <p className="text-sm tracking-widest uppercase text-zinc-500">
                Email
              </p>
              <a
                href="mailto:rayyaanmanaazir@gmail.com"
                className="mt-3 inline-block text-lg text-zinc-200 hover:underline underline-offset-8 transition"
              >
                rayyaanmanaazir@gmail.com
              </a>
            </div>

            <div>
              <p className="text-sm tracking-widest uppercase text-zinc-500">
                Availability
              </p>
              <p className="mt-3 text-base text-zinc-400">
                Currently available for small projects and long-term
                collaborations.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <form
            className="glass space-y-6 max-w-lg p-8"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Your name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-zinc-200 outline-none focus:border-[var(--blue)] transition"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Your email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-zinc-200 outline-none focus:border-[var(--blue)] transition"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Message
              </label>
              <textarea
                rows={4}
                name="message"
                required
                className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-zinc-200 outline-none focus:border-[var(--red)] transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="pt-4 text-sm font-semibold uppercase tracking-[0.2em] text-white hover:underline underline-offset-8 transition disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send message →"}
            </button>

            {status === "sent" && (
              <p className="text-sm text-zinc-300">
                Message sent. I’ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-300">
                {error || "Message failed. Please try again."}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
