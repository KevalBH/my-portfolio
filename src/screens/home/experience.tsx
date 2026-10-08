import type { Company } from "@/lib/content";

import { Reveal } from "@/components/reveal";
import { PrintPlate } from "@/components/print-plate";
import { ExternalLink } from "@/components/external-link";
import { PageSection } from "@/screens/home/page-section";
import { SectionHeading } from "@/screens/home/section-heading";

type ExperienceSectionProps = {
  experience: readonly Company[];
};

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <PageSection id="experience">
      <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(240px,0.82fr)] lg:gap-12">
        <SectionHeading eyebrow="02 / Experience" title="Roles, not a job board." />
        <Reveal delay={140}>
          <PrintPlate
            src="/art/plate-ledger.jpg"
            alt="A copper block and seven ledger rules, printed on warm paper"
            sizes="(min-width: 1024px) 420px, 100vw"
            className="aspect-[16/9]"
          />
        </Reveal>
      </div>
      <div className="relative mt-10 space-y-14 sm:mt-12">
        <span
          className="bg-accent/80 grow-y absolute top-2 bottom-2 left-0 w-px"
          aria-hidden="true"
        />
        {experience.map((company, index) => (
          <Reveal key={company.company} delay={index * 90}>
            <article className="relative pl-6">
              <span
                className="bg-accent absolute top-3 left-[-3px] size-1.5"
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-ink font-serif text-2xl tracking-tight sm:text-3xl">
                  <ExternalLink href={company.href}>{company.company}</ExternalLink>
                </h3>
                <p className="text-faint text-sm">{company.place}</p>
              </div>
              <div className="mt-6">
                {company.roles.map((role) => (
                  <div
                    key={role.title}
                    className="border-line grid gap-3 border-t py-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10"
                  >
                    <div>
                      <p className="text-ink font-medium">{role.title}</p>
                      <p className="text-faint mt-1 font-mono text-[12px]">
                        {role.period}
                      </p>
                    </div>
                    <ul className="text-muted space-y-3 text-[14px] leading-7 sm:text-[15px]">
                      {role.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </PageSection>
  );
}
