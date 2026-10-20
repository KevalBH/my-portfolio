import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import { THEME_STORAGE_KEY } from "@/lib/theme";

import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeProvider } from "@/components/theme-provider";

describe("ThemeToggle", () => {
  afterEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
  });

  it("switches the accessible label with the theme", async () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );

    const toggle = screen.getByRole("switch", { name: "Switch to light mode" });
    expect(toggle).toBeChecked();

    await user.click(toggle);

    expect(screen.getByRole("switch", { name: "Switch to dark mode" })).not.toBeChecked();
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
  });
});
