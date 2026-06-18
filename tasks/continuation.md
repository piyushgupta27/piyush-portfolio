---
name: piyush-portfolio continuation doc
description: Compact-survival working state for the portfolio repo. Active context (maintained by the assistant) + Snapshots (auto-appended by the PreCompact hook).
updated: 2026-06-11
---

# Continuation — piyush-portfolio

Compact-survival doc. Two halves:

- **Active context** — maintained by the assistant at concrete triggers (PR merge,
  direction change, debugging session concluded, etc.). Newest entries on top.
- **Snapshots** — auto-appended disk-state snapshots from the PreCompact hook.

See `~/.claude/docs/continuation-doc-system.md` for the full system.

## Active context

### 2026-06-18 — Sprint 3 plan drafted; retroactive S1/S2 plans written

**State:** main @ d765af0 (tdd-guard-vitest merged via #81). Sprint 3 plan drafted and awaiting manager approval before any dispatch.

**Sprint docs created:**
- `tasks/sprint-1-plan.md` — retroactive, 11 PRs, May 31–Jun 2 (content bootstrap)
- `tasks/sprint-2-plan.md` — retroactive, 16 PRs, Jun 11–18 (platform hardening + design polish)
- `tasks/sprint-3-plan.md` — forward plan, DRAFT awaiting approval (content depth + blog)

**Process decision:** retros start Sprint 3 onwards; S1/S2 have plan docs only.

**Sprint 3 scope (pending approval):** #70 (about rewrite), #69 (case studies), #74 (resume PDF), #73 (OG tags), #68 (blog section). All run via `pnpm sdlc dispatch --project piyush-portfolio` from `~/Workspace/piyush-portfolio`. Content (#68, #70) requires Piyush review before merge.

**Pending / open:**
- PR #80 (dependabot dev-and-minor bump) — CI failing, needs investigation
- UI-test epic (#32, #36, #37, #38) — blocked, Sprint 4
- Sprint 3 dispatch — waiting for manager go-ahead

### 2026-06-11 — ai-sdlc onboarding hardening (branch: chore/ai-sdlc-onboarding-hardening)

**State:**
- Portfolio is an ai-sdlc testbed; `sdlc doctor --project piyush-portfolio` was red on
  3/4 checks and had no CI. This branch closes the onboarding-contract gaps.
- Working branch `chore/ai-sdlc-onboarding-hardening` cut from `main` (the content
  branch `feature/real-content-blog-and-headshot` is separate, untouched).

**Just completed:**
- Fixed the red test gate: 5 test files used Node's `node:test` runner under `vitest` →
  swapped imports to `vitest`. Suite now 79 passing / 7 files green.
- ai-sdlc doctor gaps: added `validationCommands` to the project config, injected the
  CLAUDE.md rule-block, added PR template.
- Added: CI (`ci.yml`, pnpm + Node 22), runtime pinning (`.nvmrc` / `engines` /
  `packageManager`), Biome (format-only), `.editorconfig`, issue templates, `SECURITY.md`,
  `CODEOWNERS`, `LICENSE` (MIT), `dependabot.yml`, this continuation doc.
- Logged the full onboarding-contract coverage map + architect review to ai-sdlc #47.

**Up next:**
- Open the single PR for all of the above; land it.
- GitHub-side: create canonical labels, enable branch protection on `main`, create the
  project board + columns.
- Then resume the original goal: (#2) design review on the live site, (#3) content work.

**Reference docs:**
- ai-sdlc onboarding contract gaps → ai-sdlc issue #47
- `CLAUDE.md` (this repo) — Blast Radius / Red zone

## Snapshots
