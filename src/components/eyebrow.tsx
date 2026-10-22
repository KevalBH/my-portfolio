import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Eyebrow({ children }: Props) {
  return (
    <p className="text-accent font-mono text-[11px] font-medium tracking-[0.22em] uppercase">
      {children}
    </p>
  );
}
