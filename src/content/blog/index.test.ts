import { describe, it } from "vitest";
import assert from "node:assert/strict";
import { seedPosts, getPostBySlug, getAllSlugs } from "@/content/blog";

describe("blog content — data layer (gh-68)", () => {
  it("seedPosts exports exactly 3 seed posts", () => {
    assert.equal(seedPosts.length, 3);
  });

  it("every post has required fields: slug, title, date, tag, excerpt, content", () => {
    const required = [
      "slug",
      "title",
      "date",
      "tag",
      "excerpt",
      "content",
    ] as const;
    for (const post of seedPosts) {
      for (const key of required) {
        assert.ok(
          post[key] !== undefined && post[key] !== "",
          `post "${post.slug}" is missing field "${key}"`,
        );
      }
      assert.ok(
        Array.isArray(post.content) && post.content.length > 0,
        `post "${post.slug}" must have non-empty content array`,
      );
    }
  });

  it("getAllSlugs returns a string for every seed post", () => {
    const slugs = getAllSlugs();
    assert.equal(slugs.length, seedPosts.length);
    assert.ok(slugs.every((s) => typeof s === "string" && s.length > 0));
  });

  it("getPostBySlug returns the correct post for a valid slug (happy path)", () => {
    const post = getPostBySlug("engineering-leadership-at-scale");
    assert.ok(post !== undefined, "should return a post for a known slug");
    assert.equal(post.slug, "engineering-leadership-at-scale");
  });

  it("getPostBySlug returns undefined for an unknown slug (negative path)", () => {
    const result = getPostBySlug("this-slug-does-not-exist");
    assert.strictEqual(result, undefined);
  });
});
