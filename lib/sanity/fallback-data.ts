import { DEFAULT_SOCIAL_LINKS } from "@/lib/constants";
import type { PageContent, SiteSettings } from "@/lib/sanity/types";

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
