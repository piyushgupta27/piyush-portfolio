---
type: platform-bug-report
project: piyush-portfolio (testbed)
date: 2026-06-19
severity: HIGH — blocks all subsequent dispatch tasks after a cascade failure
---

# ai-sdlc Bug Report: Subagent timeout cascade + stale branch lock on re-dispatch

## Decision / TL;DR

**Two bugs, one dispatch run.** After a successful T3 task merge, three consecutive BUILD-stage subagents timed out in the same dispatch run — all stalling in a read-heavy phase with no writes. When the user tried to re-dispatch after the failures, the first attempt failed immediately because stale branches from the timed-out runs were never cleaned up. Manual intervention was required before the pipeline could resume.

**Impact:** ~45 min of pipeline time lost, manual branch cleanup required, $0.06 wasted on non-progressing agents.

---

## Bug 1: Cascade subagent timeouts after a successful merge

### What happened

A single `pnpm sdlc dispatch --project piyush-portfolio` run processed 4 tasks. The first (gh-69) merged cleanly. The next three (gh-74, gh-73, gh-68) all failed at the BUILD stage with `subagent.timeout`.

### Dispatch log (verbatim)

```
→ gh-69 (#69) "content: deepen project card case studies" [tier:3]
✓ Task gh-69 MERGED
  Final stage:    COMMIT
  Retries used:   0
  Total cost:     $2.3017
  Wall time:      439.6s

→ gh-74 (#74) "content: add resume PDF download link" [tier:4]
✓ Task gh-74 FAILED
  Final stage:    BLOCKED
  Retries used:   0
  Audit run IDs:  (none)
  Total cost:     $0.0038
  Wall time:      618.1s
  Notes: Agent error: subagent.timeout — Claude subagent killed: no output for 120s
         (idle timeout) — likely hung; rescue commit attempted in worktree

→ gh-73 (#73) "seo: add OG/meta tags and Twitter card for social sharing" [tier:3]
✓ Task gh-73 FAILED
  Final stage:    BLOCKED
  Retries used:   0
  Audit run IDs:  (none)
  Total cost:     $0.0219
  Wall time:      412.3s
  Notes: Agent error: subagent.timeout — Claude subagent killed: no output for 120s
         (idle timeout) — likely hung; rescue commit attempted in worktree

→ gh-68 (#68) "content: add blog / writing section" [tier:2]
✓ Task gh-68 FAILED
  Final stage:    BLOCKED
  Retries used:   0
  Audit run IDs:  (none)
  Total cost:     $0.0313
  Wall time:      408.1s
  Notes: Agent error: subagent.timeout — Claude subagent killed: no Write/Edit/Bash
         tool in 300s — reading without progress; rescue commit attempted in worktree
```

### Tool call trace (from dispatch monitor output)

**gh-69 (succeeded):** 27 tool calls across BUILD → TEST → REVIEW → COMMIT. Active writes throughout.

**gh-74 (failed):**
```
[subagent]  7 tool call(s), 0 in flight; last activity 0s ago;  no write yet
[subagent]  9 tool call(s), 0 in flight; last activity 0s ago;  last write 32s ago
[subagent] 10 tool call(s), 0 in flight; last activity 0s ago;  last write 32s ago
[subagent] 11 tool call(s), 0 in flight; last activity 0s ago;  last write 34s ago
[subagent] 12 tool call(s), 0 in flight; last activity 0s ago;  last write 63s ago
[subagent] 13 tool call(s), 0 in flight; last activity 0s ago;  last write 32s ago
[subagent] 14 tool call(s), 0 in flight; last activity 400s ago; last write 403s ago
```
→ Tool calls stopped entirely at 14. Both activity and write timestamps stalled simultaneously — subagent process froze, not just write-stall.

**gh-73 (failed):**
```
[subagent]  3 tool call(s), 0 in flight; last activity 0s ago;  last write 3s ago
[subagent] 10 tool call(s), 0 in flight; last activity 0s ago;  last write 10s ago
[subagent] 13 tool call(s), 0 in flight; last activity 9s ago;  last write 27s ago
[subagent] 13 tool call(s), 0 in flight; last activity 301s ago; last write 319s ago
```
→ Froze at 13 tool calls; no activity for 301s before kill.

**gh-68 (failed — different timeout variant):**
```
[subagent] 18 tool call(s), 0 in flight; last activity 0s ago;  last write 8s ago
[subagent] 22 tool call(s), 0 in flight; last activity 0s ago;  last write 53s ago
[subagent] 22 tool call(s), 0 in flight; last activity 2s ago;  last write 113s ago
[subagent] 22 tool call(s), 0 in flight; last activity 17s ago; last write 158s ago
[subagent] 22 tool call(s), 0 in flight; last activity 2s ago;  last write 203s ago
[subagent] 22 tool call(s), 0 in flight; last activity 17s ago; last write 248s ago
[subagent] 22 tool call(s), 0 in flight; last activity 34s ago; last write 325s ago
```
→ Different pattern: tool calls continued (activity alive, bouncing between 2s and 17s) but writes stopped at 22 tool calls for 325s. Killed by the no-write-in-300s timeout. Agent was *reading* in a loop without acting.

### Key observations

1. **Cascade pattern.** All three failures occurred immediately after a successful merge in the same dispatch run. gh-69 completed fine; gh-74, gh-73, gh-68 all failed with no audit run IDs written — meaning the BUILD agent either never got started or died before it could log anything.

