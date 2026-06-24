import type { BlogPostData } from "./types";

const post: BlogPostData = {
  slug: "agentic-sdlc",
  title: "How I Built an Agentic SDLC: From Jira Ticket to Merged PR",
  date: "2026-06-24",
  tag: "Engineering Systems",
  excerpt:
    "A walkthrough of ai-sdlc — the BUILDER / TESTER / REVIEWER agent pipeline I built to automate the scaffolding around every PR: context gathering, test writing, blast-radius estimation, and human review gates. From a Jira ticket firing a webhook to a verified, gated PR landing in GitHub.",
  githubUrl: "https://github.com/piyushgupta27/ai-sdlc",
  content: [
    {
      type: "heading",
      text: "The Problem: The Fix Takes 20 Minutes. Everything Else Takes Three Hours.",
    },
    {
      type: "paragraph",
      text: "A Sentry alert fires. NullPointerException on payment confirmation, affecting 0.3% of transactions. By morning you have identified the root cause and know the fix. The fix itself takes 20 minutes. What follows — context gathering, writing tests, drafting the PR description, waiting on review, addressing comments, babysitting CI — takes the rest of the day.",
    },
    {
      type: "paragraph",
      text: "I tracked this pattern across multiple teams. The median pre-fix wall time on repetitive bugs was around 20 hours. Not because the fixes are hard — the root cause is usually obvious within an hour — but because the scaffolding around them consumes all the remaining time. Writing tests for a code path you already understand. Filling in a PR template you have filled in a hundred times. Estimating blast radius on a change whose blast radius is clearly bounded. Waiting for a reviewer to confirm what the CI suite already confirmed.",
    },
    {
      type: "paragraph",
      text: "About 19% of sprint capacity was going to issues that were structurally identical: same root cause class, same fix pattern, same review checklist, same blast-radius estimation exercise. That felt automatable. So I built ai-sdlc.",
    },
    {
      type: "heading",
      text: "The Architecture: Three Agents, One Pipeline, One Human Gate",
    },
    {
      type: "paragraph",
      text: "ai-sdlc is a three-agent pipeline wired to the tools engineering teams already use: Jira for issue tracking, Sentry for error monitoring, and GitHub for code review. Jira and Sentry fire webhooks to the dispatch layer. The dispatch layer creates a structured task brief — title, description, acceptance criteria, validation commands, and blast-radius tier configuration — and routes it to the pipeline.",
    },
    {
      type: "paragraph",
      text: "The BUILDER agent receives the task brief and produces a code change. It reads the affected source files starting from the stack trace or issue description, plans the minimal diff, runs the project's own typecheck / lint / test suite verbatim, and commits with a conventional commit message. It stages only the touched files — no sweeping in unrelated state, no cleanup of adjacent code uninvited.",
    },
    {
      type: "paragraph",
      text: "The TESTER agent receives the commit SHA from the BUILDER and independently verifies the output. It reads the diff, checks whether existing tests cover the changed path, identifies edge cases visible from the issue description, and checks for new uncovered branches. It produces a structured verdict: PASS, PASS_WITH_CAVEATS, or FAIL. The TESTER never reads the BUILDER's reasoning — only its output.",
    },
    {
      type: "paragraph",
      text: "The REVIEWER agent receives both the diff and the TESTER verdict. It maps each touched file to a blast-radius tier: Tier 0 is money movement (ledger entries, idempotency keys, settlement reconciliation), Tier 1 is payments-adjacent and auth, Tier 2 is product logic, Tier 3 is configuration and documentation. The REVIEWER checks whether any high-tier files were reached and produces a blast-radius map — a structured summary of what was touched, what tier it lives in, and whether the change's scope matches the stated risk level of the task.",
    },
    {
      type: "paragraph",
      text: "Every agent's output is hash-chained. Each step signs the input it received and the output it produced. If a downstream agent's hash doesn't match the upstream agent's, the pipeline fails. This produces a tamper-evident audit trail — relevant when a compliance auditor eventually asks who changed what and on what authority.",
    },
    {
      type: "paragraph",
      text: "The human review gate receives: the diff, the TESTER verdict, the blast-radius map, and a single approve / reject action. Approve triggers an automated merge. Reject sends the BUILDER's task back with the reviewer's notes attached.",
    },
    {
      type: "heading",
      text: "A Concrete Walkthrough: Fixing a Null Pointer on Payment Confirmation",
    },
    {
      type: "paragraph",
      text: "A Jira ticket arrives: \"Fix null pointer on payment confirmation.\" The description includes a link to the Sentry event. The stack trace points to PaymentConfirmationService.processCallback() at line 47, where transactionId is arriving as undefined in 0.3% of callbacks from the payment gateway.",
    },
    {
      type: "paragraph",
      text: "The dispatch layer reads the ticket, enriches it with the Sentry context, assigns a blast-radius tier based on the file path pattern (payments/ → Tier 1), and creates the task brief. The BUILDER receives the brief and starts with a read pass: the affected method, its callers, the request type it deserves, and the test co-located with the module. This pass takes about 60 seconds of API time.",
    },
    {
      type: "paragraph",
      text: "The BUILDER then plans the minimal diff. Not a refactor. Not a cleanup of the surrounding code. Just the fix: a null guard and an early return that logs the malformed callback and exits gracefully rather than throwing. One method, four lines. Then it runs the validation suite — typecheck, lint, test — verbatim, using the exact commands from the task brief. The project is pinned to Node 22; the brief specifies the PATH prefix. The BUILDER runs exactly that.",
    },
    {
      type: "paragraph",
      text: "The TESTER receives the SHA. It confirms: the existing unit test for processCallback() covered the happy path; the BUILDER's change adds a guard for the null case; there are no new uncovered branches. Verdict: PASS.",
    },
    {
      type: "paragraph",
      text: "The REVIEWER confirms: one file touched, Tier 1. No Tier-0 files (the ledger, the idempotency key store, the settlement reconciler) were reached. The blast radius is bounded — the change cannot propagate to money movement paths by inspection. The review packet lands at the human gate: a three-line diff, a PASS verdict, a one-file blast-radius map. The reviewer's job is to sanity-check the machine's work, not re-derive it. That takes five minutes.",
    },
    {
      type: "heading",
      text: "Blast-Radius Gates Are Not Static Analysis",
    },
    {
      type: "paragraph",
      text: "Static analysis tools — SonarQube, Semgrep, CodeClimate — look at code in isolation. They flag patterns: potential null dereferences, SQL injection risks, missing input validation. They are excellent at what they do, and ai-sdlc runs them as part of the lint step.",
    },
    {
      type: "paragraph",
      text: "Blast-radius gates look at something different: what is this change capable of touching, and does that capability match the risk tier of the work being done? A fix to the payment callback handler is not just \"this function touches this variable.\" It is \"this function is adjacent to Tier-0 money movement, and the agent should not reach those files without a human checkpoint.\"",
    },
    {
      type: "paragraph",
      text: "In practice, the BUILDER operates with a pre-write hook. Every file write is checked against the tier mapping before the write executes. A Tier-0 write from a Tier-2 task does not fail quietly — it escalates immediately. The BUILDER sets outcome: \"escalated\" and the human gate fires before a single byte is written to the money-movement path. Static analysis finds defects after the code is written. Blast-radius gates prevent certain classes of change from being made at all without human sign-off.",
    },
    {
      type: "paragraph",
      text: "This distinction matters for trust. An automated system that can touch anything — given the right prompt — is a liability. An automated system that is structurally prevented from reaching high-risk paths without a human checkpoint is a controlled system. The goal is not to remove humans from the loop; it is to put humans in the loop at the right moment, with the right information.",
    },
    {
      type: "heading",
      text: "Results: What the Numbers Actually Mean",
    },
    {
      type: "paragraph",
      text: "Across the tickets I ran through the pipeline: roughly 5× reduction in end-to-end PR cycle time, from issue creation to merged PR. The floor is set by the human review gate — you cannot go faster than the time a human needs to sanity-check the output. What the pipeline eliminates is everything between \"issue created\" and \"review-ready diff\" that previously required an engineer's time.",
    },
    {
      type: "paragraph",
      text: "Cost per ticket: $3–5 in API calls across the full BUILDER / TESTER / REVIEWER pipeline, depending on the model tier and the size of the codebase read pass. For a repetitive bug that would otherwise consume three to four hours of engineer time, that is a straightforward exchange. The engineer's time is freed for work the machine genuinely cannot do: architecture decisions, product judgment calls, the \"should we even build this\" question.",
    },
    {
      type: "paragraph",
      text: "What \"self-managing\" actually means in practice: the pipeline handles the scaffolding. It does not handle ambiguity. A ticket that says \"improve payment reliability\" without verifiable acceptance criteria either escalates or produces a conservative no-op. Tickets need a ground truth the BUILDER can verify against. That turns out to be a good forcing function — it pushes engineering teams toward writing better tickets, which makes the whole development process faster regardless of whether the pipeline touches them.",
    },
    {
      type: "heading",
      text: "What Breaks — and What Is Next",
    },
    {
      type: "paragraph",
      text: "The pipeline breaks on ambiguity, as noted above. It also breaks on novel architecture: if a fix requires understanding a design decision that lives in a Slack thread from six months ago, the BUILDER does not have that context. It makes the safest change it can infer from the code — which is sometimes wrong, and the TESTER or REVIEWER will usually catch it, but not always.",
    },
    {
      type: "paragraph",
      text: "It breaks on flaky tests. If CI is non-deterministic, the BUILDER retries, fails to converge, and escalates. That is the correct behavior — but it means the pipeline is only as reliable as the test suite it runs against. Teams with flaky suites discover that problem fast.",
    },
    {
      type: "paragraph",
      text: "It breaks on multi-file refactors. Right now the BUILDER is deliberately conservative about cross-module changes. A fix that requires touching five files in three packages to change a shared interface is a task the pipeline will escalate rather than attempt. The blast-radius gates work best when the change is bounded; an open-ended refactor is not bounded by definition.",
    },
    {
      type: "paragraph",
      text: "What is next: smarter context injection, so the BUILDER can pull from internal wikis, ADRs, and Confluence pages when the code alone is insufficient. Multi-file refactor support with stronger pre-change analysis. And tighter tier-mapping drift detection — as codebases evolve, the tier assignments need to evolve with them, and right now that is a manual process.",
    },
    {
      type: "paragraph",
      text: "The architecture diagram and full implementation are in the repository linked below. The README covers the dispatch layer, the agent prompt structure, the hash-chaining scheme, and how to wire the Jira and Sentry webhooks to your own pipeline.",
    },
  ],
};

export default post;
