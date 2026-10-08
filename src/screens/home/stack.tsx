import { cn } from "@/utils/cn";
import { NAMED_SKILL, type SkillGroup } from "@/lib/content";

import { Chip } from "@/components/chip";
import { Reveal } from "@/components/reveal";
import { SkillMark } from "@/components/graphics";
import { PrintPlate } from "@/components/print-plate";
import { PageSection } from "@/screens/home/page-section";
import { SectionHeading } from "@/screens/home/section-heading";

type StackSectionProps = {
  skillGroups: readonly SkillGroup[];
};

export function StackSection({ skillGroups }: StackSectionProps) {
  return (
    <PageSection id="stack">
      <SectionHeading eyebrow="04 / Stack" title="The operating layer." />
      <Reveal delay={80}>
        <PrintPlate
          src="/art/plate-case.jpg"
          alt="A type case of outlined cells, four of them filled copper"
          sizes="(min-width: 1024px) 860px, 100vw"
          imageClassName="object-[78%_center]"
          className="mt-8 aspect-[2.2/1]"
        />
      </Reveal>
      <div className="border-line mt-10 border-t">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={index * 50}>
            <div className="border-line grid gap-4 border-b py-6 sm:grid-cols-[minmax(0,16rem)_1fr] sm:items-start sm:gap-8 sm:py-7">
              <h3 className="text-ink flex items-center gap-3 text-sm font-medium">
                <SkillMark title={group.title} />
                <span>{group.title}</span>
              </h3>
              <ul className="flex flex-wrap gap-x-3 gap-y-1">
                {group.items.map((item, itemIndex) => (
                  <li key={item} className="inline-flex items-center gap-3">
                    <Chip emphasized={item === NAMED_SKILL}>{item}</Chip>
                    {itemIndex < group.items.length - 1 ? (
                      <span className={cn("text-faint text-xs")} aria-hidden="true">
                        /
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </PageSection>
  );
}
