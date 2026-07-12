import type { BlogPostData } from "./types";

const post: BlogPostData = {
  slug: "agentic-sdlc",
  title:
    "Building an Agentic CI/CD Pipeline: Four Agents, One Human Gate, and What Actually Breaks",
  date: "2026-06-24",
  tag: "AI-Native Engineering",
  excerpt:
    "Engineering attention is the scarcest resource in any team. ai-sdlc is a four-agent pipeline — BUILDER, TESTER, REVIEWER, CHECKER — that takes a GitHub issue and delivers a reviewed, gated PR in under 15 minutes, for under $4 in AI compute. This is how it works.",
  githubUrl: "https://github.com/piyushgupta27/ai-sdlc",
  stats: [
    {
      value: "14",
      unit: "min",
      label: "Cycle time",
      sub: "per gh-118 proof run",
    },
    {
      value: "83%",
      label: "Success rate",
      sub: "12 escalated, 9 self-corrected",
    },
    { value: "$173", label: "AI compute", sub: "across 47 tasks" },
    { value: "47", label: "Tasks dispatched", sub: "174 agent runs" },
  ],
  ctaText:
    "The full implementation — dispatch layer, agent prompts, hash-chaining, blast-radius enforcement — is open source. Issues and PRs run through the pipeline itself.",
  content: [
    {
      type: "paragraph",
      text: "The leverage problem in any growing engineering team isn't individual velocity. It's what happens when 30 engineers each spend a fifth of their sprint on work that is structurally identical. Same bug class. Same fix pattern. Same PR template filled in for the fiftieth time. You don't fix that by making engineers faster. You fix it by removing that category of work from their cognitive load entirely.",
    },
    {
      type: "paragraph",
      text: "I built ai-sdlc to test a specific hypothesis: can a multi-agent pipeline take a well-formed ticket and produce a reviewed, gated PR with zero human involvement until the final approval decision? Not a copilot that autocompletes — an agent that runs the full cycle autonomously, with a human at the signal gate rather than in the loop for every keystroke.",
    },
    {
      type: "paragraph",
      text: "Today it runs on four personal codebases — 174 automated agent executions, 47 tasks dispatched end-to-end, $173 in total AI compute across all of it. The architecture has two non-negotiables: every write is pre-checked against a blast-radius tier map that prevents touching high-risk paths without authorisation, and every agent run executes against a documented harness — defined inputs, automated validation before human review, and a clear escalation path. Trust expands on data. Not intuition.",
    },
    {
      type: "heading",
      text: "Four agents, one human gate",
    },
    {
      type: "table",
      headers: ["Stage", "Reads from", "What it does", "Output"],
      rows: [
        [
          "DISPATCH",
          "GitHub issue + context",
          "Enriches with codebase context, assigns blast-radius tier",
          "Structured task brief",
        ],
        [
          "BUILDER",
          "Issue + existing code + type definitions",
          "Reads affected files, writes the minimal diff, runs typecheck + lint + tests",
          "Commit SHA",
        ],
        [
          "TESTER",
          "Diff only — never BUILDER's reasoning",
          "Checks coverage, identifies edge cases",
          "PASS / PASS (flagged) / FAIL",
        ],
        [
          "REVIEWER",
          "Diff + TESTER verdict",
          "Maps touched files to blast-radius tiers, verifies no unauthorised paths reached",
          "Blast-radius map + verdict",
        ],
        [
          "CHECKER",
          "Diff + all prior verdicts + deterministic re-run (tsc/lint/tests)",
          "Deterministic tsc + lint + tests, independent of prior agents",
          "PASS / REFIRE / ESCALATE",
        ],
        [
          "MANAGER",
          "Diff + all verdicts + blast-radius map",
          "Approve → automated merge. Reject → back to BUILDER with notes.",
          "Decision",
        ],
      ],
    },
    {
      type: "paragraph",
      text: "Every handoff between agents is a typed contract — not a raw file or text summary. Each agent's output is validated by the receiving stage before proceeding. A malformed or incomplete handoff is rejected immediately and goes back to the producing agent before the next stage sees it.",
    },
    {
      type: "paragraph",
      text: "When CHECKER finds a semantic gap, it doesn't escalate immediately. It issues a targeted deficiency — what's wrong, which agent owns it, why it matters — and the owning agent retries. The pipeline does this up to twice. Only if the gap persists does it escalate to the MANAGER. The MANAGER sees escalations, not every run.",
    },
    {
      type: "paragraph",
      text: "Each agent's output is hash-chained: every step signs what it received and what it produced. If a downstream agent's hash doesn't match the upstream output, the pipeline fails. That audit trail matters when someone eventually asks 'who changed what and on whose authority.' At team scale, that question has a compliance dimension, not just a process one.",
    },
    {
      type: "heading",
      text: "Blast-radius tiers",
    },
    {
      type: "paragraph",
      text: "REVIEWER maps every file the BUILDER touches against a tier assignment. Here's what those tiers mean.",
    },
    {
      type: "image",
      src: "/blog/blast-radius-tiers.svg",
      alt: "Blast-radius tier pyramid: Tier 0 (Critical) at top through Tier 3/4 (Low) at base, with examples and gate requirements at each level",
      wide: true,
    },
    {
      type: "paragraph",
      text: "The constraint this enforces: the BUILDER cannot complete a write to a Tier-0 or Tier-1 path without an explicit tier authorisation in the original task brief. If the task brief says Tier-2 and the BUILDER attempts to touch a payment callback handler, the pre-write hook escalates to the MANAGER — not after the commit, before it. Across 52 Tier-0 and Tier-1 agent runs to date, zero incidents. That's the number that justifies the architecture.",
    },
    {
      type: "paragraph",
      text: "An automated system that can touch anything is a liability. A system structurally prevented from reaching high-risk paths without a human checkpoint is a controlled system. The goal isn't to remove humans — it's to put humans in the loop at the right moment, with the right information.",
    },
    {
      type: "heading",
      text: "The proof",
    },
    {
      type: "paragraph",
      text: "gh-118 is a real dispatch run — unedited. Issue #94: cost-route BUILDER and TESTER by tier without compromising the guardian quality floor. The file it needed to change is Tier-1. Red-zone. The pipeline classified it correctly before a single line was written.",
    },
    {
      type: "image",
      src: "/blog/pipeline-flow.svg",
      mobileSrc: "/blog/pipeline-flow-mobile.svg",
      alt: "gh-118 run log: DISPATCH classifies Tier-1 in 31s, BUILDER implements 2 files and 164 tests in 6m, isolation boundary, TESTER and REVIEWER both PASS, CHECKER 164/164, APPROVED at 14:02 for $3.49",
      wide: true,
    },
    {
      type: "links",
      items: [
        {
          label: "Issue #94",
          href: "https://github.com/piyushgupta27/ai-sdlc/issues/94",
          description: "the task brief",
        },
        {
          label: "PR #118",
          href: "https://github.com/piyushgupta27/ai-sdlc/pull/118",
          description: "the merged diff",
        },
      ],
    },
    {
      type: "heading",
      text: "What the numbers show",
    },
    {
      type: "paragraph",
      text: "All numbers are audit-verified across 4 repos — not projected. When CHECKER finds a gap — lint failure, coverage miss, or a task without sufficient context in the ticket — it refires or escalates. Refires self-correct without human involvement. Escalations reach the MANAGER as a structured packet. Across 174 runs, 12 escalated, 9 self-corrected via refire. None produced a silent failure.",
    },
    {
      type: "table",
      headers: ["Metric", "Number", "What it means"],
      rows: [
        [
          "Agent runs",
          "174",
          "Audit-verified across 4 codebases — not projected",
        ],
        [
          "Tasks dispatched",
          "47",
          "Complete BUILDER→TESTER→REVIEWER→CHECKER cycles",
        ],
        [
          "Run success rate",
          "83%",
          "Ran straight through — no refire, no escalation, no human touch",
        ],
        ["Tier 0/1 entries", "52", "Highest-risk paths, zero incidents"],
        ["Total AI compute", "$173", "Across all 4 repos, 32 days"],
        [
          "Avg cost per completed task",
          "~$6",
          "Including Opus on REVIEWER and CHECKER every run",
        ],
        [
          "Zero-comment merge rate",
          "87%",
          "13 of 15 dispatched PRs — no human review feedback needed",
        ],
        [
          "Refire rate",
          "5%",
          "9/174 runs self-corrected — CHECKER refired the owning agent, no human",
        ],
        [
          "Escalation rate",
          "7%",
          "12/174 runs surfaced to MANAGER as a structured packet",
        ],
        [
          "Silent failures",
          "None",
          "Every gap surfaced before merge — no invisible failures",
        ],
        [
          "Tier 0 path violations",
          "None",
          "BUILDER never touched permanently off-limits paths",
        ],
      ],
    },
    {
      type: "paragraph",
      text: "The cost picture: $173 in AI compute across 47 tasks — ~$6 per completed task, including Opus on every review and check stage. The same tasks done manually: 2–3 hours each of fragmented engineering attention — context gathering, writing the fix, test coverage, PR scaffolding, waiting for review. At that rate, the economics aren't marginal. They're a different order of magnitude.",
      localeText: {
        GBP: "The cost picture: $173 in AI compute across 47 tasks — ~£5 per completed task, including Opus on every review and check stage. The same tasks done manually: 2–3 hours each of fragmented engineering attention — context gathering, writing the fix, test coverage, PR scaffolding, waiting for review. At that rate, the economics aren't marginal. They're a different order of magnitude.",
        EUR: "The cost picture: $173 in AI compute across 47 tasks — ~€5.50 per completed task, including Opus on every review and check stage. The same tasks done manually: 2–3 hours each of fragmented engineering attention — context gathering, writing the fix, test coverage, PR scaffolding, waiting for review. At that rate, the economics aren't marginal. They're a different order of magnitude.",
        SGD: "The cost picture: $173 in AI compute across 47 tasks — ~S$8 per completed task, including Opus on every review and check stage. The same tasks done manually: 2–3 hours each of fragmented engineering attention — context gathering, writing the fix, test coverage, PR scaffolding, waiting for review. At that rate, the economics aren't marginal. They're a different order of magnitude.",
        AED: "The cost picture: $173 in AI compute across 47 tasks — ~AED 22 per completed task, including Opus on every review and check stage. The same tasks done manually: 2–3 hours each of fragmented engineering attention — context gathering, writing the fix, test coverage, PR scaffolding, waiting for review. At that rate, the economics aren't marginal. They're a different order of magnitude.",
        SAR: "The cost picture: $173 in AI compute across 47 tasks — ~SAR 22 per completed task, including Opus on every review and check stage. The same tasks done manually: 2–3 hours each of fragmented engineering attention — context gathering, writing the fix, test coverage, PR scaffolding, waiting for review. At that rate, the economics aren't marginal. They're a different order of magnitude.",
      },
    },
    {
      type: "paragraph",
      text: "The forcing function I didn't anticipate: the pipeline only works on tickets with verifiable acceptance criteria. 'Fix the null pointer' → works. 'Improve reliability' → escalates immediately. That constraint pushes ticket quality up across all tickets, not just the ones the pipeline handles. The tool improves the process around it.",
    },
    {
      type: "heading",
      text: "At team scale",
    },
    {
      type: "paragraph",
      text: "The endgame isn't faster engineers. It's engineers who stop reconstructing what a change does before deciding on it — they receive a structured packet and make a call. The BUILDER handles write-test-fix. The human handles architecture, escalation routing, and the decisions the machine isn't authorised to make.",
    },
    {
      type: "subheading",
      number: "01",
      text: "Architectural context",
    },
    {
      type: "paragraph",
      text: "The BUILDER knows your code and your ticket. It doesn't know your architectural intent — why the contract looks the way it does, what was considered and rejected. Context injection from ADRs and decision records is the gap between 'handles bounded changes' and 'handles anything.'",
    },
    {
      type: "subheading",
      number: "02",
      text: "Trust policy",
    },
    {
      type: "paragraph",
      text: "Right now the trust threshold is a personal call — I move it by hand. At team scale it becomes policy: a tier's gates loosen only after a clean track record — a set number of incident-free runs above a coverage floor, signed off by an owner — never adjusted ad hoc by whoever's blocked that day.",
    },
    {
      type: "subheading",
      number: "03",
      text: "Tier-map ownership",
    },
    {
      type: "paragraph",
      text: "Who maintains the tier map as the codebase evolves? Who reviews trust decisions? Who gets escalation notifications? These are leadership decisions, not engineering decisions. The pipeline forces the conversation instead of letting it stay implicit. That's a feature, not a bug.",
    },
    {
      type: "paragraph",
      text: "The next agent isn't another specialist — it's a TEAM LEAD that coordinates work across a team's pipelines: sequencing dependent tasks, surfacing cross-repo blast-radius conflicts, routing escalations to the right EM. Four agents on one repo becomes a network.",
    },
    {
      type: "heading",
      text: "Pipeline prerequisites",
    },
    {
      type: "paragraph",
      text: "The pipeline is only as good as the repo it runs against. A pipeline-ready repo has three things: verifiable acceptance criteria on every ticket, a deterministic CI suite, and a calibrated blast-radius tier map. Remove any one and the pipeline degrades in a predictable way.",
    },
    {
      type: "list",
      items: [
        "Ambiguity breaks it first. A ticket without verifiable ACs either escalates immediately or produces a conservative no-op — CHECKER has no ground truth to verify against.",
        "Flaky tests break it second. If CI is non-deterministic, BUILDER can't converge — what should be a straight-through run becomes an escalation instead.",
        "Novel architecture breaks it third, for the reason covered above — BUILDER has bounded context, not architectural intent.",
      ],
    },
    {
      type: "heading",
      text: "Connect",
    },
    {
      type: "paragraph",
      text: "If you're building an engineering organisation that wants to think seriously about agentic-at-team-scale — what governance looks like, what breaks first, how to expand trust incrementally — I'm actively exploring Senior Engineering Manager roles {regionPhrase}. I'd rather talk about the hard problems than send a CV into a void.",
    },
  ],
};

export default post;
