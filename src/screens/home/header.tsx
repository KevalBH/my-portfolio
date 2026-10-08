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
    <header className="border-line bg-bg/85 sticky top-0 z-20 -mx-5 mb-8 border-b px-5 py-3 backdrop-blur-xl sm:-mx-8 sm:px-8 md:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-ink font-serif text-2xl leading-none tracking-tight">
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
