import { getSiteContent } from "@/queries/site";

import { WorkSection } from "@/screens/home/work";
import { HomeFooter } from "@/screens/home/footer";
import { HomeHeader } from "@/screens/home/header";
import { StackSection } from "@/screens/home/stack";
import { ContactSection } from "@/screens/home/contact";
import { OverviewSection } from "@/screens/home/overview";
import { EducationSection } from "@/screens/home/education";
import { ExperienceSection } from "@/screens/home/experience";

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
