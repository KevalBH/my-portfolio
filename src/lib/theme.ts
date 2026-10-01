export const THEME_STORAGE_KEY = "kb-theme";
export const LIGHT_START_HOUR = 6;
export const LIGHT_END_HOUR = 18;

export type Theme = "light" | "dark";

export function themeFromLocalTime(date = new Date()): Theme {
  const hour = date.getHours();
  return hour >= LIGHT_START_HOUR && hour < LIGHT_END_HOUR ? "light" : "dark";
}

export function resolveTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch {
    // ignore
  }
  return themeFromLocalTime();
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}
