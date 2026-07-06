import { describe, it, expect } from "vitest";

// The middleware config is the part testable without a full Next.js runtime.
// CSP correctness is verified in CI via pnpm build + browser console checks.
import { config } from "./proxy";

describe("middleware config", () => {
  it("exports a matcher config", () => {
    expect(Array.isArray(config.matcher)).toBe(true);
    expect(config.matcher).toHaveLength(1);
  });

  it("matcher excludes _next/static, _next/image, and favicon.ico", () => {
    const entry = config.matcher[0] as {
      source: string;
      missing?: Array<{ type: string; key: string; value?: string }>;
    };
    expect(entry.source).toContain("_next/static");
    expect(entry.source).toContain("_next/image");
    expect(entry.source).toContain("favicon.ico");
  });

  it("matcher skips Next.js prefetch requests", () => {
    const entry = config.matcher[0] as {
      source: string;
      missing?: Array<{ type: string; key: string; value?: string }>;
    };
    const prefetchGuard = entry.missing?.find(
      (m) => m.key === "next-router-prefetch",
    );
    expect(prefetchGuard).toBeDefined();
  });
});
