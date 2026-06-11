import { vi, describe, it, expect, beforeAll } from "vitest";
import type { Metadata } from "next";
import React from "react";

vi.mock("geist/font/sans", () => ({
  GeistSans: { variable: "--font-geist-sans", className: "geist-sans" },
}));

vi.mock("geist/font/mono", () => ({
  GeistMono: { variable: "--font-geist-mono", className: "geist-mono" },
}));

vi.mock("./globals.css", () => ({}));

vi.mock("@/components/layout/navbar", () => ({
  Navbar: () => null,
}));

vi.mock("@/components/layout/footer", () => ({
  Footer: () => null,
}));

let metadata: Metadata;
let RootLayout: React.ComponentType<{ children: React.ReactNode }>;

beforeAll(async () => {
  const mod = await import("./layout");
  metadata = mod.metadata;
  RootLayout = mod.default;
});

describe("layout metadata", () => {
  const TITLE = "Piyush Gupta — Sr Engineering Manager";
  const DESCRIPTION =
    "Senior Engineering Manager building autonomous AI tooling. Co-founder of jumpingMinds (3M+ users), now leading platform engineering at Slice (10M+ users daily).";
  const OG_IMAGE = "https://piyushgupta.io/og.png";

  it("sets the correct page title", () => {
    expect(metadata.title).toBe(TITLE);
  });

  it("sets the correct description", () => {
    expect(metadata.description).toBe(DESCRIPTION);
  });

  describe("openGraph", () => {
    it("has correct OG title", () => {
      expect((metadata.openGraph as Record<string, unknown>)?.title).toBe(
        TITLE,
      );
    });

    it("has correct OG description", () => {
      expect((metadata.openGraph as Record<string, unknown>)?.description).toBe(
        DESCRIPTION,
      );
    });

    it("sets OG image to placeholder URL", () => {
      const images = (metadata.openGraph as Record<string, unknown>)?.images;
      const imageList = Array.isArray(images) ? images : [images];
      expect(imageList).toContain(OG_IMAGE);
    });

    it("sets OG type to website", () => {
      expect((metadata.openGraph as Record<string, unknown>)?.type).toBe(
        "website",
      );
    });
  });

  describe("twitter", () => {
    it("sets twitter card type to summary_large_image", () => {
      const twitter = metadata.twitter as Record<string, unknown> | undefined;
      expect(twitter?.card).toBe("summary_large_image");
    });

    it("has correct twitter title", () => {
      const twitter = metadata.twitter as Record<string, unknown> | undefined;
      expect(twitter?.title).toBe(TITLE);
    });

    it("has correct twitter description", () => {
      const twitter = metadata.twitter as Record<string, unknown> | undefined;
      expect(twitter?.description).toBe(DESCRIPTION);
    });
  });
});

describe("RootLayout component", () => {
  it("renders children inside the layout", async () => {
    const { renderToString } = await import("react-dom/server");
    const html = renderToString(
      React.createElement(
        RootLayout,
        null,
        React.createElement("span", null, "test-child"),
      ),
    );
    expect(html).toContain("test-child");
  });

  it("renders html element with lang=en", async () => {
    const { renderToString } = await import("react-dom/server");
    const html = renderToString(
      React.createElement(RootLayout, null, React.createElement("div")),
    );
    expect(html).toContain('lang="en"');
  });
});
