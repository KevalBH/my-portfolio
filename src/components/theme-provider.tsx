"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { applyTheme, resolveTheme, THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

type ThemeContextValue = {
  theme: Theme;
  ready: boolean;
  setThemeMode: (next: Theme) => void;
  toggleTheme: () => Theme;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);
  const themeRef = useRef<Theme>("dark");

  useEffect(() => {
    const next = resolveTheme();
    themeRef.current = next;
    applyTheme(next);
    // Sync from localStorage / clock after mount to avoid a wrong first paint.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only theme bootstrap
    setTheme(next);
    setReady(true);
  }, []);

  const setThemeMode = useCallback((next: Theme) => {
    themeRef.current = next;
    applyTheme(next);
    setTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private mode and blocked storage should not break the toggle.
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = themeRef.current === "dark" ? "light" : "dark";
    setThemeMode(next);
    return next;
  }, [setThemeMode]);

  const value = useMemo(
    () => ({
      theme,
      ready,
      setThemeMode,
      toggleTheme,
    }),
    [theme, ready, setThemeMode, toggleTheme],
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
