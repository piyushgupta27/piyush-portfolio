import { describe, it } from "vitest";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  getAllExperienceSlugs,
  getExperienceBySlug,
  experienceDetails,
} from "@/data/experience-detail";

const dir = resolve(import.meta.dirname);
const src = readFileSync(resolve(dir, "page.tsx"), "utf-8");

describe("experience detail route — /experience/[company] (gh-164)", () => {
  it("page file exists", () => {
    assert.ok(
      existsSync(resolve(dir, "page.tsx")),
      "src/app/experience/[company]/page.tsx must exist",
    );
  });

  it("calls notFound() for unknown slugs", () => {
    assert.ok(
      src.includes("notFound"),
      "page must call notFound() for unknown slugs",
    );
  });

  it("exports generateStaticParams", () => {
    assert.ok(
      src.includes("generateStaticParams"),
      "page must export generateStaticParams",
    );
  });

  it("exports generateMetadata with OG fields", () => {
    assert.ok(
      src.includes("generateMetadata"),
      "page must export generateMetadata",
    );
    assert.ok(
      src.includes("openGraph"),
      "generateMetadata must set openGraph fields",
    );
  });

  it("stub pages set robots noindex", () => {
    assert.ok(
      src.includes("index: false"),
      "stub pages must set robots: { index: false }",
    );
  });

  it("renders back navigation to experience section", () => {
    assert.ok(
      src.includes("/#experience"),
      "page must link back to /#experience",
    );
  });

  it("renders company name and role for non-stub pages", () => {
    assert.ok(src.includes("detail.company"), "page must render company name");
    assert.ok(src.includes("detail.role"), "page must render role");
  });

  it("renders overview for non-stub pages", () => {
    assert.ok(
      src.includes("detail.overview"),
      "page must render overview text",
    );
  });
});

describe("experience detail data — getAllExperienceSlugs (gh-164)", () => {
  it("returns exactly 5 slugs", () => {
    const slugs = getAllExperienceSlugs();
    assert.equal(slugs.length, 5, "must have exactly 5 experience slugs");
  });

  it("all 5 expected slugs are present", () => {
    const slugs = getAllExperienceSlugs();
    const expected = [
      "disney-hotstar",
      "slice",
      "jumpingminds",
      "hypertrack",
      "shuttl",
    ];
    for (const s of expected) {
      assert.ok(slugs.includes(s), `slug "${s}" must be present`);
    }
  });

  it("disney-hotstar has a YouTube talk link", () => {
    const detail = getExperienceBySlug("disney-hotstar");
    assert.ok(detail, "disney-hotstar detail must exist");
    assert.ok(
      detail.links && detail.links.length > 0,
      "disney-hotstar must have links",
    );
    assert.ok(
      detail.links.some((l) => l.href.includes("youtube.com")),
      "disney-hotstar must include a YouTube talk link",
    );
  });

  it("hypertrack and shuttl are stubs", () => {
    assert.strictEqual(
      getExperienceBySlug("hypertrack")?.stub,
      true,
      "hypertrack must be a stub",
    );
    assert.strictEqual(
      getExperienceBySlug("shuttl")?.stub,
      true,
      "shuttl must be a stub",
    );
  });

  it("non-stub entries have non-empty highlights", () => {
    const nonStubs = experienceDetails.filter((d) => !d.stub);
    for (const d of nonStubs) {
      assert.ok(
        d.highlights.length > 0,
        `${d.company} must have non-empty highlights`,
      );
    }
  });

  it("non-stub entries have all required fields", () => {
    const nonStubs = experienceDetails.filter((d) => !d.stub);
    for (const d of nonStubs) {
      assert.ok(d.company, `entry must have company`);
      assert.ok(d.role, `${d.slug} must have role`);
      assert.ok(d.period, `${d.slug} must have period`);
      assert.ok(d.overview, `${d.slug} must have overview`);
      assert.ok(d.tech.length > 0, `${d.slug} must have tech tags`);
    }
  });
});
