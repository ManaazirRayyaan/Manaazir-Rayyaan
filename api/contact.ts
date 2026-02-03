import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
  runtime: "nodejs",
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({
      ok: false,
      error: "Name, email, and message are required.",
    });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({
      ok: false,
      error: "Server is missing RESEND_API_KEY.",
    });
  }

  const to = process.env.RESEND_TO || "rayyaanmanaazir@gmail.com";
  const from =
    process.env.RESEND_FROM || "Portfolio <onboarding@resend.dev>";

  try {
    await resend.emails.send({
      from,
      to,
      subject: `New portfolio inquiry from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error("Resend error", error);
    return res.status(500).json({
      ok: false,
      error: "Failed to send email.",
    });
  }
}
