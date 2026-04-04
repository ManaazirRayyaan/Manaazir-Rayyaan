import type { Metadata } from "next";
import { LeadsDashboard } from "@/components/leads-dashboard";
import { SiteHeader } from "@/components/site-header";
import { client } from "@/sanity/lib/client";
import type { Lead } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Leads Dashboard",
  description: "Manage your incoming client inquiries and lead statuses.",
  robots: {
    index: false,
    follow: false,
  },
};

const leadsQuery = `*[_type == "lead"] | order(submittedAt desc){
  _id,
  name,
  email,
  message,
  submittedAt,
  status
}`;

async function getLeads(): Promise<Lead[]> {
  try {
    return await client.fetch<Lead[]>(leadsQuery);
  } catch {
    return [];
  }
}

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <main className="min-h-screen pb-8">
      <SiteHeader name="Dashboard" />
      <LeadsDashboard leads={leads} />
    </main>
  );
}
