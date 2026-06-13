## 1 · TL;DR

_One short paragraph: what this does and why it matters._

Tier <0–4> · <feat | fix | refactor | docs | chore | security> · closes #<issue> · <task id>

## 2 · What & why

_The problem, the change, and the key trade-off — in prose. A reviewer should grasp the decision here without reading the diff._

**Alternatives rejected** — <what you didn't do, and why>.

## 3 · Blast radius & risk

- **Reach** — what this can affect, and how it's mitigated.
- **Red-zone** — files touched + tier (or "none").
- **Breaking changes** — none | <contract / schema / API + migration path>.
- **Rollback** — clean `git revert` | <steps>.

## 3b · Security review

- **Ran** — yes (`/cso`, <date>) | no (<why: e.g. Tier 2–3, non-security-touching>).
- **Findings (this PR)** — none | <severity · finding · status>.
- **Open security issues** (touched here? y/n) — #<n> #<n>.

## 4 · Evidence

- **Gates** — typecheck · lint · format · tests <pass/total> · coverage <%>.
- **Acceptance criteria** — each AC mapped to its evidence (test / `file:line`), or "n/a".
- **Tests** — happy + sad + edge paths covered (what each asserts).
- **CHECKER** — verdict · confidence · deficiencies resolved (or n/a).
- **Manual** — UI changes: screenshot or video of affected sections · Content changes: what changed (copy, data, assets) · URL/route changes: before → after · (or n/a per category).

## 5 · Diff map

- `path` (+adds/−dels) — what & why.
- **New dependencies** — name@version (license, size, why) | none.

## 6 · Audit & provenance

_AI-SDLC; auto-filled for pipeline runs._ Audit run IDs · agents + prompt cohort versions · models + spend · refire history. (n/a for human-driven PRs.)

## 7 · Governance

- [ ] PR-only, squash, no direct main push; agent did not self-approve
- [ ] No open P0/P1; CLAUDE.md unchanged (else flagged — always MANAGER-gated)
- [ ] Docs / continuation updated; affected `CONTEXT.md` bubbled up (or n/a)
- [ ] ADR written if required (G1.5), else "no ADR required"
- [ ] Secret-scan / dep-audit / SAST (or n/a)

## 8 · Decision

**Recommend** — Approve | Approve-with-follow-up | Request-changes | Reject, because <why>.

**Your call** — <the specific judgment(s) needed from the MANAGER>.

## 9 · Backlog

_Deferred work, filed as issues (or "none")._
- [Issue #<n>](<url>): <brief one-line description>

## 10 · Post-merge

<deploy steps · monitoring / canary · rollback trigger — or none>
