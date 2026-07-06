import { describe, it, expect, beforeAll } from "vitest";
import nextConfig from "./next.config";

describe("next.config security headers", () => {
  it("exports a headers() async function", () => {
    expect(typeof nextConfig.headers).toBe("function");
  });

  describe("headers() return value", () => {
    let headerConfigs: Awaited<
      ReturnType<NonNullable<typeof nextConfig.headers>>
    >;

    beforeAll(async () => {
      headerConfigs = await nextConfig.headers!();
    });

    it("returns an array with exactly one entry", () => {
      expect(Array.isArray(headerConfigs)).toBe(true);
      expect(headerConfigs).toHaveLength(1);
    });

    it("applies to all routes via source /:path*", () => {
      expect(headerConfigs[0].source).toBe("/:path*");
    });

    describe("individual security headers", () => {
      let headers: Array<{ key: string; value: string }>;

      beforeAll(() => {
        headers = headerConfigs[0].headers as Array<{
          key: string;
          value: string;
        }>;
      });

      function getHeader(key: string) {
        return headers.find((h) => h.key === key);
      }

      it("sets Strict-Transport-Security for HSTS preload", () => {
        const h = getHeader("Strict-Transport-Security");
        expect(h).toBeDefined();
        expect(h!.value).toBe("max-age=63072000; includeSubDomains; preload");
      });

      it("sets X-Frame-Options to DENY", () => {
        const h = getHeader("X-Frame-Options");
        expect(h).toBeDefined();
        expect(h!.value).toBe("DENY");
      });

      it("sets X-Content-Type-Options to nosniff", () => {
        const h = getHeader("X-Content-Type-Options");
        expect(h).toBeDefined();
        expect(h!.value).toBe("nosniff");
      });

      it("sets Referrer-Policy to strict-origin-when-cross-origin", () => {
        const h = getHeader("Referrer-Policy");
        expect(h).toBeDefined();
        expect(h!.value).toBe("strict-origin-when-cross-origin");
      });

      it("sets Permissions-Policy disabling camera, microphone, and geolocation", () => {
        const h = getHeader("Permissions-Policy");
        expect(h).toBeDefined();
        expect(h!.value).toBe("camera=(), microphone=(), geolocation=()");
      });

      it("does not set Content-Security-Policy (moved to middleware for per-request nonces)", () => {
        expect(getHeader("Content-Security-Policy")).toBeUndefined();
      });
    });
  });

  describe("poweredByHeader", () => {
    it("disables X-Powered-By header", () => {
      expect(nextConfig.poweredByHeader).toBe(false);
    });
  });
});
