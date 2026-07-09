import { describe, it } from "vitest";
import assert from "node:assert/strict";
import {
  experiencePageEntries,
  type FullExperienceEntry,
  type MinimalExperienceEntry,
} from "./experience-page.ts";

const fullEntries = experiencePageEntries.filter(
  (e): e is FullExperienceEntry => e.minimal !== true,
);
const minimalEntries = experiencePageEntries.filter(
  (e): e is MinimalExperienceEntry => e.minimal === true,
);

describe("experience-page data", () => {
  it("exports a non-empty array", () => {
    assert.ok(experiencePageEntries.length > 0);
  });

  it("has exactly 4 full entries and 1 minimal entry", () => {
    assert.equal(fullEntries.length, 4);
    assert.equal(minimalEntries.length, 1);
  });

  it("full entries contain Slice, JumpingMinds, Disney+ Hotstar, HyperTrack", () => {
    const slugs = fullEntries.map((e) => e.slug);
    assert.ok(slugs.includes("slice"));
    assert.ok(slugs.includes("jumpingminds"));
    assert.ok(slugs.includes("disney-hotstar"));
    assert.ok(slugs.includes("hypertrack"));
  });

  it("minimal entries contain Shuttl", () => {
    const slugs = minimalEntries.map((e) => e.slug);
    assert.ok(slugs.includes("shuttl"));
  });

  it("all full entries have required fields", () => {
    for (const e of fullEntries) {
      assert.ok(e.company, `${e.slug} must have company`);
      assert.ok(e.role, `${e.slug} must have role`);
      assert.ok(e.period, `${e.slug} must have period`);
      assert.ok(e.scope, `${e.slug} must have scope`);
      assert.ok(e.mode, `${e.slug} must have mode`);
      assert.ok(e.situation, `${e.slug} must have situation`);
      assert.ok(e.outcomes.length > 0, `${e.slug} must have outcomes`);
      assert.ok(e.theCall, `${e.slug} must have theCall`);
      assert.ok(e.tech.length > 0, `${e.slug} must have tech tags`);
    }
  });

  it("all minimal entries have required fields", () => {
    for (const e of minimalEntries) {
      assert.ok(e.company, `${e.slug} must have company`);
      assert.ok(e.role, `${e.slug} must have role`);
      assert.ok(e.period, `${e.slug} must have period`);
      assert.ok(e.description, `${e.slug} must have description`);
    }
  });

  it("Slice outcomes lead with PA/PG revenue story", () => {
    const slice = fullEntries.find((e) => e.slug === "slice")!;
    assert.ok(
      slice.outcomes[0].includes("₹70L"),
      "first outcome must be the PA/PG revenue metric",
    );
  });

  it("JumpingMinds outcomes lead with Snuggles pre-ChatGPT signal", () => {
    const jm = fullEntries.find((e) => e.slug === "jumpingminds")!;
    assert.ok(
      jm.outcomes[0].includes("Snuggles"),
      "first outcome must be Snuggles AI",
    );
    assert.ok(
      jm.outcomes[0].includes("ChatGPT"),
      "first outcome must reference ChatGPT for comparison",
    );
  });

  it("Hotstar outcomes lead with CCU metric", () => {
    const hotstar = fullEntries.find((e) => e.slug === "disney-hotstar")!;
    assert.ok(
      hotstar.outcomes[0].includes("CCU"),
      "first outcome must be CCU metric",
    );
  });

  it("Slice period starts Sep 2024", () => {
    const slice = fullEntries.find((e) => e.slug === "slice")!;
    assert.ok(
      slice.period.includes("Sep 2024"),
      "Slice period must start Sep 2024",
    );
  });

  it("all entries have unique slugs", () => {
    const slugs = experiencePageEntries.map((e) => e.slug);
    const unique = new Set(slugs);
    assert.equal(unique.size, slugs.length, "all slugs must be unique");
  });

  it("all full entries have periods containing a year", () => {
    for (const e of fullEntries) {
      assert.match(e.period, /\d{4}/, `${e.slug} period must contain a year`);
    }
  });
});
