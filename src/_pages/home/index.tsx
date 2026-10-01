import { getSiteContent } from "@/queries/site";

import { WorkSection } from "@/_pages/home/work";
import { HomeFooter } from "@/_pages/home/footer";
import { HomeHeader } from "@/_pages/home/header";
import { StackSection } from "@/_pages/home/stack";
import { ContactSection } from "@/_pages/home/contact";
import { OverviewSection } from "@/_pages/home/overview";
import { EducationSection } from "@/_pages/home/education";
import { ExperienceSection } from "@/_pages/home/experience";

export function HomePage() {
  const { education, experience, nav, profile, skillGroups, stats, work } =
    getSiteContent();

  return (
    <main className="px-4 pt-4 pb-20 sm:px-6 md:px-8 md:pt-8 md:pb-24 lg:px-14 lg:py-14">
      <HomeHeader profile={profile} nav={nav} />
      <OverviewSection profile={profile} stats={stats} />
      <ExperienceSection experience={experience} />
      <WorkSection work={work} />
      <StackSection skillGroups={skillGroups} />
      <EducationSection education={education} />
      <ContactSection profile={profile} />
      <HomeFooter name={profile.name} />
    </main>
  );
}
