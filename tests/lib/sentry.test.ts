import { getSentryInitOptions } from "@/lib/sentry";

describe("getSentryInitOptions", () => {
  const original = process.env.NEXT_PUBLIC_SENTRY_DSN;

  afterEach(() => {
    if (original === undefined) {
      delete process.env.NEXT_PUBLIC_SENTRY_DSN;
      return;
    }

    process.env.NEXT_PUBLIC_SENTRY_DSN = original;
  });

  it("stays off until a DSN is set", () => {
    delete process.env.NEXT_PUBLIC_SENTRY_DSN;

    expect(getSentryInitOptions()).toEqual({
      dsn: undefined,
      enabled: false,
      sendDefaultPii: false,
    });
  });

  it("ignores a blank DSN", () => {
    process.env.NEXT_PUBLIC_SENTRY_DSN = "   ";

    expect(getSentryInitOptions().enabled).toBe(false);
  });

  it("enables reporting for a real DSN", () => {
    process.env.NEXT_PUBLIC_SENTRY_DSN = " https://key@example.ingest.sentry.io/1 ";

    expect(getSentryInitOptions()).toEqual({
      dsn: "https://key@example.ingest.sentry.io/1",
      enabled: true,
      sendDefaultPii: false,
    });
  });
});
