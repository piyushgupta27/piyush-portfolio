import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Pages to audit
const PAGES = ["/", "/experience", "/blog"] as const;

// ── Axe: zero critical/serious violations ───────────────────────────────────

for (const path of PAGES) {
  test(`zero critical/serious a11y violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const violations = results.violations.filter((v) =>
      ["critical", "serious"].includes(v.impact ?? ""),
    );

    const summary = violations
      .map((v) => `[${v.impact}] ${v.id}: ${v.description}`)
      .join("\n");

    expect(violations, `${path} has violations:\n${summary}`).toHaveLength(0);
  });
}

// ── Heading hierarchy: single h1, no skipped levels ─────────────────────────

for (const path of PAGES) {
  test(`single h1, no skipped heading levels on ${path}`, async ({ page }) => {
    await page.goto(path);

    const h1Count = await page.locator("h1").count();
    expect(h1Count, "page must have exactly one h1").toBe(1);

    const levels: number[] = await page.evaluate(() =>
      Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6")).map((el) =>
        parseInt(el.tagName[1]),
      ),
    );

    for (let i = 1; i < levels.length; i++) {
      const jump = levels[i] - levels[i - 1];
      expect(
        jump,
        `heading jumps from h${levels[i - 1]} to h${levels[i]} — skipped level`,
      ).toBeLessThanOrEqual(1);
    }
  });
}

// ── Images: all img elements carry an alt attribute ──────────────────────────

test("all images have alt attribute on home page", async ({ page }) => {
  await page.goto("/");
  const images = page.locator("img");
  const count = await images.count();

  for (let i = 0; i < count; i++) {
    const img = images.nth(i);
    const alt = await img.getAttribute("alt");
    const src = await img.getAttribute("src");
    expect(
      alt,
      `img[src="${src}"] is missing the alt attribute`,
    ).not.toBeNull();
  }
});

// ── Keyboard: Tab reaches every desktop nav link with a visible focus ring ───
//
// Scope: Chromium desktop only.
//   - WebKit (Safari) by default skips links with Tab, reaching only form controls.
//   - Mobile projects (Pixel 5 / iPhone 13) have no physical Tab key.
// Focus ring comes from globals.css :focus-visible { outline: 2px solid var(--primary) }.

test("keyboard Tab reaches desktop nav links with visible focus ring on home page", async ({
  page,
  browserName,
}) => {
  const viewport = page.viewportSize();
  test.skip(
    browserName !== "chromium" || !viewport || viewport.width < 768,
    "Desktop Chromium only: Safari skips links with Tab; mobile viewport hides desktop nav",
  );

  await page.goto("/");

  // Expected desktop nav link hrefs (logo + 6 section links)
  const expectedHrefs = [
    "/",
    "/#about",
    "/#experience",
    "/#press",
    "/#projects",
    "/blog",
    "/#contact",
  ];

  const visitedHrefs = new Set<string>();

  // Tab through enough stops to cover the entire header nav
  for (let i = 0; i < expectedHrefs.length + 3; i++) {
    await page.keyboard.press("Tab");

    const focused = page.locator(":focus");
    const tagName = await focused
      .evaluate((el) => el.tagName.toLowerCase())
      .catch(() => "");
    const href = await focused.getAttribute("href").catch(() => null);

    if (tagName === "a" && href && expectedHrefs.includes(href)) {
      visitedHrefs.add(href);

      // Verify the focused element has a non-transparent outline (visible focus ring)
      const outlineWidth = await focused.evaluate(
        (el) => window.getComputedStyle(el).outlineWidth,
      );
      expect(
        outlineWidth,
        `nav link "${href}" must have a visible outline when focused`,
      ).not.toBe("0px");
    }
  }

  for (const href of expectedHrefs) {
    expect(
      visitedHrefs.has(href),
      `nav link "${href}" was not reachable via Tab`,
    ).toBe(true);
  }
});
