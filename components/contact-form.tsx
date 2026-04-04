"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  initialInquiryValues,
  inquirySchema,
  type InquiryFormValues,
} from "@/lib/contact";

type FormState = {
  type: "idle" | "success" | "error";
  message: string;
};

type FieldErrors = Partial<Record<keyof InquiryFormValues, string>>;

const initialStatus: FormState = {
  type: "idle",
  message: "",
};

function inputClass(hasError?: boolean) {
  return `w-full rounded-2xl border bg-[var(--surface-strong)] px-4 py-3 outline-none transition ${
    hasError
      ? "border-red-500"
      : "border-[var(--border)] focus:border-[var(--accent)]"
  }`;
}

export function ContactForm() {
  const [values, setValues] =
    useState<InquiryFormValues>(initialInquiryValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormState>(initialStatus);
  const [isPending, setIsPending] = useState(false);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(initialStatus);

    // ✅ Validate with Zod
    const parsed = inquirySchema.safeParse(values);

    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const path = issue.path[0] as keyof InquiryFormValues;
        if (path && !nextErrors[path]) {
          nextErrors[path] = issue.message;
        }
      }
      setErrors(nextErrors);
      setStatus({
        type: "error",
        message: "Please fill all required fields correctly.",
      });
      return;
    }

    setErrors({});
    setIsPending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Message sent successfully! I’ll get back to you soon.",
        });
        setValues(initialInquiryValues);
      } else {
        setStatus({
          type: "error",
          message: result?.message || "Failed to send message.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Network error. Please try again later.",
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="glass-panel rounded-[1.25rem] p-5 sm:rounded-[1.5rem] sm:p-8">
      <div className="max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] sm:text-sm sm:tracking-[0.28em]">
          Contact
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          Tell me what you need, and I’ll reply with the next step.
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
          Share your idea, your problem, or what you want built.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {/* Honeypot (spam protection) */}
        <input
          type="text"
          name="website"
          value={values.website}
          onChange={handleChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--muted)]">
            Name
          </label>
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            className={inputClass(Boolean(errors.name))}
            placeholder="Your name"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--muted)]">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className={inputClass(Boolean(errors.email))}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--muted)]">
            Message
          </label>
          <textarea
            name="message"
            rows={6}
            value={values.message}
            onChange={handleChange}
            className={inputClass(Boolean(errors.message))}
            placeholder="Tell me about your project..."
          />
          {errors.message && (
            <p className="mt-2 text-sm text-red-500">{errors.message}</p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-6"
        >
          {isPending ? "Sending..." : "Start a Project"}
        </button>

        {/* Status Message */}
        {status.type !== "idle" && (
          <p
            className={
              status.type === "success"
                ? "text-sm text-emerald-600"
                : "text-sm text-red-500"
            }
          >
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
}
