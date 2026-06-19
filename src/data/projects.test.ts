import { describe, it } from "vitest";
import assert from "node:assert/strict";
import { projects } from "./projects.ts";

describe("projects data — gh-69: expanded descriptions + highlight stats", () => {
  it("exports a non-empty array", () => {
    assert.ok(Array.isArray(projects), "projects must be an array");
    assert.ok(projects.length > 0, "projects array must not be empty");
  });

  // AC: At least 3 cards have a highlight stat
  it("at least 3 projects have a non-empty highlight stat", () => {
    const withHighlight = projects.filter(
      (p) => typeof p.highlight === "string" && p.highlight.trim().length > 0,
    );
    assert.ok(
      withHighlight.length >= 3,
      `Expected at least 3 projects with a highlight, got ${withHighlight.length}`,
    );
  });

  // AC: Each card has a 2–3 sentence description (problem → approach → outcome)
  it("every description contains 2–3 sentences", () => {
    for (const p of projects) {
      const sentenceCount = (p.description.match(/\.\s|\.$/g) ?? []).length;
      assert.ok(
        sentenceCount >= 2,
        `Project "${p.title}" description has fewer than 2 sentences (found ${sentenceCount})`,
      );
      assert.ok(
        sentenceCount <= 3,
        `Project "${p.title}" description has more than 3 sentences (found ${sentenceCount})`,
      );
    }
  });
});
