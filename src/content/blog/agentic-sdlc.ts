import type { BlogPostData } from "./types";

const post: BlogPostData = {
  slug: "agentic-sdlc",
  title: "How I Built an Agentic SDLC — and Used It to Build Itself",
  date: "2026-06-24",
  tag: "Engineering Systems",
  excerpt:
    "I got tired of spending more time on scaffolding than on the actual fix. So I built ai-sdlc — a three-agent pipeline that takes a Jira ticket and delivers a reviewed, gated PR. This is the story of building it, and the first real proof it works: the system dispatching tickets to improve itself.",
  githubUrl: "https://github.com/piyushgupta27/ai-sdlc",
  content: [
    {
      type: "paragraph",
      text: "Last quarter I pulled up our sprint metrics and found something that bothered me for weeks. Nearly a fifth of our engineering capacity had gone to work that was structurally identical: same bug class, same fix pattern, same PR template we'd filled in fifty times. Sentry fires. Root cause in an hour. Fix in 20 minutes. And then the rest of the day disappears into scaffolding.",
    },
    {
      type: "paragraph",
      text: "I didn't want to fix that specific bug faster. I wanted to stop being the engineer who fills in the same PR template for the fiftieth time. So I built ai-sdlc.",
    },
    {
      type: "callout",
      text: "What follows is where the system is today — early, opinionated, and not production-ready at team scale. It works on my own projects and has been used to ship improvements to itself. The vision is bigger. I'll get to that.",
      variant: "info",
    },
    {
      type: "heading",
      text: "Three agents, one human gate",
    },
    {
      type: "paragraph",
      text: "The pipeline has three agents and one moment where a human has to make a decision. Everything else is automated.",
    },
    {
      type: "table",
      headers: ["Stage", "Who", "What it does", "Output"],
      rows: [
        [
          "Dispatch",
          "Webhook layer",
          "Reads the Jira ticket or Sentry alert, enriches with context, assigns blast-radius tier",
          "Structured task brief",
        ],
        [
          "BUILDER",
          "Agent 1",
          "Reads affected files from the stack trace, writes the minimal diff, runs typecheck + lint + tests verbatim",
          "Commit SHA",
        ],
        [
          "TESTER",
          "Agent 2",
          "Reads the diff independently (never the BUILDER's reasoning), checks coverage, identifies edge cases",
          "PASS / PASS_WITH_CAVEATS / FAIL",
        ],
        [
          "REVIEWER",
          "Agent 3",
          "Maps touched files to blast-radius tiers, checks whether high-risk paths were reached, produces a structured summary",
          "Blast-radius map",
        ],
        [
          "Human gate",
          "You",
          "Reviews the diff + TESTER verdict + blast-radius map. Approve → automated merge. Reject → back to BUILDER with notes.",
          "Decision",
        ],
      ],
    },
    {
      type: "paragraph",
      text: "Each agent's output is hash-chained: every step signs what it received and what it produced. If a downstream agent's hash doesn't match the upstream output, the pipeline fails. That audit trail matters when someone eventually asks \"who changed what and on whose authority.\"",
    },
    {
      type: "heading",
      text: "The first real example: ai-sdlc building ai-sdlc",
    },
    {
      type: "paragraph",
      text: "The most credible proof that a system works is when it can improve itself. The first substantial dispatch I ran on ai-sdlc was a ticket to add blast-radius tier overrides — edge cases where the file path pattern doesn't capture actual risk. Payment callback handler in a /utils/ directory, say, which the tier mapper would have classified as Tier 2 when it's functionally Tier 1.",
    },
    {
      type: "paragraph",
      text: "The BUILDER read the tier-mapping module, identified where the pattern matching lived, and wrote the override mechanism — a config-driven map from explicit file paths to tier assignments that takes precedence over path patterns. It staged only the touched files, ran the test suite, committed clean.",
    },
    {
      type: "paragraph",
      text: "The TESTER flagged one thing: the override mechanism didn't validate that the explicit tier assignment was a valid tier. It would silently accept any string. PASS_WITH_CAVEATS. The BUILDER picked up the caveat and added the validation.",
    },
    {
      type: "paragraph",
      text: "The REVIEWER confirmed: two files touched, both Tier 3 (config and pipeline logic). No Tier-0 or Tier-1 paths reached. The review packet at the human gate was: a 40-line diff, a PASS verdict, a two-file blast-radius map. I approved in four minutes.",
    },
    {
      type: "callout",
      text: "That's the meta moment: the tool that manages blast-radius analysis got a blast-radius analysis run on the PR that added blast-radius overrides to it.",
      variant: "tip",
    },
    {
      type: "heading",
      text: "Blast-radius tiers are not static analysis",
    },
    {
      type: "paragraph",
      text: "Static analysis tools — SonarQube, Semgrep — look at code in isolation. They flag patterns: potential null dereferences, missing input validation. Blast-radius tiers look at something different: what is this change structurally capable of touching, and does that match the risk level of the work?",
    },
    {
      type: "table",
      headers: ["Tier", "Risk level", "Examples", "Human gates"],
      rows: [
        [
          "Tier 0",
          "Critical",
          "Ledger entries, idempotency keys, settlement reconciliation",
          "All 5 gates — no exceptions",
        ],
        [
          "Tier 1",
          "High",
          "Payment callbacks, auth middleware, session management",
          "Full gate + explicit REVIEWER sign-off",
        ],
        [
          "Tier 2",
          "Standard",
          "Product logic, feature flags, API handlers",
          "Standard gate (TESTER + REVIEWER + human)",
        ],
        [
          "Tier 3",
          "Low",
          "Configuration, docs, test files, UI copy",
          "Lightweight (TESTER verdict + human)",
        ],
      ],
    },
    {
      type: "paragraph",
      text: "The BUILDER operates with a pre-write hook: every file write is checked against the tier map before the write executes. A Tier-0 write from a Tier-2 task doesn't fail quietly — it escalates immediately. The BUILDER sets outcome: \"escalated\" and the human gate fires before a single byte reaches the money-movement path.",
    },
    {
      type: "paragraph",
      text: "An automated system that can touch anything with the right prompt is a liability. A system that is structurally prevented from reaching high-risk paths without a human checkpoint is a controlled system. The goal isn't to remove humans — it's to put humans in the loop at the right moment, with the right information.",
    },
    {
      type: "heading",
      text: "Where it works today",
    },
    {
      type: "paragraph",
      text: "Honest accounting: ai-sdlc is not production-ready at team scale. It runs on my own projects — this portfolio site is managed through it, and ai-sdlc itself has been developed using its own pipeline. Within that scope, the results hold up.",
    },
    {
      type: "paragraph",
      text: "For Tier-2 and Tier-3 tasks with clear acceptance criteria, the median time from dispatch to a review-ready PR is under 15 minutes. That includes context gathering, writing the fix, running the test suite, and producing the structured review packet. The human gate adds 4–8 minutes depending on complexity. Compare that to the pre-pipeline baseline: several hours when you factor in context-switching, test writing, and PR scaffolding.",
    },
    {
      type: "paragraph",
      text: "The forcing function I didn't anticipate: the pipeline only works on tickets with verifiable acceptance criteria. \"Fix the null pointer\" → works. \"Improve reliability\" → escalates immediately. That pushes ticket quality up regardless of whether the pipeline touches them.",
    },
    {
      type: "heading",
      text: "The vision",
    },
    {
      type: "paragraph",
      text: "The north star metric is merged-PRs per review-hour. Right now that number is low because humans still spend time re-deriving context the machine already has. The goal is to make the human review gate a genuine signal gate — five minutes of sanity-checking a structured packet rather than 30 minutes reconstructing what the change actually does.",
    },
    {
      type: "paragraph",
      text: "The next layer is context injection: pulling from ADRs, internal wikis, Confluence pages so the BUILDER has the decision history that lives outside the code. Multi-file refactors with stronger pre-change analysis. Tier-mapping drift detection as codebases evolve.",
    },
    {
      type: "paragraph",
      text: "Longer term: the pipeline running on team-scale ticket volumes, with the blast-radius tiers calibrated to the specific codebase rather than generic path patterns. The trust expansion model is explicit — 20+ tickets processed with zero incidents at Tier 2/3 before the gates loosen at Tier 1.",
    },
    {
      type: "heading",
      text: "What breaks",
    },
    {
      type: "paragraph",
      text: "Ambiguity breaks it. A ticket without verifiable acceptance criteria either escalates or produces a conservative no-op. Novel architecture breaks it — if the fix requires understanding a design decision that lives in a Slack thread from six months ago, the BUILDER doesn't have that context. Flaky tests break it. If CI is non-deterministic, the BUILDER retries, fails to converge, and escalates. That's the correct behavior, but it means the pipeline is only as reliable as the test suite it runs against.",
    },
    {
      type: "paragraph",
      text: "Multi-file refactors don't work yet. A fix that requires touching five files in three packages to change a shared interface is a task the pipeline escalates rather than attempts. The blast-radius gates work best when the change is bounded — an open-ended refactor isn't bounded by definition.",
    },
    {
      type: "paragraph",
      text: "The architecture diagram and full implementation are on GitHub. The README covers the dispatch layer, the agent prompt structure, the hash-chaining scheme, and how to wire Jira and Sentry webhooks to your own pipeline.",
    },
  ],
};

export default post;
