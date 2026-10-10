import { compactUrl } from "@/utils/url";
import type { WorkIndex, WorkItem } from "@/lib/content";

import { Chip } from "@/components/chip";
import { Reveal } from "@/components/reveal";
import { PrintPlate } from "@/components/print-plate";
import { ExternalLink } from "@/components/external-link";
import { PageSection } from "@/screens/home/page-section";
import { SectionHeading } from "@/screens/home/section-heading";

type Plate = {
  alt: string;
  src: string;
};

const aiMarks = new Set(["WebMCP", "MCP", "Browser agents", "Typed tools"]);

const plates: Record<WorkIndex, Plate> = {
  "01": {
    src: "/work/tablekart.jpg",
    alt: "Tablekart homepage, with restaurant search and live table booking",
  },
  "02": {
    src: "/work/come-closer.png",
    alt: "Come closer meeting stage, with spatial chat in the browser",
  },
  "03": {
    src: "/work/prospuh.png",
    alt: "Prospuh trading and portfolio platform",
  },
  "04": {
    src: "/work/matchnmeet.jpg",
    alt: "Matchnmeet dating and messaging site",
  },
  "05": {
    src: "/work/odhav.jpg",
    alt: "Featured marketing sites, including Odhav Industries",
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
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-6 block sm:mt-8"
                  >
                    <PrintPlate
                      src={plates[item.index].src}
                      alt={plates[item.index].alt}
                      sizes="(min-width: 1024px) 760px, 100vw"
                      className="aspect-[16/9]"
                    />
                    <span className="text-faint group-hover:text-accent mt-3 block font-mono text-[11px] tracking-[0.14em] uppercase">
                      {compactUrl(item.href)}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </span>
                  </a>
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
