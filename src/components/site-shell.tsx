import type { ReactNode } from "react";

import { getSiteContent } from "@/queries/site";

import { MonogramMark } from "@/components/graphics";
import { SectionNav } from "@/components/section-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { GithubIcon, LinkedinIcon } from "@/components/contact-icons";

export function SiteShell({ children }: { children: ReactNode }) {
  const { nav, profile } = getSiteContent();

  return (
    <>
      <a className="skip-link" href={nav[0].href}>
        Skip to content
      </a>
      <div className="relative z-[1] mx-auto grid min-h-screen max-w-[1180px] grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="md:border-line hidden md:sticky md:top-0 md:flex md:h-svh md:flex-col md:justify-between md:border-r md:px-6 md:py-8 lg:px-8 lg:py-10">
          <div>
            <p className="text-accent inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] uppercase">
              <span className="hero-node bg-accent h-1.5 w-1.5 rounded-full" />
              Portfolio
            </p>
            <MonogramMark className="mt-6 size-12 transition-transform duration-500 hover:rotate-6" />
            <p className="text-ink mt-4 text-2xl leading-none font-semibold tracking-tight">
              {profile.name}
            </p>
            <p className="text-muted mt-3 max-w-[16rem] text-sm leading-6">
              {profile.title}
            </p>
            <p className="text-faint mt-1 text-sm">{profile.location}</p>
            <div className="mt-5 flex gap-2">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (opens in a new tab)"
                className="border-line bg-bg-2 text-muted hover:border-accent/40 hover:text-accent inline-flex size-9 items-center justify-center rounded-lg border transition-colors"
              >
                <LinkedinIcon className="size-4" />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub (opens in a new tab)"
                className="border-line bg-bg-2 text-muted hover:border-accent/40 hover:text-accent inline-flex size-9 items-center justify-center rounded-lg border transition-colors"
              >
                <GithubIcon className="size-4" />
              </a>
            </div>
            <div className="mt-8">
              <SectionNav items={nav} />
            </div>
          </div>
          <ThemeToggle />
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </>
  );
}
