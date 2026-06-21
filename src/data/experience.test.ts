import { describe, it } from "vitest";
import assert from "node:assert/strict";
import { experiences, type Experience } from "./experience.ts";

// AC: Slice + jumpingMinds replace all four AI-lab placeholders
describe("experiences data", () => {
  it("exports a non-empty array", () => {
    assert.ok(Array.isArray(experiences), "experiences should be an array");
    assert.ok(experiences.length > 0, "experiences array should not be empty");
  });

  it("contains Slice as an entry", () => {
    const slice = experiences.find((e) => e.company.includes("Slice"));
    assert.ok(slice, 'Should have an entry with company containing "Slice"');
  });

  it("contains jumpingMinds as an entry", () => {
    const jm = experiences.find((e) => e.company === "jumpingMinds");
    assert.ok(jm, 'Should have an entry with company "jumpingMinds"');
  });

  // AC: old placeholder companies are gone
  it("does not contain placeholder companies (DeepMind, OpenAI, Scale AI, Hugging Face)", () => {
    const placeholders = ["DeepMind", "OpenAI", "Scale AI", "Hugging Face"];
    for (const name of placeholders) {
      const found = experiences.find((e) => e.company === name);
      assert.equal(
        found,
        undefined,
        `Placeholder company "${name}" should have been removed`,
      );
    }
  });

  // AC: year ranges visible — period field must contain a 4-digit year
  it("every entry has a period containing a year range", () => {
    const yearPattern = /\d{4}/;
    for (const exp of experiences) {
      assert.match(
        exp.period,
        yearPattern,
        `Entry "${exp.company}" period "${exp.period}" should contain a year`,
      );
    }
  });

  // AC: match existing card/layout structure — all required shape fields present
  it("every entry has all required Experience fields", () => {
    const requiredKeys: (keyof Experience)[] = [
      "company",
      "role",
      "period",
      "description",
      "tech",
    ];
    for (const exp of experiences) {
      for (const key of requiredKeys) {
        assert.ok(
          exp[key] !== undefined && exp[key] !== "",
          `Entry "${exp.company}" is missing or has empty field "${key}"`,
        );
      }
      assert.ok(
        Array.isArray(exp.tech) && exp.tech.length > 0,
        `Entry "${exp.company}" must have a non-empty tech array`,
      );
    }
  });

  it("Slice entry has correct role and period", () => {
    const slice = experiences.find((e) => e.company.includes("Slice"))!;
    assert.equal(slice.role, "Sr Engineering Manager");
    assert.match(slice.period, /2024/);
    assert.match(slice.period, /Present/);
  });

  it("jumpingMinds entry has correct role and period", () => {
    const jm = experiences.find((e) => e.company === "jumpingMinds")!;
    assert.equal(jm.role, "Co-Founder & CTO");
    assert.match(jm.period, /2021/);
    assert.match(jm.period, /2024/);
  });

  it("all description fields are non-empty string arrays", () => {
    for (const exp of experiences) {
      assert.ok(
        Array.isArray(exp.description) && exp.description.length > 0,
        `Entry "${exp.company}" must have a non-empty description array`,
      );
      for (const point of exp.description) {
        assert.equal(typeof point, "string");
        assert.ok(point.length > 0, `Entry "${exp.company}" has empty bullet`);
      }
    }
  });
});
