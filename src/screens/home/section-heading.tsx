import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/eyebrow";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  level?: "hero" | "section";
  descriptionClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  level = "section",
  descriptionClassName,
}: SectionHeadingProps) {
  const isHero = level === "hero";
  const Heading = isHero ? "h1" : "h2";

  return (
    <Reveal>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading
        className={cn(
          "text-ink font-serif font-normal tracking-tight",
          isHero
            ? "mt-4 max-w-4xl text-[clamp(2.7rem,7vw,5.4rem)] leading-[0.96]"
            : "mt-3 max-w-2xl text-[2rem] leading-[1.05] sm:text-4xl md:text-[2.75rem]",
        )}
      >
        {title}
      </Heading>
      <svg
        viewBox="0 0 120 8"
        aria-hidden="true"
        fill="none"
        className={cn("mt-4 h-2 w-24", isHero && "mt-6 w-32")}
      >
        <path
          d="M0 4 H120"
          pathLength="1"
          strokeWidth="1.5"
          className="ink-draw stroke-accent"
        />
      </svg>
      {description ? (
        <p
          className={cn(
            isHero
              ? "text-muted mt-6 max-w-2xl text-[15px] leading-7 sm:mt-8 sm:text-[17px] sm:leading-8"
              : "text-faint mt-4 max-w-xl text-sm leading-6",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
