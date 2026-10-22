import type { ReactNode } from "react";

import { cn } from "@/utils/cn";
import type { SectionId } from "@/lib/content";

interface Props {
  id: SectionId;
  first?: boolean;
  children: ReactNode;
}

export function PageSection({ id, first = false, children }: Props) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-56 md:scroll-mt-8",
        !first &&
          "mt-16 [contain-intrinsic-size:auto_48rem] [content-visibility:auto] sm:mt-24",
      )}
    >
      {children}
    </section>
  );
}
