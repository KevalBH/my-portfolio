import type { EducationItem } from "@/lib/content";

import { SealOrbit } from "@/components/ink";
import { Reveal } from "@/components/reveal";
import { PrintPlate } from "@/components/print-plate";
import { PageSection } from "@/screens/home/page-section";
import { SectionHeading } from "@/screens/home/section-heading";

type EducationSectionProps = {
  education: readonly EducationItem[];
};

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <PageSection id="education">
      <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
        <SectionHeading eyebrow="05 / Education" title="Foundations." />
        <Reveal delay={120} className="relative max-w-[200px]">
          <PrintPlate
            src="/art/plate-seal.jpg"
            alt="A seal of two circles and a copper square, with no lettering"
            sizes="200px"
            className="aspect-square"
          />
          <SealOrbit />
        </Reveal>
      </div>
      <div className="border-line mt-10 border-t">
        {education.map((item, index) => (
          <Reveal key={item.school} delay={index * 80}>
            <article className="border-line grid gap-2 border-b py-6 md:grid-cols-[1fr_auto] md:items-baseline md:gap-8">
              <div>
                <h3 className="text-ink font-serif text-xl tracking-tight sm:text-2xl">
                  {item.school}
                </h3>
                <p className="text-muted mt-1 text-sm leading-6">{item.credential}</p>
                <p className="text-faint mt-1 text-sm">{item.place}</p>
              </div>
              <p className="text-faint font-mono text-sm">{item.period}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </PageSection>
  );
}
