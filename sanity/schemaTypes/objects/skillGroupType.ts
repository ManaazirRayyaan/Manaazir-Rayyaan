import { defineField, defineType } from "sanity";

export const skillGroupType = defineType({
  name: "skillGroup",
  title: "Skill group",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
});
