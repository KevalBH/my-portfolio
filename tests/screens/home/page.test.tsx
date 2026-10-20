import { render, screen } from "@testing-library/react";

import { profile } from "@/lib/resume";
import { THEME_STORAGE_KEY } from "@/lib/theme";

import { ThemeProvider } from "@/components/theme-provider";
import Page from "@/app/page";

describe("Home page", () => {
  afterEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
  });

  it("renders every section from the résumé", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "light");

    render(
      <ThemeProvider>
        <Page />
      </ThemeProvider>,
    );

    expect(screen.getByRole("heading", { level: 1, name: /Frontend architecture/ })).toBeInTheDocument();
    expect(screen.getAllByText("Agentic AI").some((node) => node.tagName === "STRONG")).toBe(true);
    expect(screen.getByRole("link", { name: /21Twelve Interactive Pvt Ltd/ })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Tablekart/ }).length).toBeGreaterThan(0);
    expect(screen.getByText("The operating layer.")).toBeInTheDocument();
    expect(screen.getByText("Foundations.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: profile.email })).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(profile.name)).length).toBeGreaterThan(0);
    expect(document.getElementById("overview")).toBeInTheDocument();
    expect(document.getElementById("contact")).toBeInTheDocument();
  });
});
