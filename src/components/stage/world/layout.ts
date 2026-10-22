import type { SiteContent } from "@/queries/site";

export const corridorStart = 8;
export const corridorEnd = -40;

export const doors = [
  { id: "work", label: "Gallery", side: -1, z: -4 },
  { id: "studio", label: "Studio", side: 1, z: -14 },
  { id: "about", label: "About", side: -1, z: -24 },
  { id: "contact", label: "Contact", side: 1, z: -34 },
] as const;

export type DoorId = (typeof doors)[number]["id"];
export type DoorSpec = (typeof doors)[number];

export const wallNotes = [
  { word: "React", side: 1, z: -9 },
  { word: "Next", side: -1, z: -19 },
  { word: "Node", side: 1, z: -29 },
  { word: "Cursor", side: -1, z: -37 },
] as const;

export const roomLead: Record<DoorId, string> = {
  about: "A paper flight through the work so far.",
  contact: "Ink, an address, and a way to write back.",
  studio: "Roles stacked the way monitors used to be.",
  work: "Selected products, pinned on the line.",
};

export interface SketchCard {
  href?: string;
  note: string;
  title: string;
}

export function doorById(id: DoorId) {
  return doors.find((door) => door.id === id) as DoorSpec;
}

export function walkBy(z: number, deltaY: number) {
  const next = z - deltaY * 0.012;

  if (next > corridorStart) return corridorStart;
  if (next < corridorEnd) return corridorEnd;
  return next;
}

export function nearestDoor(z: number, reach = 3.4) {
  let best: DoorSpec | null = null;
  let bestDist = reach;

  for (const door of doors) {
    const dist = Math.abs(door.z - z);
    if (dist < bestDist) {
      best = door;
      bestDist = dist;
    }
  }

  return best;
}

export function arrangement(
  id: DoorId,
  index: number,
  count: number,
  door: Pick<DoorSpec, "side" | "z">,
) {
  const center = (count - 1) / 2;

  if (id === "work") {
    return {
      position: [
        (index - center) * 0.7,
        1.16 - (index % 2) * 0.1,
        door.z + 1.35,
      ] as const,
      string: true,
    };
  }

  if (id === "studio") {
    return {
      position: [door.side * -0.2, 1.72 - index * 0.36, door.z + 1.5] as const,
      string: false,
    };
  }

  if (id === "about") {
    return {
      position: [
        (index - center) * 0.62,
        1.42 + (index % 2) * 0.16,
        door.z + 1.55,
      ] as const,
      string: false,
    };
  }

  return {
    position: [(index - center) * 0.64, 0.86, door.z + 1.22] as const,
    string: false,
  };
}

export function cardsFor(id: DoorId, content: SiteContent): SketchCard[] {
  if (id === "work") {
    return content.work.map((item) => ({
      href: item.href,
      note: item.domain,
      title: item.title.split("—")[0].trim(),
    }));
  }

  if (id === "studio") {
    return content.experience.flatMap((company) =>
      company.roles.map((role) => ({
        href: company.href,
        note: `${company.company.split(" ")[0]} · ${role.period}`,
        title: role.title,
      })),
    );
  }

  if (id === "about") {
    return [
      { note: content.profile.location, title: content.profile.name },
      { note: content.stats[0].label, title: content.stats[0].value },
      { note: content.stats[1].label, title: content.stats[1].value },
      ...content.education.map((item) => ({
        note: item.school,
        title: item.credential.split(",")[0],
      })),
      {
        href: content.profile.github,
        note: "Code",
        title: "GitHub",
      },
    ];
  }

  return [
    {
      href: `mailto:${content.profile.email}`,
      note: content.profile.email,
      title: "Email",
    },
    { href: content.profile.phoneHref, note: content.profile.phone, title: "Phone" },
    { href: content.profile.linkedin, note: "Profile", title: "LinkedIn" },
    { href: content.profile.github, note: "Code", title: "GitHub" },
  ];
}

export function isControl(target: EventTarget | null) {
  return target instanceof Element && target.closest("button, a") !== null;
}

export function openSketchLink(href?: string) {
  if (!href) return;
  window.open(href, "_blank", "noopener,noreferrer");
}

export function sketchQuality() {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = navigator.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  const low = cores <= 4 || memory <= 4 || window.innerWidth < 720;

  return {
    antialias: !low,
    dpr: low ? 1 : 1.5,
  };
}
