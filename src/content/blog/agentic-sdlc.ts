import type { BlogPostData } from "./types";

const post: BlogPostData = {
  slug: "agentic-sdlc",
  title:
    "Building an Agentic CI/CD Pipeline: Four Agents, One Human Gate, and What Actually Breaks",
  date: "2026-06-24",
  tag: "AI-Native Engineering",
  excerpt:
    "Engineering attention is the scarcest resource in any team. ai-sdlc is a four-agent pipeline — BUILDER, TESTER, REVIEWER, CHECKER — that takes a GitHub issue and delivers a reviewed, gated PR in under 15 minutes, for under $4 in AI compute. This is how it works. And the proof: this post was written, tested, reviewed, and shipped by the system it describes.",
  githubUrl: "https://github.com/piyushgupta27/ai-sdlc",
  content: [
    {
      type: "paragraph",
      text: "At 50M concurrent users, the leverage problem isn't individual velocity. It's what happens when 30 engineers each spend a fifth of their sprint on work that is structurally identical. Same bug class. Same fix pattern. Same PR template filled in for the fiftieth time. You don't fix that by making engineers faster. You fix it by removing that category of work from their cognitive load entirely.",
    },
    {
      type: "paragraph",
      text: "I built ai-sdlc to test a specific hypothesis: can a four-agent pipeline take a well-formed ticket and produce a reviewed, gated PR with zero human involvement until the final approval decision? Not a copilot that autocompletes — an agent that runs the full cycle autonomously, with a human at the signal gate rather than in the loop for every keystroke.",
    },
    {
      type: "callout",
      text: "Most 'AI-assisted' development is still human-driven with suggestions injected. Agentic development is different: the AI runs multi-step tasks autonomously, with humans at checkpoints. Copilots speed up each engineer 20–40%. Agentic pipelines restructure which decisions need human attention at all. The leverage model is different in kind, not just degree.",
      variant: "info",
    },
    {
      type: "paragraph",
      text: "Execution got cheap. The scaffolding tax around it didn't. That's the problem worth solving.",
    },
    {
      type: "paragraph",
      text: "So I built ai-sdlc. Today it runs on four personal codebases — 150+ automated agent executions, 45+ tasks dispatched end-to-end, $136 in total AI compute across all of it. The architecture is shaped by one constraint I internalized managing infrastructure at hyperscale: an automated system that can touch anything with the right prompt is a liability. A system structurally prevented from reaching high-risk paths without a human checkpoint is a controlled system.",
    },
    {
      type: "callout",
      text: "What follows is where the system is today — early, opinionated, and not production-ready at team scale. It runs on my own projects. The design decisions, though, are the same ones you'd make building a safe autonomous system for a team.",
      variant: "info",
    },
    {
      type: "heading",
      text: "Four agents, one human gate",
    },
    {
      type: "image",
      src: "/blog/pipeline-flow.svg",
      alt: "ai-sdlc pipeline: GitHub Issue → Dispatch → BUILDER → TESTER → REVIEWER → CHECKER → Human Gate → Merge, with real timing from gh-118",
      caption:
        "The full pipeline. Timing numbers are from gh-118 — this post's own dispatch run.",
    },
    {
      type: "paragraph",
      text: "The pipeline has four agents and one moment where a human makes a decision. Everything else is automated.",
    },
    {
      type: "table",
      headers: ["Stage", "Who", "What it does", "Output"],
      rows: [
        [
          "Dispatch",
          "Webhook layer",
          "Reads the GitHub issue or Sentry alert, enriches with context, assigns blast-radius tier",
          "Structured task brief",
        ],
        [
          "BUILDER",
          "Agent 1",
          "Reads affected files, writes the minimal diff, runs typecheck + lint + tests verbatim",
          "Commit SHA",
        ],
        [
          "TESTER",
          "Agent 2",
          "Reads the diff independently — never the BUILDER's reasoning — checks coverage, identifies edge cases",
          "PASS / PASS_WITH_CAVEATS / FAIL",
        ],
        [
          "REVIEWER",
          "Agent 3",
          "Maps touched files to blast-radius tiers, verifies no high-risk paths were reached without authorization, produces structured summary",
          "Blast-radius map + verdict",
        ],
        [
          "CHECKER",
          "Agent 4",
          "Deterministic re-run: tsc + lint + tests, independent of prior agents. Confidence score. PASS → proceeds to COMMIT; ESCALATE → human gate fires",
          "PASS / ESCALATE",
        ],
        [
          "Human gate",
          "You",
          "Reviews diff + TESTER verdict + blast-radius map. Approve → automated merge. Reject → back to BUILDER with notes.",
          "Decision",
        ],
      ],
    },
    {
      type: "paragraph",
      text: "Each agent's output is hash-chained: every step signs what it received and what it produced. If a downstream agent's hash doesn't match the upstream output, the pipeline fails. That audit trail matters when someone eventually asks 'who changed what and on whose authority.' At fintech scale, that question has a regulatory dimension, not just a process one.",
    },
    {
      type: "heading",
      text: "Blast-radius tiers: the design decision that makes this safe",
    },
    {
      type: "image",
      src: "/blog/blast-radius-tiers.svg",
      alt: "Blast-radius tier pyramid: Tier 0 (Critical) at top through Tier 3/4 (Low) at base, with examples and gate requirements at each level",
      caption:
        "Every file write is pre-checked against this tier map before execution.",
    },
    {
      type: "paragraph",
      text: "The differentiating architectural decision isn't the agents — it's the blast-radius tier model. Every file write is pre-checked against a tier assignment before the write executes. A Tier-0 write from a Tier-2 task doesn't fail quietly. It escalates immediately, before a single byte reaches a critical path.",
    },
    {
      type: "table",
      headers: ["Tier", "Risk level", "Examples", "Gate"],
      rows: [
        [
          "Tier 0",
          "Critical",
          "Ledger entries, idempotency keys, settlement reconciliation",
          "All agents + explicit Tier-0 authorization in task brief",
        ],
        [
          "Tier 1",
          "High",
          "Payment callbacks, auth middleware, session management",
          "Full 4-agent gate + REVIEWER sign-off",
        ],
        [
          "Tier 2",
          "Standard",
          "Product logic, feature flags, API handlers",
          "Standard gate — all 4 agents + human",
        ],
        [
          "Tier 3",
          "Low",
          "Configuration, docs, test files, UI copy",
          "Lightweight — TESTER + CHECKER + human",
        ],
      ],
    },
    {
      type: "paragraph",
      text: "The constraint this enforces: the BUILDER cannot complete a write to a Tier-0 or Tier-1 path without an explicit tier authorization in the original task brief. If the task brief says Tier-2 and the BUILDER attempts to touch a payment callback handler, the pre-write hook escalates and the human gate fires — not after the commit, before it. Across nearly 40 Tier-0 and Tier-1 agent runs to date, zero incidents. That's the number that justifies the architecture.",
    },
    {
      type: "paragraph",
      text: "An automated system that can touch anything is a liability. A system structurally prevented from reaching high-risk paths without a human checkpoint is a controlled system. The goal isn't to remove humans — it's to put humans in the loop at the right moment, with the right information.",
    },
    {
      type: "heading",
      text: "The proof: this post was dispatched through ai-sdlc",
    },
    {
      type: "paragraph",
      text: "The most credible proof of a system is when it can do the meta-thing. This post — the one you're reading — was dispatched through ai-sdlc. The ticket was gh-118: 'Agentic SDLC — from Jira ticket to merged PR without touching a keyboard.' I filed the issue. The pipeline ran it.",
    },
    {
      type: "paragraph",
      text: "The BUILDER read the issue, the existing blog file structure, and the TypeScript types. It wrote the full blog post across 6 sections, extended the BlogPostData type with a githubUrl field, and updated the rendering logic so posts with content render inline instead of redirecting to Medium. 9 files touched. 153 tests passing before the commit. Stage complete in 398 seconds.",
    },
    {
      type: "paragraph",
      text: "The TESTER read the diff independently. It added 6 tests across two files: githubUrl field validation, the content.length > 0 rendering path, the GitHub CTA presence, and the Medium fallback path. 159 tests passing. Stage complete in 233 seconds.",
    },
    {
      type: "paragraph",
      text: "The REVIEWER ran the full gate empirically — pnpm test, typecheck, lint — and verified that all pre-existing posts were unaffected. Two P3 informational findings, neither blocking. Stage complete in 129 seconds. The CHECKER confirmed PASS at confidence 0.85.",
    },
    {
      type: "callout",
      text: "Total agentic time: 14 minutes across four agents. The blog post about ai-sdlc was written, tested, reviewed, and validated by ai-sdlc. That's the loop closing.",
      variant: "tip",
    },
    {
      type: "heading",
      text: "What the numbers show",
    },
    {
      type: "paragraph",
      text: "14 minutes, four agents, under $4. The same task done manually: 3–4 hours of fragmented engineering attention — context gathering, writing the fix, test coverage, PR scaffolding, waiting for review. That's the comparison that matters, and it comes from the audit logs, not a projection.",
    },

    {
      type: "image",
      src: "/blog/metrics-stats.svg",
      alt: "Four key metrics: 150+ automated runs, 87% straight-through success, $136 total AI compute, 14 minutes per 4-agent cycle",
      caption: "All numbers from .audit/ logs — not projected.",
    },
    {
      type: "paragraph",
      text: "45+ tasks dispatched across four codebases. 150+ autonomous agent executions. 87% straight-through success rate. The remaining 13% escalated correctly — CHECKER detected lint failures, coverage gaps, or tasks that required context the agents didn't have. Escalation is the right behavior; silent failure would be worse.",
    },
    {
      type: "table",
      headers: ["Metric", "Number", "What it means"],
      rows: [
        [
          "Total agent runs",
          "150+",
          "Across piyush-portfolio, ai-sdlc, trip-research, career-automation",
        ],
        [
          "Tasks dispatched end-to-end",
          "45+",
          "Full BUILDER→TESTER→REVIEWER→CHECKER cycles",
        ],
        [
          "Straight-through success rate",
          "87%",
          "13% escalated correctly — none silently failed",
        ],
        ["Tier 0/1 runs", "Nearly 40", "High-stakes paths, zero incidents"],
        [
          "Total AI compute cost",
          "$136",
          "Across all four repos, all tiers, all agents",
        ],
        [
          "Average cost per task",
          "Under $4",
          "Including REVIEWER running Opus 4.8",
        ],
        [
          "Estimated engineering hours replaced",
          "100+",
          "At 3h average per Tier-2 task done manually",
        ],
      ],
    },
    {
      type: "paragraph",
      text: "The cost picture is the most interesting number. $136 in AI compute to handle tasks that would conservatively take 3–4 hours each to process manually — context gathering, writing the fix, test coverage, PR scaffolding, waiting for review. At that rate, the pipeline has redirected well over 100 engineering hours from scaffolding to higher-leverage work. That's not projected; it's the inference from the audit log task count and a conservative per-task time estimate.",
    },
    {
      type: "paragraph",
      text: "The forcing function I didn't anticipate: the pipeline only works on tickets with verifiable acceptance criteria. 'Fix the null pointer' → works. 'Improve reliability' → escalates immediately. That constraint pushes ticket quality up across all tickets, not just the ones the pipeline handles. The tool improves the process around it.",
    },
    {
      type: "paragraph",
      text: "Anthropic's 2026 Agentic Coding Trends report found engineers are spending more time on orchestration, review, and system design — and less on write-test-fix cycles. ai-sdlc is one implementation of that shift: redirect human attention from the cycle to the gate.",
    },
    {
      type: "heading",
      text: "What this looks like at team scale",
    },
    {
      type: "paragraph",
      text: "The design decisions in ai-sdlc are the same ones you'd make building a safe autonomous system for a team of 20+ engineers. The blast-radius tier model scales: you calibrate the tier map to your specific codebase rather than generic path patterns. The trust expansion model is explicit — 20+ tickets processed with zero incidents at Tier 2/3 before gates loosen at Tier 1. The audit trail becomes more important at team scale, not less.",
    },
    {
      type: "paragraph",
      text: "What breaks first at team scale: context. The BUILDER has the code, the tests, and the ticket. It doesn't have the Slack thread from six months ago where the team decided why the API contract looks the way it does. Context injection — pulling from ADRs, decision records, internal wikis — is the next layer. Without it, the pipeline handles well-bounded changes well but escalates anything requiring architectural intent.",
    },
    {
      type: "paragraph",
      text: "The governance question at team scale is the most interesting one: who owns the tier-map? Who reviews trust expansion decisions? Who gets escalation notifications? These are Engineering Manager decisions, not engineering decisions. The pipeline forces those conversations. That's a feature, not a bug.",
    },
    {
      type: "heading",
      text: "The vision",
    },
    {
      type: "paragraph",
      text: "The north star metric is merged-PRs per review-hour. Right now that number is constrained because humans still spend time re-deriving context the machine already has. The goal is to make the human review gate a genuine signal gate — five minutes of sanity-checking a structured packet rather than 30 minutes reconstructing what the change actually does.",
    },
    {
      type: "paragraph",
      text: "The next layer: context injection from ADRs and internal decision history, multi-file refactors with stronger pre-change analysis, and tier-mapping drift detection as codebases evolve. Longer term: team-scale ticket volumes, blast-radius tiers calibrated per codebase, and the trust expansion threshold as a managed team policy rather than a personal config file.",
    },
    {
      type: "heading",
      text: "What 'Pipeline-Ready' means — and what breaks without it",
    },
    {
      type: "paragraph",
      text: "The pipeline is only as good as the repo it runs against. A Pipeline-Ready repo has three things: verifiable acceptance criteria on tickets, a deterministic CI suite, and a calibrated blast-radius tier map. Remove any of the three and the pipeline degrades predictably.",
    },
    {
      type: "paragraph",
      text: "Ambiguity breaks it first. A ticket without verifiable ACs either escalates or produces a conservative no-op. Novel architecture breaks it second — if the fix requires a design decision that lives in a Slack thread from six months ago, the BUILDER doesn't have that context. Flaky tests break it third: if CI is non-deterministic, the BUILDER retries, fails to converge, and escalates. The pipeline is only as reliable as the test suite it runs against.",
    },
    {
      type: "paragraph",
      text: "Multi-file refactors don't work yet. A fix that requires touching five files in three packages to change a shared interface is a task the pipeline escalates rather than attempts. Blast-radius gates work best when the change is bounded — an open-ended refactor isn't bounded by definition.",
    },
    {
      type: "paragraph",
      text: "The full implementation — dispatch layer, agent prompt structure, hash-chaining scheme, blast-radius enforcement, and webhook wiring — is on GitHub. The README covers how to onboard a new repo and what the pipeline expects from a ticket to run straight-through.",
    },
    {
      type: "heading",
      text: "Connect",
    },
    {
      type: "paragraph",
      text: "If you're building an engineering organization that wants to think seriously about agentic-at-team-scale — what governance looks like, what breaks first, how to expand trust incrementally — I'm actively exploring Senior Engineering Manager roles in the UK, Ireland, Europe, and Singapore. I'd rather talk about the hard problems than send a CV into a void.",
    },
    {
      type: "paragraph",
      text: "The implementation is open: github.com/piyushgupta27/ai-sdlc. Issues and PRs are run through the pipeline itself.",
    },
  ],
};

export default post;
