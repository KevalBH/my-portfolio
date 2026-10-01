import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "decoration-accent/40 hover:text-accent underline-offset-4 hover:underline",
        className,
      )}
    >
      {children}
      <span className="sr-only"> Opens in a new tab.</span>
    </a>
  );
}
