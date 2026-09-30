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
          "text-ink font-semibold tracking-tight",
          isHero
            ? "mt-5 max-w-3xl text-[clamp(2.1rem,8vw,4.4rem)] leading-[1.02]"
            : "mt-3 max-w-xl text-[1.7rem] sm:text-3xl md:text-4xl",
        )}
      >
        {title}
      </Heading>
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
