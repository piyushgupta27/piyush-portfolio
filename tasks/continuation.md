---
name: piyush-portfolio continuation doc
description: Compact-survival working state for the portfolio repo. Active context (maintained by the assistant) + Snapshots (auto-appended by the PreCompact hook).
updated: 2026-06-19
---

# Continuation — piyush-portfolio

Compact-survival doc. Two halves:

- **Active context** — maintained by the assistant at concrete triggers (PR merge,
  direction change, debugging session concluded, etc.). Newest entries on top.
- **Snapshots** — auto-appended disk-state snapshots from the PreCompact hook.

See `~/.claude/docs/continuation-doc-system.md` for the full system.

## Active context

### 2026-06-19 — Content research complete; confirmed facts; ready to implement copy pass

**Research sources used:**
- `~/Workspace/ai-workspace/career/about/profile.md` — canonical candidate profile
- `~/Workspace/ai-workspace/career/work-history/{disney-hotstar,jumpingminds-ai,slice}/achievements.md` — verified achievement data
- GitHub README piyushgupta27 (scraped)
- Live portfolio files read

**Confirmed ground truth (all facts locked, implement from these):**

| Field | Current site | Correct value |
|---|---|---|
| jM user count | 3M+ | **1M+** |
| jM title | Co-founder & CPO | **Co-Founder & CTO** (→ later CPO) |
| jM period | 2018–2024 | **Jun 2021–Aug 2024** |
| YC W21 | Claimed | **FALSE — remove; replace with Google for Startups Accelerator 2022** |
| Disney+ Hotstar | Absent | **Add as 3rd experience card** |
| Skills section | Wrong template data (PyTorch etc.) | **Complete replacement** |

**5 files need edits:**
1. `src/data/experience.ts` — add Hotstar card; fix jM (dates, title, description, remove YC W21)
2. `src/data/skills.ts` — full replacement with real skill categories
3. `src/components/sections/about.tsx` — bio (add Hotstar, fix dates/user count), stats (3M→1M+)
4. `src/components/sections/hero.tsx` — tagline + sub-tagline rewrite
5. `src/components/sections/contact.tsx` — LinkedIn URL fix (piyushguptaece → piyushgupta27)

**Key new content to add (from career workspace, not on site yet):**
- Cortex RAG / Merchant Brain (LLM + vector search at Slice) — goes in Slice experience card
- AI oncall bot: 71% query hit rate, 90s vs 5-10 min baseline — goes in Slice card
- Google for Startups Accelerator 2022 — goes in jM card
- Architecture Council (15+ teams) — goes in Hotstar card
- IIT Roorkee education — goes in About bio

**Approved hero positioning (from career workspace one-liner):**
"Engineering Manager with 12 years building AI-native products at scale — hands-on coder, team builder, and zero-to-one founder."

**Ready to implement:** pending Piyush confirmation on plan. No code changes made yet.

---

### 2026-06-19 — Sprint 3 product features SHIPPED; content pass pending

**State:** main @ `8ab27bc` · 139 tests passing · Sprint 3 product features complete.

**What shipped this sprint:**
- PR #84 — #69 project card case studies deepened (problem → approach → outcome + highlight stats)
- PR #86 — #74 resume PDF download link in hero
- PR #87 — #73 OG/Twitter meta tags + generated 1200×630 OG image
- PR #88 — #68 `/blog` route + `/blog/[slug]` + 3 seed posts + nav link

**Platform issues encountered and filed:**
- `tdd-guard-vitest` reporter caused ALL BUILD agents to hang (daemon absent in worktrees).
  Reverted in PR #85. Platform issue filed at ai-sdlc#152.
- BUILD agent does NOT run `pnpm format` before committing — caused two manual HITL interventions
  at REVIEW gate (#73, #68). File ai-sdlc issue for this.

**Content pass (pending — #70 + blog copy review):**
- `feature/gh-70` branch preserved with agent's about copy draft
- 3 seed blog posts merged in #88 — copy review by Piyush still needed
- Run content pass when Piyush is ready to review all content in one focused session

**Pending / open:**
- PR #80 (dependabot dev-and-minor bump) — CI failing (lucide-react, @base-ui packages;
  minimumReleaseAge gate); should clear ~Jun 19 12:00 UTC if published Jun 18
- PR #86 — CI status needs verification
- #70 (about rewrite) — content pass
- ai-sdlc#152 — tdd-guard fix; re-enable reporter once platform fix lands
- File ai-sdlc issue: BUILD agent format-before-commit gate
- Sprint 4 planning: #71 mobile nav, #72 Lighthouse, #75 analytics, #32 UI testing epic

**Key dispatch workaround (active):**
One task at a time; pre-clean stale branches before each dispatch:
```bash
git worktree prune && git branch | grep "feature/gh-" | xargs git branch -D
```

**Sprint docs location:**
- `tasks/sprint-1-plan.md` — retroactive, S1 complete (May 31–Jun 2, 11 PRs)
- `tasks/sprint-2-plan.md` — retroactive, S2 complete (Jun 11–18, 16 PRs)
- `tasks/sprint-3-plan.md` — S3 forward plan with retro stub (product done, content pass pending)

### 2026-06-18 — Sprint 3 plan drafted; retroactive S1/S2 plans written

**State:** main @ d765af0 (tdd-guard-vitest merged via #81). Sprint 3 plan drafted and awaiting manager approval before any dispatch.

**Sprint docs created:**
- `tasks/sprint-1-plan.md` — retroactive, 11 PRs, May 31–Jun 2 (content bootstrap)
- `tasks/sprint-2-plan.md` — retroactive, 16 PRs, Jun 11–18 (platform hardening + design polish)
- `tasks/sprint-3-plan.md` — forward plan, APPROVED

**Process decision:** retros start Sprint 3 onwards; S1/S2 have plan docs only.

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

**Reference docs:**
- ai-sdlc onboarding contract gaps → ai-sdlc issue #47
- `CLAUDE.md` (this repo) — Blast Radius / Red zone

## Snapshots
