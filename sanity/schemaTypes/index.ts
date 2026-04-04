import type { SchemaTypeDefinition } from "sanity";
import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { leadType } from "./documents/leadType";
import { projectType } from "./documents/projectType";
import { sitePageType } from "./documents/sitePageType";
import { siteSettingsType } from "./documents/siteSettingsType";
import { contentSectionType } from "./objects/contentSectionType";
import { mediaItemType } from "./objects/mediaItemType";
import { seoType } from "./objects/seoType";
import { skillGroupType } from "./objects/skillGroupType";
import { socialLinkType } from "./objects/socialLinkType";
import { timelineItemType } from "./objects/timelineItemType";
import { postType } from "./postType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettingsType,
    sitePageType,
    projectType,
    leadType,
    contentSectionType,
    mediaItemType,
    seoType,
    skillGroupType,
    socialLinkType,
    timelineItemType,
    postType,
    authorType,
    categoryType,
    blockContentType,
  ],
};
