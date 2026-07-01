# piyush-portfolio — CLAUDE.md

Personal portfolio site for Piyush Gupta (Sr Engineering Manager).
Forked from `aaaby-code/portfolio` (Next.js 16 + Tailwind v4 + shadcn).

Managed as an ai-sdlc testbed. All non-trivial work flows through:
- GitHub Project: piyushgupta27/projects/2 (TBD — created via bootstrap-project-board.sh)
- Dispatch: `pnpm sdlc dispatch --project piyush-portfolio` from ~/Workspace/ai-sdlc

<!-- ai-sdlc:rules v1 — managed by `sdlc onboard` / `sdlc doctor`; do not edit between markers -->
## ai-sdlc managed rules

> Managed by `sdlc onboard` / `sdlc doctor`. Do **not** hand-edit between the
> `ai-sdlc:rules` markers — changes are overwritten from the canonical source in
> ai-sdlc (`meta/templates/project-rules.md`). To change a rule, edit the source.

- **Reviewer-facing output leads with the decision.** PRs, escalations, findings, status updates: open with the decision/answer + recommendation, plain-first, scannable (short bullets, minimal jargon); put depth below. A dense wall of text is a failure even when "structured." The reader is a manager + dev — impact-first framing with enough technical anchor.
- **Testbed duty.** When work surfaces an ai-sdlc platform gap (onboarding miss, gate false-positive, prompt weakness), document it exhaustively + without bias — what / why it matters / evidence / suggested fix — as an ai-sdlc issue. The platform enforces systematically; testbeds report gaps diligently; neither is assumed correct.
- **Pipeline artifacts stay gitignored.** `.audit/` and `.sdlc-queue/` are written into the working tree by the pipeline; they must remain gitignored so deterministic gates don't fail on the pipeline's own output.
<!-- /ai-sdlc:rules -->

## Session start checklist

Run before any feature work — no exceptions:

1. `git checkout main && git pull`
2. `gh issue list --label blocker` — highest-priority blocker goes first; do not start other work until it's resolved
3. `diff .github/pull_request_template.md ~/Workspace/ai-sdlc/meta/templates/pull-request.md` — sync if different (must be 10-section canonical)
4. All features via: `pnpm sdlc dispatch --project piyush-portfolio` (run from `~/Workspace/piyush-portfolio`; no `--issue` flag; order the board first)
5. Read `tasks/lessons.md`

**Employer-detail boundary (privacy):** company names in hero/experience = keep (intentional portfolio content). Scrub: `/Users/piyush/`, `ai-workspace`, `mind-palace`, tokens, credentials.

## Local CI gate (run before every commit — not just before push)

Node version must be ≥22 (`.nvmrc` pins v22). Run `nvm use` first if needed.

```bash
# All 5 steps — must all pass simultaneously before git commit
pnpm typecheck        # tsc --noEmit
pnpm lint             # eslint (whole project)
pnpm format:check     # biome format . (whole repo)
pnpm test             # vitest (package.json runs "vitest run" — non-watch)
pnpm build            # next build

# Apply formatter fixes when needed
pnpm format           # biome format --write .
```

Run **all 5** and see **0 errors on each** before `git commit`. Fixing one check and committing is banned — the next CI failure will be the check you skipped.

## Post-merge CI confirmation (mandatory — do not close out PR without this)

After merge, confirm the base-branch CI run passes:

```bash
gh run list --branch main -L 3
gh run watch $(gh run list --branch main -L 1 --json databaseId -q '.[0].databaseId')
```

Do not mark the task done, update continuation docs, or move to next work until the run is green.
