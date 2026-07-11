/**
 * Static content tests for about.tsx (AC: gh-2)
 * Runs under vitest (the project's test runner); assertions via node:assert/strict.
 * Strategy: read the source file as text and assert required strings are present.
 */
import { test, describe } from "vitest";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
// Collapse whitespace so assertions match rendered text, not source line-wrapping
// (JSX collapses whitespace when rendered; the formatter may wrap phrases across lines).
const src = readFileSync(join(__dirname, "about.tsx"), "utf8").replace(
  /\s+/g,
  " ",
);

describe("about.tsx — bio content (gh-2)", () => {
  describe("stats panel", () => {
    test('shows "50M" peak concurrent users', () => {
      assert.ok(src.includes('"50M"'), 'Expected stats to contain value "50M"');
      assert.ok(
        src.includes("Peak concurrent users"),
        'Expected stats label "Peak concurrent users"',
      );
    });

    test('shows "1M+" JumpingMinds users', () => {
      assert.ok(src.includes("1M+"), 'Expected stats to contain "1M+"');
      assert.ok(
        src.includes("JumpingMinds users"),
        'Expected stats label "JumpingMinds users"',
      );
    });

    test('shows "250B+" messages during 2019 IPL season', () => {
      assert.ok(
        src.includes('"250B+"'),
        'Expected stats to contain value "250B+"',
      );
      assert.ok(
        src.includes("Messages · 2019 IPL season"),
        'Expected stats label "Messages · 2019 IPL season"',
      );
    });

    test('shows "15+" engineers led currently', () => {
      assert.ok(src.includes('"15+"'), 'Expected stats to contain value "15+"');
      assert.ok(
        src.includes("Engineers led currently"),
        'Expected stats label "Engineers led currently"',
      );
    });
  });

  describe("bio paragraphs", () => {
    test("mentions 12 years engineering experience", () => {
      assert.ok(src.includes("12 years"), 'Expected bio to mention "12 years"');
    });

    test("mentions co-founding JumpingMinds AI in 2021 with 1M+ users", () => {
      assert.ok(
        src.includes("JumpingMinds AI"),
        'Expected bio to mention "JumpingMinds AI"',
      );
      assert.ok(src.includes("2021"), 'Expected bio to mention "2021"');
      assert.ok(
        src.includes("1M+ users"),
        'Expected bio to mention "1M+ users"',
      );
    });

    test("mentions Disney+ Hotstar with 50M concurrent users", () => {
      assert.ok(
        src.includes("Disney+ Hotstar"),
        "Expected bio to mention Disney+ Hotstar",
      );
      assert.ok(
        src.includes("50M"),
        "Expected bio to mention 50M concurrent users",
      );
    });

    test("mentions leading squads at Slice with engineers", () => {
      assert.ok(
        src.includes("squads at Slice"),
        'Expected bio to mention "squads at Slice"',
      );
      assert.ok(
        src.includes("15+ engineers"),
        'Expected bio to mention "15+ engineers"',
      );
    });

    test("mentions building ai-sdlc", () => {
      assert.ok(src.includes("ai-sdlc"), 'Expected bio to mention "ai-sdlc"');
    });

    test("mentions open to Sr EM roles and relocation", () => {
      assert.ok(
        src.includes("Sr EM roles"),
        'Expected bio to mention "Sr EM roles"',
      );
      assert.ok(
        src.includes("relocation"),
        'Expected bio to mention "relocation"',
      );
    });
  });

  describe("image", () => {
    test('image alt is "Piyush Gupta"', () => {
      assert.ok(
        src.includes('alt="Piyush Gupta"'),
        'Expected image alt to be "Piyush Gupta"',
      );
    });
  });

  describe("no placeholder content remains", () => {
    test("does not contain old placeholder name Aaabad Touk", () => {
      assert.ok(
        !src.includes("Aaabad Touk") && !src.includes("aaabad_touk"),
        "Expected no placeholder Aaabad Touk content",
      );
    });

    test("does not contain old placeholder stats (Papers Read)", () => {
      assert.ok(
        !src.includes("Papers Read"),
        "Expected no placeholder stat 'Papers Read'",
      );
    });
  });
});
