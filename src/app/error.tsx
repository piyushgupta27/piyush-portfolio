"use client";

import { useEffect, useRef } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    console.error(error);
  }, [error]);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-sm text-muted-foreground">
        {"// something went wrong"}
      </p>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="text-3xl font-bold tracking-tight sm:text-4xl"
      >
        Unexpected Error
      </h1>
      <p role="alert" className="max-w-md text-muted-foreground">
        An unexpected error occurred. You can try again or come back later.
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
