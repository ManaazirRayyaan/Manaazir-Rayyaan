import { defineField, defineType } from "sanity";

export const leadType = defineType({
  name: "lead",
  title: "Lead",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "email", title: "Email", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 8,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "New" },
          { title: "Contacted", value: "Contacted" },
          { title: "Closed", value: "Closed" },
        ],
      },
      initialValue: "New",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      status: "status",
    },
    prepare({ title, subtitle, status }) {
      return {
        title,
        subtitle: `${subtitle} • ${status ?? "New"}`,
      };
    },
  },
});
