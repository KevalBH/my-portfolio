import type { Profile } from "@/lib/content";
import type { SiteContent } from "@/queries/site";

import { SectionNav } from "@/components/section-nav";
import { ThemeToggle } from "@/components/theme-toggle";

type HomeHeaderProps = {
  profile: Profile;
  nav: SiteContent["nav"];
};

export function HomeHeader({ profile, nav }: HomeHeaderProps) {
  return (
    <header className="border-line bg-bg/80 sticky top-0 z-20 -mx-4 mb-8 border-b px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 md:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-ink text-lg leading-none font-semibold tracking-tight">
            {profile.name}
          </p>
          <p className="text-muted mt-1 truncate text-xs">{profile.title}</p>
        </div>
        <ThemeToggle />
      </div>
      <div className="mt-3">
        <SectionNav items={nav} variant="pills" />
      </div>
    </header>
  );
}
