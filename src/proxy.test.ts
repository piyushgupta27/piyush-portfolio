import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { proxy, config } from "./proxy";

describe("proxy CSP headers", () => {
  it("sets Content-Security-Policy response header", () => {
    const req = new NextRequest("http://localhost/");
    const res = proxy(req);
    expect(res.headers.get("Content-Security-Policy")).toBeTruthy();
  });

  it("script-src contains a nonce", () => {
    const req = new NextRequest("http://localhost/");
    const res = proxy(req);
    const csp = res.headers.get("Content-Security-Policy")!;
    expect(csp).toMatch(/script-src[^;]*'nonce-[A-Za-z0-9+/]+=*'/);
  });

  it("script-src excludes 'unsafe-inline' (AC #1)", () => {
    const req = new NextRequest("http://localhost/");
    const res = proxy(req);
    const csp = res.headers.get("Content-Security-Policy")!;
    const scriptSrc = csp
      .split(";")
      .find((d) => d.trim().startsWith("script-src"));
    expect(scriptSrc).not.toContain("'unsafe-inline'");
  });

  it("script-src excludes 'unsafe-eval' in non-development (AC #2)", () => {
    // NODE_ENV is 'test' in vitest — not 'development', so unsafe-eval must be absent
    const req = new NextRequest("http://localhost/");
    const res = proxy(req);
    const csp = res.headers.get("Content-Security-Policy")!;
    const scriptSrc = csp
      .split(";")
      .find((d) => d.trim().startsWith("script-src"));
    expect(scriptSrc).not.toContain("'unsafe-eval'");
  });

  it("script-src allows va.vercel-scripts.com for Analytics and Speed Insights", () => {
    const req = new NextRequest("http://localhost/");
    const res = proxy(req);
    const csp = res.headers.get("Content-Security-Policy")!;
    const scriptSrc = csp
      .split(";")
      .find((d) => d.trim().startsWith("script-src"));
    expect(scriptSrc).toContain("https://va.vercel-scripts.com");
  });

  it("includes base-uri 'none' to block <base> injection", () => {
    const req = new NextRequest("http://localhost/");
    const res = proxy(req);
    const csp = res.headers.get("Content-Security-Policy")!;
    expect(csp).toContain("base-uri 'none'");
  });

  it("each call generates a unique nonce", () => {
    const req1 = new NextRequest("http://localhost/");
    const req2 = new NextRequest("http://localhost/");
    const csp1 = proxy(req1).headers.get("Content-Security-Policy")!;
    const csp2 = proxy(req2).headers.get("Content-Security-Policy")!;
    const nonce1 = csp1.match(/'nonce-([A-Za-z0-9+/]+=*)'/)?.[1];
    const nonce2 = csp2.match(/'nonce-([A-Za-z0-9+/]+=*)'/)?.[1];
    expect(nonce1).toBeDefined();
    expect(nonce2).toBeDefined();
    expect(nonce1).not.toBe(nonce2);
  });
});

describe("proxy config", () => {
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
