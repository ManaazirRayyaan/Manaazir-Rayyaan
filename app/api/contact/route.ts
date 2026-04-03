import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "next-sanity";
import type { InquiryFormValues } from "@/lib/contact";
import { dataset, projectId } from "@/lib/sanity/env";
import { formatInquiryEmail, inquirySchema } from "@/lib/contact";

const leadRequestMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 5 * 60 * 1000;

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const lastRequestAt = leadRequestMap.get(ip);

  if (lastRequestAt && now - lastRequestAt < RATE_LIMIT_WINDOW) {
    return true;
  }

  leadRequestMap.set(ip, now);
  return false;
}

async function saveLeadToSanity(payload: InquiryFormValues) {
  const writeToken = process.env.SANITY_API_WRITE_TOKEN;

  if (!writeToken || !projectId || !dataset) return;

  const writeClient = createClient({
    projectId,
    dataset,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-03-01",
    token: writeToken,
    useCdn: false,
  });

  await writeClient.create({
    _type: "lead",
    ...payload,
    submittedAt: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const clientIp = getClientIp(request);

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          message:
            "A recent inquiry was already submitted. Please wait a few minutes.",
        },
        { status: 429 }
      );
    }

    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Please fill all required fields correctly." },
        { status: 400 }
      );
    }

    if (parsed.data.website) {
      return NextResponse.json({ message: "Spam detected." });
    }

    // 🔥 ENV VARIABLES
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !toEmail || !fromEmail) {
      return NextResponse.json(
        {
          message:
            "Email delivery is not configured yet. Add environment variables.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const emailBody = formatInquiryEmail(parsed.data);

    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: parsed.data.email,
      subject: `New inquiry from ${parsed.data.name}`,
      text: emailBody,
    });

    // Save to Sanity (optional)
    try {
      await saveLeadToSanity(parsed.data);
    } catch {}

    return NextResponse.json({
      message: "Your message has been sent successfully.",
    });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}