---
name: piyush-portfolio lessons
description: Lessons learned from ai-sdlc workflow integration and session start procedures
---

# Lessons — piyush-portfolio

Lessons captured from Phase 0 housekeeping (issue #51) and ai-sdlc onboarding. These guide the session start workflow and dispatch procedure.

## dispatch-not-optional

**Rule:** All feature work MUST flow through `pnpm sdlc dispatch --project piyush-portfolio`. Do not start features ad-hoc or skip dispatch.

**Why:** Dispatch is the gating mechanism that routes work through code review, tier classification, and task orchestration. Bypassing it loses context, audit trail, and safety checks — features land without proper review or may conflict with board state.

**How to apply:** Before starting any feature work (even small fixes), run dispatch from `~/Workspace/ai-sdlc`. Let the board and dispatch system manage the task lifecycle. Do not git-init a feature branch manually.

## check-blocker-first

**Rule:** Before starting any feature work, run `gh issue list --label blocker` and resolve all blockers first. No other work runs until blockers are clear.

**Why:** Blockers represent critical path or risk items that must be resolved before the project can safely move forward. Starting feature work while blockers exist compounds complexity and can make blockers harder to fix.

**How to apply:** On session start, check for blockers as the first step after pulling main. If any exist, make them the top priority. Only after `gh issue list --label blocker` shows no results, proceed to dispatch and feature work.

## PR-template-verify

**Rule:** Sync the local PR template against the canonical ai-sdlc source: `diff .github/pull_request_template.md ~/Workspace/ai-sdlc/meta/templates/pull-request.md`. If different, update the local copy to match.

**Why:** The PR template is the interface between feature author, reviewer, and the ai-sdlc system. Drift between local and canonical versions causes inconsistent PR context, missing fields, and reviewer confusion.

**How to apply:** On session start (step 3 of the checklist), run the diff command. If it shows differences, copy the canonical version from ai-sdlc into `.github/pull_request_template.md`. Commit this as a separate housekeeping commit if needed.

## lessons-md-absence

**Rule:** If `tasks/lessons.md` does not exist, create it before starting feature work. This file is a living record of workflow lessons and MUST be readable by future sessions.

**Why:** Lessons decay and compound errors. Without explicit capture, the same mistakes repeat — forgot to check blockers, skipped PR template sync, started a feature without dispatch. A session-independent lessons doc is the only defense against this decay.

**How to apply:** If the file is missing at session start, create it (as in issue #51, Phase 0). Include lessons from onboarding and the first few sessions that established the workflow. Treat it as a required artifact, not optional documentation.

## session-start-sequence

**Rule:** Execute the session start checklist in order, without skipping steps:

1. `git checkout main && git pull`
2. `gh issue list --label blocker` (resolve all blockers)
3. `diff .github/pull_request_template.md ~/Workspace/ai-sdlc/meta/templates/pull-request.md` (sync if different)
4. `pnpm sdlc dispatch --project piyush-portfolio` (all features via dispatch; order the board first)
5. Read `tasks/lessons.md` (refresh on workflow lessons)

**Why:** The sequence has a dependency chain: main must be fresh (step 1) before checking blockers (step 2). Template sync (step 3) must happen before dispatch (step 4) so the dispatch environment is consistent. Lessons review (step 5) finalizes context before starting work.

**How to apply:** This is a checklist; use it every session. No exceptions. It takes ~2 min and prevents days of rework from cache misses or forgotten context.

## dispatch-board-ordering

**Rule:** Before running `pnpm sdlc dispatch`, order the GitHub Project board (piyushgupta27/projects/2) by priority. Dispatch respects board order — the first item in the backlog becomes the next task.

**Why:** Dispatch is deterministic but dumb: it picks the first unstarted item on the board. If the board is out of order, you dispatch the wrong task. Board ordering is how you steer the workflow.

**How to apply:** On session start (before step 4), open the project board in GitHub. Drag items to the top in priority order: blockers, then the highest-impact feature, then supporting work. Then run dispatch. This is part of the session start ritual.
