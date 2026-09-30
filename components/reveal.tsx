import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  ReactNode,
} from "react";

import { cn } from "@/utils/cn";

type RevealProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  delay?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className" | "style">;

export function Reveal<T extends ElementType = "div">({
  as,
  children,
  className,
  delay = 0,
  ...props
}: RevealProps<T>) {
  const Comp = as ?? "div";

  return (
    <Comp
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      {...props}
    >
      {children}
    </Comp>
  );
}
