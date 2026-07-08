# Design System — piyushgupta.io

Personal portfolio design system. All tokens, type scale, spacing, and component state patterns.

---

## Color Tokens

All color tokens use OKLCH for wide-gamut perceptual uniformity. Defined in `src/app/globals.css`.

### Semantic tokens

| Token | Value | Role |
|-------|-------|------|
| `--background` | `oklch(0.07 0.01 260)` | Page background (near-black, cool-tinted) |
| `--foreground` | `oklch(0.95 0 0)` | Primary text (off-white) |
| `--card` | `oklch(0.14 0.01 260)` | Card surface (slightly lighter than background) |
| `--card-foreground` | `oklch(0.95 0 0)` | Text on cards |
| `--popover` | `oklch(0.12 0.01 260)` | Popover/dropdown surface |
| `--popover-foreground` | `oklch(0.95 0 0)` | Text in popovers |
| `--primary` | `oklch(0.87 0.1 175)` | Accent (teal/mint — brand colour) |
| `--primary-foreground` | `oklch(0.07 0.01 260)` | Text on primary (dark on teal) |
| `--secondary` | `oklch(0.18 0.01 260)` | Secondary surface |
| `--secondary-foreground` | `oklch(0.9 0 0)` | Text on secondary |
| `--muted` | `oklch(0.18 0.01 260)` | Muted surface (badges, tags) |
| `--muted-foreground` | `oklch(0.6 0 0)` | Muted text (labels, timestamps) |
| `--accent` | `oklch(0.18 0.02 260)` | Hover state surface |
| `--accent-foreground` | `oklch(0.95 0 0)` | Text on accent |
| `--destructive` | `oklch(0.577 0.245 27.325)` | Error states |
| `--border` | `oklch(1 0 0 / 8%)` | Subtle borders (8% white) |
| `--input` | `oklch(1 0 0 / 12%)` | Input field borders |
| `--ring` | `oklch(0.87 0.1 175)` | Focus ring (matches primary) |
| `--neon` | `oklch(0.87 0.1 175)` | Neon glow effect (matches primary) |

### Chart / data colours

| Token | Value | Use |
|-------|-------|-----|
| `--chart-1` | `oklch(0.87 0.1 175)` | Primary data (teal) |
| `--chart-2` | `oklch(0.7 0.15 300)` | Purple |
| `--chart-3` | `oklch(0.65 0.2 145)` | Green |
| `--chart-4` | `oklch(0.7 0.18 50)` | Amber |
| `--chart-5` | `oklch(0.6 0.22 330)` | Pink |

### Border radius scale

Base radius: `--radius: 0.625rem` (10px)

| Token | Multiplier | Value | Use |
|-------|-----------|-------|-----|
| `--radius-sm` | ×0.6 | ~6px | Tight elements (badges) |
| `--radius-md` | ×0.8 | ~8px | Small components |
| `--radius-lg` | ×1.0 | 10px | Standard cards, inputs |
| `--radius-xl` | ×1.4 | ~14px | Large cards |
| `--radius-2xl` | ×1.8 | ~18px | Panels |
| `--radius-3xl` | ×2.2 | ~22px | Large containers |
| `--radius-4xl` | ×2.6 | ~26px | Hero/feature cards |

---

## Typography

### Fonts

| Family | Variable | Fallback | Use |
|--------|----------|----------|-----|
| **Geist** | `--font-sans` | `ui-sans-serif, system-ui, sans-serif` | All body and heading text |
| **Geist Mono** | `--font-mono` | `ui-monospace, monospace` | Section labels (`// ABOUT`), code, timestamps |

Both fonts are loaded via `next/font` and are locally served — no external font CDN.

### Type Scale

| Level | Size | Weight | Line-height | Use |
|-------|------|--------|-------------|-----|
| H1 | 72px (`text-7xl`) | 700 | 1.1 | Page title (name) — hero only |
| H2 | 36px (`text-4xl`) | 700 | 1.25 | Section headings |
| H3 | 18px (`text-lg`) | 600 | 1.5 | Card headings (experience, education, projects) |
| H3 (skills) | 16px (`text-base`) | 600 | 1.5 | Skill category headings |
| Body | 16px (`text-base`) | 400 | 1.625 | Paragraph text |
| Small | 14px (`text-sm`) | 400 | 1.5 | Card descriptions, secondary content |
| Caption | 12px (`text-xs`) | 400–500 | 1.5 | Timestamps, tags, section labels |
| Code | 14px (`text-sm`) | 400 | 1.625 | Inline code, monospace labels |

**Section label pattern:** `// SECTION_NAME` in `font-mono text-xs tracking-widest` uppercase, muted foreground colour. Used consistently above every H2 section heading.

