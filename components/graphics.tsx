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
      <rect width="640" height="220" className="fill-accent/10" />
      <rect
        x="36"
        y="36"
        width="200"
        height="148"
        rx="18"
        className="fill-bg-2 stroke-line"
      />
      <circle cx="92" cy="88" r="18" className="fill-accent/30 stroke-accent" />
      <circle cx="148" cy="88" r="18" className="fill-bg-3 stroke-accent/60" />
      <circle cx="176" cy="88" r="18" className="fill-bg-3 stroke-accent/40" />
      <rect x="72" y="128" width="128" height="10" rx="5" className="fill-line" />
      <rect x="88" y="146" width="96" height="8" rx="4" className="fill-line" />
      <rect
        x="268"
        y="48"
        width="336"
        height="124"
        rx="20"
        className="fill-bg-2 stroke-accent/35"
      />
      <rect x="292" y="72" width="180" height="76" rx="12" className="fill-accent/20" />
      <path
        d="M500 86h72v48h-20l-12 16-12-16h-28V86Z"
        className="fill-accent/40 stroke-accent"
      />
    </g>
  ),
  "02": (
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
  "03": (
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
  "04": (
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
};

export function WorkMark({ index }: { index: WorkIndex }) {
  return (
    <svg
      viewBox="0 0 640 220"
      className="h-full w-full origin-center object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      {workArt[index]}
    </svg>
  );
}

const skillMarks: Record<SkillGroupTitle, ReactNode> = {
  "Architecture & performance": (
    <path d="M12 20V8l8-4 8 4v12l-8 4-8-4Z" className="stroke-accent" strokeWidth="1.6" />
  ),
  "UI & design systems": (
    <g className="stroke-accent" strokeWidth="1.6">
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <rect x="19" y="7" width="10" height="10" rx="2" />
      <rect x="7" y="19" width="22" height="8" rx="2" />
    </g>
  ),
  "State & data": (
    <path
      d="M8 16h20M16 8v16"
      className="stroke-accent"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  ),
  Testing: (
    <path
      d="M10 18l5 5 13-13"
      className="stroke-accent"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  ),
  "Cloud & delivery": (
    <path
      d="M10 20h16a6 6 0 0 0-1-12 8 8 0 0 0-15 3 5 5 0 0 0 0 9Z"
      className="stroke-accent"
      strokeWidth="1.6"
    />
  ),
  Leadership: (
    <g className="stroke-accent" strokeWidth="1.6">
      <circle cx="18" cy="12" r="4" />
      <path d="M8 26c2-6 6-8 10-8s8 2 10 8" />
    </g>
  ),
};

export function SkillMark({ title }: { title: SkillGroupTitle }) {
  return (
    <svg viewBox="0 0 36 36" className="size-9" aria-hidden="true" fill="none">
      <rect width="36" height="36" rx="10" className="fill-accent/10" />
      {skillMarks[title]}
    </svg>
  );
}
