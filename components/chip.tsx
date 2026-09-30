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
        "rounded-full px-3 py-1 text-[13px] transition-transform duration-200 hover:-translate-y-0.5",
        bordered && "border-line border px-2.5 py-1 text-[11px]",
        emphasized ? "bg-bg-3 text-ink font-semibold" : "bg-bg-3 text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
