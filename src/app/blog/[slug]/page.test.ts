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

  it("blog post page renders post title and handles mediumUrl or content blocks", () => {
    const src = readFileSync(resolve(dir, "page.tsx"), "utf-8");
    assert.ok(
      src.includes("post.title"),
      "blog post page must render post title",
    );
    assert.ok(
      src.includes("post.mediumUrl") || src.includes("post.content"),
      "blog post page must handle mediumUrl redirect or render content blocks",
    );
  });

  it("blog post page uses getAllSlugs in generateStaticParams (AC: each post renders at /blog/[slug])", () => {
    const src = readFileSync(resolve(dir, "page.tsx"), "utf-8");
    assert.ok(
      src.includes("getAllSlugs"),
      "generateStaticParams must use getAllSlugs() to enumerate all post routes",
    );
  });

  it("blog post page exports generateMetadata with per-post OG tags (AC: OG/meta tags per post)", () => {
    const src = readFileSync(resolve(dir, "page.tsx"), "utf-8");
    assert.ok(
      src.includes("generateMetadata"),
      "blog post page must export generateMetadata for per-post OG/meta tags",
    );
    assert.ok(
      src.includes("openGraph"),
      "generateMetadata must set openGraph fields",
    );
  });
});

describe("blog post page — inline content + CTA rendering (gh-118)", () => {
  it("page renders inline content when content.length > 0 (not only for mediumUrl-less posts)", () => {
    const src = readFileSync(resolve(dir, "page.tsx"), "utf-8");
    assert.ok(
      src.includes("post.content.length > 0"),
      "page must branch on content.length > 0 to render inline content first",
    );
  });

  it("page renders a GitHub CTA link when post has githubUrl (gh-118)", () => {
    const src = readFileSync(resolve(dir, "page.tsx"), "utf-8");
    assert.ok(
      src.includes("post.githubUrl"),
      "page must reference post.githubUrl for conditional CTA rendering",
    );
    assert.ok(
      src.includes("View on GitHub"),
      "page must include 'View on GitHub' link text for the GitHub CTA",
    );
  });

  it("page falls back to mediumUrl redirect card when content is empty (negative path)", () => {
    const src = readFileSync(resolve(dir, "page.tsx"), "utf-8");
    assert.ok(
      src.includes(": post.mediumUrl ?"),
      "page must fall back to mediumUrl redirect card when content array is empty",
    );
  });
});
