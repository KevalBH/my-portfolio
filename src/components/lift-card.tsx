import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/utils/cn";

type LiftCardProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function LiftCard<T extends ElementType = "article">({
  as,
  className,
  children,
  ...props
}: LiftCardProps<T>) {
  const Comp = as ?? "article";

  return (
    <Comp className={cn("lift border-line bg-bg-2 border", className)} {...props}>
      {children}
    </Comp>
  );
}
