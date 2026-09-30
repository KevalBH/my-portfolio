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

export function getDocumentTitle() {
  return `${profile.name} — ${profile.title}`;
}
