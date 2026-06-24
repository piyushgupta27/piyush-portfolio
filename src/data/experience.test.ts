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

  it("contains JumpingMinds AI as an entry", () => {
    const jm = experiences.find((e) => e.company === "JumpingMinds AI");
    assert.ok(jm, 'Should have an entry with company "JumpingMinds AI"');
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
    assert.equal(slice.role, "Engineering Manager");
    assert.match(slice.period, /2024/);
    assert.match(slice.period, /Present/);
  });

  it("JumpingMinds AI entry has correct role and period", () => {
    const jm = experiences.find((e) => e.company === "JumpingMinds AI")!;
    assert.equal(jm.role, "Co-Founder & CTO");
    assert.match(jm.period, /2021/);
    assert.match(jm.period, /2024/);
  });

  it("all description fields are non-empty strings", () => {
    for (const exp of experiences) {
      assert.equal(typeof exp.description, "string");
      assert.ok(
        exp.description.length > 0,
        `Entry "${exp.company}" has empty description`,
      );
    }
  });

  it("JumpingMinds AI description contains all gh-108 verified proof points", () => {
    const jm = experiences.find((e) => e.company === "JumpingMinds AI");
    assert.ok(jm, "JumpingMinds AI entry must exist");
    const d = jm.description;
    // Snuggles AI companion chatbot pre-ChatGPT
    assert.ok(
      d.includes("Snuggles"),
      "must mention the Snuggles AI companion chatbot",
    );
    assert.ok(d.includes("2022"), "must mention early 2022 launch year");
    assert.ok(
      d.toLowerCase().includes("chatgpt"),
      "must reference ChatGPT for the pre-launch comparison",
    );
    // Engagement metrics
    assert.ok(
      d.includes("35 min"),
      "must include '35 min' daily engagement metric",
    );
    assert.ok(
      d.includes("2.3"),
      "must include '2.3×' industry average multiplier",
    );
    assert.ok(
      d.includes("40M+"),
      "must include '40M+' AI training data points",
    );
    assert.ok(
      d.includes("30% positive mood shift"),
      "must include '30% positive mood shift' outcome",
    );
    // Content-first GTM metrics
    assert.ok(
      d.includes("118K"),
      "must include '118K' Instagram followers metric",
    );
    assert.ok(d.includes("7M+"), "must include '7M+' Reels impressions metric");
  });
});
