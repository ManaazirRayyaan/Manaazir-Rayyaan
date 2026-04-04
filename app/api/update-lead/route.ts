import { NextResponse } from "next/server";
import { z } from "zod";
import { client } from "@/sanity/lib/client";
import type { LeadStatus } from "@/lib/sanity/types";

const leadStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["New", "Contacted", "Closed"]),
});

export async function POST(request: Request) {
  try {
    const writeToken = process.env.SANITY_API_WRITE_TOKEN;

    if (!writeToken) {
      return NextResponse.json({ message: "Missing Sanity write token." }, { status: 500 });
    }

    const body = await request.json();
    const parsed = leadStatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid lead update payload." }, { status: 400 });
    }

    const { id, status } = parsed.data;

    await client
      .withConfig({
        apiVersion: "2025-03-01",
        token: writeToken,
        useCdn: false,
      })
      .patch(id)
      .set({ status: status as LeadStatus })
      .commit();

    return NextResponse.json({ message: "Lead updated.", status });
  } catch {
    return NextResponse.json({ message: "Failed to update lead." }, { status: 500 });
  }
}
