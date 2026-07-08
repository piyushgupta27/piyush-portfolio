# Portfolio Design Review Checklist

**Created:** 2026-07-06 (Issue #161)  
**Owner:** piyushgupta.io  
**Review cadence:** Layer 1 runs on every PR. Layer 2 runs on UI-touching PRs, quarterly in full.

---

## How to use this

**Layer 1 (automatable)** — can be wired into CI/pre-commit. Run before every merge that touches UI.  
**Layer 2 (judgment-only)** — run on changed components only, not the full page. No tooling replaces human assessment here.

> Future session: wire Layer 1 checks into CI after #166 lands.

---

## Layer 1 — Automatable (run every PR)

### Accessibility
- [ ] WCAG AA contrast: body text ≥ 4.5:1 against background (current: `oklch(0.95 0 0)` on `oklch(0.07 0.01 260)` — est. 15:1 ✅)
- [ ] WCAG AA contrast: primary color `oklch(0.87 0.1 175)` on background — verify ≥ 4.5:1
- [ ] WCAG AA contrast: `muted-foreground` `oklch(0.6 0 0)` — computed 5.1:1 on `--background`, 5.0:1 on `bg-secondary/30` over background — passes AA ✓ (tags, career arc, sub-text)
- [ ] Skip-to-content link present and focusable (`layout.tsx` — currently ✅)
- [ ] All interactive elements have `aria-label` if no visible text
- [ ] `aria-expanded` on toggles (navbar mobile button — currently ✅)
- [ ] No `role` misuse
- [ ] All images have `alt` text or `aria-hidden` if decorative

### Responsive
- [ ] No horizontal scroll at 375px viewport width
- [ ] No content overflow at 320px
- [ ] All touch targets ≥ 44×44px (currently enforced via `min-h-[44px]` ✅)
- [ ] Text readable without pinch-zoom at 375px

### Animation
- [ ] `@media (prefers-reduced-motion: reduce)` collapses all CSS animations (currently ✅ via globals.css global rule)
- [ ] No Framer Motion component missing `useReducedMotion()` guard (experience.tsx, press.tsx — verify)
- [ ] `animate-scroll-nudge` (hero arrow) respects reduced-motion ✅

### Token adherence
- [ ] No raw hex or rgb() colors outside globals.css / token definitions
- [ ] No hard-coded px spacing values outside the Tailwind scale
- [ ] Background-clip: text (gradient-text) only on explicitly approved elements

### Performance
- [ ] No `blur-[120px]` or large CSS filter on scroll-path elements (currently 🔴 hero.tsx:27-28)
- [ ] No `backdrop-blur` on more than 2 elements per section (currently 🔴 — all cards use `backdrop-blur-sm`)

---

## Layer 2 — Judgment-only (run on changed components)

### Brand & Persona
- [ ] Does this feel like Piyush at Hotstar/Slice-calibre EM level, or a developer template?
- [ ] Does every section earn its position in the visual hierarchy?
- [ ] Are scale claims (50M CCU, 250B msgs, 15x P99) visually treated as the extraordinary things they are — or as generic stats?
- [ ] Does the design register match Sr EM seniority (org impact lead) vs IC seniority (tech stack lead)?

### First Impression / Emotional Arc
- [ ] 3-second test: can a recruiter identify (1) who this is, (2) what they do, (3) why they're remarkable — before first scroll?
- [ ] Hero: primary CTA leads to the right destination for EM audience (#experience, not #projects)
- [ ] Hero: availability badge answers "why am I here" immediately
- [ ] Sub-tagline: no redundant information already in the availability badge

### Customer Journey — UK Tech Recruiter
- [ ] Team size led: scannable within 30 seconds (not buried in paragraph prose)
- [ ] Companies: visible within 30 seconds
- [ ] Biggest achievement with scale number: above the fold or in Experience H2 equivalent
- [ ] Visa/work authorization signal: clearly stated (UK Skilled Worker / EU citizen / etc.)
- [ ] Contact: reachable in ≤ 2 clicks from any section
- [ ] "Would I call them?" test: one element above the fold that answers this

### Customer Journey — EU/SG Hiring Manager
- [ ] International signals: visible (SEA localisation, cross-market users, exchange education)
- [ ] Org-scale signals: manager-of-managers evidence visible if applicable
- [ ] Culture-building vs delivery balance: culture signal ≥ 1 prominent mention (Architecture Council, team development)
- [ ] Domain expertise for role: fintech / platform / distributed systems skills surfaced

### Narrative Coherence
- [ ] Section order builds conviction: hero → about → experience → [projects | skills] → education → blog → contact
- [ ] JumpingMinds "wound down cleanly" treated as senior-maturity signal (not buried)
- [ ] Disney vote of confidence in a visually prominent position

### AI Slop Test
- [ ] First order: cannot guess theme+palette from "portfolio site" alone
- [ ] Second order: cannot guess aesthetic family from "dark + teal + senior EM portfolio" alone
- [ ] No gradient text on primary name/brand elements (`gradient-text` on "Gupta" — currently 🔴)
- [ ] No identical card grids (all same size, all same structure)
- [ ] Section eyebrows (// label) on ≤ 2 sections (currently 🔴 — all 8 sections)
- [ ] No glassmorphism as default card treatment (currently 🔴 — all cards)

### Typography Nuance
- [ ] Heading font has its own identity (not `--font-heading: var(--font-sans)`)
- [ ] Body line length 45–75ch at desktop
- [ ] Mobile H1 feels authoritative at EM level (size + weight)
- [ ] Reading rhythm: no widow/orphan in key copy passages

### Dark Mode Quality
- [ ] Background depth: near-black (`oklch(0.07 0.01 260)`) — appropriately deep ✅
- [ ] Card contrast vs background: `oklch(0.12 0.01 260)` vs `oklch(0.07 0.01 260)` — delta of 0.05L (borderline — verify visually)
- [ ] Primary teal reads as intentional brand color, not accent tacked on
- [ ] Muted-foreground readable for secondary text

### Interaction Quality
- [ ] Animations earn their place — not applied uniformly to every section
- [ ] Transition curves: ease-out family (currently ✅ — cubic-bezier(0.21, 0.47, 0.32, 0.98))
- [ ] Stagger used deliberately on ≤ 1-2 sequences (not every section)
- [ ] Hover states feel designed (not default opacity transitions)
- [ ] No linear or bounce/elastic transitions
- [ ] Scroll reveals enhance already-visible content (not gate content)

### Mobile-Specific
- [ ] Mobile nav: designed for mobile (not shrunken desktop nav)
- [ ] About section: visual anchor (image/graphic) visible before text starts scrolling on mobile
- [ ] Thumb reach: primary CTAs reachable without stretching
- [ ] Content density: readable without zoom
- [ ] No animations that degrade battery/performance on mobile

---

## Absolute Bans (zero tolerance — every PR)

| Ban | Current Status | File |
|-----|----------------|------|
| `background-clip: text` gradient on name/brand | 🔴 PRESENT | hero.tsx:44, navbar.tsx:90, about.tsx:124 |
| Glassmorphism as default (all cards) | 🔴 PRESENT | projects.tsx, blog.tsx, skills.tsx, contact.tsx, about.tsx, education.tsx |
| `// label` eyebrow on every section (>2) | 🔴 PRESENT | all 8 sections |
| Section markers (01/02/03) decorative | ✅ NOT PRESENT | — |
| Hero-metric template without semantic weight | 🟡 BORDERLINE | about.tsx stats grid — evaluate per impeccable rubric |
| `blur-[120px]` CSS filter on scroll-path | 🔴 PRESENT | hero.tsx:27-28 |

---

## CI Gate Spec (implement after #166 — do NOT wire in #161)

| Gate | Tool | File | Status |
|------|------|------|--------|
| WCAG AA contrast check | axe-core via Playwright | New test | Not wired |
| Lighthouse a11y ≥ 100 | lighthouserc | `lighthouserc.js` | Coordinate with #166 |
| Lighthouse perf ≥ 90 | lighthouserc | `lighthouserc.js` | Coordinate with #166 |
| No horizontal scroll at 375px | Playwright test | New test | Not wired |
| Token adherence (no raw hex/px) | eslint rule or stylelint | Config | Not wired |
| ARIA landmarks check | eslint-plugin-jsx-a11y | `.eslintrc` equivalent | Check installed |
