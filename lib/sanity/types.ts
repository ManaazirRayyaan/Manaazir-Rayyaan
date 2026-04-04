export type SocialLink = {
  _key?: string;
  label: string;
  url: string;
};

export type LeadStatus = "New" | "Contacted" | "Closed";

export type Lead = {
  _id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
  status?: LeadStatus;
};

export type MediaItem = {
  _key?: string;
  mediaType: "image" | "audio" | "video";
  alt?: string;
  caption?: string;
  imageUrl?: string;
  fileUrl?: string;
};

export type SeoFields = {
  title?: string;
  description?: string;
  noIndex?: boolean;
  ogImage?: string;
};

export type ContentSection = {
  _key?: string;
  eyebrow?: string;
  title: string;
  body: string;
  highlights?: string[];
  media?: MediaItem[];
};

export type TimelineItem = {
  _key?: string;
  period: string;
  title: string;
  organization?: string;
  description: string;
};

export type SkillGroup = {
  _key?: string;
  title: string;
  skills: string[];
};

export type PageContent = {
  title: string;
  pageType: "home" | "about" | "contact";
  subtitle?: string;
  intro?: string;
  contentSections?: ContentSection[];
  timeline?: TimelineItem[];
  skillGroups?: SkillGroup[];
  socialLinks?: SocialLink[];
  seo?: SeoFields;
};

export type Project = {
  _id: string;
  title: string;
  slug: string;
  problem: string;
  solution: string;
  result: string;
  techStack: string[];
  status: "ongoing" | "completed";
  featured?: boolean;
  media?: MediaItem[];
  projectUrl?: string;
  repoUrl?: string;
  seo?: SeoFields;
};

export type SiteSettings = {
  name: string;
  role: string;
  shortIntroduction: string;
  location?: string;
  email?: string;
  defaultOgImage?: string;
  socialLinks: SocialLink[];
};
