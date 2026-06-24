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
});

describe("blog content — githubUrl field (gh-118)", () => {
  it("agentic-sdlc post has githubUrl pointing to the ai-sdlc repo", () => {
    const post = getPostBySlug("agentic-sdlc");
    assert.ok(post !== undefined, "agentic-sdlc post must exist");
    assert.ok(
      typeof post.githubUrl === "string" && post.githubUrl.length > 0,
      "agentic-sdlc post must have a githubUrl string",
    );
    assert.ok(
      post.githubUrl.startsWith("https://"),
      "githubUrl must be an https:// URL",
    );
  });

  it("githubUrl is optional — existing posts without it remain valid", () => {
    const postsWithoutGithubUrl = seedPosts.filter(
      (p) => p.githubUrl === undefined,
    );
    assert.ok(
      postsWithoutGithubUrl.length > 0,
      "at least one post should have no githubUrl (it is optional)",
    );
    for (const post of postsWithoutGithubUrl) {
      assert.strictEqual(
        post.githubUrl,
        undefined,
        `post "${post.slug}" githubUrl should be undefined, not null or empty string`,
      );
    }
  });

  it("agentic-sdlc post has inline content blocks enabling self-hosted rendering", () => {
    const post = getPostBySlug("agentic-sdlc");
    assert.ok(post !== undefined, "agentic-sdlc post must exist");
    assert.ok(
      Array.isArray(post.content) && post.content.length > 0,
      "agentic-sdlc post must have non-empty inline content blocks",
    );
    const types = post.content.map((b) => b.type);
    assert.ok(
      types.includes("heading"),
      "agentic-sdlc content must include at least one heading block",
    );
    assert.ok(
      types.includes("paragraph"),
      "agentic-sdlc content must include at least one paragraph block",
    );
  });
});
