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

const desktopMedia = (query: string) => ({
  matches: query.includes("min-width: 768px"),
  media: query,
  onchange: null,
  addListener: () => undefined,
  removeListener: () => undefined,
  addEventListener: () => undefined,
  removeEventListener: () => undefined,
  dispatchEvent: () => false,
});

describe("SectionNav", () => {
  beforeEach(() => {
    window.requestAnimationFrame = (callback: FrameRequestCallback) => {
      callback(0);
      return 0;
    };
    window.cancelAnimationFrame = () => undefined;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    window.matchMedia = desktopMedia;
    window.requestAnimationFrame = (callback: FrameRequestCallback) => {
      callback(0);
      return 0;
    };
    window.cancelAnimationFrame = () => undefined;
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

  it("uses the taller mobile reading line", () => {
    window.matchMedia = (query: string) => ({
      ...desktopMedia(query),
      matches: false,
    });
    mockPage({
      scrollY: 0,
      scrollHeight: 4000,
      rects: {
        overview: rect(160, 220),
        work: rect(900, 1400),
      },
    });
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 400 });

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
  });

  it("keeps the last section that has passed the reading line", () => {
    mockPage({
      scrollY: 0,
      scrollHeight: 4000,
      rects: {
        overview: rect(0, 50),
        work: rect(900, 1400),
      },
    });

    render(
      <>
        <section id="overview" />
        <section id="work" />
        <SectionNav items={items} variant="pills" />
      </>,
    );

    expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute(
      "aria-current",
      "location",
    );
  });

  it("renders an empty nav and ignores missing sections", () => {
    mockPage({ scrollY: 0, scrollHeight: 4000, rects: {} });
    const { rerender } = render(<SectionNav items={[]} />);
    expect(screen.getByRole("navigation").querySelector("a")).toBeNull();

    rerender(<SectionNav items={items} />);
    expect(screen.getByRole("link", { name: "01 Overview" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("coalesces scroll events and cancels a pending frame", () => {
    const pending: FrameRequestCallback[] = [];
    const cancel = jest.fn();
    window.requestAnimationFrame = (callback) => {
      pending.push(callback);
      return pending.length;
    };
    window.cancelAnimationFrame = cancel;
    mockPage({
      scrollY: 0,
      scrollHeight: 4000,
      rects: {
        overview: rect(0, 500),
        work: rect(900, 1400),
      },
    });

    const { unmount } = render(
      <>
        <section id="overview" />
        <section id="work" />
        <SectionNav items={items} />
      </>,
    );

    window.dispatchEvent(new Event("scroll"));
    window.dispatchEvent(new Event("resize"));
    expect(pending).toHaveLength(1);
    unmount();
    expect(cancel).toHaveBeenCalledWith(1);
  });
});
