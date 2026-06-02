import { describe, it, expect, beforeAll } from "vitest";
import nextConfig from "./next.config";

describe("next.config security headers", () => {
  it("exports a headers() async function", () => {
    expect(typeof nextConfig.headers).toBe("function");
  });

  describe("headers() return value", () => {
    let headerConfigs: Awaited<ReturnType<NonNullable<typeof nextConfig.headers>>>;

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
        headers = headerConfigs[0].headers as Array<{ key: string; value: string }>;
      });

      function getHeader(key: string) {
        return headers.find((h) => h.key === key);
      }

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

      describe("Content-Security-Policy", () => {
        let cspValue: string;

        beforeAll(() => {
          const h = getHeader("Content-Security-Policy");
          expect(h).toBeDefined();
          cspValue = h!.value;
        });

        it("has default-src 'self'", () => {
          expect(cspValue).toContain("default-src 'self'");
        });

        it("has img-src allowing self, Unsplash, and data URIs", () => {
          expect(cspValue).toContain(
            "img-src 'self' https://images.unsplash.com data:"
          );
        });

        it("has script-src with self, unsafe-inline, and unsafe-eval for Next.js + framer-motion", () => {
          expect(cspValue).toContain(
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
          );
        });

        it("has style-src with self and unsafe-inline for Tailwind", () => {
          expect(cspValue).toContain("style-src 'self' 'unsafe-inline'");
        });

        it("has font-src allowing self, fonts.gstatic.com, and data URIs for Geist", () => {
          expect(cspValue).toContain(
            "font-src 'self' https://fonts.gstatic.com data:"
          );
        });

        it("has connect-src 'self'", () => {
          expect(cspValue).toContain("connect-src 'self'");
        });

        it("has frame-ancestors 'none'", () => {
          expect(cspValue).toContain("frame-ancestors 'none'");
        });
      });
    });
  });

  describe("images config", () => {
    it("preserves remotePatterns for Unsplash", () => {
      expect(nextConfig.images).toBeDefined();
      expect(nextConfig.images!.remotePatterns).toBeDefined();
      const patterns = nextConfig.images!.remotePatterns!;
      const unsplash = patterns.find(
        (p) => typeof p === "object" && "hostname" in p && p.hostname === "images.unsplash.com"
      );
      expect(unsplash).toBeDefined();
      expect((unsplash as { protocol: string; hostname: string }).protocol).toBe("https");
    });
  });
});
