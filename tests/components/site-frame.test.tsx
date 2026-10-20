import { render, screen } from "@testing-library/react";

import { THEME_STORAGE_KEY } from "@/lib/theme";

import { SiteJsonLd } from "@/components/site-json-ld";
import { SiteShell } from "@/components/site-shell";
import { ThemeProvider } from "@/components/theme-provider";
import { RootProviders } from "@/components/root-providers";

describe("site frame", () => {
  afterEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
  });

  it("prints person structured data", () => {
    const { container } = render(<SiteJsonLd />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(JSON.parse(script?.textContent ?? "{}")).toMatchObject({
      "@type": "Person",
      name: "Keval Bhatt",
    });
  });

  it("frames the page with navigation and providers", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");

    render(
      <RootProviders>
        <SiteShell>
          <p>Main column</p>
        </SiteShell>
      </RootProviders>,
    );

    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute(
      "href",
      "#overview",
    );
    expect(screen.getByText("Keval Bhatt")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("target", "_blank");
    expect(screen.getByText("Main column")).toBeInTheDocument();
    expect(screen.getByRole("switch", { name: "Switch to light mode" })).toBeInTheDocument();
  });

  it("wraps children in the theme provider", () => {
    render(
      <ThemeProvider>
        <SiteShell>
          <span>Inside</span>
        </SiteShell>
      </ThemeProvider>,
    );

    expect(screen.getByText("Inside")).toBeInTheDocument();
  });
});
