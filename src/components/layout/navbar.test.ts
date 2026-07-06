import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "vitest";
import assert from "node:assert/strict";

const src = readFileSync(resolve(import.meta.dirname, "navbar.tsx"), "utf-8");

describe("navbar.tsx — anchor links and mobile menu (gh-35)", () => {
  describe("anchor links", () => {
    it('has href="/#about"', () => {
      assert.ok(
        src.includes('href: "/#about"') || src.includes('href="/#about"'),
      );
    });

    it('has href="/#projects"', () => {
      assert.ok(
        src.includes('href: "/#projects"') || src.includes('href="/#projects"'),
      );
    });

    it('has href="/#skills"', () => {
      assert.ok(
        src.includes('href: "/#skills"') || src.includes('href="/#skills"'),
      );
    });

    it('has href="/#experience"', () => {
      assert.ok(
        src.includes('href: "/#experience"') ||
          src.includes('href="/#experience"'),
      );
    });

    it('has href="/blog" for the dedicated blog route (gh-68)', () => {
      assert.ok(src.includes('href: "/blog"') || src.includes('href="/blog"'));
    });

    it('has href="/#contact"', () => {
      assert.ok(
        src.includes('href: "/#contact"') || src.includes('href="/#contact"'),
      );
    });
  });

  describe("mobile menu", () => {
    it("uses CSS fade-in animation for mobile menu (no framer-motion in layout bundle)", () => {
      assert.ok(
        src.includes("animate-in") && src.includes("fade-in"),
        "Mobile menu must use CSS animate-in/fade-in — framer-motion removed from layout bundle for LCP performance",
      );
      assert.ok(
        !src.includes("AnimatePresence"),
        "Mobile menu must not use AnimatePresence — framer-motion removed from layout bundle for LCP performance",
      );
    });

    it("has a toggle button for mobile with aria-label", () => {
      assert.ok(
        src.includes("aria-label="),
        "Mobile toggle button must have an aria-label attribute",
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
    it("shows piyushgupta.io brand name", () => {
      assert.ok(
        src.includes(">piyushgupta.io<"),
        "Navbar must show the brand name piyushgupta.io",
      );
    });
  });
});

describe("navbar.tsx — touch target ≥44px (gh-43)", () => {
  it("logo anchor has h-11 (44px height)", () => {
    const logoIdx = src.indexOf('href="/"');
    assert.ok(logoIdx !== -1, "Logo href='/' must be present");
    const block = src.slice(logoIdx, logoIdx + 200);
    assert.ok(
      block.includes("h-11"),
      "Logo anchor must have h-11 (44px) so tap target meets minimum",
    );
  });

  it("desktop nav links have h-11 (44px height)", () => {
    assert.ok(
      src.includes("inline-flex h-11 items-center rounded-md px-3"),
      "Desktop nav link className must include h-11 for 44px touch target",
    );
  });

  it("mobile hamburger toggle has min-h-[44px]", () => {
    const toggleIdx = src.indexOf("aria-label=");
    assert.ok(toggleIdx !== -1, "Mobile toggle button must have aria-label");
    const block = src.slice(Math.max(0, toggleIdx - 250), toggleIdx + 50);
    assert.ok(
      block.includes("min-h-[44px]"),
      "Mobile toggle Button must have min-h-[44px]",
    );
  });

  it("mobile hamburger toggle has min-w-[44px]", () => {
    const toggleIdx = src.indexOf("aria-label=");
    const block = src.slice(Math.max(0, toggleIdx - 250), toggleIdx + 50);
    assert.ok(
      block.includes("min-w-[44px]"),
      "Mobile toggle Button must have min-w-[44px]",
    );
  });

  it("mobile nav links have h-11 (44px height)", () => {
    const onClickIdx = src.indexOf("onClick={() => setOpen(false)}");
    assert.ok(
      onClickIdx !== -1,
      "Mobile nav link onClick handler must be present",
    );
    const block = src.slice(Math.max(0, onClickIdx - 100), onClickIdx + 200);
    assert.ok(
      block.includes("h-11") || block.includes("h-14"),
      "Mobile nav links must have h-11 or h-14 for ≥44px touch target",
    );
  });
});
