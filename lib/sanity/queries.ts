import groq from "groq";

const testimonialFields = groq`
  _id,
  clientName,
  clientRole,
  companyName,
  "clientPhotoUrl": clientPhoto.asset->url,
  "clientPhotoAlt": clientPhoto.alt,
  content,
  rating,
  featured,
  date,
  displayOrder,
  published,
  projectReference->{
    _id,
    title,
    "slug": slug.current
  }
`;

export const settingsQuery = groq`
  *[_type == "siteSettings"][0]{
    name,
    role,
    shortIntroduction,
    location,
    email,
    "defaultOgImage": seo.ogImage.asset->url,
    socialLinks[]{
      label,
      url
    }
  }
`;

export const pageByTypeQuery = groq`
  *[_type == "sitePage" && pageType == $pageType][0]{
    title,
    pageType,
    subtitle,
    intro,
    contentSections[]{
      _key,
      eyebrow,
      title,
      body,
      highlights,
      media[]{
        _key,
        mediaType,
        alt,
        caption,
        "imageUrl": image.asset->url,
        "fileUrl": file.asset->url
      }
    },
    timeline[]{
      _key,
      period,
      title,
      organization,
      description
    },
    skillGroups[]{
      _key,
      title,
      skills
    },
    socialLinks[]{
      label,
      url
    },
    seo{
      title,
      description,
      noIndex,
      "ogImage": ogImage.asset->url
    }
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(_createdAt desc)[0...4]{
    _id,
    title,
    "slug": slug.current,
    problem,
    solution,
    result,
    techStack,
    status,
    featured,
    testimonials[]->{
      ${testimonialFields}
    },
    media[]{
      _key,
      mediaType,
      alt,
      caption,
      "imageUrl": image.asset->url,
      "fileUrl": file.asset->url
    },
    "liveUrl": coalesce(liveUrl, projectUrl),
    repoUrl,
    seo{
      title,
      description,
      noIndex,
      "ogImage": ogImage.asset->url
    }
  }
`;

export const allProjectsQuery = groq`
  *[_type == "project"] | order(status asc, _createdAt desc){
    _id,
    title,
    "slug": slug.current,
    problem,
    solution,
    result,
    techStack,
    status,
    featured,
    testimonials[]->{
      ${testimonialFields}
    },
    media[]{
      _key,
      mediaType,
      alt,
      caption,
      "imageUrl": image.asset->url,
      "fileUrl": file.asset->url
    },
    "liveUrl": coalesce(liveUrl, projectUrl),
    repoUrl,
    seo{
      title,
      description,
      noIndex,
      "ogImage": ogImage.asset->url
    }
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    problem,
    solution,
    result,
    techStack,
    status,
    featured,
    testimonials[]->{
      ${testimonialFields}
    },
    "relatedTestimonials": *[
      _type == "testimonial" &&
      published != false &&
      projectReference._ref == ^._id
    ] | order(coalesce(displayOrder, 9999) asc, date desc, _createdAt desc){
      ${testimonialFields}
    },
    media[]{
      _key,
      mediaType,
      alt,
      caption,
      "imageUrl": image.asset->url,
      "fileUrl": file.asset->url
    },
    "liveUrl": coalesce(liveUrl, projectUrl),
    repoUrl,
    seo{
      title,
      description,
      noIndex,
      "ogImage": ogImage.asset->url
    }
  }
`;

export const featuredTestimonialsQuery = groq`
  *[
    _type == "testimonial" &&
    featured == true &&
    published != false
  ] | order(coalesce(displayOrder, 9999) asc, date desc, _createdAt desc){
    ${testimonialFields}
  }
`;

export const allTestimonialsQuery = groq`
  *[
    _type == "testimonial" &&
    published != false
  ] | order(coalesce(displayOrder, 9999) asc, date desc, _createdAt desc){
    ${testimonialFields}
  }
`;
