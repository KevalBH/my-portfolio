"use client";

import "./globals.css";

import Link from "next/link";
import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

import { Button } from "@/components/ui/button";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased">
        <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 py-16">
          <p className="text-faint font-mono text-[11px] tracking-[0.22em] uppercase">
            Error
          </p>
          <h1 className="text-ink mt-6 font-serif text-5xl leading-[0.95] tracking-tight">
            Something slipped.
          </h1>
          <p className="text-muted mt-5 max-w-md text-base leading-7">
            This page hit an unexpected error. Try again, or return home.
          </p>
          {error.digest ? (
            <p className="text-faint mt-4 font-mono text-xs">Ref {error.digest}</p>
          ) : null}
          <div className="mt-10 flex flex-wrap gap-3">
            <Button type="button" onClick={reset}>
              Try again
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Back home</Link>
            </Button>
          </div>
        </main>
      </body>
    </html>
  );
}
