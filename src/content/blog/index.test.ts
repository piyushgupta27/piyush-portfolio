import { describe, it } from "vitest";
import assert from "node:assert/strict";
import {
  seedPosts,
  getAllPosts,
  getPostBySlug,
  getAllSlugs,
} from "@/content/blog";

describe("blog content — data layer (gh-68)", () => {
  it("seedPosts exports exactly 6 posts", () => {
    assert.equal(seedPosts.length, 6);
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

  it("getAllPosts returns all posts sorted newest first", () => {
    const posts = getAllPosts();
    assert.equal(posts.length, seedPosts.length);
    for (let i = 0; i < posts.length - 1; i++) {
      assert.ok(
        new Date(posts[i].date).getTime() >=
          new Date(posts[i + 1].date).getTime(),
        `posts not sorted: "${posts[i].slug}" (${posts[i].date}) should be >= "${posts[i + 1].slug}" (${posts[i + 1].date})`,
      );
    }
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
});
