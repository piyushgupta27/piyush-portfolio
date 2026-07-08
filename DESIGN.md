# DESIGN.md — piyushgupta.io

**Established:** 2026-07-06 (Issue #161 — comprehensive design review)  
**Owner:** Piyush Gupta  
**Status:** Living document — update on every design-touching PR

> This is the design source of truth for piyushgupta.io. All design decisions live here.
> When making UI changes, check this file first. When you make a design decision not covered here, add it.

---

## What this site is

Personal portfolio for Piyush Gupta — Sr Engineering Manager open to roles at Series A-D AI companies. Target audience: UK/EU/SG hiring managers and senior technical recruiters evaluating candidates for VP Eng / Sr EM roles.

**The one thing a visitor should remember:** "Built real-time infra for 50M+ concurrent users. Founded an AI startup. Still ships AI code." Three declarative facts. Not a resume, not a showcase — a claim backed by evidence.

**Design register:** Premium, technical, personal. Not startup-generic. Not agency-polished. Like the work of an engineer who has extremely good taste and doesn't outsource their identity.

---

## Color System

All colors use OKLCH (perceptual uniformity — consistent contrast across hues). Dark mode only. No light mode toggle.

### Core tokens (from globals.css)

```css
/* Surfaces */
--background:        oklch(0.07 0.01 260);   /* near-black — page base */
--card:              oklch(0.12 0.01 260);   /* card surface — 0.05L delta from background */
--secondary:         oklch(0.18 0.01 260);   /* elevated surface */
--muted:             oklch(0.18 0.01 260);   /* muted surface */
--sidebar:           oklch(0.10 0.01 260);   /* nav surface */

/* Text */
--foreground:        oklch(0.95 0 0);        /* primary text — near white */
--card-foreground:   oklch(0.95 0 0);        /* text on cards */
--muted-foreground:  oklch(0.60 0 0);        /* secondary/hint text — ~5:1 contrast */

/* Brand */
--primary:           oklch(0.87 0.10 175);   /* teal accent — signature brand color */
--primary-foreground: oklch(0.07 0.01 260);  /* text on primary bg */

/* System */
--border:            oklch(1 0 0 / 8%);      /* subtle borders */
--input:             oklch(1 0 0 / 12%);     /* input borders */
--ring:              oklch(0.87 0.10 175);   /* focus ring */
--neon:              oklch(0.87 0.10 175);   /* neon-glow box-shadow color */
--radius:            0.625rem;               /* 10px — card border radius */
```

### Color use rules

**Primary teal `oklch(0.87 0.10 175)` is the ONLY brand color.** It should read as the unmistakable signature — not diluted by competing accents.

- Use `text-primary` for: section eyebrows (sparingly), active nav states, key metric highlights, CTA button backgrounds
- Use `neon-glow` class for: the headshot card only (1 instance)
- **Never use gradient text** — `gradient-text` class (background-clip: text with a cyan→purple gradient) is **banned** on all brand elements. This is the canonical 2024 AI-era template signal. The primary teal solid is the replacement.
  - `hero.tsx:44` — "Gupta" gradient → change to `text-primary`
  - `navbar.tsx:90` — logo gradient → change to `text-primary`  
  - `about.tsx:117` — stat values gradient → change to `text-primary`

### Background depth

The `oklch(0.07 0.01 260)` base is intentional and premium. Do not lighten it. The blue-black hue (260°) adds subtle coolness that reads as technical.

### Card/background delta: known gap

Current card delta (0.12 vs 0.07 = 0.05L) is too small for legibility at low content density. Cards disappear into the background when content is sparse. Future direction: raise card to `oklch(0.14 0.01 260)` for a 0.07L delta. Do not apply glassmorphism as a workaround (see Absolute Bans).

---

## Typography

### Font stack

```css
--font-sans:    "Geist", "Geist Fallback", ui-sans-serif, system-ui, sans-serif;
--font-mono:    "Geist Mono", "Geist Mono Fallback", ui-monospace, monospace;
--font-heading: var(--font-sans);   /* ⚠️ heading intentionally = body font (known gap — see below) */
```

**Geist is a deliberate choice.** It's Vercel's own typeface — technical, precise, non-generic. It signals taste without being ostentatious. Do not replace it with Inter, Roboto, or system-ui.

**Known gap: heading font = body font.** `--font-heading: var(--font-sans)` is not a design decision — it's an omission inherited from the shadcn starter. A future improvement is giving the heading a distinct weight or optical size (e.g., Geist at different weight settings or a complementary display face). Until that decision is made intentionally, keep Geist for both but use weight and size to create hierarchy.

### Type scale (inferred from live DOM)

| Level | Size | Weight | Use |
|-------|------|--------|-----|
| H1 | 72px | 700 | Hero name — display, single line |
| H2 | 36px | 700 | Section titles |
| H3 | 20-22px | 600 | Card/item titles — **target; current 16-18px is too small** |
| Body | 16px | 400 | Paragraph text |
| Secondary | 14px | 400 | Captions, metadata, tech badges |
| Mono | 14px | 400 | Terminal component, code snippets |

**H3 is currently 16px in the Skills section — same as body text. This has no visual hierarchy. Minimum H3 = 20px across all sections.**

### Line-height and spacing

- H1: line-height 1.1 (currently 1.0 — acceptable single-line, risky if wraps)
- Body: 1.5 (24px at 16px base)
- Section subtitles: keep line-length ≤ 75ch on desktop (currently unconstrained)

---

## Spacing & Layout

- Section vertical rhythm: `py-16 md:py-24` (96px) — consistent across all sections ✅
- Container: `max-w-6xl mx-auto` (1152px)
- Content grid: Tailwind responsive grid (1-col → 2-col → 3-col)
- Card padding: `p-6` (24px)
- Gap between cards: `gap-6` (24px)

### Border radius

`--radius: 0.625rem` (10px) → Tailwind `rounded-[calc(var(--radius))]` or `rounded-xl` (12px) and `rounded-2xl` (16px) used across components. Consistent and controlled — not "bubbly."

---

## Components

### Cards

**Current implementation:** `border-border/50 bg-card/50 backdrop-blur-sm`

`bg-card/50 backdrop-blur-sm` is glassmorphism. It is **banned as the default card treatment** (see Absolute Bans). 28 instances exist today.

**Target implementation:** `border-border/50 bg-card` — opaque card background with no blur. Projects cards may retain a `bg-gradient-to-br ${project.gradient}` on hover for per-card identity; this is acceptable because it's hover-state not default-state.

**Exception:** The navbar may retain `backdrop-blur-sm` — one instance at the top of the viewport is acceptable and serves a functional purpose (legibility while scrolling).

### Section headings

`SectionHeading` component renders: `// LABEL` (eyebrow) + H2 title + subtitle.

**The `//` eyebrow pattern is BANNED on more than 2 sections.** Currently appears on all 9 sections via the shared component. This is scaffolding, not voice. 

Rules for eyebrows:
- Use on ≤ 2 sections where the code/terminal aesthetic is on-brand (e.g., About with the terminal widget, or Contact)
- Remove from: Skills, Projects, Experience, Education, Blog, Press, Hero
- The H2 should stand on its own — "What I've Built" doesn't need `// projects` above it

### Navigation

- Max 5-6 nav items (currently 7)
- Order must match page scroll order: About → Experience → Projects → Skills → Education → Blog → Contact
- Active state: visually highlighted ✅ + `aria-current="page"` on active link (currently missing)
- Blog link: add `<ArrowUpRight />` icon to signal external/route navigation (not a scroll anchor)
- Hamburger: change `cursor: default` → `cursor: pointer`

### Status pill (hero)

The `"Open to Sr EM roles · UK · Ireland · Europe · UAE · Saudi Arabia · Singapore · Remote"` pill is excellent. Do not remove or minimize it. Hiring managers need this immediately. The green pulse dot reinforces "active."

### Hero CTA

- **Primary CTA: "See the work" → `#experience`** (currently links to `#projects` — this is wrong for the EM hiring audience)
- Max 2 CTAs in the hero (currently 3)
- Primary: `href="#experience"` with primary variant styling ✅
- Secondary: contact link

---

## Motion & Animation

### Architecture (feature/issue-166-cwv branch — will merge to main)

All animations use CSS keyframes + `useInView` IntersectionObserver hook. No Framer Motion. This is the target architecture.

**How it works:**
- `useInView(threshold)` → fires IntersectionObserver, sets `inView = true` once when element crosses viewport
- `FadeIn` component → `style={{ animation: '...' }}` applied when `inView = true`
- `StaggerChildren` → `data-stagger="visible/hidden"` on wrapper; CSS selects `:nth-child` with staggered delay
- Globals CSS → keyframes `fade-in-up`, `fade-in-down`, `fade-in-left`, `fade-in-right`

### Reduced-motion: two-layer protection

Layer 1 (JS): `useInView` checks `window.matchMedia("(prefers-reduced-motion: reduce)")` — if true, sets `inView = true` immediately, bypassing all animation.

Layer 2 (CSS): `@media (prefers-reduced-motion: reduce)` in `globals.css` collapses all animation durations to 0.

Both layers are present and correct. Do not remove either.

### Motion rules

| Rule | Value | Rationale |
|------|-------|-----------|
| Translate distance | 14px max | 30px (current) is too aggressive — reads as a glitch, not a reveal |
| Default easing | `cubic-bezier(0.21, 0.47, 0.32, 0.98)` | In ease-out family; current value ✅ |
| Hero easing | `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) | Hero needs more authority than sections |
| Scroll reveal | Enhance visible content, never gate it | If content is below fold, FadeIn is fine. If content is in viewport on load, no fade. |
| FadeIn use | ≤ 3 sections max | Not every section. Reserve for hero, one featured card, Experience entry |
| Stagger use | ≤ 2 sequences site-wide | Projects grid (good) + About stats (good) = done |
| `transition-all` | Never | Always specify explicit properties: `transition-colors, opacity, transform` |

### Scroll indicator (hero)

The scroll indicator arrows / animation should complete in ≤ 1.4s total. Current 2s is too slow and users interpret slow = unresponsive.

---

## Accessibility

Baseline requirements — every PR must pass:

| Requirement | Status | File |
|-------------|--------|------|
| Skip-to-content link | ✅ PRESENT | layout.tsx:83 |
| `aria-expanded` on mobile nav | ✅ PRESENT | navbar.tsx |
| `prefers-reduced-motion` guard | ✅ PRESENT | useInView hook + globals.css |
| All images have alt text | ✅ PRESENT | verified |
| Focus visible on interactive elements | ✅ PRESENT | globals.css `:focus-visible` |
| WCAG AA contrast: primary text | ✅ ~15:1 | foreground on background |
| WCAG AA contrast: nav links | ⚠️ ~5:1 | barely passing; improve to ≥6:1 |
| WCAG AA contrast: `muted-foreground` tags/sub-text | ✅ 5.1:1 | computed: `oklch(0.6 0 0)` on darkest surface `bg-secondary/30` — passes AA |
| `aria-current` on active nav | 🔴 MISSING | navbar.tsx — add to active item |
| Hamburger cursor | 🔴 DEFAULT | navbar.tsx — change to `pointer` |
| Vercel Analytics CSP | 🔴 BLOCKED | CSP config — allow `va.vercel-scripts.com` |

---

## Absolute Bans

These patterns are BANNED on this site. If a PR introduces one, it should not merge without explicit design sign-off.

| Ban | Reason | Current status |
|-----|--------|----------------|
| `gradient-text` / `background-clip: text` on brand elements | 2024 AI-template signal; dilutes brand | 🔴 6 instances |
| `backdrop-blur-sm` as default card treatment | glassmorphism at scale = cards invisible | 🔴 28 instances |
| `// LABEL` eyebrow on more than 2 sections | scaffolding, not voice; all 9 sections today | 🔴 9 instances |
| `blur-[120px]` CSS filter on scroll-path elements | performance + design cliché | 🔴 hero.tsx:27-28 |
| Identical card grids (uniform size + structure) | template feel | ⚠️ Skills section |
| `transition-all` on interactive elements | performance anti-pattern | 🔴 cards, skip link |
| Decorative section numbering (01/02/03) | not used currently | ✅ PASS |

---

## Section Order

### Page (scroll order)
1. Hero
2. About
3. Experience
4. Projects
5. Skills
6. Education
7. Press & Recognition
8. Blog & Talks
9. Contact

### Navigation (must match page order)
About → Experience → Projects → Skills → Education → Blog → Contact

**Press is intentionally excluded from the nav** (it's visually prominent within the page; adding it creates 8 nav items). Reconsider if the page order is ever restructured.

---

## Copy Principles

**The extraordinary must be treated as extraordinary.** The site has genuinely unusual numbers:

- **50M concurrent users** — only a handful of people on earth can claim this
- **250B messages processed** — this deserves its own visual moment, not a cell in a grid
- **Disney India CEO/CTO/SVP Product as investors** — named, verifiable social proof

These claims should never be buried in prose. They should be in:
- Dedicated callouts with visual weight
- Scannable format (not sentence-embedded)
- Above the fold or in the first scroll of the relevant section

**Avoid:**
- Relocation information appearing more than once (currently 3 times — hero badge, hero sub-tagline, contact)
- Passive voice ("was responsible for...")
- Tech badge clouds that signal IC anxiety at EM level

---

## Design Review Scores (2026-07-06 baseline)

| Dimension | Score | Primary P1/P2 gaps |
|-----------|-------|-------------------|
| Visual Identity | 4/10 | Gradient text, glassmorphism, eyebrows |
| Information Architecture | 5/10 | CTA to #projects, nav order wrong |
| Typography | 4/10 | --font-heading=--font-sans, H3 too small |
| Color System | 4/10 | Gradient text, card delta too small |
| Motion/Interaction | 6/10 | translateY 30px → 14px, ease-out |
| Accessibility | 6/10 | Missing aria-current, Analytics CSP |
| Mobile Experience | 5/10 | About text wall, content density |
| Content Strategy | 7/10 | Skills IC framing, visa signal absent |
| First Impression | 5/10 | CTA destination |
| Trust & Credibility | 7/10 | highest — content is strong |
| **Overall** | **5.3/10** | |

**Path to 7/10 (4-6 hours):** Fix P1s (gradient text, glassmorphism, eyebrows) + hero CTA destination.  
**Path to 9/10 (~2-3 days):** All P1/P2 + distinct typographic identity + 250B visual moment + skills EM reframe.

---

## Related docs

- `docs/design-review-checklist.md` — Layer 1 (automated) + Layer 2 (judgment) PR checks
- Full review findings — stored in private vault (not in repo)
- Dimension scores with rationale — stored in private vault (not in repo)
