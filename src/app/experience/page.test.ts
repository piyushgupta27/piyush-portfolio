import { describe, it } from "vitest";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const dir = resolve(import.meta.dirname);
const src = readFileSync(resolve(dir, "page.tsx"), "utf-8");

describe("experience page — /experience (gh-164)", () => {
  it("page file exists", () => {
    assert.ok(src.length > 0, "src/app/experience/page.tsx must exist");
  });

  it("exports static metadata with openGraph fields", () => {
    assert.ok(
      src.includes("export const metadata"),
      "must export static metadata",
    );
    assert.ok(src.includes("openGraph"), "metadata must set openGraph");
  });

  it("has back navigation to /#experience", () => {
    assert.ok(src.includes("/#experience"), "must link back to /#experience");
  });

  it("renders full entry sections", () => {
    assert.ok(src.includes("Key outcomes"), "must render Key outcomes heading");
    assert.ok(src.includes("The call"), "must render The call heading");
    assert.ok(src.includes("Tech"), "must render Tech & skills heading");
  });

  it("links to Calendly for Book a call CTA", () => {
    assert.ok(
      src.includes("calendly.com/piyushguptaece"),
      "CTA must link to Calendly",
    );
  });

  it("renders earlier career section for minimal entries", () => {
    assert.ok(
      src.includes("Earlier career"),
      "must render Earlier career section",
    );
  });

  it("renders scope and mode per entry", () => {
    assert.ok(src.includes("entry.scope"), "must render scope");
    assert.ok(src.includes("entry.mode"), "must render mode");
  });
});
