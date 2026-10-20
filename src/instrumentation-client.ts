import { getSentryInitOptions } from "@/lib/sentry";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN?.trim();

if (dsn) {
  void import("@sentry/nextjs").then((Sentry) => {
    Sentry.init(getSentryInitOptions());
  });
}

export const onRouterTransitionStart = dsn
  ? async (...args: unknown[]) => {
      const Sentry = await import("@sentry/nextjs");
      return Sentry.captureRouterTransitionStart(
        ...(args as Parameters<typeof Sentry.captureRouterTransitionStart>),
      );
    }
  : () => undefined;
