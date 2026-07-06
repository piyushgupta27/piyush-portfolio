"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center text-foreground">
        <p className="font-mono text-sm text-muted-foreground">
          {"// something went wrong"}
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Application Error
        </h1>
        <p className="max-w-md text-muted-foreground">
          A critical error occurred. You can try again or come back later.
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-[44px] items-center rounded-md border border-border/50 bg-card/50 px-6 py-2 font-mono text-sm transition-colors hover:bg-card"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
