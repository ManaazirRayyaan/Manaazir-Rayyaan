import { createClient } from "@sanity/client";
import { existsSync, readFileSync } from "node:fs";

for (const envFile of [".env.local", ".env"]) {
  if (!existsSync(envFile)) {
    continue;
  }

  for (const line of readFileSync(envFile, "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);

    if (!match || process.env[match[1]]) {
      continue;
    }

    process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "gjojazpv";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-03-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  throw new Error("Missing SANITY_API_WRITE_TOKEN. Add a write token before seeding testimonials.");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const project = await client.fetch(
  `*[
    _type == "project" &&
    lower(title) == "dr bruntha dental care"
  ][0]{_id, title, testimonials[]._ref}`,
);

const testimonialId = "testimonial-dr-bruntha-dental-care";

const testimonial = await client.createOrReplace({
  _id: testimonialId,
  _type: "testimonial",
  clientName: "Dr Bruntha",
  clientRole: "Founder",
  companyName: "Dr Bruntha Dental Care",
  content:
    "Manaazir was highly responsive throughout the project and delivered a modern website tailored to our clinic's requirements. The website allows us to manage content independently and provides a professional digital presence for our patients.",
  rating: 5,
  featured: true,
  projectReference: project?._id
    ? {
        _type: "reference",
        _ref: project._id,
      }
    : undefined,
  date: "2026-06-06",
  displayOrder: 1,
  published: true,
});

if (project?._id && !project.testimonials?.includes(testimonial._id)) {
  await client
    .patch(project._id)
    .setIfMissing({ testimonials: [] })
    .append("testimonials", [
      {
        _type: "reference",
        _ref: testimonial._id,
        _key: "dr-bruntha-testimonial",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

console.log(
  JSON.stringify(
    {
      testimonialId: testimonial._id,
      associatedProject: project?.title ?? null,
    },
    null,
    2,
  ),
);
