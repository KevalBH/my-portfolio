import {
  applyTheme,
  resolveTheme,
  THEME_STORAGE_KEY,
  themeFromLocalTime,
} from "@/lib/theme";

describe("themeFromLocalTime", () => {
  it("uses light from 06:00 until 18:00", () => {
    expect(themeFromLocalTime(new Date(2026, 0, 1, 6, 0))).toBe("light");
    expect(themeFromLocalTime(new Date(2026, 0, 1, 17, 59))).toBe("light");
  });

  it("uses dark overnight and from 18:00", () => {
    expect(themeFromLocalTime(new Date(2026, 0, 1, 5, 59))).toBe("dark");
    expect(themeFromLocalTime(new Date(2026, 0, 1, 18, 0))).toBe("dark");
    expect(themeFromLocalTime(new Date(2026, 0, 1, 23, 0))).toBe("dark");
  });
});

describe("resolveTheme", () => {
  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it("returns a stored light or dark value", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "light");
    expect(resolveTheme()).toBe("light");
  });

  it("ignores an unknown stored value and follows the clock", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "sepia");
    jest.spyOn(Date.prototype, "getHours").mockReturnValue(10);
    expect(resolveTheme()).toBe("light");
  });

  it("follows the clock when storage is blocked", () => {
    jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    jest.spyOn(Date.prototype, "getHours").mockReturnValue(21);
    expect(resolveTheme()).toBe("dark");
  });
});

describe("applyTheme", () => {
  it("sets the dark class and color scheme together", () => {
    applyTheme("dark");
    expect(document.documentElement).toHaveClass("dark");
    expect(document.documentElement.style.colorScheme).toBe("dark");

    applyTheme("light");
    expect(document.documentElement).not.toHaveClass("dark");
    expect(document.documentElement.style.colorScheme).toBe("light");
  });
});
