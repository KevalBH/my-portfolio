import type { ReactNode } from "react";

import { cn } from "@/utils/cn";
import type { SectionId } from "@/lib/content";

type PageSectionProps = {
  id: SectionId;
  first?: boolean;
  children: ReactNode;
};

export function PageSection({ id, first = false, children }: PageSectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-56 md:scroll-mt-8", !first && "mt-16 sm:mt-24")}
    >
      {children}
    </section>
  );
}
