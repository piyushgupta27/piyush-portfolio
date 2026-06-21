import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "vitest";
import assert from "node:assert/strict";

const dir = resolve(import.meta.dirname);

describe("section IDs — navbar anchors resolve correctly (gh-35)", () => {
  it('about.tsx has section id="about"', () => {
    const src = readFileSync(resolve(dir, "about.tsx"), "utf-8");
    assert.ok(
      src.includes('id="about"'),
      'about.tsx section element must have id="about"',
    );
  });

  it('projects.tsx has section id="projects"', () => {
    const src = readFileSync(resolve(dir, "projects.tsx"), "utf-8");
    assert.ok(
      src.includes('id="projects"'),
      'projects.tsx section element must have id="projects"',
    );
  });

  it('skills.tsx has section id="skills"', () => {
    const src = readFileSync(resolve(dir, "skills.tsx"), "utf-8");
    assert.ok(
      src.includes('id="skills"'),
      'skills.tsx section element must have id="skills"',
    );
  });

  it('experience.tsx has section id="experience"', () => {
    const src = readFileSync(resolve(dir, "experience.tsx"), "utf-8");
    assert.ok(
      src.includes('id="experience"'),
      'experience.tsx section element must have id="experience"',
    );
  });

  it('blog.tsx has section id="blog"', () => {
    const src = readFileSync(resolve(dir, "blog.tsx"), "utf-8");
    assert.ok(
      src.includes('id="blog"'),
      'blog.tsx section element must have id="blog"',
    );
  });

  it('contact.tsx has section id="contact"', () => {
    const src = readFileSync(resolve(dir, "contact.tsx"), "utf-8");
    assert.ok(
      src.includes('id="contact"'),
      'contact.tsx section element must have id="contact"',
    );
  });

  it('education.tsx has section id="education"', () => {
    const src = readFileSync(resolve(dir, "education.tsx"), "utf-8");
    assert.ok(
      src.includes('id="education"'),
      'education.tsx section element must have id="education"',
    );
  });
});
