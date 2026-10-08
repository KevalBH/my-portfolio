import { compactUrl } from "@/utils/url";
import type { Profile } from "@/lib/content";

import { InkStroke } from "@/components/ink";
import { Reveal } from "@/components/reveal";
import { PrintPlate } from "@/components/print-plate";
import { PageSection } from "@/screens/home/page-section";
import { SectionHeading } from "@/screens/home/section-heading";

type ContactLink = {
  href: string;
  label: string;
  name: string;
  external?: boolean;
};

function getContactLinks(profile: Profile): ContactLink[] {
  return [
    {
      href: profile.phoneHref,
      label: profile.phone,
      name: "Phone",
    },
    {
      href: profile.linkedin,
      label: compactUrl(profile.linkedin),
      name: "LinkedIn",
      external: true,
    },
    {
      href: profile.github,
      label: compactUrl(profile.github),
      name: "GitHub",
      external: true,
    },
  ];
}

type ContactSectionProps = {
  profile: Profile;
};

export function ContactSection({ profile }: ContactSectionProps) {
  const links = getContactLinks(profile);

  return (
    <PageSection id="contact">
      <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(220px,0.7fr)] lg:gap-12">
        <div>
          <SectionHeading
            eyebrow="06 / Contact"
            title="If the work should be quieter, faster, and held to a standard."
            description={`${profile.location}. Direct lines only — no form, no newsletter.`}
            descriptionClassName="text-muted max-w-lg text-[15px] leading-7"
          />
          <Reveal>
            <a
              href={`mailto:${profile.email}`}
              className="text-ink hover:text-accent mt-8 block font-serif text-[clamp(1.7rem,4vw,3rem)] leading-tight tracking-tight break-all underline-offset-4 hover:underline sm:break-normal"
            >
              {profile.email}
            </a>
            <InkStroke className="mt-3 max-w-xl" />
          </Reveal>
        </div>
        <Reveal delay={160}>
          <PrintPlate
            src="/art/plate-close.jpg"
            alt="An envelope reduced to a rectangle, a copper flap, and one rule"
            sizes="(min-width: 1024px) 380px, 100vw"
            imageClassName="object-[85%_center]"
            className="aspect-[4/3]"
          />
        </Reveal>
      </div>
      <ul className="mt-8 grid gap-5 sm:grid-cols-3">
        {links.map((item, index) => (
          <Reveal key={item.href} as="li" delay={index * 70}>
            <a
              href={item.href}
              className="group block"
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
            >
              <span className="text-faint font-mono text-[11px] tracking-[0.16em] uppercase">
                {item.name}
                {item.external ? (
                  <span className="sr-only"> (opens in a new tab)</span>
                ) : null}
              </span>
              <span className="text-ink group-hover:text-accent mt-1 block text-sm break-all underline-offset-4 group-hover:underline">
                {item.label}
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </PageSection>
  );
}
