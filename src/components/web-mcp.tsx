"use client";

import { useEffect } from "react";

import type { Theme } from "@/lib/theme";
import { sectionIds, type SectionId } from "@/lib/content";

import { useTheme } from "@/components/theme-provider";

type ToolArgs = Record<string, unknown> | undefined;

type WebMcpTool = {
  name: string;
  title: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, unknown>;
    required?: string[];
    additionalProperties: false;
  };
  annotations: { readOnlyHint: false };
  execute: (args: ToolArgs) => Promise<string>;
};

type ToolRegistration = {
  unregister?: () => void;
};

type WebMcpProvider = {
  registerTool: (
    tool: WebMcpTool,
  ) => ToolRegistration | void | Promise<ToolRegistration | void>;
  unregisterTool?: (name: string) => void;
};

const LOOKUP_MS = 500;
const LOOKUP_WINDOW_MS = 30_000;

function modelContexts(): WebMcpProvider[] {
  const scopes = [document, navigator] as const;
  const found: WebMcpProvider[] = [];

  for (const scope of scopes) {
    const candidate = (scope as { modelContext?: WebMcpProvider }).modelContext;
    if (
      candidate &&
      typeof candidate.registerTool === "function" &&
      !found.includes(candidate)
    ) {
      found.push(candidate);
    }
  }

  return found;
}

function readArg(args: ToolArgs, key: string) {
  const value = args?.[key];
  return typeof value === "string" ? value : "";
}

function isTheme(value: string): value is Theme {
  return value === "light" || value === "dark";
}

function isSectionId(value: string): value is SectionId {
  return (sectionIds as readonly string[]).includes(value);
}

function currentTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function WebMcpCommands() {
  const { setThemeMode, toggleTheme } = useTheme();

  useEffect(() => {
    let stopped = false;
    const seen = new WeakSet<WebMcpProvider>();
    const cleanups: Array<() => void> = [];

    const tools: WebMcpTool[] = [
      {
        name: "set_theme",
        title: "Set theme",
        description: "Switch the portfolio between light and dark mode.",
        inputSchema: {
          type: "object",
          properties: {
            theme: {
              type: "string",
              enum: ["light", "dark"],
              description: "Theme to apply on the open page.",
            },
          },
          required: ["theme"],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false },
        execute: async (args) => {
          const theme = readArg(args, "theme");
          if (!isTheme(theme)) {
            throw new Error('Pass theme as "light" or "dark".');
          }
          setThemeMode(theme);
          return `Theme is ${theme}.`;
        },
      },
      {
        name: "toggle_theme",
        title: "Toggle theme",
        description: "Flip the portfolio between light and dark mode.",
        inputSchema: {
          type: "object",
          properties: {},
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false },
        execute: async () => {
          toggleTheme();
          return `Theme is ${currentTheme()}.`;
        },
      },
      {
        name: "go_to_section",
        title: "Go to section",
        description: `Scroll the portfolio to one section: ${sectionIds.join(", ")}.`,
        inputSchema: {
          type: "object",
          properties: {
            section: {
              type: "string",
              enum: [...sectionIds],
              description: "Section to scroll into view.",
            },
          },
          required: ["section"],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false },
        execute: async (args) => {
          const section = readArg(args, "section");
          if (!isSectionId(section)) {
            throw new Error(`Pass section as one of: ${sectionIds.join(", ")}.`);
          }
          const node = document.getElementById(section);
          if (!node) {
            throw new Error(`Section ${section} is not on this page.`);
          }
          node.scrollIntoView({ behavior: "smooth", block: "start" });
          const nextHash = `#${section}`;
          if (window.location.hash !== nextHash) {
            window.history.pushState(null, "", nextHash);
          }
          return `Scrolled to ${section}.`;
        },
      },
    ];

    const attach = () => {
      if (stopped) {
        return;
      }

      for (const provider of modelContexts()) {
        if (seen.has(provider)) {
          continue;
        }
        seen.add(provider);

        for (const tool of tools) {
          try {
            const pending = provider.registerTool(tool);
            void Promise.resolve(pending).then((handle) => {
              if (stopped) {
                handle?.unregister?.();
                provider.unregisterTool?.(tool.name);
                return;
              }
              if (handle && typeof handle.unregister === "function") {
                cleanups.push(() => handle.unregister?.());
                return;
              }
              if (typeof provider.unregisterTool === "function") {
                cleanups.push(() => provider.unregisterTool?.(tool.name));
              }
            });
          } catch {
            // A remount can try to register the same command twice.
          }
        }
      }
    };

    attach();
    const timer = window.setInterval(attach, LOOKUP_MS);
    const stopTimer = window.setTimeout(
      () => window.clearInterval(timer),
      LOOKUP_WINDOW_MS,
    );

    return () => {
      stopped = true;
      window.clearInterval(timer);
      window.clearTimeout(stopTimer);
      for (const cleanup of cleanups) {
        cleanup();
      }
    };
  }, [setThemeMode, toggleTheme]);

  return null;
}
