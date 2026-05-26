/**
 * Static content tests for about.tsx (AC: gh-2)
 * Uses Node 22 built-in test runner — no new dependencies required.
 * Strategy: read the source file as text and assert required strings are present.
 */
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(__dirname, "about.tsx"), "utf8");

describe("about.tsx — bio content (gh-2)", () => {
  describe("stats panel", () => {
    test('shows "10M+" Slice users/day', () => {
      assert.ok(
        src.includes("10M+"),
        'Expected stats to contain "10M+"'
      );
      assert.ok(
        src.includes("Slice users / day"),
        'Expected stats label "Slice users / day"'
      );
    });

    test('shows "3M+" jM community', () => {
      assert.ok(src.includes("3M+"), 'Expected stats to contain "3M+"');
      assert.ok(
        src.includes("jM community"),
        'Expected stats label "jM community"'
      );
    });

    test('shows "8" yrs eng leadership', () => {
      assert.ok(
        src.includes('"8"'),
        'Expected stats to contain value "8"'
      );
      assert.ok(
        src.includes("Yrs eng leadership"),
        'Expected stats label "Yrs eng leadership"'
      );
    });

    test('shows "5" active projects', () => {
      assert.ok(
        src.includes('"5"'),
        'Expected stats to contain value "5"'
      );
      assert.ok(
        src.includes("Active projects"),
        'Expected stats label "Active projects"'
      );
    });
  });

  describe("bio paragraphs", () => {
    test("mentions senior engineering manager with deep IC chops", () => {
      assert.ok(
        src.includes("Senior engineering manager with deep IC chops"),
        'Expected bio to mention "Senior engineering manager with deep IC chops"'
      );
    });

    test("mentions co-founding jumpingMinds in 2018", () => {
      assert.ok(
        src.includes("jumpingMinds in 2018"),
        'Expected bio to mention "jumpingMinds in 2018"'
      );
    });

    test("mentions India largest mental-health community with 3M users by 2024", () => {
      assert.ok(
        src.includes("mental-health community"),
        'Expected bio to mention mental-health community'
      );
      assert.ok(
        src.includes("3M users by 2024"),
        'Expected bio to mention "3M users by 2024"'
      );
    });

    test("mentions leading platform engineering at Slice with 10M+ users daily", () => {
      assert.ok(
        src.includes("platform engineering at Slice"),
        'Expected bio to mention "platform engineering at Slice"'
      );
      assert.ok(
        src.includes("10M+ users daily"),
        'Expected bio to mention "10M+ users daily"'
      );
    });

    test("mentions ai-sdlc as autonomous multi-agent SDLC pipeline", () => {
      assert.ok(src.includes("ai-sdlc"), 'Expected bio to mention "ai-sdlc"');
      assert.ok(
        src.includes("autonomous multi-agent SDLC"),
        'Expected bio to mention "autonomous multi-agent SDLC"'
      );
    });

    test("mentions HITL gates calibrated to blast radius", () => {
      assert.ok(
        src.includes("HITL gates calibrated to blast radius"),
        'Expected bio to mention "HITL gates calibrated to blast radius"'
      );
    });

    test("mentions looking for Sr EM roles at Series A-D AI companies", () => {
      assert.ok(
        src.includes("Sr EM roles"),
        'Expected bio to mention "Sr EM roles"'
      );
      assert.ok(
        src.includes("Series A"),
        'Expected bio to mention "Series A"'
      );
    });
  });

  describe("image", () => {
    test('image alt is "Piyush Gupta"', () => {
      assert.ok(
        src.includes('alt="Piyush Gupta"'),
        'Expected image alt to be "Piyush Gupta"'
      );
    });
  });

  describe("no placeholder content remains", () => {
    test("does not contain old placeholder name Aaabad Touk", () => {
      assert.ok(
        !src.includes("Aaabad Touk") && !src.includes("aaabad_touk"),
        "Expected no placeholder Aaabad Touk content"
      );
    });

    test("does not contain old placeholder stats (Papers Read)", () => {
      assert.ok(
        !src.includes("Papers Read"),
        "Expected no placeholder stat 'Papers Read'"
      );
    });
  });
});
