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

  it("renders stat cards for posts with stats", async () => {
    mockGetPostBySlug.mockReturnValue({
      slug: "agentic-sdlc",
      title: "Test Post",
      tag: "Test Tag",
      stats: [
        {
          value: "14",
          unit: "min",
          label: "Cycle time",
          sub: "per gh-118 proof run",
        },
        {
          value: "83%",
          label: "Success rate",
          sub: "12 escalated, 9 self-corrected",
        },
        { value: "$173", label: "AI compute", sub: "across 47 tasks" },
        { value: "47", label: "Tasks dispatched", sub: "174 agent runs" },
      ],
    });
    await BlogOGImage({ params: Promise.resolve({ slug: "agentic-sdlc" }) });
    const element = mockImageResponse.mock.calls[0][0] as React.ReactElement;
    const { renderToString } = await import("react-dom/server");
    const html = renderToString(element);
    expect(html).toContain("14");
    expect(html).toContain("83%");
    expect(html).toContain("Cycle time");
    expect(html).toContain("Success rate");
  });

  it("omits stat cards for posts without stats", async () => {
    mockGetPostBySlug.mockReturnValue({
      slug: "no-stats",
      title: "Test Post",
      tag: "Test Tag",
    });
    await BlogOGImage({ params: Promise.resolve({ slug: "no-stats" }) });
    const element = mockImageResponse.mock.calls[0][0] as React.ReactElement;
    const { renderToString } = await import("react-dom/server");
    const html = renderToString(element);
    expect(html).not.toContain("Cycle time");
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
