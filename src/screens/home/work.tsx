import type { WorkIndex, WorkItem } from "@/lib/content";

import { Chip } from "@/components/chip";
import { Reveal } from "@/components/reveal";
import { PrintPlate } from "@/components/print-plate";
import { ExternalLink } from "@/components/external-link";
import { PageSection } from "@/screens/home/page-section";
import { SectionHeading } from "@/screens/home/section-heading";

const plates: Record<WorkIndex, { src: string; alt: string }> = {
  "01": {
    src: "/art/plate-trading.jpg",
    alt: "Seven copper bars and a single rising line, printed on warm paper",
  },
  "02": {
    src: "/art/plate-places.jpg",
    alt: "A quiet circle holding three copper points",
  },
  "03": {
    src: "/art/plate-pages.jpg",
    alt: "Overlapping sheets with a copper block and three rules",
  },
  "04": {
    src: "/art/plate-table.jpg",
    alt: "A table reduced to a circle, four marks, and a bar",
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
        title="Systems shipped in fintech, consumer product, and hospitality."
        description="From the current resume — product work, not a gallery of throwaway demos."
      />
      <div className="mt-4">
        {work.map((item, index) => (
          <Reveal key={item.title} delay={index * 70}>
            <article className="border-line border-t py-10 sm:py-14">
              <div className="grid gap-6 lg:grid-cols-[4.5rem_minmax(0,1fr)] lg:gap-8">
                <p className="text-faint font-serif text-5xl leading-none tracking-tight lg:pt-1">
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
                    alt={plates[item.index].alt}
                    sizes="(min-width: 1024px) 760px, 100vw"
                    className="mt-6 aspect-[16/9] sm:mt-8"
                  />
                  <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
                    {item.stack.map((tech) => (
                      <li key={tech}>
                        <Chip bordered>{tech}</Chip>
                      </li>
                    ))}
                  </ul>
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
