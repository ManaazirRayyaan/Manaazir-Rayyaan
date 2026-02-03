import "dotenv/config";
import express from "express";
import cors from "cors";
import { Resend } from "resend";

const app = express();
const port = process.env.PORT || 8787;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/contact", async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
