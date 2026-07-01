import { describe, it } from "vitest";
import assert from "node:assert/strict";
import {
  seedPosts,
  getAllPosts,
  getPostBySlug,
  getAllSlugs,
  calculateReadTime,
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

  it("getPostBySlug returns undefined for hidden ai-leadership-toolkit post (sprint-7: hidden pending content review)", () => {
    const post = getPostBySlug("engineering-leadership-with-ai");
    assert.strictEqual(post, undefined);
  });

  it("getPostBySlug returns undefined for an unknown slug (negative path)", () => {
    const result = getPostBySlug("this-slug-does-not-exist");
    assert.strictEqual(result, undefined);
  });

  it("getPostBySlug returns undefined for hidden managerial-ai-toolkit post (AMJ content under review)", () => {
    const post = getPostBySlug("managerial-ai-toolkit");
    assert.strictEqual(post, undefined);
  });

  it("agentic-sdlc post has ctaText field set (AC4/AC5: ctaText schema)", () => {
    const post = getPostBySlug("agentic-sdlc");
    assert.ok(post !== undefined, "agentic-sdlc post must exist");
    assert.ok(
      typeof post.ctaText === "string" && post.ctaText.length > 0,
      "agentic-sdlc post must have a non-empty ctaText string",
    );
  });
});

describe("calculateReadTime", () => {
  it("returns '1 min read' for exactly 200 words", () => {
    const content = [
      { type: "paragraph" as const, text: "word ".repeat(200).trim() },
    ];
    assert.equal(calculateReadTime(content), "1 min read");
  });

  it("rounds up: 201 words = 2 min read", () => {
    const content = [
      { type: "paragraph" as const, text: "word ".repeat(201).trim() },
    ];
    assert.equal(calculateReadTime(content), "2 min read");
  });

  it("counts words across multiple paragraph blocks", () => {
    const content = [
      { type: "paragraph" as const, text: "word ".repeat(100).trim() },
      { type: "paragraph" as const, text: "word ".repeat(100).trim() },
    ];
    assert.equal(calculateReadTime(content), "1 min read");
  });

  it("ignores non-text blocks (heading type has text, image does not)", () => {
    const content = [
      { type: "heading" as const, text: "word ".repeat(200).trim() },
      { type: "image" as const, src: "/img.png", alt: "img" },
    ];
    assert.equal(calculateReadTime(content), "1 min read");
  });

  it("returns '0 min read' for empty content", () => {
    assert.equal(calculateReadTime([]), "0 min read");
  });
});
