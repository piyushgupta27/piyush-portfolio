import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "vitest";
import assert from "node:assert/strict";

const src = readFileSync(resolve(import.meta.dirname, "navbar.tsx"), "utf-8");

describe("navbar.tsx — anchor links and mobile menu (gh-35)", () => {
  describe("anchor links", () => {
    it('has href="#about"', () => {
      assert.ok(
        src.includes('href: "#about"') || src.includes('href="#about"'),
      );
    });

    it('has href="#projects"', () => {
      assert.ok(
        src.includes('href: "#projects"') || src.includes('href="#projects"'),
      );
    });

    it('has href="#skills"', () => {
      assert.ok(
        src.includes('href: "#skills"') || src.includes('href="#skills"'),
      );
    });

    it('has href="#experience"', () => {
      assert.ok(
        src.includes('href: "#experience"') ||
          src.includes('href="#experience"'),
      );
    });

    it('has href="#blog"', () => {
      assert.ok(src.includes('href: "#blog"') || src.includes('href="#blog"'));
    });

    it('has href="#contact"', () => {
      assert.ok(
        src.includes('href: "#contact"') || src.includes('href="#contact"'),
      );
    });
  });

  describe("mobile menu", () => {
    it("imports AnimatePresence for mobile menu animation", () => {
      assert.ok(
        src.includes("AnimatePresence"),
        "Mobile menu must use AnimatePresence for accessible open/close animation",
      );
    });

    it("has a toggle button for mobile with aria-label", () => {
      assert.ok(
        src.includes('aria-label="Toggle menu"'),
        'Mobile toggle button must have aria-label="Toggle menu"',
      );
    });

    it("uses Menu icon for closed state", () => {
      assert.ok(src.includes("Menu"), "Mobile menu must show a Menu icon");
    });

    it("uses X icon for open state", () => {
      assert.ok(
        src.includes("<X "),
        "Mobile menu must show an X icon when open",
      );
    });

    it("closes menu on link click (onClick handler)", () => {
      assert.ok(
        src.includes("onClick") && src.includes("setOpen"),
        "Mobile menu links must close the menu on click",
      );
    });
  });

  describe("brand", () => {
    it("shows piyush.gupta brand name", () => {
      assert.ok(
        src.includes("piyush.gupta"),
        "Navbar must show the brand name piyush.gupta",
      );
    });
  });
});