2. **Two distinct failure modes:**
   - gh-74 / gh-73: Process-level freeze — all tool call activity stopped. Suggests the subagent process itself hung (API hang? OOM?).
   - gh-68: Read-loop stall — activity continued but no writes for 300s. Suggests the agent was reading files/context in a planning loop and never committed to acting.

3. **Zero retries attempted.** The orchestrator logged `Retries used: 0` for all three. If retries are configured, they weren't triggered. If auto-retry on timeout isn't implemented, it should be.

4. **T2 task (gh-68) got the 300s no-write timeout; T4 task (gh-74) got the 120s idle timeout.** The tier-based timeout thresholds exist, but neither is sufficient when the root cause is a process hang or read-loop — a retry would be more appropriate than a permanent FAIL.

### Hypotheses (in order of likelihood)

1. **API latency spike / connection hang** post-gh-69 merge — the gh-69 BUILD agent was a long-running LLM call; subsequent calls may have hit a rate limit or connection issue that caused new subagents to hang at their first LLM call.
2. **Worktree state pollution** — gh-69's merge (which touched `src/data/projects.ts`, `src/components/sections/projects.tsx`, tests) may have left something in the shared repo state that confused subsequent agents' context reads.
3. **Read-loop with large context** — gh-68 (blog section) is a T2 task with significant upfront exploration. With gh-69's changes freshly in the tree, the agent may have over-read before deciding how to act, exhausting its planning budget.

---

## Bug 2: Stale branches from failed runs block re-dispatch

### What happened

After the three failures, the user tried to re-dispatch. The first attempt failed immediately:

```
→ gh-74 (#74) "content: add resume PDF download link" [tier:4]
  ❌ git worktree add failed: Preparing worktree (new branch 'feature/gh-74')
fatal: a branch named 'feature/gh-74' already exists
[ELIFECYCLE] Command failed with exit code 1.
```

### Root cause

The rescue-commit path in the orchestrator creates a branch (`feature/gh-<n>`) for each task. On timeout, the rescue commit is attempted but the branch is never deleted — it persists in the local repo. On re-dispatch, `git worktree add` fails because the branch already exists.

Branches left behind: `feature/gh-74`, `feature/gh-73`, `feature/gh-68`.

**Manual fix required:**
```bash
git worktree prune
git branch -D feature/gh-74 feature/gh-73 feature/gh-68
```

Only after this could dispatch resume.

### Why this is a blocker

Without this fix, `dispatch` is permanently stuck — it will fail on the first task every time with `fatal: a branch named 'feature/gh-<n>' already exists`. A user who doesn't know to do this cleanup cannot unblock themselves.

---

## Impact summary

| Dimension | Detail |
|-----------|--------|
| Pipeline time lost | ~45 min (3 tasks × ~12-15 min each) |
| Cost wasted | $0.06 (subagents killed before meaningful work) |
| Manual steps required | 4 (move tasks to Ready + `worktree prune` + `branch -D ×3` + re-dispatch) |
| Re-dispatch attempt 1 | Failed (stale branch bug) |
| Re-dispatch attempt 2 | Succeeded after manual cleanup |
| Tasks affected | gh-74, gh-73, gh-68 (all product-feature tasks in Sprint 3) |

---

## Suggested fixes

### Bug 1 — Subagent timeout cascade
1. **Auto-retry on timeout (highest priority).** A timed-out BUILD agent should be retried at least once before being marked BLOCKED. The current `Retries used: 0` on all three suggests retries either aren't configured for timeout failures or aren't triggering.
2. **Distinguish freeze vs. read-loop.** The two failure modes need different responses: a process freeze warrants an immediate retry; a read-loop might need a prompt nudge ("you've been reading for >60s without writing — make a decision and act").
3. **Cooldown after a successful merge.** Consider a short delay (10-30s) between the COMMIT of one task and the BUILD start of the next, to let rate limits and API connections reset.

### Bug 2 — Stale branch lock (highest priority for UX)
1. **Cleanup on rescue path.** When a task fails and a rescue commit is attempted, the orchestrator should clean up the local branch (and any associated worktree) before marking the task BLOCKED. A failed task should leave no local git state.
2. **Pre-dispatch branch check.** At the start of `dispatch`, scan for any `feature/gh-<n>` branches where `<n>` is a Ready task and warn / auto-prune before attempting `worktree add`.
3. **Document the manual fix** in the `sdlc status` output when a stale branch is detected.

---

## Reproduction steps

1. Run `pnpm sdlc dispatch --project <project>` with ≥2 Ready tasks.
2. Let the first task complete and merge successfully.
3. Observe subsequent tasks failing with `subagent.timeout`.
4. Attempt to re-dispatch — observe `fatal: a branch named 'feature/gh-<n>' already exists`.

---

## Environment

- ai-sdlc: `tools/sdlc/cli/index.ts` (tsx, no compiled dist used)
- Testbed: `piyushgupta27/piyush-portfolio`
- Model: `claude-sonnet-4-6` (BUILD/TEST), `claude-opus-4-8` (REVIEW)
- Date: 2026-06-19
- Monthly budget setting: `SDLC_MONTHLY_BUDGET_USD=200`
- Node: 22.x, pnpm 11.3.0
