import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import { THEME_STORAGE_KEY } from "@/lib/theme";

import { ThemeProvider, useTheme } from "@/components/theme-provider";

function ThemeProbe() {
  const { ready, theme, toggleTheme } = useTheme();

  return (
    <button type="button" onClick={() => toggleTheme()}>
      {ready ? theme : "loading"}
    </button>
  );
}

describe("ThemeProvider", () => {
  afterEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
    jest.restoreAllMocks();
  });

  it("requires a provider", () => {
    expect(() => render(<ThemeProbe />)).toThrow(
      "useTheme must be used within ThemeProvider",
    );
  });

  it("restores a stored theme and toggles it into storage", async () => {
    localStorage.setItem(THEME_STORAGE_KEY, "light");
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    );

    expect(screen.getByRole("button", { name: "light" })).toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass("dark");

    await user.click(screen.getByRole("button", { name: "light" }));

    expect(screen.getByRole("button", { name: "dark" })).toBeInTheDocument();
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(document.documentElement).toHaveClass("dark");
  });

  it("still switches theme when storage writes are blocked", async () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    );

    await user.click(screen.getByRole("button", { name: "dark" }));

    expect(screen.getByRole("button", { name: "light" })).toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass("dark");
  });
});
