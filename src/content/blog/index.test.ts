import { describe, it } from "vitest";
import assert from "node:assert/strict";
import { seedPosts, getPostBySlug, getAllSlugs } from "@/content/blog";

describe("blog content — data layer (gh-68)", () => {
  it("seedPosts exports exactly 5 posts", () => {
    assert.equal(seedPosts.length, 5);
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
        Array.isArray(post.content) &&
          (post.content.length > 0 || typeof post.mediumUrl === "string"),
        `post "${post.slug}" must have non-empty content array or a mediumUrl`,
      );
    }
  });

  it("getAllSlugs returns a string for every seed post", () => {
    const slugs = getAllSlugs();
    assert.equal(slugs.length, seedPosts.length);
    assert.ok(slugs.every((s) => typeof s === "string" && s.length > 0));
  });

  it("getPostBySlug returns the correct post for a valid slug (happy path)", () => {
    const post = getPostBySlug("realtime-messaging-infrastructure-part-1");
    assert.ok(post !== undefined, "should return a post for a known slug");
    assert.equal(post.slug, "realtime-messaging-infrastructure-part-1");
  });

  it("getPostBySlug returns undefined for an unknown slug (negative path)", () => {
    const result = getPostBySlug("this-slug-does-not-exist");
    assert.strictEqual(result, undefined);
  });

  it("getPostBySlug returns the correct post for ai-leadership-toolkit (gh-120)", () => {
    const post = getPostBySlug("ai-leadership-toolkit");
    assert.ok(post !== undefined, "should find the ai-leadership-toolkit post");
    assert.equal(post.slug, "ai-leadership-toolkit");
  });

  it("ai-leadership-toolkit post is self-hosted — no mediumUrl, non-empty inline content (gh-120)", () => {
    const post = getPostBySlug("ai-leadership-toolkit");
    assert.ok(post !== undefined);
    assert.equal(post.mediumUrl, undefined, "self-hosted post must not have a mediumUrl");
    assert.ok(post.content.length > 0, "self-hosted post must have inline content");
  });

  it("ai-leadership-toolkit content has at least 4 heading blocks covering the four tools (gh-120)", () => {
    const post = getPostBySlug("ai-leadership-toolkit");
    assert.ok(post !== undefined);
    const headings = post.content.filter((b) => b.type === "heading");
    assert.ok(
      headings.length >= 4,
      `expected at least 4 headings for four tools, got ${headings.length}`,
    );
  });
});
