# Design Audit — piyushgupta.io
**Date:** 2026-07-02  
**Auditor:** Claude (gstack /design-review)  
**Issue:** #161 — Comprehensive site-wide design review  
**Scope:** Homepage (all sections), blog index, blog post (desktop + mobile)  
**Mode:** Discovery only — findings feed into #162 (design system) and #163 (UI/UX)

---

## Design Score: B

**AI Slop Score: A−** (no AI slop patterns detected — this is a genuine, distinctive design)

### Per-category grades
| Category | Grade | Notes |
|----------|-------|-------|
| Visual Hierarchy | B+ | Strong hero, consistent section rhythm; experience text too dense |
| Typography | B | Geist + Geist Mono — excellent choice; blog line length P1 |
| Color & Contrast | A− | Tight dark palette, correct use of green accent, no AI slop gradients |
| Spacing & Layout | B | Good grid discipline; skills section gaps |
| Interaction States | C+ | Nav hover OK; no active section highlight; touch target violations |
| Responsive | C | Mobile hero CTA below fold; mobile nav no overlay |
| Content Quality | B | Excellent copy; experience section too dense to scan |
| Motion | B+ | Fade-up animations tasteful; SSR visibility issue |
| Performance | A | 1.2s load, TTFB 21ms — excellent |
| AI Slop | A | Math equation background is distinctive, not generic |

---

## First Impression

The site communicates **technical credibility at scale**. A senior engineer who has shipped real infrastructure. The math-equation background in the hero is a distinctive, non-generic choice that signals "engineer" without being tryhard.

I notice the name "Piyush Gupta" in white + teal gradient reads cleanly as the primary anchor. The hero subtitle ("Built real-time infra for 50M+ concurrent users…") front-loads the most impressive credential immediately.

The first 3 things my eye goes to: (1) **"Piyush Gupta"** in the large white+teal type, (2) **the 50M+ headline**, (3) **the teal "See the work" CTA**.

If I had to describe this in one word: **Credible.**

What's missing: the site has a strong first impression at desktop but the mobile hero fails (see P1 findings).

---

## Design System (Extracted)

- **Fonts:** Geist (sans) + Geist Mono — 2 families, excellent. Not a default stack. Distinctive.
- **Colors:** Tight dark palette. Background near-black (`~#09090b`). Foreground white (`~lab(94)`). Accent: teal/green (`lab(78.5 -64.9 39.7)`). Muted foreground (`lab(53.6`). No excessive color noise.
- **Heading scale:** H1 72px/700, H2 36px/700, H3 16–18px/600. Missing H4–H6 usage (fine for a portfolio). Scale jump from H3 16px → H2 36px is large but works in context.
- **Spacing:** Section padding 96px (`py-24`), cards use 24px padding. Consistent 4px base grid.
- **Interaction states:** Nav links have `transition-colors hover:text-foreground` — basic hover states present. Focus rings: need verification from #154 work.
- **Touch targets:** Nav links all 44px height ✅. Several non-nav interactive elements below 44px ❌ (see P2 findings).

---

## Findings

### P1 — Blocking UX

---

**FINDING-001: Blog post reading width is 107 chars/line (should be ≤75ch)**

- **Page:** `/blog/agentic-sdlc` (and all blog posts)
- **Severity:** P1 — actively degrades reading experience
- **Evidence:** `article.py-24.px-6` has no `max-width` constraint. At 1280px viewport, body text runs ~107 characters/line (measured: `getBoundingClientRect().width` of article = 1280px, minus 48px padding = 1232px content width at 16px font).
- **Ideal:** 65–75ch (the 66ch ideal is about 660px at 16px base font).
- **Fix:** Add `max-w-3xl mx-auto` (768px, ~85ch) or better `max-w-2xl` (672px, ~75ch) to the blog post content container. The article element at `src/app/blog/[slug]/page.tsx` needs a wrapper with constrained width. The heading and metadata can be wider; only the prose body needs the 75ch constraint.
- **Scope for #163:** Add `max-w-prose` class or `ch`-based constraint to blog post body.

---

**FINDING-002: Mobile nav — no full-screen overlay, no backdrop**

