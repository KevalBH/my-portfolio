import type { CSSProperties } from "react";

import { cn } from "@/utils/cn";

const corners = [
  { d: "M0 16 V0 H16", delay: "0.15s" },
  { d: "M84 0 H100 V16", delay: "0.28s" },
  { d: "M100 84 V100 H84", delay: "0.41s" },
  { d: "M16 100 H0 V84", delay: "0.54s" },
];

export function CropMarks({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-1", className)}
      fill="none"
    >
      {corners.map((corner) => (
        <path
          key={corner.d}
          d={corner.d}
          pathLength="1"
          vectorEffect="non-scaling-stroke"
          strokeWidth="1.15"
          className="ink-draw stroke-ink/55"
          style={{ "--draw-delay": corner.delay } as CSSProperties}
        />
      ))}
    </svg>
  );
}

export function StudioMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      className={cn("text-accent", className)}
      fill="none"
    >
      <circle
        cx="60"
        cy="60"
        r="46"
        pathLength="1"
        strokeWidth="0.8"
        className="ink-draw stroke-current/45"
      />
      <circle
        cx="60"
        cy="60"
        r="30"
        pathLength="1"
        strokeWidth="0.8"
        className="ink-draw stroke-current/70"
        style={{ "--draw-delay": "0.35s" } as CSSProperties}
      />
      <rect x="48" y="48" width="24" height="24" className="fill-current" />
      <g className="orbit-spin">
        <circle cx="106" cy="60" r="3.4" className="fill-current" />
      </g>
      <g className="orbit-spin-reverse">
        <circle cx="60" cy="14" r="2.2" className="fill-current/80" />
      </g>
    </svg>
  );
}

export function InkStroke({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 40"
      aria-hidden="true"
      className={cn("h-8 w-full", className)}
      fill="none"
    >
      <path
        d="M4 26C70 26 92 6 150 12s92 26 150 12 96-28 150 4 92 22 182-2"
        pathLength="1"
        strokeWidth="1.35"
        strokeLinecap="round"
        className="ink-draw stroke-accent"
      />
    </svg>
  );
}

export function FolioGraphic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 900"
      role="img"
      aria-labelledby="folio-graphic-title"
      className={cn("h-full w-full", className)}
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <title id="folio-graphic-title">
        Overlapping architectural frames, a copper block, and a flowing line
      </title>
      <defs>
        <filter id="folio-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="3"
            seed="17"
            result="noise"
          />
          <feColorMatrix in="noise" type="saturate" values="0" result="monochromeNoise" />
          <feComponentTransfer in="monochromeNoise">
            <feFuncA type="table" tableValues="0 0.055" />
          </feComponentTransfer>
        </filter>
        <linearGradient id="folio-wash" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--bg-2)" />
          <stop offset="1" stopColor="var(--bg-3)" />
        </linearGradient>
      </defs>

      <rect width="720" height="900" fill="url(#folio-wash)" />
      <rect width="720" height="900" filter="url(#folio-grain)" className="fill-ink" />

      <g className="folio-frames stroke-ink/65" strokeWidth="2">
        <rect x="178" y="150" width="286" height="362" />
        <rect x="106" y="358" width="278" height="258" />
        <rect x="380" y="404" width="240" height="266" />
      </g>
      <rect
        x="344"
        y="314"
        width="252"
        height="228"
        className="folio-block fill-accent/90"
      />
      <path
        d="M106 460C194 510 280 508 374 462C452 424 516 394 624 386"
        pathLength="1"
        strokeWidth="2"
        strokeLinecap="round"
        className="ink-draw stroke-ink/80"
        style={{ "--draw-delay": "0.7s" } as CSSProperties}
      />
      <circle cx="374" cy="462" r="5" className="hero-node fill-accent" />
    </svg>
  );
}

export function SealOrbit({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      className={cn("pointer-events-none absolute -inset-3", className)}
      fill="none"
    >
      <circle
        cx="60"
        cy="60"
        r="56"
        strokeWidth="0.8"
        strokeDasharray="2.5 3.5"
        className="stroke-accent/70"
      />
      <g className="orbit-spin">
        <circle cx="116" cy="60" r="3" className="fill-accent" />
      </g>
    </svg>
  );
}
