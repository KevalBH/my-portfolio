import { Mail, Phone } from "lucide-react";
import type { ComponentType } from "react";

import { compactUrl } from "@/utils/url";
import type { Profile } from "@/lib/content";

import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { PageSection } from "@/screens/home/page-section";
import { SectionHeading } from "@/screens/home/section-heading";
import { GithubIcon, LinkedinIcon } from "@/components/contact-icons";

type ContactIcon = ComponentType<{ className?: string }>;

type ContactChannel = {
  href: string;
  label: string;
  name: string;
  Icon: ContactIcon;
  external?: boolean;
};

function getContactChannels(profile: Profile): ContactChannel[] {
  return [
    {
      href: `mailto:${profile.email}`,
      label: profile.email,
      name: "Email",
      Icon: Mail,
    },
    {
      href: profile.phoneHref,
      label: profile.phone,
      name: "Phone",
      Icon: Phone,
    },
    {
      href: profile.linkedin,
      label: compactUrl(profile.linkedin),
      name: "LinkedIn",
      Icon: LinkedinIcon,
      external: true,
    },
    {
      href: profile.github,
      label: compactUrl(profile.github),
      name: "GitHub",
      Icon: GithubIcon,
      external: true,
    },
  ];
}

type ContactSectionProps = {
  profile: Profile;
};

export function ContactSection({ profile }: ContactSectionProps) {
  const channels = getContactChannels(profile);

  return (
    <PageSection id="contact">
      <SectionHeading
        eyebrow="06 / Contact"
        title="If the work should be quieter, faster, and held to a standard."
        description={`${profile.location}. Direct lines only — no form, no newsletter.`}
        descriptionClassName="text-muted max-w-lg text-[15px] leading-7"
      />
      <ul className="mt-8 grid gap-2">
        {channels.map((item, index) => {
          const Icon = item.Icon;
          const openLabel = item.external
            ? `${item.name} (opens in a new tab)`
            : item.name;

          return (
            <Reveal key={item.href} as="li" delay={index * 70}>
              <Button
                variant="outline"
                asChild
                className="lift group h-auto w-full justify-between"
              >
                <a
                  href={item.href}
                  aria-label={openLabel}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="bg-accent/15 text-accent flex size-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="break-all sm:break-normal">{item.label}</span>
                  </span>
                  <span
                    className="text-faint shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
              </Button>
            </Reveal>
          );
        })}
      </ul>
    </PageSection>
  );
}
