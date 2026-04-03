import { defineField, defineType } from "sanity";

export const mediaItemType = defineType({
  name: "mediaItem",
  title: "Media item",
  type: "object",
  fields: [
    defineField({
      name: "mediaType",
      title: "Media type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Audio", value: "audio" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.mediaType !== "image",
    }),
    defineField({
      name: "file",
      title: "Audio or video file",
      type: "file",
      hidden: ({ parent }) => parent?.mediaType === "image",
      options: {
        accept: "audio/*,video/*",
      },
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      hidden: ({ parent }) => parent?.mediaType !== "image",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
});
