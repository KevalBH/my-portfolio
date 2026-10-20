import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  ReactNode,
} from "react";

import { cn } from "@/utils/cn";

type RevealProps<T extends ElementType> = {
  as?: T;
  animate?: boolean;
  children: ReactNode;
  className?: string;
  delay?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className" | "style">;

export function Reveal<T extends ElementType = "div">({
  as,
  animate = true,
  children,
  className,
  delay = 0,
  ...props
}: RevealProps<T>) {
  const Comp = as ?? "div";

  return (
    <Comp
      className={cn(animate && "reveal", className)}
      style={animate ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
      {...props}
    >
      {children}
    </Comp>
  );
}
