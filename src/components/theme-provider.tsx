"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { applyTheme, resolveTheme, THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

type ThemeContextValue = {
  theme: Theme;
  ready: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const next = resolveTheme();
    applyTheme(next);
    // Sync from localStorage / clock after mount to avoid a wrong first paint.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only theme bootstrap
    setTheme(next);
    setReady(true);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      ready,
      toggleTheme: () => {
        const next: Theme = theme === "dark" ? "light" : "dark";
        applyTheme(next);
        setTheme(next);
        try {
          localStorage.setItem(THEME_STORAGE_KEY, next);
        } catch {
          // Private mode and blocked storage should not break the toggle.
        }
      },
    }),
    [theme, ready],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
