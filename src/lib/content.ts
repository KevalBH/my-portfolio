export const NAMED_SKILL = "Cursor";

export const sectionIds = [
  "overview",
  "experience",
  "work",
  "stack",
  "education",
  "contact",
] as const;

export type SectionId = (typeof sectionIds)[number];

export type NavItem = {
  href: `#${SectionId}`;
  label: string;
};

export type Profile = {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  phoneHref: string;
  linkedin: string;
  github: string;
  summary: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type SkillGroupTitle =
  | "Architecture & performance"
  | "UI & design systems"
  | "State & data"
  | "Testing"
  | "Cloud & delivery"
  | "Leadership";

export type SkillGroup = {
  title: SkillGroupTitle;
  items: readonly string[];
};

export type Role = {
  title: string;
  period: string;
  points: readonly string[];
};

export type Company = {
  company: string;
  href: string;
  place: string;
  roles: readonly Role[];
};

export type WorkIndex = "01" | "02" | "03" | "04";

export type WorkItem = {
  index: WorkIndex;
  title: string;
  href: string;
  domain: string;
  stack: readonly string[];
  points: readonly string[];
};

export type EducationItem = {
  school: string;
  place: string;
  credential: string;
  period: string;
};
