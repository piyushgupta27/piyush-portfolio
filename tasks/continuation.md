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
