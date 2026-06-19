---
sprint: 3
theme: "Make the portfolio earn its URL"
status: PRODUCT FEATURES SHIPPED — content pass pending
drafted: 2026-06-18
approved: 2026-06-18
product-shipped: 2026-06-19
---

# Sprint 3 Plan — piyush-portfolio

## Sprint goal

> By end of sprint, the portfolio surfaces Piyush's thinking and deepens the proof points that Sr EM hiring decisions actually run on: a rewritten About, richer project case studies, a live blog section with seed posts, OG tags for sharing, and a resume download. CI green on every merge.

One-line pass/fail test: **A hiring manager who lands on the site can read the About, click into a project, read a blog post, and download a resume — all without leaving feeling under-informed.**

---

## Scope

### In sprint

| # | Issue | Tier | Theme | Effort est. | Status |
|---|-------|------|-------|-------------|--------|
| #74 | content: add resume PDF download link | T4 | product | XS (~30m) | MERGED (PR #86) |
| #73 | seo: add OG/meta tags + Twitter card | T3 | product | XS (~45m) | MERGED (PR #87) |
| #68 | content: add blog / writing section | T2 | product | L (~5h) | MERGED (PR #88) |
| #70 | content: rewrite about section — Sr EM narrative | T3 | content | S (~1h) | **PENDING — content pass** |
| #69 | content: deepen project card case studies | T3 | content | S (~2h) | **PENDING — content pass** |

**Order of execution** (revised 2026-06-18):
1. #74, #73 — product features, no copy review needed, ship fast ✓
2. #68 — blog scaffold + route; seed post drafts held for content pass ✓
3. Content pass (last): #70 (about), #69 (case studies), #68 blog post copy — reviewed by Piyush in one go

**Rationale:** Build the product first, improve all content in one focused pass at the end. Branch `feature/gh-70` preserved with agent's about copy draft.

### Explicitly out of scope (Sprint 3)

- #71 mobile nav — design work, separate sprint
- #72 Lighthouse baseline — measurement sprint (Sprint 4)
- #75 analytics — Sprint 4
- #32/#36/#37/#38 UI testing epic — blocked; will unblock in Sprint 4 when CI flow is wired
- Comments, RSS, blog tags (#68 explicitly excludes these)
- Resume PDF content editing — user provides the PDF; agent wires the link

---

## Product features shipped (2026-06-19)

| PR | Issue | What landed | Tests |
|----|-------|-------------|-------|
| #84 | #69 | Project card case studies deepened (problem → approach → outcome + highlight stats) | 125 |
| #86 | #74 | Resume PDF download link in hero/contact | 125 |
| #87 | #73 | OG/Twitter meta tags + 1200×630 generated OG image | 125 |
| #88 | #68 | `/blog` route + `/blog/[slug]` + 3 seed posts + nav link | 139 |

main @ `8ab27bc` · 139 tests passing

---

## Acceptance criteria (per issue)

### #70 — About section rewrite
- [ ] Copy is specific: names leadership philosophy, scale/context, AI-native angle
- [ ] No generic filler ("passionate about technology", "cross-functional teams")
- [ ] Reads as first-person, Sr EM voice
- [ ] Copy reviewed and approved by Piyush before merge
- [ ] CI green (typecheck + lint + format + test)

### #69 — Project card case studies
- [x] Each of the 5 project cards has a 2–3 sentence description (problem → approach → outcome)
- [x] At least 3 cards include a highlight stat/callout
- [x] Cards remain scannable — no wall of text
- [x] CI green

### #73 — OG / meta tags
- [x] `og:title`, `og:description`, `og:image`, `og:url` in root layout
- [x] `twitter:card` set to `summary_large_image`
- [x] Static OG image generated (1200×630, name + title)
- [ ] Per-page overrides work for blog posts (validated once #68 is in)
- [ ] Verified in opengraph.io or Twitter Card Validator
- [x] CI green

### #74 — Resume PDF download
- [x] PDF placed in `public/resume/`
- [x] Download button in hero CTA row
- [x] Touch target ≥44px
- [ ] Link opens PDF (not blank) — verified in browser
- [x] CI green

### #68 — Blog / writing section
- [x] `/blog` route renders a post index
- [x] Each post renders at `/blog/[slug]`
- [x] Nav link present and functional
- [x] 3 seed posts exist in `src/content/blog/` (TypeScript content blocks)
- [x] Post topics cover: engineering leadership, AI tooling, process (one each)
- [ ] Post drafts reviewed and approved by Piyush — content pass pending
- [x] Per-post OG override wired (inherits from #73 metadataBase)
- [x] CI green (139 tests passing)

---

## Sprint definition of done

All of the following must be true before sprint is called complete:

1. All 5 issues have merged PRs on `main` (squash, no direct pushes)
2. CI green on `main` after each merge
3. Every AC checkbox above is checked
4. Content (About copy, blog posts) reviewed by Piyush — no fabricated claims, authentic voice
5. Continuation doc updated with sprint outcome entry
6. Retro section below filled in

**Current status:** 4/5 issues merged. #70 (about rewrite) remains. Content pass to happen when Piyush is ready to review all content in one go.

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

## Platform issues filed this sprint

| Issue | Title | Severity |
|-------|-------|----------|
| ai-sdlc#152 | tdd-guard-vitest reporter hangs in dispatch worktrees (daemon absent) | HIGH |
| TBD | BUILD agent not running `pnpm format` before commit (recurring format:check failures at REVIEW) | MEDIUM |

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

**Date closed:** TBD (pending content pass)

**Delivered vs. committed:**

| Issue | Committed AC | Actual outcome |
|-------|-------------|----------------|
| #69 | all ACs | MERGED PR #84 — case studies deepened ✓ |
| #74 | all ACs | MERGED PR #86 — resume download ✓ |
| #73 | all ACs | MERGED PR #87 — OG/Twitter meta + generated image ✓ |
| #68 | all ACs | MERGED PR #88 — blog scaffold + 3 seed posts ✓ (copy review pending) |
| #70 | all ACs | PENDING — content pass needed |

**What went well:**
- Product features shipped clean, one at a time, CI green throughout
- Dispatch workaround (one task at a time + pre-clean) prevented cascade failures
- tdd-guard issue identified and isolated quickly; platform issue filed promptly
- format:check failures were consistent and handled predictably

**What slipped and why:**
- `tdd-guard-vitest` reporter caused ALL BUILD agents to hang (daemon absent in worktrees) — reverted (#85), platform issue filed (#152)
- BUILD agent doesn't run `pnpm format` before commit — two manual HITL interventions needed (#87, #88)
- About rewrite (#70) deferred to content pass by design

**Process gaps (ai-sdlc issues to file):**
- ai-sdlc#152 (filed): tdd-guard must be injected at dispatch level, not per-repo config
- TBD: BUILD agent format-before-commit gate to eliminate recurring REVIEW failures

**Carry-forward to Sprint 4:**
- Content pass: #70 (about), #69 copy review, #68 blog post review
- PR #80 (dependabot minor bump) — lucide-react/base-ui minimumReleaseAge; merge when CI green
- Sprint 4: #71 mobile nav, #72 Lighthouse, #75 analytics, #32 UI testing epic
