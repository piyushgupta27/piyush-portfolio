import { describe, it } from "vitest";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const dir = resolve(import.meta.dirname);

describe("blog route — /blog index page (gh-68)", () => {
  it("blog index page file exists", () => {
    assert.ok(
      existsSync(resolve(dir, "page.tsx")),
      "src/app/blog/page.tsx must exist",
    );
  });

  it("blog index page renders from seedPosts", () => {
    const src = readFileSync(resolve(dir, "page.tsx"), "utf-8");
    assert.ok(
      src.includes("seedPosts"),
      "blog index page must render from seedPosts",
    );
  });

  it("blog index page links each post to its /blog/[slug] route (AC: /blog renders list)", () => {
    const src = readFileSync(resolve(dir, "page.tsx"), "utf-8");
    assert.ok(
      src.includes("/blog/${") || src.includes('"/blog/"'),
      "blog index must link to /blog/[slug] routes via template literal or concatenation",
    );
  });

  it("blog index page exports metadata with Blog in the title", () => {
    const src = readFileSync(resolve(dir, "page.tsx"), "utf-8");
    assert.ok(src.includes("export const metadata"), "must export metadata");
    assert.ok(src.includes("Blog"), "metadata title must mention Blog");
  });
});
