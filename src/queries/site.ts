import type { Metadata, MetadataRoute } from "next";

import {
  education,
  experience,
  nav,
  profile,
  skillGroups,
  stats,
  work,
} from "@/lib/resume";

const shareSkills = ["React", "Next.js", "TypeScript"] as const;

export function getSiteContent() {
  return {
    nav,
    work,
    stats,
    profile,
    education,
    experience,
    skillGroups,
  } as const;
}

export type SiteContent = ReturnType<typeof getSiteContent>;

export function getSiteName() {
  return profile.name;
}

export function getDocumentTitle() {
  return `${profile.name} — ${profile.title}`;
}

export function getDocumentDescription() {
  return `${profile.name} is a ${profile.title} in ${profile.location}, building production React, Next.js, and TypeScript systems for fintech, e-commerce, and real-time products.`;
}

export function getShareSkills() {
  return shareSkills;
}

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (productionHost) {
    return `https://${productionHost.replace(/^https?:\/\//, "")}`;
  }

  const previewHost = process.env.VERCEL_URL?.trim();
  if (previewHost) return `https://${previewHost.replace(/^https?:\/\//, "")}`;

  return "http://localhost:3000";
}

export function getShareImageAlt() {
  return `${getDocumentTitle()}. Portfolio preview for LinkedIn and search.`;
}

export function getSiteJsonLd() {
  const url = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    description: getDocumentDescription(),
    url,
    image: `${url}/opengraph-image`,
    email: profile.email,
    telephone: profile.phoneHref.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bhavnagar",
      addressCountry: "IN",
    },
    sameAs: [profile.linkedin, profile.github],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Frontend architecture",
      "Design systems",
    ],
  };
}

export function getRootMetadata(): Metadata {
  const title = getDocumentTitle();
  const description = getDocumentDescription();
  const siteName = getSiteName();

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: title,
      template: `%s — ${siteName}`,
    },
    description,
    applicationName: siteName,
    authors: [{ name: profile.name, url: profile.linkedin }],
    creator: profile.name,
    keywords: [
      profile.name,
      profile.title,
      "React",
      "Next.js",
      "TypeScript",
      "frontend architecture",
      "design systems",
      profile.location,
    ],
    category: "technology",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/icon", type: "image/png", sizes: "32x32" },
      ],
      apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
      shortcut: ["/favicon.svg"],
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: "/",
      siteName,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function getPageMetadata(): Metadata {
  const title = getDocumentTitle();
  const description = getDocumentDescription();

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      type: "website",
      url: "/",
      siteName: getSiteName(),
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function getRobots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}

export function getSitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getSiteUrl(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

export function getManifest(): MetadataRoute.Manifest {
  return {
    name: getDocumentTitle(),
    short_name: getSiteName(),
    description: getDocumentDescription(),
    start_url: "/",
    display: "standalone",
    background_color: "#07080d",
    theme_color: "#07080d",
    lang: "en",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
