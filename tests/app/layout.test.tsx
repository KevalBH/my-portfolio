import { render, screen } from "@testing-library/react";

import RootLayout, { metadata, viewport } from "@/app/layout";

jest.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-geist" }),
  Geist_Mono: () => ({ variable: "--font-geist-mono" }),
  Instrument_Serif: () => ({ variable: "--font-display" }),
}));

describe("RootLayout", () => {
  it("publishes metadata, the viewport, and the theme boot script", () => {
    expect(metadata.title).toBeDefined();
    expect(viewport.colorScheme).toBe("light dark");
    expect(viewport.themeColor).toHaveLength(2);

    render(
      <RootLayout>
        <p>Page body</p>
      </RootLayout>,
    );

    expect(document.documentElement).toHaveAttribute("lang", "en");
    expect(document.head.querySelector("script")?.textContent).toContain("kb-theme");
    expect(screen.getByText("Page body")).toBeInTheDocument();
    expect(screen.getByText("Skip to content")).toBeInTheDocument();
  });
});
