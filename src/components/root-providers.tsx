"use client";

import { WebMcpCommands } from "@/components/web-mcp";
import { ThemeProvider } from "@/components/theme-provider";

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <WebMcpCommands />
      {children}
    </ThemeProvider>
  );
}
