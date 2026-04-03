import { defineField, defineType } from "sanity";

export const sitePageType = defineType({
  name: "sitePage",
  title: "Site page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pageType",
      title: "Page type",
      type: "string",
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "About", value: "about" },
          { title: "Contact", value: "contact" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "contentSections",
      title: "Content sections",
      type: "array",
      of: [{ type: "contentSection" }],
    }),
    defineField({
      name: "skillGroups",
      title: "Skill groups",
      type: "array",
      of: [{ type: "skillGroup" }],
    }),
    defineField({
      name: "timeline",
      title: "Timeline",
      type: "array",
      of: [{ type: "timelineItem" }],
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [{ type: "socialLink" }],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "pageType",
    },
  },
});
