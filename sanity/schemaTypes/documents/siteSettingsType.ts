import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      initialValue: "Full Stack Developer + Graphic Designer",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortIntroduction",
      title: "Short introduction",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [{ type: "socialLink" }],
    }),
    defineField({
      name: "seo",
      title: "Default SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
    },
  },
});
