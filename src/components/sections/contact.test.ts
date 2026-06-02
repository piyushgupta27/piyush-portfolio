import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "node:test";
import assert from "node:assert/strict";

const src = readFileSync(
  resolve(import.meta.dirname, "contact.tsx"),
  "utf-8"
);

describe("contact.tsx — Piyush's real contact info", () => {
  it("uses piyushguptaece@gmail.com as the mailto href", () => {
    assert.ok(src.includes('href="mailto:piyushguptaece@gmail.com"'));
  });

  it("displays piyushguptaece@gmail.com as email text", () => {
    assert.ok(src.includes("piyushguptaece@gmail.com"));
  });

  it("links to https://github.com/piyushgupta27", () => {
    assert.ok(src.includes('href="https://github.com/piyushgupta27"'));
  });

  it("links to https://linkedin.com/in/piyushguptaece", () => {
    assert.ok(src.includes('href="https://linkedin.com/in/piyushguptaece"'));
  });

  it("links to https://piyushguptaece.medium.com", () => {
    assert.ok(src.includes('href="https://piyushguptaece.medium.com"'));
  });

  it("does NOT include any x.com or twitter.com link", () => {
    assert.ok(!/href="https?:\/\/(x|twitter)\.com/.test(src));
  });

  it("does NOT import XIcon", () => {
    assert.ok(!src.includes("XIcon"));
  });

  it("imports LinkedInIcon from icons", () => {
    assert.ok(src.includes("LinkedInIcon"));
  });

  it("imports MediumIcon from icons", () => {
    assert.ok(src.includes("MediumIcon"));
  });

  it("renders LinkedIn button label", () => {
    assert.ok(src.includes("LinkedIn"));
  });

  it("renders Medium button label", () => {
    assert.ok(src.includes("Medium"));
  });

  it("does NOT include old placeholder email aaabadcode.dev", () => {
    assert.ok(!src.includes("aaabadcode.dev"));
  });

  it("does NOT include old GitHub aaaby-code", () => {
    assert.ok(!src.includes("aaaby-code"));
  });

  it("social links open in a new tab", () => {
    const ghIdx = src.indexOf("github.com/piyushgupta27");
    const block = src.slice(ghIdx, ghIdx + 200);
    assert.ok(block.includes('target="_blank"'));
    assert.ok(block.includes('rel="noopener noreferrer"'));
  });
});
