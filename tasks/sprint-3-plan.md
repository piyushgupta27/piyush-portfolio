---
sprint: 3
theme: "Make the portfolio earn its URL"
status: APPROVED — 2026-06-18
drafted: 2026-06-18
---

# Sprint 3 Plan — piyush-portfolio

## Sprint goal

> By end of sprint, the portfolio surfaces Piyush's thinking and deepens the proof points that Sr EM hiring decisions actually run on: a rewritten About, richer project case studies, a live blog section with seed posts, OG tags for sharing, and a resume download. CI green on every merge.

One-line pass/fail test: **A hiring manager who lands on the site can read the About, click into a project, read a blog post, and download a resume — all without leaving feeling under-informed.**

---

## Scope

### In sprint

| # | Issue | Tier | Theme | Effort est. | Notes |
|---|-------|------|-------|-------------|-------|
| #74 | content: add resume PDF download link | T4 | product | XS (~30m) | no content review needed |
| #73 | seo: add OG/meta tags + Twitter card | T3 | product | XS (~45m) | needed before #68 |
| #68 | content: add blog / writing section | T2 | product | L (~5h) | scaffold + seed posts (posts reviewed in content pass) |
| #70 | content: rewrite about section — Sr EM narrative | T3 | content | S (~1h) | **DEFERRED — content pass at sprint end** |
| #69 | content: deepen project card case studies | T3 | content | S (~2h) | **DEFERRED — content pass at sprint end** |

**Order of execution** (revised 2026-06-18):
1. #74, #73 — product features, no copy review needed, ship fast
2. #68 — blog scaffold + route; seed post drafts held for content pass
3. Content pass (last): #70 (about), #69 (case studies), #68 blog post copy — reviewed by Piyush in one go

**Rationale:** Build the product first, improve all content in one focused pass at the end. Branch `feature/gh-70` preserved with agent's about draft.

### Explicitly out of scope (Sprint 3)

- #71 mobile nav — design work, separate sprint
- #72 Lighthouse baseline — measurement sprint (Sprint 4)
- #75 analytics — Sprint 4
- #32/#36/#37/#38 UI testing epic — blocked; will unblock in Sprint 4 when CI flow is wired
- Comments, RSS, blog tags (#68 explicitly excludes these)
- Resume PDF content editing — user provides the PDF; agent wires the link

---

## Acceptance criteria (per issue)

### #70 — About section rewrite
- [ ] Copy is specific: names leadership philosophy, scale/context, AI-native angle
- [ ] No generic filler ("passionate about technology", "cross-functional teams")
- [ ] Reads as first-person, Sr EM voice
- [ ] Copy reviewed and approved by Piyush before merge
- [ ] CI green (typecheck + lint + format + test)

### #69 — Project card case studies
- [ ] Each of the 5 project cards has a 2–3 sentence description (problem → approach → outcome)
- [ ] At least 3 cards include a highlight stat/callout (e.g. "6 platforms, 1 query")
- [ ] Cards remain scannable — no wall of text
- [ ] `Project` interface has optional `highlight` field if needed
- [ ] CI green

### #73 — OG / meta tags
- [ ] `og:title`, `og:description`, `og:image`, `og:url` in root layout
- [ ] `twitter:card` set to `summary_large_image`
- [ ] Static OG image generated (1200×630, name + title)
- [ ] Per-page overrides work for blog posts (validated once #68 is in)
- [ ] Verified in opengraph.io or Twitter Card Validator
- [ ] CI green

### #74 — Resume PDF download
- [ ] PDF placed in `public/resume/` or linked to external host
- [ ] Download button in hero CTA row or contact section
- [ ] Touch target ≥44px
- [ ] Link opens PDF (not blank) — verified in browser
- [ ] If PDF is in `public/`, it is gitignored if it contains sensitive employer detail
- [ ] CI green

### #68 — Blog / writing section
- [ ] `/blog` route renders a post index
- [ ] Each post renders at `/blog/[slug]`
- [ ] Nav link present and functional
- [ ] At least 3 seed posts exist in `src/content/` (MDX or MD)
- [ ] Post topics cover: engineering leadership, AI tooling, process (one each)
- [ ] Post drafts reviewed and approved by Piyush before merge (content is voice-sensitive)
- [ ] Per-post OG override wired (inherits from #73)
- [ ] CI green (typecheck + lint + format + all 115+ tests still passing)

---

## Sprint definition of done

All of the following must be true before sprint is called complete:

1. All 5 issues have merged PRs on `main` (squash, no direct pushes)
2. CI green on `main` after each merge
3. Every AC checkbox above is checked
4. Content (About copy, blog posts) reviewed by Piyush — no fabricated claims, authentic voice
5. Continuation doc updated with sprint outcome entry
6. Retro section below filled in

---

## What can slip (and where it goes)

| Risk | Slip destination |
|------|-----------------|
| Blog post drafts need heavy rewriting | User edits drafts; merge after review. Sprint isn't done until #68 AC passes |
| Resume PDF not ready | #74 ships with placeholder link pattern; PDF swap is a 5-min follow-up |
| OG image design takes iteration | Ship text-only OG image first; visual polish in Sprint 4 |

---

## How work runs

All issues go through: `pnpm sdlc dispatch --project piyush-portfolio` (from `~/Workspace/piyush-portfolio`).

Each issue → its own branch → PR against `main` → CI gate → manager review → squash merge.

No issue starts without dispatch ordering the board first. No PR merges without CI green + explicit approval.

---

## Sprint 4 preview (not committed)

| # | Issue | Theme |
|---|-------|-------|
| #71 | mobile nav | design |
| #72 | Lighthouse baseline + CWV fixes | perf |
| #75 | privacy-respecting analytics | platform |
| #32 epic | UI testing (a11y + visual + CI) | testing |

---

## Retro (fill in after sprint closes)

**Date closed:**

**Delivered vs. committed:**

| Issue | Committed AC | Actual outcome |
|-------|-------------|----------------|
| #70 | all ACs above | |
| #69 | all ACs above | |
| #73 | all ACs above | |
| #74 | all ACs above | |
| #68 | all ACs above | |

**What went well:**

**What slipped and why:**

**Process gaps (ai-sdlc issues to file):**

**Carry-forward to Sprint 4:**
