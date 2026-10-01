import type { Profile, Stat } from "@/lib/content";

import { Reveal } from "@/components/reveal";
import { LiftCard } from "@/components/lift-card";
import { HeroSystem } from "@/components/graphics";
import { PageSection } from "@/_pages/home/page-section";
import { EmphasizedCopy } from "@/_pages/home/emphasized-copy";
import { SectionHeading } from "@/_pages/home/section-heading";

type OverviewSectionProps = {
  profile: Profile;
  stats: readonly Stat[];
};

export function OverviewSection({ profile, stats }: OverviewSectionProps) {
  return (
    <PageSection id="overview" first>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-10">
        <SectionHeading
          level="hero"
          eyebrow="01 / Overview"
          title="Frontend architecture that holds up in production."
          description={<EmphasizedCopy text={profile.summary} />}
        />
        <Reveal className="mx-auto w-full max-w-[240px] lg:mx-0" delay={120}>
          <aside className="border-line overflow-hidden rounded-3xl border">
            <HeroSystem />
          </aside>
        </Reveal>
      </div>
      <dl className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} as="div" delay={index * 80}>
            <LiftCard as="div" className="rounded-2xl px-4 py-4 sm:py-5">
              <dt className="text-faint text-[11px] leading-4 sm:text-xs">
                {stat.label}
              </dt>
              <dd className="text-ink mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                {stat.value}
              </dd>
            </LiftCard>
          </Reveal>
        ))}
      </dl>
    </PageSection>
  );
}
