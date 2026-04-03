import { defineField, defineType } from "sanity";

export const timelineItemType = defineType({
  name: "timelineItem",
  title: "Timeline item",
  type: "object",
  fields: [
    defineField({
      name: "period",
      title: "Period",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "organization",
      title: "Organization",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
});
