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

// ── Visual regression snapshots ──────────────────────────────────────────────

// IO mock injected before page load via addInitScript. Passed as a string so
// TypeScript doesn't type-check the class body (addInitScript serialises the
// function via .toString() and runs it in the browser as plain JS).
//
// Why synchronous observe(): useInView calls setState inside the observer
// callback. React 18 batches these updates asynchronously via MessageChannel,
// so they may not be committed before Playwright's networkidle fires. The mock
// makes observe() call the callback immediately — still batched, but the batch
// is guaranteed to commit before the 500ms networkidle window closes. Also
// prevents any real Observer from firing when toHaveScreenshot extends the
// virtual viewport for fullPage capture.
//
// Known side-effect: ExperienceNavStrip and ExperienceArc also use IO to track
// activeSlug. The mock fires all entries' callbacks in order → last-entry-wins
// → baselines show HyperTrack highlighted instead of Slice. This is consistent
// across all runs so the test is stable, but doesn't reflect real initial state.
// Playwright mask appears unable to cover these elements — mask attempt produced
// identical MD5s, likely because sticky elements report incorrect bounding boxes
// in fullPage screenshot coordinate space (root cause unconfirmed).
const IO_MOCK = `
  window.IntersectionObserver = class {
    constructor(cb) { this._cb = cb; }
    observe(target) { this._cb([{ isIntersecting: true, target }], this); }
    unobserve() {}
    disconnect() {}
  };
`;

test.describe("visual regression", () => {
  // Set US locale via HTTP header (x-vercel-ip-country is Vercel-edge-only;
  // header is read in prod mode and produces the deterministic USD fallback).
  test.use({ extraHTTPHeaders: { "x-vercel-ip-country": "US" } });
  // Full-page screenshots of ~9500px pages can exceed the 30s default timeout.
  test.setTimeout(60_000);

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
      await page.addInitScript(IO_MOCK);
    });

    for (const path of PAGES) {
      test(`full page — ${path}`, async ({ page }) => {
        await page.goto(path, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
        await expect(page).toHaveScreenshot({
          fullPage: true,
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
      await page.addInitScript(IO_MOCK);
    });

    for (const path of PAGES) {
      test(`full page — ${path}`, async ({ page }) => {
        await page.goto(path, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
        await expect(page).toHaveScreenshot({
          fullPage: true,
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
