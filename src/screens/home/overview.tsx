import { cn } from "@/utils/cn";
import type { Profile, Stat } from "@/lib/content";

import { Reveal } from "@/components/reveal";
import { PageSection } from "@/screens/home/page-section";
import { CropMarks, FolioGraphic } from "@/components/ink";
import { EmphasizedCopy } from "@/screens/home/emphasized-copy";
import { SectionHeading } from "@/screens/home/section-heading";

type OverviewSectionProps = {
  profile: Profile;
  stats: readonly Stat[];
};

export function OverviewSection({ profile, stats }: OverviewSectionProps) {
  return (
    <PageSection id="overview" first>
      <div className="text-faint mb-10 hidden items-baseline justify-between font-mono text-[11px] tracking-[0.2em] uppercase md:flex">
        <span>Record</span>
        <span>2020 — 2026</span>
        <span>{profile.location}</span>
      </div>
      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(300px,0.9fr)] xl:items-stretch xl:gap-x-16 xl:gap-y-6">
        <div className="xl:col-start-1 xl:row-start-1">
          <SectionHeading
            level="hero"
            eyebrow="01 / Overview"
            title="Frontend architecture that holds up in production."
          />
        </div>
        <Reveal
          delay={120}
          className="xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:self-start"
        >
          <figure className="plate-frame border-line bg-bg-2 relative aspect-[4/5] overflow-hidden border p-3 sm:aspect-[16/10] xl:aspect-[4/5]">
            <div className="plate-drift absolute inset-3">
              <FolioGraphic />
            </div>
            <CropMarks />
          </figure>
        </Reveal>
        <Reveal className="xl:col-start-1 xl:row-start-2">
          <p className="text-muted max-w-2xl text-[15px] leading-7 sm:text-[17px] sm:leading-8">
            <EmphasizedCopy text={profile.summary} />
          </p>
        </Reveal>
      </div>
      <dl className="border-line mt-12 grid grid-cols-2 border-y lg:mt-16 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} as="div" delay={index * 80}>
            <div
              className={cn(
                "py-5 pr-4 sm:py-6",
                index % 2 === 1 && "border-line border-l pl-4 sm:pl-6",
                index >= 2 && "border-line border-t lg:border-t-0",
                index > 0 && "lg:border-line lg:border-l lg:pl-6",
              )}
            >
              <dt className="text-faint min-h-8 text-[11px] leading-4 tracking-[0.12em] uppercase">
                {stat.label}
              </dt>
              <dd className="text-ink mt-3 font-serif text-4xl leading-none tracking-tight sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </PageSection>
  );
}
