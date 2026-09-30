import type { Company } from "@/lib/content";

import { Reveal } from "@/components/reveal";
import { LiftCard } from "@/components/lift-card";
import { PageSection } from "@/_pages/home/page-section";
import { SectionHeading } from "@/_pages/home/section-heading";

type ExperienceSectionProps = {
  experience: readonly Company[];
};

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <PageSection id="experience">
      <SectionHeading eyebrow="02 / Experience" title="Roles, not a job board." />
      <div className="mt-8 space-y-6 sm:mt-10">
        {experience.map((company, index) => (
          <Reveal key={company.company} delay={index * 90}>
            <LiftCard className="rounded-3xl p-5 sm:p-7">
              <div>
                <h3 className="text-ink text-base font-semibold sm:text-lg">
                  {company.company}
                </h3>
                <p className="text-faint text-sm">{company.place}</p>
              </div>
              <div className="mt-6 space-y-8">
                {company.roles.map((role) => (
                  <div
                    key={role.title}
                    className="grid gap-3 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-4"
                  >
                    <div>
                      <p className="text-ink font-medium">{role.title}</p>
                      <p className="text-faint mt-1 font-mono text-[12px]">
                        {role.period}
                      </p>
                    </div>
                    <ul className="text-muted space-y-3 pl-0 text-[14px] leading-7 sm:text-[15px]">
                      {role.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </LiftCard>
          </Reveal>
        ))}
      </div>
    </PageSection>
  );
}
