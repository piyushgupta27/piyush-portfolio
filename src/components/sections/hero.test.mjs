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
