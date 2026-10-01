"use client";

import { Moon, Sun } from "lucide-react";

import { cn } from "@/utils/cn";

import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, ready, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  if (!ready) {
    return (
      <span
        aria-hidden="true"
        className="border-line bg-bg-3 inline-flex h-11 w-[4.5rem] shrink-0 rounded-full border"
      />
    );
  }

  return (
    <label className="inline-flex h-11 shrink-0 items-center gap-2">
      <Sun
        className={cn("size-4 transition-colors", isDark ? "text-faint" : "text-accent")}
        aria-hidden="true"
      />
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      />
      <Moon
        className={cn("size-4 transition-colors", isDark ? "text-accent" : "text-faint")}
        aria-hidden="true"
      />
    </label>
  );
}
