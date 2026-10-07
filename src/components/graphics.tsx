import type { ReactNode } from "react";

import type { SkillGroupTitle, WorkIndex } from "@/lib/content";

export function MonogramMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      <rect width="48" height="48" rx="14" className="fill-accent/15" />
      <rect x="1" y="1" width="46" height="46" rx="13" className="stroke-accent/40" />
      <path
        d="M16 32V16h4.4l3.6 8.8L27.6 16H32v16h-3.6V22.2L25.1 32h-2.2l-3.3-9.8V32H16Z"
        className="fill-accent"
      />
    </svg>
  );
}

export function HeroSystem() {
  return (
    <svg
      viewBox="0 0 320 300"
      className="hero-float block h-auto w-full"
      role="img"
      aria-label="Stylized product interface representing frontend architecture"
    >
      <rect x="8" y="16" width="304" height="268" rx="24" className="fill-bg-3/80" />
      <rect
        x="20"
        y="28"
        width="280"
        height="244"
        rx="20"
        className="fill-bg-2 stroke-line"
      />
      <rect x="36" y="44" width="248" height="22" rx="8" className="fill-bg-3" />
      <circle cx="50" cy="55" r="3.5" className="fill-accent" />
      <circle cx="62" cy="55" r="3.5" className="fill-faint/70" />
      <circle cx="74" cy="55" r="3.5" className="fill-faint/70" />
      <rect x="92" y="49" width="120" height="8" rx="4" className="fill-line" />
      <rect x="36" y="80" width="72" height="176" rx="14" className="fill-bg-3" />
      <rect x="48" y="96" width="48" height="8" rx="4" className="fill-accent/50" />
      <rect x="48" y="114" width="40" height="6" rx="3" className="fill-line" />
      <rect x="48" y="128" width="40" height="6" rx="3" className="fill-line" />
      <rect x="48" y="142" width="36" height="6" rx="3" className="fill-line" />
      <rect x="48" y="228" width="48" height="16" rx="8" className="fill-accent/25" />
      <rect
        x="118"
        y="80"
        width="166"
        height="80"
        rx="14"
        className="fill-accent/12 stroke-accent/25"
      />
      <rect x="134" y="98" width="88" height="10" rx="5" className="fill-accent/55" />
      <rect x="134" y="118" width="134" height="6" rx="3" className="fill-line" />
      <rect x="134" y="132" width="108" height="6" rx="3" className="fill-line" />
      <rect x="118" y="172" width="78" height="84" rx="14" className="fill-bg-3" />
      <rect x="132" y="188" width="50" height="8" rx="4" className="fill-line" />
      <rect x="132" y="204" width="36" height="36" rx="10" className="fill-accent/30" />
      <rect x="206" y="172" width="78" height="84" rx="14" className="fill-bg-3" />
      <rect x="220" y="188" width="50" height="8" rx="4" className="fill-line" />
      <path
        d="M220 236h50M220 224h34"
        className="stroke-accent/70"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

const workArt: Record<WorkIndex, ReactNode> = {
  "01": (
    <g>
      <rect width="640" height="220" className="fill-accent/8" />
      <rect
        x="32"
        y="28"
        width="576"
        height="164"
        rx="22"
        className="fill-bg-2 stroke-line"
      />
      <g className="fill-accent/70">
        <rect x="72" y="132" width="18" height="36" rx="3" />
        <rect x="102" y="108" width="18" height="60" rx="3" />
        <rect x="132" y="92" width="18" height="76" rx="3" />
        <rect x="162" y="116" width="18" height="52" rx="3" />
        <rect x="192" y="76" width="18" height="92" rx="3" />
        <rect x="222" y="100" width="18" height="68" rx="3" />
        <rect x="252" y="64" width="18" height="104" rx="3" />
      </g>
      <path
        d="M320 148c28-8 40-40 68-48 28-8 40 20 72 12 28-8 44-44 84-40"
        className="stroke-accent"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <rect
        x="430"
        y="48"
        width="150"
        height="56"
        rx="14"
        className="fill-accent/15 stroke-accent/40"
      />
      <rect x="448" y="64" width="72" height="8" rx="4" className="fill-accent/50" />
      <rect x="448" y="80" width="112" height="8" rx="4" className="fill-line" />
    </g>
  ),
  "02": (
    <g>
      <rect width="640" height="220" className="fill-accent/8" />
      <circle cx="210" cy="110" r="86" className="fill-bg-2 stroke-line" />
      <path
        d="M210 48c22 24 36 44 36 62s-14 38-36 62c-22-24-36-44-36-62s14-38 36-62Z"
        className="fill-accent/20 stroke-accent"
      />
      <circle cx="210" cy="110" r="8" className="fill-accent" />
      <circle cx="318" cy="72" r="10" className="fill-accent" />
      <circle cx="360" cy="148" r="8" className="fill-accent/70" />
      <circle cx="128" cy="158" r="7" className="fill-accent/50" />
      <rect
        x="400"
        y="52"
        width="196"
        height="52"
        rx="18"
        className="fill-bg-2 stroke-line"
      />
      <rect x="420" y="70" width="120" height="8" rx="4" className="fill-line" />
      <rect x="420" y="86" width="84" height="8" rx="4" className="fill-line" />
      <rect
        x="430"
        y="124"
        width="176"
        height="52"
        rx="18"
        className="fill-accent/20 stroke-accent/30"
      />
      <rect x="450" y="142" width="110" height="8" rx="4" className="fill-accent/50" />
      <rect x="450" y="158" width="78" height="8" rx="4" className="fill-line" />
    </g>
  ),
  "03": (
    <g>
      <rect width="640" height="220" className="fill-accent/8" />
      <rect
        x="48"
        y="40"
        width="260"
        height="148"
        rx="18"
        className="fill-bg-2 stroke-line"
      />
      <rect x="68" y="58" width="220" height="16" rx="6" className="fill-bg-3" />
      <rect x="68" y="88" width="100" height="80" rx="10" className="fill-accent/20" />
      <rect x="180" y="88" width="108" height="36" rx="8" className="fill-line" />
      <rect x="180" y="132" width="72" height="36" rx="8" className="fill-line" />
      <rect
        x="330"
        y="56"
        width="250"
        height="116"
        rx="18"
        className="fill-bg-2 stroke-accent/40"
      />
      <rect x="352" y="76" width="206" height="12" rx="6" className="fill-accent/40" />
      <rect x="352" y="100" width="164" height="8" rx="4" className="fill-line" />
      <rect x="352" y="118" width="188" height="8" rx="4" className="fill-line" />
      <rect x="352" y="136" width="120" height="8" rx="4" className="fill-line" />
    </g>
  ),
  "04": (
    <g>
      <rect width="640" height="220" className="fill-accent/8" />
      <rect
        x="36"
        y="32"
        width="250"
        height="156"
        rx="18"
        className="fill-bg-2 stroke-line"
      />
      <circle cx="112" cy="104" r="34" className="fill-accent/15 stroke-accent/50" />
      <circle cx="112" cy="104" r="14" className="fill-accent/40" />
      <rect x="166" y="78" width="92" height="8" rx="4" className="fill-line" />
      <rect x="166" y="96" width="74" height="8" rx="4" className="fill-line" />
      <rect x="166" y="114" width="86" height="8" rx="4" className="fill-accent/45" />
      <rect x="56" y="150" width="210" height="18" rx="9" className="fill-accent/20" />
      <rect
        x="310"
        y="32"
        width="294"
        height="156"
        rx="18"
        className="fill-bg-2 stroke-accent/35"
      />
      <rect x="334" y="52" width="128" height="10" rx="5" className="fill-accent/50" />
      <g className="fill-accent/70">
        <rect x="350" y="128" width="22" height="34" rx="4" />
        <rect x="386" y="108" width="22" height="54" rx="4" />
        <rect x="422" y="90" width="22" height="72" rx="4" />
        <rect x="458" y="116" width="22" height="46" rx="4" />
        <rect x="494" y="98" width="22" height="64" rx="4" />
        <rect x="530" y="76" width="22" height="86" rx="4" />
      </g>
    </g>
  ),
};

export function WorkMark({ index }: { index: WorkIndex }) {
  return (
    <svg
      viewBox="0 0 640 220"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      {workArt[index]}
    </svg>
  );
}

const skillMarks: Record<SkillGroupTitle, ReactNode> = {
  "Frontend architecture & performance": (
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
  ),
  "UI & design systems": (
    <g>
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" />
      <rect x="3" y="13" width="18" height="8" rx="1.5" />
    </g>
  ),
  "State & data management": <path d="M12 5v14M5 12h14" />,
  "AI-assisted development": (
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />
  ),
  "Cloud & DevOps": <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />,
  "Leadership & testing": (
    <g>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c1.2-3 3.4-4.5 5.5-4.5s4.3 1.5 5.5 4.5" />
      <path d="m16 11 1.6 1.6L21 9" />
    </g>
  ),
};

export function SkillMark({ title }: { title: SkillGroupTitle }) {
  return (
    <span
      className="bg-accent/10 flex size-9 shrink-0 items-center justify-center rounded-[10px]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className="text-accent size-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {skillMarks[title]}
      </svg>
    </span>
  );
}
