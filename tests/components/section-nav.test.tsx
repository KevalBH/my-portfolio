import { render, screen } from "@testing-library/react";

import type { NavItem } from "@/lib/content";

import { SectionNav } from "@/components/section-nav";

const items = [
  { href: "#overview", label: "Overview" },
  { href: "#work", label: "Selected work" },
] as const satisfies readonly NavItem[];

function rect(top: number, bottom: number): DOMRect {
  return {
    top,
    bottom,
    left: 0,
    right: 0,
    width: 0,
    height: bottom - top,
    x: 0,
    y: top,
    toJSON: () => ({}),
  };
}

function mockPage({
  scrollY,
  scrollHeight,
  rects,
}: {
  scrollY: number;
  scrollHeight: number;
  rects: Record<string, DOMRect>;
}) {
  Object.defineProperty(window, "innerHeight", { configurable: true, value: 800 });
  Object.defineProperty(window, "scrollY", { configurable: true, value: scrollY });
  Object.defineProperty(document.documentElement, "scrollHeight", {
    configurable: true,
    value: scrollHeight,
  });
  jest
    .spyOn(HTMLElement.prototype, "getBoundingClientRect")
    .mockImplementation(function mockRect(this: HTMLElement) {
      return rects[this.id] ?? rect(0, 0);
    });
}

describe("SectionNav", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("marks the section under the reading line", () => {
    mockPage({
      scrollY: 100,
      scrollHeight: 4000,
      rects: {
        overview: rect(0, 500),
        work: rect(900, 1400),
      },
    });

    render(
      <>
        <section id="overview" />
        <section id="work" />
        <SectionNav items={items} />
      </>,
    );

    expect(screen.getByRole("link", { name: "01 Overview" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(screen.getByRole("link", { name: "02 Selected work" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("marks the last section when the page is scrolled to the end", () => {
    mockPage({
      scrollY: 3200,
      scrollHeight: 4000,
      rects: {
        overview: rect(-2000, -1500),
        work: rect(-200, 200),
      },
    });

    render(
      <>
        <section id="overview" />
        <section id="work" />
        <SectionNav items={items} variant="pills" />
      </>,
    );

    expect(screen.getByRole("link", { name: "Selected work" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(screen.getByRole("navigation", { name: "Page sections" })).toBeInTheDocument();
  });
});
