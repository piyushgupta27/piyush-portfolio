import { describe, it } from "vitest";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const dir = resolve(import.meta.dirname);

import { readFileSync } from "node:fs";

describe("blog route — /blog/[slug] post page (gh-68)", () => {
  it("blog post page file exists", () => {
    assert.ok(
      existsSync(resolve(dir, "page.tsx")),
      "src/app/blog/[slug]/page.tsx must exist",
    );
  });

  it("blog post page calls notFound() for unknown slugs", () => {
    const src = readFileSync(resolve(dir, "page.tsx"), "utf-8");
    assert.ok(
      src.includes("notFound"),
      "blog post page must call notFound() for unknown slugs",
    );
  });

  it("blog post page exports generateStaticParams", () => {
    const src = readFileSync(resolve(dir, "page.tsx"), "utf-8");
    assert.ok(
      src.includes("generateStaticParams"),
      "blog post page must export generateStaticParams",
    );
  });

  it("blog post page renders post title and content", () => {
    const src = readFileSync(resolve(dir, "page.tsx"), "utf-8");
    assert.ok(
      src.includes("post.title") && src.includes("post.content"),
      "blog post page must render post title and content blocks",
    );
  });
});
