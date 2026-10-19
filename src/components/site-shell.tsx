import type { ReactNode } from "react";

import { sidebarTitle } from "@/lib/resume";
import { getSiteContent } from "@/queries/site";

import { StudioMark } from "@/components/ink";
import { SectionNav } from "@/components/section-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteShell({ children }: { children: ReactNode }) {
  const { nav, profile } = getSiteContent();

  return (
    <>
      <a className="skip-link" href={nav[0].href}>
        Skip to content
      </a>
      <div className="relative z-[1] mx-auto grid min-h-screen max-w-[1240px] grid-cols-1 md:grid-cols-[210px_minmax(0,1fr)] lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="border-line hidden md:sticky md:top-0 md:flex md:h-svh md:flex-col md:justify-between md:border-r md:px-6 md:py-10 lg:px-8">
          <div>
            <p className="text-faint font-mono text-[11px] tracking-[0.22em] uppercase">
              Portfolio
            </p>
            <p className="text-ink mt-8 font-serif text-[2.6rem] leading-[0.9] tracking-tight">
              {profile.name}
            </p>
            <p className="text-muted mt-4 font-serif text-lg leading-6 italic">
              {sidebarTitle}
            </p>
            <p className="text-faint mt-2 text-sm">{profile.location}</p>
            <div className="text-muted mt-6 flex gap-4 text-sm">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent underline-offset-4 hover:underline"
              >
                LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent underline-offset-4 hover:underline"
              >
                GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
            <div className="mt-10">
              <SectionNav items={nav} />
            </div>
          </div>
          <div className="flex items-end justify-between gap-4">
            <StudioMark className="size-[4.5rem]" />
            <ThemeToggle />
          </div>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </>
  );
}
