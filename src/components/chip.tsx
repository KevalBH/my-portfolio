import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

type ChipProps = {
  children: ReactNode;
  emphasized?: boolean;
  bordered?: boolean;
  className?: string;
};

export function Chip({
  children,
  emphasized = false,
  bordered = false,
  className,
}: ChipProps) {
  return (
    <span
      className={cn(
        "text-muted text-[13px] leading-6",
        bordered && "font-mono text-[11px] tracking-[0.14em] uppercase",
        emphasized && "text-ink font-medium",
        className,
      )}
    >
      {children}
    </span>
  );
}
