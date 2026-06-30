import type { BlogPostData } from "./types";

const post: BlogPostData = {
  slug: "managerial-ai-toolkit",
  title:
    "The Managerial AI Toolkit: How I Built Four Production Systems to Automate the Work Behind the Work",
  date: "2026-07-01",
  tag: "AI-Native Engineering",
  excerpt:
    "I run three squads at a fintech bank. Over the past year I shipped four internal AI tools — an oncall bot, an ops reporter, a retro prep system, and an OKR assistant — not as experiments but as production infrastructure that my team now depends on. Here's the architecture, the design decisions, and what I learned building AI tools for a workflow I can actually observe: my own.",
  stats: [
    {
      value: "71%",
      label: "Oncall hit rate",
      sub: "queries deflected automatically",
    },
    {
      value: "90s",
      label: "Avg resolution",
      sub: "vs. 5–10 min baseline",
    },
    {
      value: "7",
      label: "Teams",
      sub: "running AI OpEx reports",
    },
    {
      value: "−47%",
      label: "Oncall bandwidth",
      sub: "15 → 8 hrs/week",
    },
  ],
  ctaText:
    "If you're an engineering org thinking through where AI fits in EM workflows — which tools are worth the design investment, where the trust model breaks down, how to run this at team scale — I'm actively exploring Senior Engineering Manager roles. Happy to go deeper on any of this.",
  content: [
    {
      type: "paragraph",
      text: "There's a version of this story where I tell you I had a strategic vision for an AI-augmented management layer. I didn't. I had a sprint retrospective that started forty minutes late because nobody had the prep ready, a weekly ops review that cost each pod lead four hours of senior engineering time to produce, and an oncall rotation that was waking people up to look at alerts they'd already seen six times. The pattern wasn't a time management problem. It was a design problem: work that was structurally identical, every week, consuming attention that could compound into something else.",
    },
    {
      type: "paragraph",
      text: "I build tools. That's the part of this job I've never entirely handed off — at Hotstar I wrote the real-time messaging infrastructure we scaled to 50M CCU, at JumpingMinds I was the first engineer before we had engineers, and at Slice I built the internal AI systems that now run across my org without me owning them day-to-day. So when I identified the design problem, my instinct wasn't to find a SaaS product. It was to spec a system.",
    },
    {
      type: "paragraph",
      text: "What follows is the architecture of the Managerial AI Toolkit — four production systems running at Slice — written for engineering leaders who want to understand the design decisions, not just the headline metrics. I'll cover what each system does, why I built it the way I did, where it degrades, and what I learned about building AI tools for a workflow I can directly observe: my own.",
    },
    {
      type: "heading",
      text: "The system landscape",
    },
    {
      type: "table",
      headers: ["System", "Trigger", "Input", "Output", "Impact"],
      rows: [
        [
          "AI Oncall Bot",
          "Alert fires in PagerDuty",
          "Alert payload + runbook index + incident history",
          "Triage summary + recommended action (or structured escalation)",
          "71% deflection rate; 90s avg resolution",
        ],
        [
          "AI OpEx Reporter",
          "Weekly GitHub Actions cron",
          "CloudWatch metrics + Sentry trends + deploy log",
          "Structured ops summary → Confluence + Slack",
          "4h/week per pod recovered; 7 teams adopted",
        ],
        [
          "Retro Prep Automation",
          "Sprint close hook",
          "JIRA sprint export + incident log + deployment history",
          "Pre-filled retro template: shipped / slipped / incidents / open questions",
          "70% of assembly automated; retros start on time",
        ],
        [
          "OKR Draft Assistant",
          "Quarter close",
          "Squad lead updates (2-paragraph structured input)",
          "First-draft OKR set in standardised format",
          "First-draft time halved; activity metrics caught before they ship",
        ],
      ],
    },
    {
      type: "heading",
      text: "The oncall bot: architecture decisions that matter",
    },
    {
      type: "paragraph",
      text: "The oncall bot is the oldest tool and the one that required the most design iteration. The failure mode I was solving wasn't response time — it was cognitive load on a fatigued on-call engineer at 2am who had to context-switch from sleep to incident triage in under sixty seconds. The solution had to lower the cognitive activation cost for covered cases and fail loudly and unambiguously for uncovered ones.",
    },
    {
      type: "paragraph",
      text: "The architecture: when an alert fires, a webhook triggers an n8n workflow. The workflow retrieves the alert payload, queries an Azure OpenAI-indexed knowledge base built from runbooks, past incident resolutions, and service dependency maps, and produces a structured triage summary. If the retrieval confidence is above threshold, the summary includes a recommended action and the supporting evidence (which runbook section, which past incident). The engineer verifies and executes. If the confidence is below threshold, the bot doesn't guess — it escalates with a structured context packet: what it found, what it ruled out, why it's uncertain.",
    },
    {
      type: "paragraph",
      text: "The 71% hit rate means seven in ten pages get a triage summary before the on-call engineer opens Slack. For covered incidents, resolution time dropped from a 5–10 minute baseline to around 90 seconds — mostly the time to read the summary and execute the action. The 29% that doesn't hit is where I spent most of the design attention. Silent failures — where the bot produces a plausible-sounding but incorrect summary — would have killed the trust faster than a system that simply said 'I don't know.' The bot is designed to fail loudly.",
    },
    {
      type: "callout",
      text: "The metric that matters for oncall health isn't resolution time — it's oncall bandwidth. Dev time on oncall dropped from 15 to 8 hours per week after the bot deployed. That's not a time-to-resolve improvement; that's 7 hours of senior engineering attention recovered per week, compounding across sprint cycles.",
      variant: "info",
    },
    {
      type: "paragraph",
      text: "The pattern was adopted by two other oncall teams at Slice without my involvement. They adapted the same n8n workflow, pointed it at their own runbook index, and had a working first version in under a week. That replication without coordination was the validation signal I cared about most — it meant the design was legible, not just functional.",
    },
    {
      type: "heading",
      text: "The ops reporter: removing the assembly layer",
    },
    {
      type: "paragraph",
      text: "Every pod lead was writing the same weekly ops summary: pull CloudWatch metrics, pull Sentry error trends, cross-reference with the week's deploys, write two paragraphs about what changed and why it matters. Good engineers do this carefully. It costs them four hours they could spend on architecture review, 1:1 depth, or design work that doesn't have a weekly deadline.",
    },
    {
      type: "paragraph",
      text: "The AI OpEx Reporter runs on a GitHub Actions cron. It ingests CloudWatch dashboards and Sentry trends, correlates them with the week's deploy log, and publishes a structured first-draft summary to Confluence and Slack. The template is fixed: latency trend, error rate, deploy correlation, open incidents. What the model produces is the first draft. What the pod lead produces after a ten-minute review is the final version.",
    },
    {
      type: "paragraph",
      text: "The time saving is 4 hours per pod per week. For three pods, that's 12 hours of senior engineering attention recovered weekly — enough for one additional architecture review cycle, or a meaningful 1:1 cadence that was previously getting squeezed into 25-minute slots. Seven teams now run the reporter without EM thread-ownership. The bi-weekly cadence is live because the assembly cost dropped below the threshold where it was getting skipped.",
    },
    {
      type: "heading",
      text: "Retro prep and OKR drafting: where the model degrades",
    },
    {
      type: "paragraph",
      text: "Retro prep is structurally simpler than the oncall bot. The inputs are well-defined — sprint JIRA export, incident log, deploy history — and the output format is fixed: what shipped, what slipped, notable incidents, three open-ended questions generated from the data patterns. The model does the assembly. The team does the discussing. 70% of retro prep is now automated. The 30% that isn't is the qualitative layer: the interpersonal dynamics, the context behind why something slipped that doesn't show up in a ticket, the things people wanted to say but didn't write down.",
    },
    {
      type: "paragraph",
      text: "OKR drafting surprised me. I expected it to be one of the easier problems — structured output format, consistent inputs, well-defined criteria. In practice, LLMs consistently fail in the same direction: they optimise for OKRs that sound ambitious but measure activity rather than outcome. 'Improve system reliability' becomes a key result about reducing incident count rather than about customer experience. The measurement is easier to count, so that's what the model reaches for.",
    },
    {
      type: "paragraph",
      text: "The workflow I settled on: each squad lead submits a two-paragraph update — what shipped, what was learned, what the team wants to focus on next quarter. The model turns those updates into a structured first-draft OKR set. I spend twenty minutes editing: always rejecting activity metrics, always pushing toward outcome metrics, always checking that the key results are falsifiable by quarter end. The model catches omissions I'd have caught myself an hour later. The edit cycle takes less than half the time of starting from a blank page. That's the right level of assistance for a judgment-heavy workflow.",
    },
    {
      type: "heading",
      text: "What I will not automate",
    },
    {
      type: "paragraph",
      text: "Escalation decisions. Performance assessments. Career conversations. Decisions about who gets a hard project versus who needs a recovery cycle. These require integrating information that doesn't live in any document: the thing someone said in a 1:1 three months ago, the pattern I've noticed across five conversations about one team's dynamics, the read I have on whether a specific project is the right stretch or the wrong kind of pressure for a specific person at a specific moment. AI can summarise what's written down. It cannot reason about what was decided not to write down.",
    },
    {
      type: "paragraph",
      text: "The failure mode I've learned to watch for isn't catastrophic — it's plausible. The oncall bot sometimes produces a structured summary that's technically correct but contextually wrong for the current incident state. The retro assistant sometimes frames a miss as a process gap when it was actually a staffing gap. The OKR drafter produces activity metrics that sound like outcome metrics. None of these are wrong in a way that's immediately obvious. They're wrong in a way that requires someone who has context the model doesn't have.",
    },
    {
      type: "callout",
      text: "The right mental model: AI reliably handles the work that is structurally repetitive and well-documented. It degrades predictably on anything that requires holding cross-conversation context, making judgment calls about people, or navigating ambiguity in the inputs. The failure mode is never 'the tool stopped working.' It's 'the tool produced something plausible that was subtly wrong in a way I only caught because I knew what to look for.'",
      variant: "tip",
    },
    {
      type: "heading",
      text: "Building at org scale: the AMJ initiative",
    },
    {
      type: "paragraph",
      text: "The four tools started as personal infrastructure. The question that got more interesting: what happens when you run this pattern across 15+ engineering squads? I wrote the AMJ 2026 agentic workflow goals for the engineering org at Slice — a commitment that every engineering team deploys at least two agentic workflows into production by June 30, each targeting low-complexity, repeatable, low-blast-radius work with a documented harness and measured before/after impact.",
    },
    {
      type: "paragraph",
      text: "The design principles from the personal toolkit transferred directly: three-filter test (low complexity, repeatable, low blast radius), documented harness before deployment, validation layer before human review, HITL at the right level, measurable impact from day one. What didn't transfer as cleanly: the knowledge base indexing. The oncall bot works because I spent the time building a high-quality runbook index. At org scale, service-level knowledge quality is highly variable, and the model's output quality tracks it directly. Garbage-in, confident-garbage-out.",
    },
    {
      type: "paragraph",
      text: "The org-scale version of 'the model degrades on ambiguous inputs' is 'the value of the workflow is proportional to the quality of the spec and the documentation behind it.' EMs who want to run agentic workflows on their ops review need structured observability data in machine-readable form. Teams that can't describe their services in structured terms first need to solve that problem before the AI layer adds value. The AI toolkit is the motivation; the documentation quality is the prerequisite.",
    },
    {
      type: "heading",
      text: "What this looks like compounded",
    },
    {
      type: "paragraph",
      text: "6 hours per week recovered across the four tools. That number is real — I track it. But the more interesting question isn't how many hours. It's what an EM does with an additional 6 hours of high-quality attention per week, every week, compounding. In practice: more 1:1 conversations that previously got squeezed, a weekly architecture review cycle that I'd been trying to establish for two quarters without enough time to run it, and more consistent feedback loops on the work that actually compounds — people growth, technical direction, cross-team alignment.",
    },
    {
      type: "paragraph",
      text: "None of that shows up in a weekly metric. All of it compounds. The toolkit's value isn't in the hours it saves. It's in what those hours become when they're no longer consumed by work that's structurally identical every sprint.",
    },
  ],
};

export default post;
