import {
  education,
  experience,
  nav,
  profile,
  skillGroups,
  stats,
  work,
} from "@/lib/resume";

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
  return `${profile.name} — Portfolio`;
}

export function getDocumentDescription() {
  return `${profile.title} in ${profile.location}. React, Next.js, and TypeScript — work from the current resume.`;
}
