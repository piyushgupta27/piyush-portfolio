import { vi, describe, it, expect, beforeEach } from "vitest";
import React from "react";

const mockImageResponse = vi.hoisted(() => vi.fn());
const mockGetPostBySlug = vi.hoisted(() => vi.fn());

vi.mock("next/og", () => ({
  ImageResponse: mockImageResponse,
}));

vi.mock("@/content/blog", () => ({
  getPostBySlug: mockGetPostBySlug,
}));

import { size, contentType, default as BlogOGImage } from "./opengraph-image";

describe("blog OG image exports (gh-141)", () => {
  it("exports size 1200x630", () => {
    expect(size).toEqual({ width: 1200, height: 630 });
  });

  it("exports contentType as image/png", () => {
    expect(contentType).toBe("image/png");
  });
});

describe("BlogOGImage function (gh-141)", () => {
  beforeEach(() => {
    mockImageResponse.mockClear();
    mockGetPostBySlug.mockReset();
  });

  it("passes the exported size to ImageResponse for unknown slug (fallback branch)", async () => {
    mockGetPostBySlug.mockReturnValue(undefined);
    await BlogOGImage({ params: Promise.resolve({ slug: "unknown-slug" }) });
    expect(mockImageResponse).toHaveBeenCalledWith(expect.anything(), size);
  });

  it("fallback element contains no post title when slug not found", async () => {
    mockGetPostBySlug.mockReturnValue(undefined);
    await BlogOGImage({ params: Promise.resolve({ slug: "unknown-slug" }) });
    const element = mockImageResponse.mock.calls[0][0] as React.ReactElement;
    const { renderToString } = await import("react-dom/server");
    const html = renderToString(element);
    expect(html).not.toContain("Building");
    expect(html).not.toContain("Piyush Gupta");
  });

  it("renders post title in OG image for valid slug", async () => {
    mockGetPostBySlug.mockReturnValue({
      slug: "agentic-sdlc",
      title: "Building an Agentic CI/CD Pipeline",
      tag: "AI-Native Engineering",
      githubUrl: "https://github.com/piyushgupta27/ai-sdlc",
    });
    await BlogOGImage({ params: Promise.resolve({ slug: "agentic-sdlc" }) });
    expect(mockImageResponse).toHaveBeenCalledWith(expect.anything(), size);
    const element = mockImageResponse.mock.calls[0][0] as React.ReactElement;
    const { renderToString } = await import("react-dom/server");
    const html = renderToString(element);
    expect(html).toContain("Building an Agentic CI/CD Pipeline");
  });

  it("renders post tag in OG image", async () => {
    mockGetPostBySlug.mockReturnValue({
      slug: "agentic-sdlc",
      title: "Building an Agentic CI/CD Pipeline",
      tag: "AI-Native Engineering",
      githubUrl: "https://github.com/piyushgupta27/ai-sdlc",
    });
    await BlogOGImage({ params: Promise.resolve({ slug: "agentic-sdlc" }) });
    const element = mockImageResponse.mock.calls[0][0] as React.ReactElement;
    const { renderToString } = await import("react-dom/server");
    const html = renderToString(element);
    expect(html).toContain("AI-Native Engineering");
  });

  it("renders proof strip (14 min / 4 agents) for posts with githubUrl", async () => {
    mockGetPostBySlug.mockReturnValue({
      slug: "agentic-sdlc",
      title: "Test Post",
      tag: "Test Tag",
      githubUrl: "https://github.com/example/repo",
    });
    await BlogOGImage({ params: Promise.resolve({ slug: "agentic-sdlc" }) });
    const element = mockImageResponse.mock.calls[0][0] as React.ReactElement;
    const { renderToString } = await import("react-dom/server");
    const html = renderToString(element);
    expect(html).toContain("14 min");
    expect(html).toContain("4 agents");
  });

  it("omits proof strip for posts without githubUrl", async () => {
    mockGetPostBySlug.mockReturnValue({
      slug: "no-github",
      title: "Test Post",
      tag: "Test Tag",
    });
    await BlogOGImage({ params: Promise.resolve({ slug: "no-github" }) });
    const element = mockImageResponse.mock.calls[0][0] as React.ReactElement;
    const { renderToString } = await import("react-dom/server");
    const html = renderToString(element);
    expect(html).not.toContain("14 min");
  });

  it("renders author name and site URL in footer", async () => {
    mockGetPostBySlug.mockReturnValue({
      slug: "agentic-sdlc",
      title: "Test Post",
      tag: "Test Tag",
    });
    await BlogOGImage({ params: Promise.resolve({ slug: "agentic-sdlc" }) });
    const element = mockImageResponse.mock.calls[0][0] as React.ReactElement;
    const { renderToString } = await import("react-dom/server");
    const html = renderToString(element);
    expect(html).toContain("Piyush Gupta");
    expect(html).toContain("piyushgupta.io");
  });
});
