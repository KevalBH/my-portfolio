import type { WorkItem } from "@/lib/content";

import { Chip } from "@/components/chip";
import { Reveal } from "@/components/reveal";
import { WorkMark } from "@/components/graphics";
import { LiftCard } from "@/components/lift-card";
import { PageSection } from "@/_pages/home/page-section";
import { SectionHeading } from "@/_pages/home/section-heading";

type WorkSectionProps = {
  work: readonly WorkItem[];
};

export function WorkSection({ work }: WorkSectionProps) {
  return (
    <PageSection id="work">
      <SectionHeading
        eyebrow="03 / Selected work"
        title="Systems shipped in fintech, collaboration, and consumer product."
        description="From the current resume — product work, not a gallery of throwaway demos."
      />
      <div className="mt-8 grid gap-4 sm:mt-10">
        {work.map((item, index) => (
          <Reveal key={item.title} delay={index * 70}>
            <LiftCard className="group overflow-hidden rounded-3xl">
              <figure className="border-line relative aspect-[16/6] min-h-[140px] overflow-hidden border-b">
                <WorkMark index={item.index} />
                <figcaption className="bg-bg/80 text-accent absolute top-3 left-3 rounded-full px-2.5 py-1 font-mono text-[11px] backdrop-blur-md">
                  {item.index}
                </figcaption>
              </figure>
              <div className="min-w-0 p-5 sm:p-7">
                <p className="text-faint text-xs font-medium tracking-[0.16em] uppercase">
                  {item.domain}
                </p>
                <h3 className="text-ink mt-2 text-xl leading-snug font-semibold tracking-tight sm:text-2xl">
                  {item.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.stack.map((tech) => (
                    <li key={tech}>
                      <Chip bordered>{tech}</Chip>
                    </li>
                  ))}
                </ul>
                <ul className="text-muted mt-5 space-y-3 text-[14px] leading-7 sm:text-[15px]">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </LiftCard>
          </Reveal>
        ))}
      </div>
    </PageSection>
  );
}
