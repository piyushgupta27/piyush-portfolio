import { test, expect } from "@playwright/test";

// Visual regression baselines are captured on linux/amd64 via the Playwright
// Docker image so they match GitHub Actions ubuntu runners (#38).
//
// To regenerate baselines:
//   pnpm build && pnpm start &           # start the prod server on host
//   docker run --rm --ipc=host \
//     --platform linux/amd64 \
//     -v "$(pwd):/work" -w /work \
//     -e BASE_URL=http://host.docker.internal:3000 \
//     mcr.microsoft.com/playwright:v1.61.1-jammy \
//     bash -c "npm i -g pnpm@11.3.0 && pnpm i --frozen-lockfile --store-dir /tmp/pnpm-store && \
//              pnpm exec playwright test e2e/visual.spec.ts \
//              --project=chromium --update-snapshots"
//   kill %1                              # stop background server
//   git add e2e/visual.spec.ts-snapshots && git commit -m "chore: update visual baselines"

const PAGES = ["/", "/experience", "/blog"] as const;

// Home page uses viewport capture (fullPage: false) rather than fullPage: true.
// Reason: toHaveScreenshot's stability check extends the virtual viewport to
// measure scroll height. At ~9500px tall, this triggers useInView
// IntersectionObservers on below-hero sections mid-capture; the JS-driven
// style changes (opacity:0 → animation) cause an ~82px height delta between
// Playwright's two consecutive stability shots. The hero is min-h-screen, so
// the 900px viewport capture covers it completely. Coverage gap: "hero section"
// locator test + overflow assertions at all breakpoints fill the rest.
const FULL_PAGE_PATHS = new Set(["/experience", "/blog"]);

// ── Visual regression snapshots ──────────────────────────────────────────────

test.describe("visual regression", () => {
  // Set US locale via HTTP header (x-vercel-ip-country is Vercel-edge-only;
  // header is read in prod mode and produces the deterministic USD fallback).
  test.use({ extraHTTPHeaders: { "x-vercel-ip-country": "US" } });

  test.beforeEach(async ({}, testInfo) => {
    // Chromium only: webkit binary frozen on macOS 14 arm64 (Bus error: 10).
    // Webkit CI coverage handled in #38.
    test.skip(
      testInfo.project.name !== "chromium",
      "visual tests: chromium only; webkit CI coverage in #38",
    );
    // Baselines are linux/amd64 — local macOS runs find no matching file.
    // Either run Docker command above or let CI (#38) run the comparison.
    test.skip(
      !process.env.CI && process.platform !== "linux",
      "visual baselines are linux/amd64 — use Docker or CI; see spec header",
    );
  });

  test.describe("desktop 1440", () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
    });

    for (const path of PAGES) {
      test(`full page — ${path}`, async ({ page }) => {
        await page.goto(path, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
        const isFullPage = FULL_PAGE_PATHS.has(path);
        if (isFullPage) {
          // Scroll to bottom to trigger all IntersectionObserver-based animations
          // (StaggerChildren + FadeIn) before handing off to toHaveScreenshot.
          await page.evaluate(() =>
            window.scrollTo(0, document.body.scrollHeight),
          );
          await page.evaluate(
            () =>
              new Promise<void>((resolve) =>
                requestAnimationFrame(() =>
                  requestAnimationFrame(() => resolve()),
                ),
              ),
          );
          await page.evaluate(() => window.scrollTo(0, 0));
        }
        await expect(page).toHaveScreenshot({
          fullPage: isFullPage,
          maxDiffPixelRatio: 0.02,
          mask: [page.locator("footer")], // copyright year is dynamic
        });
      });
    }

    test("hero section — /", async ({ page }) => {
      await page.goto("/", { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("section").first()).toHaveScreenshot({
        maxDiffPixelRatio: 0.02,
      });
    });
  });

  test.describe("mobile 375", () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
    });

    for (const path of PAGES) {
      test(`full page — ${path}`, async ({ page }) => {
        await page.goto(path, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
        const isFullPage = FULL_PAGE_PATHS.has(path);
        if (isFullPage) {
          await page.evaluate(() =>
            window.scrollTo(0, document.body.scrollHeight),
          );
          await page.evaluate(
            () =>
              new Promise<void>((resolve) =>
                requestAnimationFrame(() =>
                  requestAnimationFrame(() => resolve()),
                ),
              ),
          );
          await page.evaluate(() => window.scrollTo(0, 0));
        }
        await expect(page).toHaveScreenshot({
          fullPage: isFullPage,
          maxDiffPixelRatio: 0.02,
          mask: [page.locator("footer")], // copyright year is dynamic
        });
      });
    }

    test("hero section — /", async ({ page }) => {
      await page.goto("/", { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("section").first()).toHaveScreenshot({
        maxDiffPixelRatio: 0.02,
      });
    });
  });
});

// ── No horizontal overflow ───────────────────────────────────────────────────
// Functional assertion — no snapshots, no platform dependency.

test.describe("no horizontal overflow", () => {
  test.beforeEach(async ({}, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium",
      "overflow tests: chromium only",
    );
  });

  const WIDTHS = [375, 768, 1440] as const;

  for (const width of WIDTHS) {
    for (const path of PAGES) {
      test(`no overflow at ${width}px — ${path}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(path);
        const overflow = await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
        );
        expect(
          overflow,
          `${path} overflows by ${overflow}px at ${width}px`,
        ).toBe(0);
      });
    }
  }
});
