import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "node:test";
import assert from "node:assert/strict";

const src = readFileSync(
  resolve(import.meta.dirname, "icons.tsx"),
  "utf-8"
);

describe("icons.tsx — icon exports", () => {
  it("exports GithubIcon", () => {
    assert.ok(src.includes("export function GithubIcon"));
  });

  it("exports LinkedInIcon (new in gh-5)", () => {
    assert.ok(src.includes("export function LinkedInIcon"));
  });

  it("exports MediumIcon (new in gh-5)", () => {
    assert.ok(src.includes("export function MediumIcon"));
  });

  it("XIcon is still present for backward compatibility", () => {
    assert.ok(src.includes("export function XIcon"));
  });

  it("LinkedInIcon uses currentColor fill for theming", () => {
    const start = src.indexOf("function LinkedInIcon");
    const block = src.slice(start, start + 400);
    assert.ok(block.includes('fill="currentColor"'));
  });

  it("MediumIcon uses currentColor fill for theming", () => {
    const start = src.indexOf("function MediumIcon");
    const block = src.slice(start, start + 400);
    assert.ok(block.includes('fill="currentColor"'));
  });

  it("LinkedInIcon spreads SVGProps onto the svg element", () => {
    const start = src.indexOf("function LinkedInIcon");
    const block = src.slice(start, start + 200);
    assert.ok(block.includes("SVGProps<SVGSVGElement>"));
    assert.ok(block.includes("{...props}") || block.includes("...props"));
  });

  it("MediumIcon spreads SVGProps onto the svg element", () => {
    const start = src.indexOf("function MediumIcon");
    const block = src.slice(start, start + 200);
    assert.ok(block.includes("SVGProps<SVGSVGElement>"));
    assert.ok(block.includes("{...props}") || block.includes("...props"));
  });
});
