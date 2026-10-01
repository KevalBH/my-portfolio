import type { EducationItem } from "@/lib/content";

import { Reveal } from "@/components/reveal";
import { LiftCard } from "@/components/lift-card";
import { PageSection } from "@/_pages/home/page-section";
import { SectionHeading } from "@/_pages/home/section-heading";

type EducationSectionProps = {
  education: readonly EducationItem[];
};

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <PageSection id="education">
      <SectionHeading eyebrow="05 / Education" title="Foundations." />
      <div className="mt-8 grid gap-3">
        {education.map((item, index) => (
          <Reveal key={item.school} delay={index * 80}>
            <LiftCard className="grid gap-2 rounded-3xl p-5 md:grid-cols-[1fr_auto]">
              <div>
                <h3 className="text-ink text-base font-semibold sm:text-lg">
                  {item.school}
                </h3>
                <p className="text-muted mt-1 text-sm leading-6">{item.credential}</p>
                <p className="text-faint mt-1 text-sm">{item.place}</p>
              </div>
              <p className="text-faint font-mono text-sm">{item.period}</p>
            </LiftCard>
          </Reveal>
        ))}
      </div>
    </PageSection>
  );
}
