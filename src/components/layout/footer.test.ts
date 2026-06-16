import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "vitest";
import assert from "node:assert/strict";

const src = readFileSync(resolve(import.meta.dirname, "footer.tsx"), "utf-8");

describe("footer.tsx — touch target ≥44px (gh-43)", () => {
  it("GitHub icon link has min-h-[44px] on its className", () => {
    const anchorIdx = src.indexOf('href="https://github.com/piyushgupta27"');
    assert.ok(anchorIdx !== -1, "GitHub href must be present");
    const block = src.slice(anchorIdx, anchorIdx + 300);
    assert.ok(
      block.includes("min-h-[44px]"),
      "Footer GitHub link className must include min-h-[44px]",
    );
  });

  it("GitHub icon link has min-w-[44px] on its className", () => {
    const anchorIdx = src.indexOf('href="https://github.com/piyushgupta27"');
    const block = src.slice(anchorIdx, anchorIdx + 300);
    assert.ok(
      block.includes("min-w-[44px]"),
      "Footer GitHub link className must include min-w-[44px]",
    );
  });
});
