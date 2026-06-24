import type { BlogPostData } from "./types";

const post: BlogPostData = {
  slug: "ai-leadership-toolkit",
  title: "The AI Leadership Toolkit: How I Reclaimed 6 Hours a Week as an Engineering Manager",
  date: "2025-04-01",
  tag: "AI Leadership",
  excerpt:
    "Four concrete AI workflows — oncall bot, OpEx reporting, OKR drafting, and retro prep — that saved 6 hours a week. The wins, the failure modes, and the line I drew on what not to automate.",
  content: [
    {
      type: "paragraph",
      text: "Six hours a week. That is what I reclaimed last year by embedding AI into four recurring workflows: on-call triage, operational reporting, OKR drafting, and retrospective prep. The number might sound modest, but in the compressed calendar of a senior engineering manager — back-to-back one-on-ones, cross-functional syncs, and quarterly planning — six hours is the difference between reactive management and time to think.",
    },
    {
      type: "paragraph",
      text: "This post is the honest version, not a vendor case study. I will tell you what actually saved time, what the failure modes looked like, and where I deliberately stopped automating because stripping out the human judgment was not worth it. If you are an engineering manager evaluating AI tooling, start here.",
    },
    {
      type: "heading",
      text: "Tool 1: The AI Oncall Bot — 71% of Queries Resolved Without Waking an Engineer",
    },
    {
      type: "paragraph",
      text: "Our on-call load had a familiar shape: engineers were being woken for queries that did not require human judgment. Playbook lookups, threshold explanations, escalation routing. These accounted for the majority of off-hours pages, and the answers existed somewhere in Confluence or a Slack thread from eight months ago. The cognitive and morale cost was real — on-call fatigue is one of the fastest ways to erode a high-performing team.",
    },
    {
      type: "paragraph",
      text: "We built a retrieval-augmented bot that ingested our runbooks, incident postmortems, and service dependency maps. The knowledge base structure mattered more than the model: every entry was tagged with alert name, service owner, and severity level. The bot ranks by recency and severity, routes to a human when confidence drops below a threshold, and logs every resolution for postmortem input.",
    },
    {
      type: "paragraph",
      text: "The 71 percent resolution rate was not a target — it emerged after two months of tuning. The remaining 29 percent routes to an on-call human immediately, with context pre-populated: what the bot tried, what it found, why it escalated. Engineers report the 29 percent is actually easier to handle now because the context window arrives with the alert.",
    },
    {
      type: "heading",
      text: "Tool 2: The AI OpEx Reporter — From Raw Dashboards to Decision-Ready Summaries",
    },
    {
      type: "paragraph",
      text: "Every engineering team generates a flood of operational data: CloudWatch alarms, Sentry error rates, deployment frequencies, latency trends. Compiling this into a weekly operational summary used to take a couple of hours — pulling numbers, writing narrative, formatting for a non-technical audience. It was important work that nobody found interesting to do, and the quality varied based on who was doing it and how much time pressure they were under.",
    },
    {
      type: "paragraph",
      text: "We now pipe CloudWatch and Sentry exports into a structured template and run them through an LLM with a specific role prompt: summarize trends, flag regressions, and surface one action item per degraded service. The template constrains output format; the LLM handles narrative synthesis. Time from raw data to first draft: under five minutes.",
    },
    {
      type: "paragraph",
      text: "What AI cannot do here is the judgment call about what actually matters. An LLM sees a latency spike and flags it; a human recognizes the spike coincides with a planned infrastructure migration and is expected. We treat the AI summary as a first draft that needs one pass of editorial review — roughly ten minutes — rather than a finished product. Total time saving: about ninety minutes per week.",
    },
    {
      type: "heading",
      text: "Tool 3: AI OKR Drafting — First Draft in 20 Minutes Instead of a Full Afternoon",
    },
    {
      type: "paragraph",
      text: "OKR drafting feels strategic but is mostly synthesis. You read team updates, engineering metrics, and product priorities, then translate them into objectives and key results that are specific, measurable, and aligned to company strategy. The synthesis is the intellectual work. The writing is largely a formatting exercise — and formatting exercises are exactly where LLMs are useful.",
    },
    {
      type: "paragraph",
      text: "My prompt structure has evolved over six quarters. I feed it: the team mission statement, last quarter's OKRs, a bulleted list of shipping commitments and technical priorities, and company-level goals. I ask for three candidate objectives with two or three key results each, framed as outcomes not outputs. The model generates options I can react to rather than drafting from scratch.",
    },
    {
      type: "paragraph",
      text: "What LLMs reliably get wrong in OKRs: key results that measure activity rather than outcome — 'ship X feature' instead of 'X percent of users adopt Y capability' — and aspirational language that does not survive a budget conversation. I now include an explicit instruction in the prompt: flag any key result that measures output rather than outcome and explain why. This does not eliminate the problem but surfaces it before the draft reaches planning.",
    },
    {
      type: "heading",
      text: "Tool 4: AI Retro Prep — 70% of Prep Work Eliminated",
    },
    {
      type: "paragraph",
      text: "Retrospectives require preparation to be useful. Walking in cold means the first twenty minutes are spent reconstructing what happened — and in a fifty-minute sprint retro, that is a third of your time. Good prep means synthesizing the sprint's ticket activity, incident log, deployment log, and any notable team dynamics. I used to do this the morning of the retro. It took between forty-five minutes and an hour, and it was hard to do well under time pressure.",
    },
    {
      type: "paragraph",
      text: "Now I export the sprint JIRA data as CSV, combine it with the incident log, and run it through a prompt that produces: a timeline of key events, a list of blockers and how they resolved, and candidate discussion themes. The result is a two-page structured document I can scan in ten minutes. I add team dynamics context — things that do not appear in tickets — and arrive with an agenda rather than a blank page.",
    },
    {
      type: "paragraph",
      text: "The hallucination risk is highest here. LLMs will confidently summarize a ticket's resolution from its title and status, even when the actual resolution involved three hours of debugging and a hotfix not visible in the tracker. I have been caught by this twice. My mitigation: always scan the incident log separately and cross-reference manually. The AI saves synthesis time; the human preserves accuracy.",
    },
    {
      type: "heading",
      text: "The Meta-Lesson: What AI Changes and What It Does Not",
    },
    {
      type: "paragraph",
      text: "Across these four tools, a pattern emerges. AI reliably handles information retrieval with clear inputs, narrative synthesis from structured data, and first-draft generation where the output shape is defined. It degrades when judgment requires organizational context, when the absence of information matters as much as its presence, and when the assessment depends on knowing what is important in your specific team.",
    },
    {
      type: "paragraph",
      text: "The six hours I reclaimed did not go back into email. They went into conversations I was not having, strategic documents I was deferring, and occasional uninterrupted thinking. If you are building an AI-augmented management stack, the calculation is not just hours saved — it is what you do with the margin. Reclaimed time tends to compound: it flows toward higher-leverage work rather than absorbing more low-leverage volume.",
    },
    {
      type: "paragraph",
      text: "What I would not automate: one-on-one notes and follow-through, performance narratives, hiring decisions, and anything that requires having been present and paying attention. These are not just safety concerns — automating them produces output that is technically plausible but hollow in the ways that matter most. My operating line is: AI for synthesis and first drafts, human for judgment, presence, and stakes.",
    },
    {
      type: "heading",
      text: "What Comes Next",
    },
    {
      type: "paragraph",
      text: "The tooling described here will improve. The bigger shift is in how I now audit my own recurring tasks — not by asking how to do them better but by asking which parts do not require me. Most engineering managers have more automatable work than they assume, and most of the resistance is institutional rather than technical.",
    },
    {
      type: "paragraph",
      text: "This is the first post in a series on AI-assisted engineering leadership. The next post covers AI in one-on-one preparation and career development conversations — more nuanced territory where the stakes are higher and the failure modes more consequential. If you are building these kinds of systems and want to compare notes, find me on Medium or LinkedIn.",
    },
  ],
};

export default post;
