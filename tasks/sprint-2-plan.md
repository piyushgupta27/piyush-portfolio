---
sprint: 2
theme: "Harden the platform, polish the design"
status: COMPLETE — plan written retroactively 2026-06-18
dates: 2026-06-11 → 2026-06-18
---

# Sprint 2 Plan — piyush-portfolio

> **Note:** This plan was written retroactively on 2026-06-18. No upfront plan existed; this documents what was committed and delivered. Retros begin at Sprint 3.

## Sprint goal

Close the ai-sdlc onboarding contract, establish a working CI gate and test suite, fix the most visible design and a11y issues, and get the codebase into a state where future sprints can run through the full dispatch pipeline with confidence.

---

## Scope

### Delivered (16 PRs, Jun 11 – Jun 18)

**Platform / CI / process**

| PR | What shipped |
|----|-------------|
| #23 | ai-sdlc onboarding contract: CI (`ci.yml`), runtime pinning (`.nvmrc`, `engines`, `packageManager`), Biome format-only, `.editorconfig`, issue templates, `SECURITY.md`, `CODEOWNERS`, `LICENSE` (MIT), `dependabot.yml`; fixed red test gate (5 test files using `node:test` swapped to `vitest`) — 79 tests passing |
| #58 | Process: gitignore machine-local artifacts; add session-start checklist to `CLAUDE.md` |
| #59 | Process: sync PR template to ai-sdlc canonical 10-section format |
| #81 | Tooling: wire `tdd-guard-vitest@0.2.0` reporter in `vitest.config.ts`; suppress ast-grep native builds |

**Test infrastructure**

| PR | What shipped |
|----|-------------|
| #39 | UI-test 1/5: Playwright scaffold + config (`playwright.config.ts`, base fixtures) |
| #40 | UI-test 2/5: functional/smoke e2e specs (renders, nav links, hero CTAs present) |

**Design + a11y fixes**

| PR | What shipped |
|----|-------------|
| #50 | Design batch 1: section spacing (`py-32` → `py-16 md:py-24`), photo crop (`object-top`), skills card heading size fix, contact copy rewrite, scroll indicator gap fix |
| #65 | Design: remove grid background (invisible at normal scale, visual noise at zoom) |
| #66 | a11y: raise all interactive elements to 44px touch target minimum (logo, nav, icon buttons) |
| #67 | Design: remove icon-in-circle decoration from project cards |

**Dependency updates**

| PR | What shipped |
|----|-------------|
| #62 | `typescript` 5.9.3 → 6.0.3 |
| #77 | dev-and-minor group bump (14 packages including vitest 3→4, @types/node 20→25) |
| #79 | Biome 1.9.4 → 2.5.0 |
| #24 | `actions/checkout` 4 → 6 |
| #25 | `actions/setup-node` 4 → 6 |
| #26 | `pnpm/action-setup` 4 → 6 |
| #31 | `@vitest/coverage-v8` 3.2.4 → 4.1.8 |

### What was explicitly not done
- No formal sprint plan or AC checklist upfront
- No retro (retroactive plan only; retros start Sprint 3)
- UI-test 3/5 (a11y e2e), 4/5 (visual regression), 5/5 (e2e CI) — blocked, carried to Sprint 4
- No content depth work (Sprint 3)
- No OG tags (Sprint 3)

---

## Acceptance criteria (as-shipped)

### CI gate (#23)
- [x] `ci.yml` runs on every PR: typecheck + lint + format + test + build
- [x] All 115 unit tests pass (79 at #23 close, grew to 115 with #40 smoke specs)
- [x] Node 22 pinned (`.nvmrc`, `engines`, `packageManager`)
- [x] Biome format enforced (zero violations on merge)

### Test infrastructure (#39, #40)
- [x] Playwright configured with `playwright.config.ts`
- [x] Smoke e2e specs cover: page renders, nav links, hero CTAs

### Design + a11y (#50, #65, #66, #67)
- [x] All interactive elements ≥44px touch target
- [x] Grid background removed
- [x] Icon decoration removed from project cards
- [x] Section vertical spacing tightened to `py-16 md:py-24`
- [x] Profile photo crop shows face/head (`object-top`)
- [x] Skills card headings ≥16px

### Process (#58, #59, #81)
- [x] Machine-local files gitignored (`.continuation-doc-path`, TDD Guard data)
- [x] PR template matches ai-sdlc 10-section canonical
- [x] Session-start checklist in `CLAUDE.md`
- [x] TDD Guard receiving test events via `tdd-guard-vitest` reporter

### Deps (#62, #77, #79, #24–#31)
- [x] All dependabot bumps merged; no known CVEs in updated packages
- [x] TypeScript 6, Biome 2, Vitest 4 all green

---

## Sprint outcome

All 16 PRs merged to main. Full CI gate established. Test suite at 115 passing. Design and a11y baseline solid. Platform ready for content sprint (Sprint 3).

**Known gaps carried forward:**
- UI-test 3–5 blocked (a11y e2e, visual regression, e2e CI workflow) → Sprint 4
- No mobile nav → Sprint 4
- No OG image or analytics → Sprint 3 (#73) and Sprint 4 (#75)
- No blog section, about rewrite, or case study depth → Sprint 3
