interface SentryInitOptions {
  dsn: string | undefined;
  enabled: boolean;
  sendDefaultPii: false;
}

export function getSentryInitOptions(): SentryInitOptions {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN?.trim() || undefined;

  return {
    dsn,
    enabled: Boolean(dsn),
    sendDefaultPii: false,
  };
}