- **Page:** Homepage at ≤768px
- **Severity:** P1 — navigation is confusing on mobile
- **Evidence:** Screenshot `mobile-nav-open.png` shows hamburger nav drops down with items (About, Projects, Skills, Experience, Education) but page content is visible beneath it. No backdrop/overlay. "Blog" and "Contact" links may be cut off at the bottom on small viewports.
- **Observed:** The nav is a partial-height dropdown without a backdrop, leaving the hero text visible underneath the nav items. This is visually confusing — users don't know if the nav is a modal or just an overlay.
- **Fix:** The mobile nav should either: (a) be a full-screen overlay with backdrop that covers the page content, or (b) be a bottom drawer. The current partial-height dropdown without backdrop violates the mental model of "modal navigation." 
- **Scope for #163:** `src/components/layout/navbar.tsx` — add `backdrop-blur` or solid background fill on the mobile menu, ensure all nav items fit in viewport, add close-on-backdrop-tap.

---

### P2 — Notable Gap

---

**FINDING-003: No active nav section highlight on scroll**

- **Page:** Homepage (all sections)
- **Severity:** P2 — wayfinding gap
- **Evidence:** All nav links have identical classes (`text-muted-foreground`) with no active/current indicator. When scrolled to the Experience section, the nav "Experience" link is not highlighted. Confirmed via JS: all 8 nav links have the same class.
- **Fix:** IntersectionObserver on each section (`#about`, `#projects`, `#skills`, `#experience`, `#education`, `#contact`) — when a section enters viewport, add an active class to the corresponding nav link. 
- **Scope for #163:** `src/components/layout/navbar.tsx` — primary deliverable of issue #163.

---

**FINDING-004: Mobile hero — primary CTAs below fold on 375px**

- **Page:** Homepage at 375px viewport
- **Severity:** P2 — primary actions not visible without scrolling
- **Evidence:** Screenshot `mobile-nav-closed.png` at 375x812: "Piyush Gupta" heading is partially visible but "Built real-time infra…" subtitle and the "See the work" / "Get in touch" CTA buttons are below the fold.
- **Root cause:** The hero section has top padding + the "Open to Sr EM roles" pill + the name at large size, consuming the full 812px viewport height before reaching the CTAs.
- **Fix:** Reduce hero top padding on mobile, or reduce the H1 font size on mobile (`text-5xl sm:text-7xl` or similar). Currently H1 is 72px which dominates the viewport.
- **Scope for #163:** `src/components/sections/hero.tsx`.

---

**FINDING-005: "More writing on Medium" link — 20px touch target height**

- **Page:** `/blog` (bottom of blog index)
- **Severity:** P2 — accessibility gap (WCAG 2.5.5 Touch Target)
- **Evidence:** Touch target audit: `{tag: "A", text: "More writing on Medium", w: 209, h: 20}`. Height is 20px, minimum is 44px.
- **Fix:** Add `py-3` (or equivalent padding) to the "More writing on Medium" link, or wrap it in a container with minimum 44px height.
- **Scope for #162:** Include in the touch-target audit sweep of ALL links/buttons.

---

**FINDING-006: "Talk page" and "Blog post" links — 16px touch target height**

- **Page:** Homepage (blog section, likely "Talk" links)
- **Severity:** P2 — accessibility
- **Evidence:** Touch target audit: `{text: "Talk page", w: 81, h: 16}` and `{text: "Blog post", w: 81, h: 16}`.
- **Fix:** Add padding to these link elements so they're at least 44px tall.
- **Scope for #162:** Part of the all-links/buttons Playwright audit.

---

**FINDING-007: Experience descriptions are prose walls — dense, not scannable**

- **Page:** Homepage `#experience` section
- **Severity:** P2 — content scannability
- **Evidence:** The Slice job description is a single 200+ word paragraph with achievements delimited by semicolons: "Shipped four AI systems now live org-wide: AI Oncall Bot (Slack — 71% query hit rate…); AI OpEx Reporter (CloudWatch/Sentry → Confluence/Slack — 4h/week per pod saved); PA/PG customer onboarding automation…". Recruiters scan, they don't read.
- **Fix:** Convert achievement lists within job descriptions to bullet points. The metric badges pattern is good (already in use for projects section) — consider extending it to experience bullets.
- **Note:** This is a content change, may need Piyush review for accuracy. Flag in #163.

---

**FINDING-008: Scroll indicator link — 43x44px (1px under minimum)**

- **Page:** Homepage hero
- **Severity:** P2 (borderline P3)
- **Evidence:** Touch target audit: `{tag: "A", text: "scroll", w: 43, h: 44}`. Width is 43px, 1px under the 44px minimum.
- **Fix:** Add `min-w-[44px]` or `px-1` to the scroll link container.
- **Scope for #162:** Part of touch target audit sweep.

---

### P3 — Polish

---

**FINDING-009: Skills section — cards invisible on first scroll (SSR/animation)**