### Reading Width

- Blog post prose body: **max 65–75ch** (`max-w-2xl` or `max-w-prose`)
- Homepage content: `max-w-4xl` (64rem = 1024px)
- Wide containers: `max-w-6xl` for projects/blog grid

---

## Spacing Scale

Base unit: **4px**. All spacing follows multiples of 4px.

| Step | Value | Tailwind | Typical use |
|------|-------|----------|-------------|
| 1 | 4px | `p-1` / `m-1` | Inline icon gaps |
| 2 | 8px | `p-2` / `m-2` | Badge padding |
| 3 | 12px | `p-3` | Button padding (compact) |
| 4 | 16px | `p-4` | Card padding (small) |
| 5 | 20px | `p-5` | — |
| 6 | 24px | `p-6` | Standard card padding, section side padding |
| 8 | 32px | `p-8` | Card padding (large) |
| 10 | 40px | `p-10` | — |
| 12 | 48px | `p-12` | — |
| 16 | 64px | `p-16` | — |
| 20 | 80px | `p-20` | — |
| 24 | 96px | `py-24` | Section vertical padding (all sections) |

**Section padding pattern:** All homepage sections use `py-16 md:py-24 px-6` consistently.

---

## Component States

### Buttons

| State | Visual |
|-------|--------|
| Default | Background: `--primary` or `--secondary`, border transparent |
| Hover | Background slightly lighter, scale 1.02 |
| Focus | 2px `--ring` outline with `outline-offset: 2px` |
| Active | `translate-y-px` (subtle press effect) |
| Disabled | `opacity-50`, `pointer-events-none` |

### Links (nav)

| State | Visual |
|-------|--------|
| Default | `text-muted-foreground` |
| Hover | `text-foreground` (via `transition-colors`) |
| Active/current | — not yet implemented; target: `text-foreground` + bottom border |
| Focus visible | 2px `--ring` outline |

### Cards

| State | Visual |
|-------|--------|
| Default | `border-border/50 bg-card/50` |
| Hover | `border-primary/30` + gradient overlay `opacity: 0 → 1` |
| Focus within | Inherits focus-visible ring on interactive children |

### Form inputs (contact)

| State | Visual |
|-------|--------|
| Default | `border: --input` (12% white) |
| Focus | `border-ring` + `ring-ring/50` |
| Error | `border-destructive` + `ring-destructive/20` |

---

## Touch Target Requirements

**Minimum:** 44×44px on ALL interactive elements (`<a>`, `<button>`, `[role="button"]`, `<input>`, `<select>`, `<textarea>`).

This is enforced via WCAG 2.5.5 Success Criterion (AA).

**Implementation pattern:**
```tsx
// Correct: min-h-[44px] + min-w-[44px] on the interactive element
<a href="#section" className="inline-flex min-h-[44px] min-w-[44px] items-center ...">

// For text-only links that look too large with visible padding, hide the padding visually:
<a href="#section" className="inline-flex min-h-[44px] items-center px-1 -mx-1 ...">
```

**Utility class:** `.touch-target { min-height: 44px; min-width: 44px; }` (defined in `globals.css`)

---

## Motion & Animation

### Principles
- Easing: ease-out for entering, ease-in for exiting
- Duration: 300–500ms for section fade-ins, 200ms for hover transitions
- Purpose: fade-up reveals communicate hierarchy; hover transitions confirm interactivity

### Global prefers-reduced-motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
Combined with `MotionConfig reducedMotion="user"` in `MotionProvider` — all Framer Motion animations also respect this.

### Common animation pattern (fade-up on scroll)
```tsx
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: shouldReduce ? 0 : 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : delay },
});
```

### SSR visibility
Animated elements must render visible on server (opacity: 1) and animate in client-side. Use mounted gates to avoid flash of invisible content.

---

## Design Principles

1. **Geist — not a generic font.** The Geist typeface was chosen deliberately. Do not swap to Inter, Roboto, or system-ui.
2. **Dark-first.** The site is dark-mode only. No light mode. `background` is near-black with a cool blue-grey cast.
3. **Teal accent is the only brand colour.** `--primary` (`oklch(0.87 0.1 175)`) appears on: the gradient-text name, focus rings, primary CTAs, active states, card hover borders. All other colours are neutrals.
4. **Monospace labels for tech context.** Section labels (`// ABOUT`, timestamps, tech tags) use `font-mono` to signal the engineering context.
5. **Section rhythm is consistent.** Every section: monospace label → H2 heading → muted subtitle → content. Do not break this pattern.
6. **Cards earn their existence.** Cards appear only where they group discrete, comparable items (experience entries, projects, blog posts). Do not add decorative card grids.
