import { defineField, defineType } from "sanity";

export const contentSectionType = defineType({
  name: "contentSection",
  title: "Content section",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "media",
      title: "Media",
      type: "array",
      of: [{ type: "mediaItem" }],
    }),
  ],
});
