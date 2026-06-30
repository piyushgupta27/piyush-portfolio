"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-sm text-muted-foreground">
        {"// something went wrong"}
      </p>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Unexpected Error
      </h1>
      <p className="max-w-md text-muted-foreground">
        An unexpected error occurred. You can try refreshing the page or come
        back later.
      </p>
      <button
        type="button"
        onClick={reset}
        className="inline-flex min-h-[44px] items-center rounded-md border border-border/50 bg-card/50 px-6 py-2 font-mono text-sm transition-colors hover:bg-card"
      >
        Try again
      </button>
    </div>
  );
}
