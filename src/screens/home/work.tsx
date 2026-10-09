import type { ReactNode } from "react";

import type { WorkIndex, WorkItem } from "@/lib/content";

import { Chip } from "@/components/chip";
import { Reveal } from "@/components/reveal";
import { PrintPlate } from "@/components/print-plate";
import { ExternalLink } from "@/components/external-link";
import { PageSection } from "@/screens/home/page-section";
import { SectionHeading } from "@/screens/home/section-heading";
import { MeetingPlate, TablekartPlate } from "@/components/work-plates";

type Plate = {
  alt: string;
  artwork?: ReactNode;
  src?: string;
};

const aiMarks = new Set(["WebMCP", "MCP", "Browser agents", "Typed tools"]);

const plates: Record<WorkIndex, Plate> = {
  "01": {
    artwork: <TablekartPlate />,
    alt: "A table, four seats, and a small copper spark",
  },
  "02": {
    artwork: <MeetingPlate />,
    alt: "A room drawn as two circles, three voices, and a shared bar",
  },
  "03": {
    src: "/art/plate-trading.jpg",
    alt: "Seven copper bars and a single rising line, printed on warm paper",
  },
  "04": {
    src: "/art/plate-places.jpg",
    alt: "A quiet circle holding three copper points",
  },
  "05": {
    src: "/art/plate-pages.jpg",
    alt: "Overlapping sheets with a copper block and three rules",
  },
};

type WorkSectionProps = {
  work: readonly WorkItem[];
};

export function WorkSection({ work }: WorkSectionProps) {
  return (
    <PageSection id="work">
      <SectionHeading
        eyebrow="03 / Selected work"
        title="Systems shipped in fintech, consumer product, hospitality, and agentic AI."
        description="Resume product work — and live AI apps an agent can open."
      />
      <div className="mt-4">
        {work.map((item, index) => (
          <Reveal key={item.title} delay={index * 70}>
            <article className="border-line border-t py-10 sm:py-14">
              <div className="grid gap-6 lg:grid-cols-[4.5rem_minmax(0,1fr)] lg:gap-8">
                <p
                  className={
                    item.aiPoints
                      ? "text-accent font-serif text-5xl leading-none tracking-tight lg:pt-1"
                      : "text-faint font-serif text-5xl leading-none tracking-tight lg:pt-1"
                  }
                >
                  {item.index}
                </p>
                <div className="min-w-0">
                  <p className="text-accent font-mono text-[11px] tracking-[0.18em] uppercase">
                    {item.domain}
                  </p>
                  <h3 className="text-ink mt-2 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                    <ExternalLink href={item.href}>{item.title}</ExternalLink>
                  </h3>
                  <PrintPlate
                    src={plates[item.index].src}
                    artwork={plates[item.index].artwork}
                    alt={plates[item.index].alt}
                    sizes="(min-width: 1024px) 760px, 100vw"
                    className="mt-6 aspect-[16/9] sm:mt-8"
                  />
                  <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
                    {item.stack.map((tech) => (
                      <li key={tech}>
                        <Chip
                          bordered
                          emphasized={aiMarks.has(tech)}
                          className={aiMarks.has(tech) ? "text-accent" : undefined}
                        >
                          {tech}
                        </Chip>
                      </li>
                    ))}
                  </ul>
                  {item.aiPoints ? (
                    <div className="border-accent/50 bg-accent/5 mt-6 border-l-2 py-3 pl-5">
                      <p className="text-accent font-mono text-[10px] tracking-[0.2em] uppercase">
                        AI
                      </p>
                      <ul className="text-ink mt-2 space-y-3 text-[14px] leading-7 sm:text-[15px]">
                        {item.aiPoints.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  <ul className="border-line text-muted mt-6 space-y-3 border-l pl-5 text-[14px] leading-7 sm:text-[15px]">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </PageSection>
  );
}
