"use client";

import { useEffect, useState } from "react";

import { cn } from "@/utils/cn";
import type { NavItem } from "@/lib/content";

type SectionNavProps = {
  items: readonly NavItem[];
  variant?: "rail" | "pills";
};

function toHref(id: string): NavItem["href"] {
  return `#${id}` as NavItem["href"];
}

function activeHref(nodes: readonly HTMLElement[]): NavItem["href"] | "" {
  if (nodes.length === 0) {
    return "";
  }

  const last = nodes[nodes.length - 1];
  const viewport = window.innerHeight;
  const atPageEnd =
    window.scrollY + viewport >= document.documentElement.scrollHeight - 8;

  if (atPageEnd && last) {
    return toHref(last.id);
  }

  const probeY = window.matchMedia("(min-width: 768px)").matches
    ? viewport * 0.38
    : Math.max(viewport * 0.38, 176);

  for (const node of nodes) {
    const rect = node.getBoundingClientRect();
    if (rect.top <= probeY && rect.bottom > probeY) {
      return toHref(node.id);
    }
  }

  let href: NavItem["href"] | "" = nodes[0] ? toHref(nodes[0].id) : "";
  for (const node of nodes) {
    if (node.getBoundingClientRect().top <= probeY) {
      href = toHref(node.id);
    }
  }

  return href;
}

export function SectionNav({ items, variant = "rail" }: SectionNavProps) {
  const [active, setActive] = useState(items[0]?.href ?? "");

  useEffect(() => {
    const nodes = items
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el instanceof HTMLElement);

    let frame = 0;

    const sync = () => {
      frame = 0;
      const next = activeHref(nodes);
      if (next) {
        setActive(next);
      }
    };

    const onScroll = () => {
      if (frame) {
        return;
      }
      frame = requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [items]);

  if (variant === "pills") {
    return (
      <nav aria-label="Page sections" className="flex flex-wrap gap-2">
        {items.map((item) => {
          const isActive = active === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "rounded-full border px-3 py-2 text-[13px] font-medium whitespace-nowrap transition-all duration-300",
                isActive
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-bg-2 text-muted",
              )}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    );
  }

  return (
    <nav aria-label="Page sections" className="flex flex-col gap-1">
      {items.map((item) => {
        const isActive = active === item.href;
        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={isActive ? "location" : undefined}
            className={cn(
              "group flex min-h-10 items-center gap-3 py-1.5 text-[13px] tracking-wide transition-colors duration-300",
              isActive ? "text-ink" : "text-faint hover:text-muted",
            )}
          >
            <span
              className={cn(
                "h-px transition-all duration-300",
                isActive ? "bg-accent w-8" : "bg-line w-4 group-hover:w-6",
              )}
            />
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
