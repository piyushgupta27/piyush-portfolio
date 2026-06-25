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

describe("blog post page — gh-141 changes", () => {
  let src: string;
  src = readFileSync(resolve(dir, "page.tsx"), "utf-8");

  it("renders author headshot image (AC1: author byline)", () => {
    assert.ok(
      src.includes("/images/headshot.jpg"),
      "blog post page must render author headshot img",
    );
  });

  it("renders author name in byline (AC1)", () => {
    assert.ok(
      src.includes("Piyush Gupta"),
      "blog post page must render author name in byline",
    );
  });

  it("CTA always includes Calendly link regardless of post fields (AC3)", () => {
    assert.ok(
      src.includes("calendly.com"),
      "CTA must include Calendly link for all hasContent posts",
    );
    assert.ok(
      !src.includes("(post.mediumUrl || post.githubUrl)"),
      "CTA must not be gated behind mediumUrl/githubUrl condition",
    );
  });

  it("renders post.ctaText when present (AC3/AC5)", () => {
    assert.ok(
      src.includes("post.ctaText"),
      "blog post page must conditionally render post.ctaText",
    );
  });
});
