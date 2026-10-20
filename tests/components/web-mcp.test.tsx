import { render } from "@testing-library/react";

import { THEME_STORAGE_KEY } from "@/lib/theme";

import { ThemeProvider } from "@/components/theme-provider";
import { runTool, WebMcpCommands } from "@/components/web-mcp";

type Tool = {
  name: string;
  execute: (args?: Record<string, unknown>) => Promise<string>;
};

type ModelContext = {
  registerTool: (tool: Tool) => void;
};

function installContexts(
  documentContext: ModelContext | undefined,
  navigatorContext?: ModelContext,
) {
  Object.defineProperty(document, "modelContext", {
    configurable: true,
    value: documentContext,
  });
  Object.defineProperty(navigator, "modelContext", {
    configurable: true,
    value: navigatorContext,
  });
}

function clearContexts() {
  delete (document as { modelContext?: unknown }).modelContext;
  delete (navigator as { navigator?: unknown } & { modelContext?: unknown }).modelContext;
}

describe("WebMcpCommands", () => {
  afterEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
    clearContexts();
    document.getElementById("overview")?.remove();
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it("rejects an unknown command", () => {
    expect(() =>
      runTool("missing", undefined, {
        setThemeMode: () => undefined,
        toggleTheme: () => "dark",
      }),
    ).toThrow("Unknown command missing.");
  });

  it("does nothing when no model context is available", () => {
    installContexts(undefined, undefined);
    const { unmount } = render(
      <ThemeProvider>
        <WebMcpCommands />
      </ThemeProvider>,
    );
    unmount();
  });

  it("ignores a context that cannot register tools", () => {
    installContexts({} as ModelContext, undefined);
    const { unmount } = render(
      <ThemeProvider>
        <WebMcpCommands />
      </ThemeProvider>,
    );
    unmount();
  });

  it("stops looking when the lookup window is already closed", () => {
    jest.spyOn(AbortSignal, "timeout").mockImplementation(() => AbortSignal.abort());
    const registerTool = jest.fn();
    installContexts({ registerTool }, { registerTool });

    const { unmount } = render(
      <ThemeProvider>
        <WebMcpCommands />
      </ThemeProvider>,
    );

    expect(registerTool).not.toHaveBeenCalled();
    unmount();
  });

  it("registers page commands and runs them", async () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    const registered: Tool[] = [];
    const documentContext = {
      registerTool: jest.fn((tool: Tool) => {
        registered.push(tool);
      }),
    };
    const navigatorContext = {
      registerTool: jest.fn((tool: Tool) => {
        registered.push(tool);
      }),
    };
    installContexts(documentContext, navigatorContext);

    const section = document.createElement("section");
    section.id = "overview";
    section.scrollIntoView = jest.fn();
    document.body.appendChild(section);
    const pushState = jest.spyOn(window.history, "pushState");

    const { unmount } = render(
      <ThemeProvider>
        <WebMcpCommands />
      </ThemeProvider>,
    );

    const byName = (name: string) => registered.find((tool) => tool.name === name);

    await expect(byName("set_theme")?.execute()).rejects.toThrow(/light/);
    await expect(byName("set_theme")?.execute({ theme: 1 })).rejects.toThrow(/light/);
    await expect(byName("set_theme")?.execute({ theme: "sepia" })).rejects.toThrow(
      /light/,
    );
    await expect(byName("set_theme")?.execute({ theme: "light" })).resolves.toBe(
      "Theme is light.",
    );

    await expect(byName("toggle_theme")?.execute()).resolves.toBe("Theme is dark.");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");

    await expect(byName("go_to_section")?.execute()).rejects.toThrow(/section/);
    await expect(
      byName("go_to_section")?.execute({ section: "missing" }),
    ).rejects.toThrow(/section/);
    await expect(byName("go_to_section")?.execute({ section: "work" })).rejects.toThrow(
      /not on this page/,
    );

    window.history.pushState(null, "", "#overview");
    pushState.mockClear();
    await expect(byName("go_to_section")?.execute({ section: "overview" })).resolves.toBe(
      "Scrolled to overview.",
    );
    expect(pushState).not.toHaveBeenCalled();

    window.history.pushState(null, "", "#work");
    await expect(byName("go_to_section")?.execute({ section: "overview" })).resolves.toBe(
      "Scrolled to overview.",
    );
    expect(pushState).toHaveBeenCalledWith(null, "", "#overview");
    expect(section.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });

    unmount();
  });

  it("waits for a second model context and does not register twice", async () => {
    jest.useFakeTimers();
    const documentRegister = jest.fn();
    const navigatorRegister = jest.fn();
    const documentContext = { registerTool: documentRegister };
    installContexts(undefined, undefined);

    const { unmount } = render(
      <ThemeProvider>
        <WebMcpCommands />
      </ThemeProvider>,
    );

    await jest.advanceTimersByTimeAsync(500);
    installContexts(documentContext, undefined);
    await jest.advanceTimersByTimeAsync(500);
    expect(documentRegister).toHaveBeenCalledTimes(3);

    await jest.advanceTimersByTimeAsync(500);
    expect(documentRegister).toHaveBeenCalledTimes(3);

    installContexts(documentContext, { registerTool: navigatorRegister });
    await jest.advanceTimersByTimeAsync(500);
    expect(navigatorRegister).toHaveBeenCalledTimes(3);
    expect(documentRegister).toHaveBeenCalledTimes(3);

    await jest.advanceTimersByTimeAsync(1500);
    expect(navigatorRegister).toHaveBeenCalledTimes(3);
    unmount();
  });

  it("survives a duplicate registration and does not poll again", async () => {
    jest.useFakeTimers();
    const registerTool = jest.fn(() => {
      throw new Error("already registered");
    });
    const context = { registerTool };
    installContexts(context, context);

    const { unmount } = render(
      <ThemeProvider>
        <WebMcpCommands />
      </ThemeProvider>,
    );

    expect(registerTool).toHaveBeenCalledTimes(3);
    await jest.advanceTimersByTimeAsync(500);
    expect(registerTool).toHaveBeenCalledTimes(3);
    unmount();
  });

  it("ends the wait immediately when lookup is aborted mid-register", async () => {
    const controllers: AbortController[] = [];
    jest.spyOn(AbortSignal, "timeout").mockImplementation(() => {
      const controller = new AbortController();
      controllers.push(controller);
      return controller.signal;
    });

    const registerTool = jest.fn(() => {
      controllers[0]?.abort();
    });
    installContexts({ registerTool }, undefined);

    const { unmount } = render(
      <ThemeProvider>
        <WebMcpCommands />
      </ThemeProvider>,
    );

    expect(registerTool).toHaveBeenCalled();
    unmount();
  });
});
