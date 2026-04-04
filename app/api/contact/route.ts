import { NextResponse } from "next/server";
import { Resend } from "resend";
import type { InquiryFormValues } from "@/lib/contact";
import { client } from "@/sanity/lib/client";
import { formatInquiryEmail, inquirySchema } from "@/lib/contact";

const RATE_LIMIT_WINDOW = 5 * 60 * 1000;
const leadRequestMap = new Map<string, number>();

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() ?? "unknown";
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

  if (!writeToken) return;

  await client
    .withConfig({
      apiVersion: "2025-03-01",
      token: writeToken,
      useCdn: false,
    })
    .create({
      _type: "lead",
      ...payload,
      submittedAt: new Date().toISOString(),
      status: "New",
    });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const clientIp = getClientIp(request);

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { message: "Too many requests. Try again later." },
        { status: 429 }
      );
    }

    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid form data." },
        { status: 400 }
      );
    }

    if (parsed.data.website) {
      return NextResponse.json({ message: "Spam detected." });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !toEmail || !fromEmail) {
      return NextResponse.json(
        { message: "Email config missing." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    // 📩 Email to YOU
    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: parsed.data.email,
      subject: `New inquiry from ${parsed.data.name}`,
      text: formatInquiryEmail(parsed.data),
    });

    // 📩 Auto-reply to CLIENT
    await resend.emails.send({
      from: fromEmail,
      to: [parsed.data.email],
      subject: "Got your message — I'll reply soon",
      html: `
        <div style="font-family: sans-serif;">
          <h2>Hey ${parsed.data.name}, 👋</h2>
          <p>Thanks for reaching out. I’ve received your message and will reply within 24 hours.</p>
          <p>Feel free to reply with more details.</p>
          <br/>
          <p><strong>Manaazir Rayyaan</strong></p>
        </div>
      `,
    });

    // 💾 Save lead
    try {
      await saveLeadToSanity(parsed.data);
    } catch {}

    return NextResponse.json({
      message: "Message sent successfully ✅",
    });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
