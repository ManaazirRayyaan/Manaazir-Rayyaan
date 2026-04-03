import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "SEO title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "SEO description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "noIndex",
      title: "No index",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
