"use client";

import { useEffect } from "react";

import type { Theme } from "@/lib/theme";
import { sectionIds } from "@/lib/content";

import { useTheme } from "@/components/theme-provider";

type ToolArgs = Record<string, unknown> | undefined;

type ToolPayload = {
  name: string;
  title: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, unknown>;
    required?: string[];
    additionalProperties: false;
  };
};

type ThemeActions = {
  setThemeMode: (theme: Theme) => void;
  toggleTheme: () => Theme;
};

type Command = (args: ToolArgs, actions: ThemeActions) => string;

type ModelContext = {
  registerTool: (
    tool: ToolPayload & {
      annotations: { readOnlyHint: false };
      execute: (args: ToolArgs) => Promise<string>;
    },
  ) => void;
};

const LOOKUP_MS = 500;
const LOOKUP_WINDOW_MS = 30_000;

function schema(
  properties: Record<string, unknown>,
  required?: string[],
): ToolPayload["inputSchema"] {
  return {
    type: "object",
    properties,
    ...(required ? { required } : {}),
    additionalProperties: false,
  };
}

const tools: ToolPayload[] = [
  {
    name: "set_theme",
    title: "Set theme",
    description: "Switch the portfolio between light and dark mode.",
    inputSchema: schema(
      {
        theme: {
          type: "string",
          enum: ["light", "dark"],
          description: "Theme to apply on the open page.",
        },
      },
      ["theme"],
    ),
  },
  {
    name: "toggle_theme",
    title: "Toggle theme",
    description: "Flip the portfolio between light and dark mode.",
    inputSchema: schema({}),
  },
  {
    name: "go_to_section",
    title: "Go to section",
    description: `Scroll the portfolio to one section: ${sectionIds.join(", ")}.`,
    inputSchema: schema(
      {
        section: {
          type: "string",
          enum: [...sectionIds],
          description: "Section to scroll into view.",
        },
      },
      ["section"],
    ),
  },
];

function textArg(args: ToolArgs, key: string) {
  const value = args?.[key];
  return typeof value === "string" ? value : "";
}

function setTheme(args: ToolArgs, actions: ThemeActions) {
  const theme = textArg(args, "theme");
  if (theme !== "light" && theme !== "dark") {
    throw new Error('Pass theme as "light" or "dark".');
  }
  actions.setThemeMode(theme);
  return `Theme is ${theme}.`;
}

function toggleTheme(_args: ToolArgs, actions: ThemeActions) {
  return `Theme is ${actions.toggleTheme()}.`;
}

function goToSection(args: ToolArgs) {
  const section = textArg(args, "section");
  if (!(sectionIds as readonly string[]).includes(section)) {
    throw new Error(`Pass section as one of: ${sectionIds.join(", ")}.`);
  }

  const node = document.getElementById(section);
  if (!node) {
    throw new Error(`Section ${section} is not on this page.`);
  }

  node.scrollIntoView({ behavior: "smooth", block: "start" });
  const hash = `#${section}`;
  if (window.location.hash !== hash) {
    window.history.pushState(null, "", hash);
  }
  return `Scrolled to ${section}.`;
}

const commands: Record<string, Command> = {
  set_theme: setTheme,
  toggle_theme: toggleTheme,
  go_to_section: goToSection,
};

function runTool(name: string, args: ToolArgs, actions: ThemeActions) {
  const command = commands[name];
  if (!command) {
    throw new Error(`Unknown command ${name}.`);
  }
  return command(args, actions);
}

function modelContexts() {
  const found: ModelContext[] = [];

  for (const scope of [document, navigator]) {
    const candidate = (scope as { modelContext?: ModelContext }).modelContext;
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

function followAbort(source: AbortSignal, target: AbortController) {
  if (source.aborted) {
    target.abort();
    return;
  }
  source.addEventListener("abort", () => target.abort(), { once: true });
}

function wait(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve) => {
    if (signal.aborted) {
      resolve();
      return;
    }

    const timer = window.setTimeout(resolve, ms);
    signal.addEventListener(
      "abort",
      () => {
        window.clearTimeout(timer);
        resolve();
      },
      { once: true },
    );
  });
}

export function WebMcpCommands() {
  const { setThemeMode, toggleTheme: flipTheme } = useTheme();

  useEffect(() => {
    const controller = new AbortController();
    const seen = new WeakSet<ModelContext>();
    const { signal } = controller;

    const register = () => {
      for (const provider of modelContexts()) {
        if (seen.has(provider)) {
          continue;
        }
        seen.add(provider);

        for (const tool of tools) {
          try {
            provider.registerTool({
              ...tool,
              annotations: { readOnlyHint: false },
              execute: async (args) =>
                runTool(tool.name, args, { setThemeMode, toggleTheme: flipTheme }),
            });
          } catch {
            // A remount can try to register the same command twice.
          }
        }
      }
    };

    const watch = async () => {
      const lookup = new AbortController();
      followAbort(signal, lookup);
      followAbort(AbortSignal.timeout(LOOKUP_WINDOW_MS), lookup);

      while (!lookup.signal.aborted) {
        register();
        await wait(LOOKUP_MS, lookup.signal);
      }
    };

    void watch();

    return () => controller.abort();
  }, [setThemeMode, flipTheme]);

  return null;
}
