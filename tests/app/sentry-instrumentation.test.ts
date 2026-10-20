const init = jest.fn();

jest.mock("@sentry/nextjs", () => ({
  init: (...args: unknown[]) => init(...args),
  captureRequestError: jest.fn(),
  captureRouterTransitionStart: jest.fn(),
}));

describe("Sentry instrumentation", () => {
  const originalRuntime = process.env.NEXT_RUNTIME;
  const originalDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

  beforeEach(() => {
    init.mockClear();
    process.env.NEXT_PUBLIC_SENTRY_DSN = "https://key@example.ingest.sentry.io/1";
  });

  afterEach(() => {
    if (originalRuntime === undefined) {
      delete process.env.NEXT_RUNTIME;
    } else {
      process.env.NEXT_RUNTIME = originalRuntime;
    }

    if (originalDsn === undefined) {
      delete process.env.NEXT_PUBLIC_SENTRY_DSN;
    } else {
      process.env.NEXT_PUBLIC_SENTRY_DSN = originalDsn;
    }
  });

  async function loadRegister(runtime?: string) {
    if (runtime === undefined) {
      delete process.env.NEXT_RUNTIME;
    } else {
      process.env.NEXT_RUNTIME = runtime;
    }

    let register: () => Promise<void> = async () => undefined;
    let onRequestError: unknown;

    await jest.isolateModulesAsync(async () => {
      const instrumentation = await import("@/instrumentation");
      register = instrumentation.register;
      onRequestError = instrumentation.onRequestError;
    });

    await register();
    return onRequestError;
  }

  it("loads the node server config", async () => {
    const onRequestError = await loadRegister("nodejs");

    expect(init).toHaveBeenCalledWith(
      expect.objectContaining({
        dsn: "https://key@example.ingest.sentry.io/1",
        enabled: true,
      }),
    );
    expect(onRequestError).toEqual(expect.any(Function));
  });

  it("loads the edge config", async () => {
    await loadRegister("edge");

    expect(init).toHaveBeenCalled();
  });

  it("skips runtime configs for other runtimes", async () => {
    await loadRegister();

    expect(init).not.toHaveBeenCalled();
  });

  it("initializes the browser SDK", async () => {
    await jest.isolateModulesAsync(async () => {
      const client = await import("@/instrumentation-client");
      expect(client.onRouterTransitionStart).toEqual(expect.any(Function));
    });

    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
    expect(init).toHaveBeenCalled();
  });
});