- **Page:** Homepage `#skills` section
- **Severity:** P3 (functional — appears as a visual bug)
- **Evidence:** When navigating to `#skills`, only the first card is visible. The other 4 cards appear to be animated in via IntersectionObserver + opacity:0 initial state but the screenshot shows them at 0 opacity. Related to the SSR visibility issue in PR #169 (scroll-fade SSR fix).
- **Note:** This may be fixed when PR #169 merges. Flag to verify post-merge.

---

**FINDING-010: Contact CTA "Book a 30-min intro call" is de-emphasized**

- **Page:** Homepage `#contact` section
- **Severity:** P3 — conversion opportunity
- **Evidence:** The calendar link is displayed in muted monospace text with the same visual weight as the email address. For someone actively seeking job opportunities, this CTA deserves more visual prominence — it should be a button, not a styled text link.
- **Fix:** Convert "Book a 30-min intro call" to a secondary button (`variant="outline"`) consistent with the "Get in touch" CTA in the hero.
- **Scope for #163 (minor change).**

---

**FINDING-011: Blog index — inconsistent card heights create visual noise**

- **Page:** `/blog`
- **Severity:** P3
- **Evidence:** Blog cards have different amounts of content (one card has full description + date, another has only "Read on Medium →"), creating uneven card heights in the 2-column grid.
- **Fix:** Add `h-full flex flex-col` to card content with the date/action pinned to the bottom via `mt-auto`. This normalizes card heights.
- **Scope for #163.**

---

**FINDING-012: Math equations background disappears mid-hero (section gap)**

- **Page:** Homepage hero → About section transition
- **Severity:** P3 — visual continuity
- **Evidence:** The math equations background texture is only on the hero section. Below the hero there is an abrupt transition to solid dark background. This is a clean cutoff but visually jarring when scrolling.
- **Note:** Intentional design choice may be fine. Flag for Piyush to review — if intentional, not a bug.

---

## Quick Wins (< 30 min each)

1. **Blog post max-width** — Add `max-w-prose` to the article prose body in `src/app/blog/[slug]/page.tsx` (2 lines of code, P1 fix).
2. **"More writing on Medium" touch target** — Add `py-3` to the link (1 line fix, P2).
3. **Scroll indicator width** — Add `min-w-[44px]` to the scroll button (1 line, P2).
4. **Contact calendar link styling** — Change to button variant (5-10 lines, P3).
5. **Blog card equal heights** — Add `h-full flex flex-col` + `mt-auto` on date (3-4 lines, P3).

---

## Goodwill Reservoir

**Starting: 70/100**
- Hero is clear and credible: **+10** (strong first impression, primary actions visible at desktop)
- Math equations background is distinctive: **+5**
- Performance 1.2s load: **+5**
- Mobile hero CTAs below fold: **−10**
- Blog line length 107 chars: **−15** (reading pain — every long paragraph is cognitive tax)
- Mobile nav no backdrop: **−10**
- "More writing on Medium" touch target 20px: **−5**

**Final: 50/100** — Needs work. The content and design intent are excellent; the implementation gaps on mobile and blog reading experience are the main drains.

---

## Trunk Test (Homepage)

1. What site is this? ✅ `piyushgupta.io` — logo top-left
2. What page am I on? ✅ Homepage, clear from hero
3. What are the major sections? ✅ Nav visible with About/Projects/Skills/Experience/Education/Blog/Contact
4. What are my options at this level? ✅ "See the work" and "Get in touch" CTAs prominent at desktop
5. Where am I in the scheme? ⚠️ No active section indicator on scroll
6. How can I search? N/A — portfolio, no search needed

**Result: PARTIAL** (5/6) — trunk test passes at desktop but fails on mobile (CTAs not visible above fold = option #4 fails).

---

## Feeds Into

- **#162 (Design System Foundation):** Touch target audit sweep (FINDING-005, -006, -008), spacing scale documentation
- **#163 (UI/UX Improvements):** Blog reading width (FINDING-001), mobile nav overlay (FINDING-002), active nav (FINDING-003), mobile hero (FINDING-004), experience bullet points (FINDING-007), contact CTA (FINDING-010), blog card heights (FINDING-011)

---

## Baseline

```json
{
  "date": "2026-07-02",
  "url": "https://www.piyushgupta.io",
  "designScore": "B",
  "aiSlopScore": "A",
  "goodwill": 50,
  "findings": {
    "p1": 2,
    "p2": 6,
    "p3": 4
  },
  "quickWins": 5,
  "screenshots": "docs/design-review-20260702/screenshots/"
}
```
