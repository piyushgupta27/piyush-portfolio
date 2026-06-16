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

  test('Tagline reads "Building autonomous AI tooling I\'d use myself"', () => {
    // JSX source encodes the apostrophe as &apos;
    assert.ok(
      src.includes("Building autonomous AI tooling I") &&
        src.includes("d use myself"),
      "Tagline text must be present in component source",
    );
  });

  test('Status badge reads "Available for Sr EM roles at Series A–D AI companies"', () => {
    assert.ok(
      src.includes("Available for Sr EM roles at Series A"),
      "Status badge must include the correct text",
    );
    assert.ok(
      src.includes("D AI companies"),
      "Status badge must reference AI companies",
    );
  });

  test("Sub-tagline contains Sr Engineering Manager and jumpingMinds and Slice", () => {
    assert.ok(
      src.includes("Sr Engineering Manager"),
      "Sub-tagline must mention title",
    );
    assert.ok(
      src.includes("jumpingMinds"),
      "Sub-tagline must mention jumpingMinds",
    );
    assert.ok(
      src.includes("3M+ users"),
      "Sub-tagline must mention jumpingMinds user count",
    );
    assert.ok(src.includes("Slice"), "Sub-tagline must mention Slice");
    assert.ok(
      src.includes("10M+ users daily"),
      "Sub-tagline must mention Slice daily users",
    );
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

  test("H1 element wraps name in <motion.h1> tag", () => {
    assert.ok(
      src.includes("motion.h1"),
      "Name must be in a motion.h1 heading element",
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

  test("imports cn utility for composing classNames with touch target overrides", () => {
    assert.ok(
      src.includes("import { cn }") || src.includes("import {cn}"),
      "Hero must import cn to compose buttonVariants with touch target classes",
    );
  });
});
