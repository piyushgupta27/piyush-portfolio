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
    test('shows "10M+" Slice users/day', () => {
      assert.ok(src.includes("10M+"), 'Expected stats to contain "10M+"');
      assert.ok(
        src.includes("Slice users / day"),
        'Expected stats label "Slice users / day"',
      );
    });

    test('shows "1M+" jM community', () => {
      assert.ok(src.includes("1M+"), 'Expected stats to contain "1M+"');
      assert.ok(
        src.includes("jM community"),
        'Expected stats label "jM community"',
      );
    });

    test('shows "12" yrs eng leadership', () => {
      assert.ok(src.includes('"12"'), 'Expected stats to contain value "12"');
      assert.ok(
        src.includes("Yrs eng leadership"),
        'Expected stats label "Yrs eng leadership"',
      );
    });

    test('shows "5" active projects', () => {
      assert.ok(src.includes('"5"'), 'Expected stats to contain value "5"');
      assert.ok(
        src.includes("Active projects"),
        'Expected stats label "Active projects"',
      );
    });
  });

  describe("bio paragraphs", () => {
    test("mentions IIT Roorkee and 12 years building at scale", () => {
      assert.ok(
        src.includes("IIT Roorkee"),
        'Expected bio to mention "IIT Roorkee"',
      );
      assert.ok(src.includes("12 years"), 'Expected bio to mention "12 years"');
    });

    test("mentions co-founding jumpingMinds in 2021 with 1M+ users", () => {
      assert.ok(
        src.includes("jumpingMinds in 2021"),
        'Expected bio to mention "jumpingMinds in 2021"',
      );
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

    test("mentions leading platform engineering at Slice with 10M+ users daily", () => {
      assert.ok(
        src.includes("platform engineering at Slice"),
        'Expected bio to mention "platform engineering at Slice"',
      );
      assert.ok(
        src.includes("10M+ users daily"),
        'Expected bio to mention "10M+ users daily"',
      );
    });

    test("mentions ai-sdlc as autonomous multi-agent SDLC pipeline", () => {
      assert.ok(src.includes("ai-sdlc"), 'Expected bio to mention "ai-sdlc"');
      assert.ok(
        src.includes("autonomous multi-agent SDLC"),
        'Expected bio to mention "autonomous multi-agent SDLC"',
      );
    });

    test("mentions HITL gates calibrated to blast radius", () => {
      assert.ok(
        src.includes("HITL gates calibrated to blast radius"),
        'Expected bio to mention "HITL gates calibrated to blast radius"',
      );
    });

    test("mentions looking for Sr EM roles at Series A-D AI companies", () => {
      assert.ok(
        src.includes("Sr EM roles"),
        'Expected bio to mention "Sr EM roles"',
      );
      assert.ok(src.includes("Series A"), 'Expected bio to mention "Series A"');
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
