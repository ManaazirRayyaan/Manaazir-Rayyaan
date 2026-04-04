"use client";

import { useMemo, useState } from "react";
import type { Lead, LeadStatus } from "@/lib/sanity/types";

const STATUS_OPTIONS: LeadStatus[] = ["New", "Contacted", "Closed"];

const statusStyles: Record<LeadStatus, string> = {
  New: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/12 dark:text-blue-200",
  Contacted: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/12 dark:text-amber-200",
  Closed: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/12 dark:text-emerald-200",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatDateTime(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

function normalizeLeadStatus(status?: LeadStatus) {
  return status ?? "New";
}

async function updateLeadStatus(id: string, status: LeadStatus) {
  const response = await fetch("/api/update-lead", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, status }),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(payload?.message || "Failed to update lead.");
  }
}

export function LeadsDashboard({ leads }: { leads: Lead[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "All">("All");
  const [items, setItems] = useState(leads.map((lead) => ({ ...lead, status: normalizeLeadStatus(lead.status) })));
  const [error, setError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((lead) => {
      const matchesSearch =
        query.length === 0 ||
        lead.name.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query);

      const matchesStatus = statusFilter === "All" || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [items, search, statusFilter]);

  const counts = useMemo(
    () =>
      items.reduce(
        (acc, lead) => {
          acc.total += 1;
          acc[lead.status] += 1;
          return acc;
        },
        { total: 0, New: 0, Contacted: 0, Closed: 0 } as Record<"total" | LeadStatus, number>,
      ),
    [items],
  );

  function handleStatusChange(id: string, nextStatus: LeadStatus) {
    const previous = items;

    setError(null);
    setPendingId(id);
    setItems((current) => current.map((lead) => (lead._id === id ? { ...lead, status: nextStatus } : lead)));

    void updateLeadStatus(id, nextStatus)
      .catch((caught) => {
        setItems(previous);
        setError(caught instanceof Error ? caught.message : "Failed to update lead.");
      })
      .finally(() => {
        setPendingId(null);
      });
  }

  return (
    <section className="container-shell py-8 sm:py-10 md:py-12">
      <div className="glass-panel rounded-[1.25rem] p-5 sm:rounded-[1.5rem] sm:p-6 lg:p-8">
        <div className="flex flex-col gap-6 border-b border-[var(--border)] pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] sm:text-sm sm:tracking-[0.28em]">
              Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Leads Dashboard</h1>
            <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/82 sm:text-base sm:leading-8">
              Manage your incoming client inquiries, review recent messages, and track follow-up status.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Total</p>
              <p className="mt-2 text-2xl font-semibold">{counts.total}</p>
            </div>
            <div className="rounded-2xl border border-blue-200/80 bg-blue-50/80 px-4 py-4 dark:border-blue-500/20 dark:bg-blue-500/10">
              <p className="text-xs uppercase tracking-[0.18em] text-blue-700 dark:text-blue-200">New</p>
              <p className="mt-2 text-2xl font-semibold text-blue-700 dark:text-blue-100">{counts.New}</p>
            </div>
            <div className="rounded-2xl border border-amber-200/80 bg-amber-50/80 px-4 py-4 dark:border-amber-500/20 dark:bg-amber-500/10">
              <p className="text-xs uppercase tracking-[0.18em] text-amber-700 dark:text-amber-200">Contacted</p>
              <p className="mt-2 text-2xl font-semibold text-amber-700 dark:text-amber-100">{counts.Contacted}</p>
            </div>
            <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/80 px-4 py-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
              <p className="text-xs uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-200">Closed</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-700 dark:text-emerald-100">{counts.Closed}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px] lg:w-full lg:max-w-2xl">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or email"
              className="min-h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 text-sm outline-none transition focus:border-[var(--accent)]"
            />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as LeadStatus | "All")}
              className="min-h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 text-sm outline-none transition focus:border-[var(--accent)]"
            >
              <option value="All">All statuses</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm text-[var(--muted)]">
            {filteredLeads.length} {filteredLeads.length === 1 ? "lead" : "leads"} shown
          </div>
        </div>

        {error ? (
          <div className="mt-4 rounded-2xl border border-red-300/70 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/12 dark:text-red-200">
            {error}
          </div>
        ) : null}

        <div className="mt-6 hidden overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface-strong)] md:block">
          <div className="grid grid-cols-[1.1fr_1.2fr_2fr_0.8fr_0.9fr_1fr] gap-4 border-b border-[var(--border)] px-5 py-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
            <span>Name</span>
            <span>Email</span>
            <span>Message</span>
            <span>Date</span>
            <span>Status</span>
            <span>Update</span>
          </div>

          <div className="divide-y divide-[var(--border)]">
            {filteredLeads.map((lead) => (
              <div key={lead._id} className="grid grid-cols-[1.1fr_1.2fr_2fr_0.8fr_0.9fr_1fr] gap-4 px-5 py-5 text-sm">
                <div>
                  <p className="font-medium text-[var(--foreground)]">{lead.name}</p>
                </div>
                <a href={`mailto:${lead.email}`} className="break-all text-[var(--foreground)]/80 hover:text-[var(--foreground)]">
                  {lead.email}
                </a>
                <p className="overflow-hidden text-[var(--foreground)]/78 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                  {lead.message}
                </p>
                <p className="text-[var(--foreground)]/78">{formatDate(lead.submittedAt)}</p>
                <div>
                  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[lead.status]}`}>
                    {lead.status}
                  </span>
                </div>
                <select
                  value={lead.status}
                  disabled={pendingId === lead._id}
                  onChange={(event) => handleStatusChange(lead._id, event.target.value as LeadStatus)}
                  className="min-h-11 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition focus:border-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:hidden">
          {filteredLeads.map((lead) => (
            <article key={lead._id} className="rounded-[1.1rem] border border-[var(--border)] bg-[var(--surface-strong)] p-4 shadow-[var(--shadow)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold">{lead.name}</p>
                  <a href={`mailto:${lead.email}`} className="mt-1 block break-all text-sm text-[var(--muted)]">
                    {lead.email}
                  </a>
                </div>
                <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[lead.status]}`}>
                  {lead.status}
                </span>
              </div>

              <p className="mt-4 overflow-hidden text-sm leading-7 text-[var(--foreground)]/80 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                {lead.message}
              </p>

              <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                <span className="text-[var(--muted)]">{formatDateTime(lead.submittedAt)}</span>
                <select
                  value={lead.status}
                  disabled={pendingId === lead._id}
                  onChange={(event) => handleStatusChange(lead._id, event.target.value as LeadStatus)}
                  className="min-h-11 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition focus:border-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </article>
          ))}
        </div>

        {filteredLeads.length === 0 ? (
          <div className="mt-6 rounded-[1.1rem] border border-dashed border-[var(--border)] px-5 py-12 text-center">
            <p className="text-lg font-semibold">No leads found</p>
            <p className="mt-2 text-sm leading-7 text-[var(--muted)]">Try a different search term or change the status filter.</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
