import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it, expect } from "vitest";

const dir = resolve(import.meta.dirname);

describe(".lighthouserc.json — Lighthouse CI configuration (gh-72)", () => {
  it("file parses as valid JSON with expected top-level ci key", () => {
    const raw = readFileSync(resolve(dir, ".lighthouserc.json"), "utf-8");
    const config = JSON.parse(raw) as Record<string, unknown>;
    expect(config).toHaveProperty("ci");
  });

  it("AC: asserts categories:performance ≥0.9 as error (Lighthouse score ≥90)", () => {
    const raw = readFileSync(resolve(dir, ".lighthouserc.json"), "utf-8");
    const config = JSON.parse(raw) as Record<string, unknown>;
    const assertions = (
      (config.ci as Record<string, unknown>).assert as Record<string, unknown>
    ).assertions as Record<string, [string, Record<string, unknown>]>;
    const rule = assertions["categories:performance"];
    expect(rule[0]).toBe("error");
    expect(rule[1].minScore).toBeGreaterThanOrEqual(0.9);
  });

  it("AC: asserts cumulative-layout-shift ≤0.1 as error (CLS < 0.1)", () => {
    const raw = readFileSync(resolve(dir, ".lighthouserc.json"), "utf-8");
    const config = JSON.parse(raw) as Record<string, unknown>;
    const assertions = (
      (config.ci as Record<string, unknown>).assert as Record<string, unknown>
    ).assertions as Record<string, [string, Record<string, unknown>]>;
    const rule = assertions["cumulative-layout-shift"];
    expect(rule[0]).toBe("error");
    expect(rule[1].maxNumericValue).toBeLessThanOrEqual(0.1);
  });

  it("AC: asserts largest-contentful-paint ≤2500ms as error (LCP < 2.5s)", () => {
    const raw = readFileSync(resolve(dir, ".lighthouserc.json"), "utf-8");
    const config = JSON.parse(raw) as Record<string, unknown>;
    const assertions = (
      (config.ci as Record<string, unknown>).assert as Record<string, unknown>
    ).assertions as Record<string, [string, Record<string, unknown>]>;
    const rule = assertions["largest-contentful-paint"];
    expect(rule[0]).toBe("error");
    expect(rule[1].maxNumericValue).toBeLessThanOrEqual(2500);
  });

  it("uses mobile formFactor and screen emulation for realistic mobile audit", () => {
    const raw = readFileSync(resolve(dir, ".lighthouserc.json"), "utf-8");
    const config = JSON.parse(raw) as Record<string, unknown>;
    const settings = (
      (config.ci as Record<string, unknown>).collect as Record<string, unknown>
    ).settings as Record<string, unknown>;
    expect(settings.formFactor).toBe("mobile");
    const emulation = settings.screenEmulation as Record<string, unknown>;
    expect(emulation.mobile).toBe(true);
  });
});

describe(".github/workflows/lighthouse.yml — CI gate (gh-72)", () => {
  it("AC: CI gate file exists and is non-empty", () => {
    const workflow = readFileSync(
      resolve(dir, ".github/workflows/lighthouse.yml"),
      "utf-8",
    );
    expect(workflow.length).toBeGreaterThan(0);
  });

  it("triggers on push to main and on pull_request to main", () => {
    const workflow = readFileSync(
      resolve(dir, ".github/workflows/lighthouse.yml"),
      "utf-8",
    );
    expect(workflow).toMatch(/push:/);
    expect(workflow).toMatch(/pull_request:/);
    expect(workflow).toContain("branches: [main]");
  });

  it("uses treosh/lighthouse-ci-action and references .lighthouserc.json", () => {
    const workflow = readFileSync(
      resolve(dir, ".github/workflows/lighthouse.yml"),
      "utf-8",
    );
    expect(workflow).toContain("treosh/lighthouse-ci-action");
    expect(workflow).toContain(".lighthouserc.json");
    expect(workflow).toContain("piyushgupta.io");
  });
});
