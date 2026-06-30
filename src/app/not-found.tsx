import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-sm text-muted-foreground">{"// 404"}</p>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Page Not Found
      </h1>
      <p className="max-w-md text-muted-foreground">
        This page doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="inline-flex min-h-[44px] items-center rounded-md border border-border/50 bg-card/50 px-6 py-2 font-mono text-sm transition-colors hover:bg-card"
      >
        Back home
      </Link>
    </div>
  );
}
