import { DEFAULT_SOCIAL_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import type { PageContent, Project, SiteSettings } from "@/lib/sanity/types";

export const fallbackSettings: SiteSettings = {
  name: "Manaazir Rayyaan",
  role: "Freelance Django & React Developer",
  shortIntroduction:
    "I help businesses build fast, reliable web applications that support real operations, customer experiences, and growth.",
  location: "India",
  email: "hello@example.com",
  defaultOgImage:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  socialLinks: DEFAULT_SOCIAL_LINKS,
};

export const fallbackPages: Record<PageContent["pageType"], PageContent> = {
  home: {
    title: "I build scalable web applications using Django & React",
    pageType: "home",
    subtitle: "Helping businesses launch fast, reliable digital products",
    intro:
      "I work with businesses that need dependable web products, clean implementation, and clear communication from idea to launch.",
    contentSections: [
      {
        title: "How I Help",
        eyebrow: "Business Focus",
        body: "I build business websites, dashboards, portals, internal tools, and API-driven products with a focus on speed, usability, and maintainability.",
        highlights: [
          "Clear execution from idea to launch",
          "Fast and reliable delivery",
          "Scalable architecture",
          "Clean, maintainable code",
        ],
      },
    ],
  },
  about: {
    title: "About",
    pageType: "about",
    subtitle: "I help businesses turn ideas, bottlenecks, and outdated systems into web products that are practical to launch and dependable to run.",
    intro:
      "I work with businesses that need a developer who can understand the requirement, build the product cleanly, and deliver something reliable enough to use in the real world.",
    skillGroups: [
      {
        title: "Frontend Development",
        skills: ["Responsive user interfaces", "Clear page structure and CTA flows", "Performance-aware React implementation"],
      },
      {
        title: "Backend Development",
        skills: ["Django applications and APIs", "Scalable backend architecture", "Reliable business logic and integrations"],
      },
      {
        title: "Database Design",
        skills: ["Efficient data modeling", "MySQL-backed application structure", "Maintainable data flows for long-term growth"],
      },
    ],
    timeline: [
      {
        period: "Experience",
        title: "Freelance full-stack project delivery",
        organization: "Business websites, dashboards, APIs, CMS builds, and internal tools",
        description: "I handle projects from planning through launch, focusing on stable delivery, clean implementation, and products that businesses can use confidently after handoff.",
      },
    ],
    contentSections: [
      {
        title: "Why Clients Hire Me",
        eyebrow: "Positioning",
        body: "Clients hire me when they need more than code. They need someone who can understand the business requirement, communicate clearly, and build a product that works reliably once it goes live.",
        media: [
          {
            mediaType: "image",
            imageUrl: "/completed-projects.png",
            alt: "Polished product interface showing dashboard-style website sections",
            caption: "Professional product UI backed by clean implementation and dependable delivery.",
          },
        ],
      },
      {
        title: "What You Get",
        eyebrow: "Delivery",
        body: "Working with me means getting a product built around real business use, not unnecessary complexity or fragile shortcuts.",
        highlights: [
          "Business-focused execution",
          "Clean, scalable code",
          "Stable backend systems",
          "Smooth frontend experience",
          "Easy maintenance after launch",
        ],
      },
    ],
  },
  contact: {
    title: "Contact",
    pageType: "contact",
    subtitle: "I’m always open to new opportunities, collaborations, and freelance work.",
    intro:
      "If you have a project to launch, improve, or fix, send a message and I’ll get back to you with the next best step.",
    socialLinks: fallbackSettings.socialLinks,
    contentSections: [
      {
        title: "Contact",
        eyebrow: "Availability",
        body: "I’m available for freelance work, product builds, API development, bug fixing, and performance improvements.",
        highlights: ["Freelance builds", "Product improvements", "Bug fixing", "Long-term support"],
        media: [
          {
            mediaType: "image",
            imageUrl:
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
            alt: "Team collaboration meeting around a table",
            caption: "Open to collaborations, freelance work, and new opportunities.",
          },
        ],
      },
    ],
  },
};

export const fallbackProjects: Project[] = [
  {
    _id: "project-ongoing-1",
    title: "Content Operations Platform",
    slug: "creator-media-hub",
    problem: "The client needed a faster way to publish and manage media-rich content without relying on a developer for every update.",
    solution: "I built a CMS-powered platform with reusable content blocks, fast frontend rendering, and a cleaner publishing workflow.",
    result: "The business got a simpler content pipeline and a website structure that is easier to update, scale, and maintain.",
    techStack: ["Django", "React", "Sanity", "Tailwind CSS"],
    status: "ongoing",
    featured: true,
    media: [
      {
        mediaType: "image",
        imageUrl: "/ongoing-projects.png",
        alt: "CMS dashboard style interface with panels and analytics",
        caption: "CMS-style dashboard interface for creating, managing, and publishing content.",
      },
    ],
    projectUrl: "https://example.com",
    repoUrl: SOCIAL_LINKS.github,
    seo: {
      title: "Creator Media Hub",
      description: "A CMS-driven storytelling platform for creative portfolios and media publishing.",
    },
  },
  {
    _id: "project-completed-1",
    title: "Conversion-Focused Product Website",
    slug: "studio-commerce-showcase",
    problem: "The client needed a product website that looked stronger, loaded faster, and made it easier for visitors to take action.",
    solution: "I redesigned the frontend structure, improved responsiveness, and built a cleaner product presentation flow with stronger calls to action.",
    result: "The final site presented the offer more clearly and created a stronger foundation for lead generation and sales.",
    techStack: ["React", "Django", "Tailwind CSS", "MySQL"],
    status: "completed",
    featured: true,
    media: [
      {
        mediaType: "image",
        imageUrl: "/completed-projects.png",
        alt: "Polished landing page shown on a laptop screen",
        caption: "Clean landing-page presentation with strong layout, sections, and calls to action.",
      },
    ],
    projectUrl: "https://example.com",
    repoUrl: SOCIAL_LINKS.github,
    seo: {
      title: "Studio Commerce Showcase",
      description: "A premium storefront experience combining strong visual identity and frontend performance.",
    },
  },
];
