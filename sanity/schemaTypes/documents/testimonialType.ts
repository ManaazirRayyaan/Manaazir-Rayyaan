import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "clientRole",
      title: "Client Position / Role",
      type: "string",
    }),
    defineField({
      name: "companyName",
      title: "Company / Business Name",
      type: "string",
    }),
    defineField({
      name: "clientPhoto",
      title: "Client Photo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "content",
      title: "Testimonial Content",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required().min(20),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      initialValue: 5,
      validation: (rule) => rule.required().integer().min(1).max(5),
    }),
    defineField({
      name: "featured",
      title: "Featured Testimonial",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "projectReference",
      title: "Project Reference",
      type: "reference",
      to: [{ type: "project" }],
      description: "Optional project this testimonial should appear with.",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      initialValue: () => new Date().toISOString().slice(0, 10),
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first.",
      validation: (rule) => rule.integer(),
    }),
    defineField({
      name: "published",
      title: "Published Status",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "clientName",
      role: "clientRole",
      company: "companyName",
      media: "clientPhoto",
    },
    prepare({ title, role, company, media }) {
      const subtitle = [role, company].filter(Boolean).join(" at ");

      return {
        title,
        subtitle,
        media,
      };
    },
  },
});
