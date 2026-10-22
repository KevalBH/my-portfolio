"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { SiteShell } from "@/components/site-shell";

interface Props {
  children: ReactNode;
}

export function SiteFrame({ children }: Props) {
  const pathname = usePathname();

  if (pathname === "/explore-3d") return children;

  return <SiteShell>{children}</SiteShell>;
}
