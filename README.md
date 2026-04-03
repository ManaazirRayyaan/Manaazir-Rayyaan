# Personal Portfolio Website

A modern portfolio built with Next.js App Router, Tailwind CSS, Framer Motion, Sanity Studio, and Resend.

## Stack

- Next.js 15 with App Router
- Tailwind CSS 4
- Sanity CMS with embedded Studio
- Framer Motion animations
- Resend-powered contact form

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file and update the values:

```bash
cp .env.example .env.local
```

3. Start the app:

```bash
npm run dev
```

4. Open the portfolio at [http://localhost:3000](http://localhost:3000).

5. Open Sanity Studio at [http://localhost:3000/studio](http://localhost:3000/studio).

## Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-03-01
SANITY_API_READ_TOKEN=
SANITY_API_WRITE_TOKEN=
RESEND_API_KEY=
CONTACT_TO_EMAIL=your-inbox@example.com
CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>
```

## Connecting Sanity

1. Create a Sanity project with `npm create sanity@latest`.
2. Copy the Sanity project ID and dataset into `.env.local`.
3. Run the app and open `/studio`.
4. Create:
   - one `Site settings` document
   - one `Site page` document for `home`
   - one `Site page` document for `about`
   - one `Site page` document for `contact`
   - any number of `Project` documents
5. Use the `media` fields to upload images, audio, or video directly in Studio.
6. Use each document’s SEO object to manage title, description, and Open Graph image values.
7. If you want project inquiries saved in Sanity, add `SANITY_API_WRITE_TOKEN` and review submissions in the `Lead` document type.

## Resend Setup

1. Create a [Resend](https://resend.com/) account and API key.
2. Add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` to `.env.local`.
3. In production, use a verified sending domain for `CONTACT_FROM_EMAIL`.
4. The contact form sends a structured onboarding email with project type, budget, features, timeline, scope, design direction, references, and detailed requirements.

## Notes

- The site includes fallback demo data so the UI renders before Sanity is connected.
- Project detail routes are generated from Sanity slugs at `/projects/[slug]`.
- Remote Sanity images are optimized through Next.js image handling.
