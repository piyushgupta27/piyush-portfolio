import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "vitest";
import assert from "node:assert/strict";

const src = readFileSync(resolve(import.meta.dirname, "projects.tsx"), "utf-8");

describe("projects.tsx — highlight stat rendering (gh-69)", () => {
  it("conditionally renders project.highlight using short-circuit &&", () => {
    assert.ok(
      src.includes("project.highlight &&"),
      "projects.tsx must conditionally render highlight with project.highlight &&",
    );
  });
});

describe("projects.tsx — touch target ≥44px via padding-extend (gh-43)", () => {
  it("external link uses p-3.5 padding to extend tap area", () => {
    const anchorIdx = src.indexOf("aria-label={`View");
    assert.ok(anchorIdx !== -1, "External link aria-label must be present");
    const block = src.slice(Math.max(0, anchorIdx - 300), anchorIdx + 50);
    assert.ok(
      block.includes("p-3.5"),
      "Project external link must have p-3.5 to reach 44px tap target (14px icon + 28px padding = 42px; combined with -m-3.5 it expands the hit area)",
    );
  });

  it("external link uses -m-3.5 negative margin so padding doesn't push layout", () => {
    const anchorIdx = src.indexOf("aria-label={`View");
    const block = src.slice(Math.max(0, anchorIdx - 300), anchorIdx + 50);
    assert.ok(
      block.includes("-m-3.5"),
      "Project external link must have -m-3.5 to offset p-3.5 without disturbing layout",
    );
  });
});
