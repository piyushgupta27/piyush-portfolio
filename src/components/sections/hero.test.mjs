import { test, describe } from "vitest";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dir = dirname(__filename);
const src = readFileSync(join(__dir, "hero.tsx"), "utf-8");

describe("Hero – acceptance criteria", () => {
  test('Name H1 contains "Piyush Gupta"', () => {
    assert.ok(
      src.includes("Piyush") && src.includes("Gupta"),
      "H1 must contain both 'Piyush' and 'Gupta'",
    );
  });

  test("Tagline reads approved hero positioning", () => {
    assert.ok(
      src.includes("50M+ concurrent users"),
      "Tagline must mention 50M+ concurrent users",
    );
    assert.ok(
      src.includes("Founded an AI"),
      "Tagline must mention founding an AI startup",
    );
    assert.ok(
      src.includes("Still ships"),
      "Tagline must mention still shipping",
    );
  });

  test("Status badge mentions open to Sr EM roles and geographies", () => {
    assert.ok(
      src.includes("Open to Sr EM roles"),
      "Status badge must include open to Sr EM roles",
    );
    assert.ok(src.includes("UK"), "Status badge must reference UK");
  });

  test("Sub-tagline contains JumpingMinds and Hotstar and Slice", () => {
    assert.ok(
      src.includes("JumpingMinds"),
      "Sub-tagline must mention JumpingMinds",
    );
    assert.ok(src.includes("1M+ users"), "Sub-tagline must mention user count");
    assert.ok(src.includes("Hotstar"), "Sub-tagline must mention Hotstar");
    assert.ok(src.includes("Slice"), "Sub-tagline must mention Slice");
  });

  test('Primary CTA reads "See the work"', () => {
    assert.ok(
      src.includes("See the work"),
      'Primary CTA must read "See the work"',
    );
  });

  test('Secondary CTA reads "Get in touch"', () => {
    assert.ok(
      src.includes("Get in touch"),
      'Secondary CTA must read "Get in touch"',
    );
  });

  test("Resume download button is present with correct href", () => {
    assert.ok(
      src.includes("/resume/piyush-resume.pdf"),
      "Resume download button must link to /resume/piyush-resume.pdf",
    );
  });

  test("Resume download button has download attribute", () => {
    const resumeHref = src.indexOf("/resume/piyush-resume.pdf");
    assert.ok(resumeHref !== -1, "Resume href must be present");
    const block = src.slice(Math.max(0, resumeHref - 200), resumeHref + 200);
    assert.ok(
      block.includes("download"),
      "Resume link must have download attribute",
    );
  });

  test("No new imports introduced by BUILDER commit", () => {
    const importLines = src
      .split("\n")
      .filter((l) => l.trim().startsWith("import"));
    // Hero should only use the original set of imports (≤8 lines)
    assert.ok(
      importLines.length <= 8,
      `Unexpected imports added: found ${importLines.length} import statements`,
    );
  });

  test("H1 element uses plain <h1> with CSS animation (not motion.h1)", () => {
    assert.ok(src.includes("<h1"), "Name must be in an h1 element");
    assert.ok(
      !src.includes("motion.h1"),
      "h1 must not use motion.h1 — CSS animation replaces Framer Motion for LCP performance",
    );
  });
});

describe("Hero — LCP image fix (gh-72)", () => {
  test('background fill Image has sizes="100vw" to generate a correct srcset', () => {
    assert.ok(
      src.includes('sizes="100vw"'),
      "fill Image must include sizes='100vw' — omitting sizes causes Next.js to emit an incorrect srcset",
    );
  });
});

describe("Hero — touch target ≥44px (gh-43)", () => {
  test("GitHub icon link has min-h-[44px] and min-w-[44px]", () => {
    const ghIdx = src.indexOf('aria-label="GitHub"');
    assert.ok(ghIdx !== -1, "GitHub aria-label must be present");
    // className comes after aria-label in the JSX prop order
    const block = src.slice(ghIdx, ghIdx + 300);
    assert.ok(
      block.includes("min-h-[44px]"),
      "Hero GitHub link must have min-h-[44px]",
    );
    assert.ok(
      block.includes("min-w-[44px]"),
      "Hero GitHub link must have min-w-[44px]",
    );
  });

  test("LinkedIn icon link has min-h-[44px] and min-w-[44px]", () => {
    const liIdx = src.indexOf('aria-label="LinkedIn"');
    assert.ok(liIdx !== -1, "LinkedIn aria-label must be present");
    // className comes after aria-label in the JSX prop order
    const block = src.slice(liIdx, liIdx + 300);
    assert.ok(
      block.includes("min-h-[44px]"),
      "Hero LinkedIn link must have min-h-[44px]",
    );
    assert.ok(
      block.includes("min-w-[44px]"),
      "Hero LinkedIn link must have min-w-[44px]",
    );
  });

  test("scroll indicator anchor has min-h-[44px]", () => {
    const scrollAnchorIdx = src.indexOf('href="#about"');
    assert.ok(
      scrollAnchorIdx !== -1,
      "Scroll indicator href='#about' must be present",
    );
    const block = src.slice(scrollAnchorIdx, scrollAnchorIdx + 300);
    assert.ok(
      block.includes("min-h-[44px]"),
      "Scroll indicator anchor must have min-h-[44px]",
    );
  });

  test("Resume download button has min-h-[44px] touch target", () => {
    const resumeHref = src.indexOf("/resume/piyush-resume.pdf");
    assert.ok(resumeHref !== -1, "Resume href must be present");
    const block = src.slice(Math.max(0, resumeHref - 300), resumeHref + 200);
    assert.ok(
      block.includes("min-h-[44px]"),
      "Resume button must have min-h-[44px] for touch target",
    );
  });

  test("imports cn utility for composing classNames with touch target overrides", () => {
    assert.ok(
      src.includes("import { cn }") || src.includes("import {cn}"),
      "Hero must import cn to compose buttonVariants with touch target classes",
    );
  });
});
