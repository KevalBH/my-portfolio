import type { SiteContent } from "@/queries/site";

export interface StagePlate {
  kicker: string;
  title: string;
}

function companyMark(name: string) {
  return name.replace(/\s+(Interactive|Technology)\b.*/i, "").trim();
}

function workMark(title: string) {
  return title.split("—")[0].trim();
}

export function getStagePlates(content: SiteContent): StagePlate[] {
  const role = content.experience[0].roles[0].title.split(" ").slice(0, 2).join(" ");
  const stack = content.skillGroups[0].items
    .slice(0, 2)
    .map((item) => item.replace(".js", ""))
    .join(" · ");

  return [
    { kicker: "Name", title: content.profile.name },
    { kicker: "Role", title: role },
    { kicker: "Years", title: content.stats[0].value },
    { kicker: "Shipped", title: content.stats[1].value },
    { kicker: "Now", title: companyMark(content.experience[0].company) },
    { kicker: "Prior", title: companyMark(content.experience[1].company) },
    { kicker: "Work", title: workMark(content.work[0].title) },
    { kicker: "Stack", title: stack },
  ];
}

export function orbitPose(
  index: number,
  count: number,
  elapsed: number,
  reduced: boolean,
) {
  const base = (index / count) * Math.PI * 2;
  const turn = base + (reduced ? 0 : elapsed * 0.28);
  const tilt = reduced ? 0 : Math.sin(elapsed * 0.9 + index) * 0.08;

  return {
    position: [Math.sin(turn) * 2.75, Math.cos(turn) * 1.62, Math.sin(turn) * 1.05] as [
      number,
      number,
      number,
    ],
    tilt,
  };
}

export function dustPoint(index: number, count: number) {
  const turn = (index / count) * Math.PI * 2;
  const radius = 1.15 + (index % 3) * 0.55;

  return {
    id: index,
    position: [
      Math.cos(turn) * radius,
      Math.sin(turn * 2) * 1.45,
      Math.sin(turn) * 1.7,
    ] as [number, number, number],
  };
}

export function placePlate(index: number, count: number) {
  const half = Math.ceil(count / 2);
  const side = index < half ? -1 : 1;
  const slot = index < half ? index : index - half;
  const span = Math.max(half - 1, 1);
  const y = (slot / span - 0.5) * 3.5;
  const x = side * (2.05 + (slot % 2) * 0.22);
  const z = (slot - span / 2) * 0.35;

  return {
    position: [x, y, z] as [number, number, number],
    rotation: [0, side * 0.34, 0] as [number, number, number],
  };
}

export function paintPlate(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  plate: StagePlate,
) {
  context.fillStyle = "#f4efe6";
  context.fillRect(0, 0, width, height);
  context.strokeStyle = "#b25129";
  context.lineWidth = 10;
  context.strokeRect(46, 46, width - 92, height - 92);
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "#8d4e2e";
  context.font = "28px Geist, sans-serif";
  context.fillText(plate.kicker.toUpperCase(), width / 2, height * 0.38);
  context.fillStyle = "#1c1612";
  context.font = "76px Instrument Serif, serif";
  context.fillText(plate.title, width / 2, height * 0.58);
}
