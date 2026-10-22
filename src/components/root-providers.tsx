"use client";

import { useEffect, type ReactNode } from "react";

import { fontVariableClassName } from "@/lib/fonts";

import { WebMcpCommands } from "@/components/web-mcp";
import { ThemeProvider } from "@/components/theme-provider";

interface Props {
  children: ReactNode;
}

const fontClasses = fontVariableClassName.split(" ").filter(Boolean);

export function RootProviders({ children }: Props) {
  useEffect(() => {
    document.documentElement.classList.add(...fontClasses);
  }, []);

  return (
    <ThemeProvider>
      <WebMcpCommands />
      {children}
    </ThemeProvider>
  );
}
