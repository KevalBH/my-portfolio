import { NAMED_SKILL, type SkillGroup } from "@/lib/content";

import { Chip } from "@/components/chip";
import { Reveal } from "@/components/reveal";
import { SkillMark } from "@/components/graphics";
import { LiftCard } from "@/components/lift-card";
import { PageSection } from "@/screens/home/page-section";
import { SectionHeading } from "@/screens/home/section-heading";

type StackSectionProps = {
  skillGroups: readonly SkillGroup[];
};

export function StackSection({ skillGroups }: StackSectionProps) {
  return (
    <PageSection id="stack">
      <SectionHeading eyebrow="04 / Stack" title="The operating layer." />
      <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4">
        {skillGroups.map((group, index) => (
          <Reveal
            key={group.title}
            className={index === skillGroups.length - 1 ? "sm:col-span-2" : undefined}
            delay={index * 60}
          >
            <LiftCard className="rounded-3xl p-4 sm:p-5">
              <h3 className="text-ink flex items-center gap-3 text-sm leading-none font-semibold">
                <SkillMark title={group.title} />
                <span className="min-w-0 leading-snug">{group.title}</span>
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Chip emphasized={item === NAMED_SKILL}>{item}</Chip>
                  </li>
                ))}
              </ul>
            </LiftCard>
          </Reveal>
        ))}
      </div>
    </PageSection>
  );
}
