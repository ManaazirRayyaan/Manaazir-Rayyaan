import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { PersonSchema } from "@/components/schema";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://manaazirrayyaan.in"),
  title: "Manaazir Rayyaan | Full Stack Developer",
  description:
    "Manaazir Rayyaan is a full stack developer specializing in modern web applications, dashboards, and scalable systems using React, Next.js, Django, and Sanity.",
  keywords: [
    "Manaazir Rayyaan",
    "Full Stack Developer India",
    "React Developer",
    "Next.js Developer",
    "Django Developer",
    "Freelance Developer",
  ],
  authors: [{ name: "Manaazir Rayyaan" }],
  creator: "Manaazir Rayyaan",
  alternates: {
    canonical: "https://manaazirrayyaan.in",
  },
  openGraph: {
    title: "Manaazir Rayyaan Portfolio",
    description: "Full stack developer building scalable and modern web applications.",
    url: "https://manaazirrayyaan.in",
    siteName: "Manaazir Rayyaan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manaazir Rayyaan",
    description: "Full Stack Developer Portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${displayFont.variable} font-(--font-body) antialiased`}>
        <ThemeProvider>
          <PersonSchema />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
