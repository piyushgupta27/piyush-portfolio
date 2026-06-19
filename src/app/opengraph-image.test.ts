import { vi, describe, it, expect, beforeEach } from "vitest";
import React from "react";

const mockImageResponse = vi.hoisted(() => vi.fn());

vi.mock("next/og", () => ({
  ImageResponse: mockImageResponse,
}));

import { size, contentType, default as OGImage } from "./opengraph-image";

describe("opengraph-image exports", () => {
  it("exports size 1200x630", () => {
    expect(size).toEqual({ width: 1200, height: 630 });
  });

  it("exports contentType as image/png", () => {
    expect(contentType).toBe("image/png");
  });
});

describe("OGImage function", () => {
  beforeEach(() => {
    mockImageResponse.mockClear();
  });

  it("passes the exported size to ImageResponse", () => {
    OGImage();
    expect(mockImageResponse).toHaveBeenCalledWith(expect.anything(), {
      width: 1200,
      height: 630,
    });
  });

  it("includes name 'Piyush Gupta' in the OG image element (AC: LinkedIn share shows name)", async () => {
    OGImage();
    const element = mockImageResponse.mock.calls[0][0] as React.ReactElement;
    const { renderToString } = await import("react-dom/server");
    const html = renderToString(element);
    expect(html).toContain("Piyush Gupta");
  });

  it("includes role 'Sr Engineering Manager' in the OG image element (AC: LinkedIn share shows role)", async () => {
    OGImage();
    const element = mockImageResponse.mock.calls[0][0] as React.ReactElement;
    const { renderToString } = await import("react-dom/server");
    const html = renderToString(element);
    expect(html).toContain("Sr Engineering Manager");
  });
});
