import type { BlogPostData } from "./types";

const post: BlogPostData = {
  slug: "engineering-leadership-with-ai",
  title:
    "Engineering Leadership with AI: How I Cut 6h/Week from My Calendar and Kept What Matters",
  date: "2026-06-25",
  tag: "AI-Native Engineering",
  excerpt:
    "I run three product squads at a fintech bank. In the last year I shipped four internal AI tools — an oncall bot, an ops reporter, an OKR drafter, and a retro assistant. Together they cleared 6 hours off my week. Here's what actually worked, what degraded, and what I will never hand to a model.",
  content: [
    {
      type: "paragraph",
      text: "The honest version of this story starts with a constraint, not a vision. I was running three product squads — 15 engineers across payment APIs, merchant banking, and digital lending — with an on-call rotation that woke people up more often than it should have, a weekly ops report that ate four hours per pod per week, and a sprint cycle where retrospectives consistently started thirty minutes late because no one had the prep ready. I wasn't looking for AI to make me 'a more strategic leader.' I needed the calendar debt to stop compounding.",
    },
    {
      type: "paragraph",
      text: "Over the past year I've shipped four AI-assisted tools across my org. Not proofs of concept — production systems that people depend on. This is what each one does, what it actually saved, and what it cannot do. I'm writing the honest version because most posts about AI and engineering leadership are written at the vision layer. This one is written at the calendar layer.",
    },
    {
      type: "heading",
      text: "Tool 1: The oncall bot that deflects 71% of pages",
    },
    {
      type: "paragraph",
      text: "The problem wasn't oncall volume — it was oncall quality. Roughly a third of our pages were questions that could be answered by reading the runbook. An engineer would get woken up at 2am, look at the alert, look at the runbook, send the same Slack message they'd sent six times before. The cognitive cost was real even when the fix was trivial.",
    },
    {
      type: "paragraph",
      text: "The AI Oncall Bot lives in Slack. When an alert fires, it queries an indexed knowledge base — runbooks, past incident resolutions, service dependency maps — and posts a structured triage summary before the on-call engineer even opens Slack. If the hit rate is high enough, the summary includes a recommended action. Engineers verify and execute. If the bot doesn't know, it says so and escalates.",
    },
    {
      type: "paragraph",
      text: "The headline metric: 71% query hit rate. Resolution time dropped from a 5–10 minute baseline to around 90 seconds for covered incidents. That's the number that matters for on-call health — not cost, not the sophistication of the model, but whether engineers sleep through alerts they don't need to act on.",
    },
    {
      type: "paragraph",
      text: "The 29% that doesn't hit is where I spent the design attention. The bot is structured to fail loudly and early. If it can't resolve to a runbook action with high confidence, it does not produce a plausible-sounding guess. It escalates with a structured context packet — what it found, what it ruled out, why it's uncertain — so the engineer picks up with context rather than from scratch. Silent failures would have killed the trust.",
    },
    {
      type: "heading",
      text: "Tool 2: The ops reporter that gave each pod 4 hours back",
    },
    {
      type: "paragraph",
      text: "Every pod lead was writing the same weekly ops summary: pull CloudWatch metrics, pull Sentry error trends, cross-reference with the week's deploys, write two paragraphs about what changed and why it matters. Good engineers do this carefully. It takes them four hours they could spend on architecture or people.",
    },
    {
      type: "paragraph",
      text: "The AI OpEx Reporter ingests CloudWatch dashboards and Sentry trends on a weekly cadence and publishes a structured summary to Confluence and Slack. The template is fixed — latency trend, error rate, deploy correlation, open incidents. What the model produces is the first draft. What the pod lead produces is the final version after a ten-minute review.",
    },
    {
      type: "paragraph",
      text: "The time saving is 4 hours per pod per week. For three pods, that's roughly 12 hours of senior engineering attention recovered weekly — enough for one additional design review cycle, or a meaningful 1:1 cadence that was previously getting squeezed. The model doesn't replace the judgment call in the summary. It removes the mechanical assembly that was consuming the time before the judgment call could happen.",
    },
    {
      type: "heading",
      text: "Tool 3: AI-assisted OKR drafting",
    },
    {
      type: "paragraph",
      text: "This one surprised me. I expected OKR drafting to be one of the easier things to hand off. Structured output format, consistent inputs, well-defined criteria. In practice, LLMs consistently fail in the same direction: they optimise for OKRs that sound ambitious but measure activity rather than outcome. 'Improve system reliability' becomes a key result about reducing incident count rather than about customer experience. The measurement is easier to count, so that's what the model reaches for.",
    },
    {
      type: "paragraph",
      text: "The workflow I settled on: each squad lead submits a two-paragraph update on what shipped, what was learned, and what the team wants to focus on next quarter. The model turns those updates into a structured first-draft OKR set. I spend twenty minutes editing — always rejecting activity metrics, always pushing toward outcome metrics, always checking that the key results are falsifiable by the end of the quarter. The edit cycle takes less than half the time of starting from a blank page. The model catches omissions I'd have caught myself an hour later.",
    },
    {
      type: "paragraph",
      text: "What I will not do: let the model near performance conversations or promotion decisions. Not because the output would be obviously wrong, but because the judgment calls that matter most in those processes are the ones that require holding context across six months of 1:1 conversations, and that context lives in my head, not in any document the model can read.",
    },
    {
      type: "heading",
      text: "Tool 4: Retro prep automation",
    },
    {
      type: "paragraph",
      text: "Retrospectives were starting late because prep was inconsistent. Someone would export the sprint JIRA board, someone else would pull the incident log, a third person would try to correlate them manually before the meeting. Thirty minutes in, we'd still be assembling context rather than talking about it.",
    },
    {
      type: "paragraph",
      text: "The AI Retro Prep tool runs before every sprint close. It ingests the JIRA sprint export, the week's incident log, and the deployment history. It produces a pre-filled retrospective template: what shipped, what slipped, notable incidents with timeline, and three open-ended questions generated from the data patterns. The team spends the retro discussing, not assembling.",
    },
    {
      type: "paragraph",
      text: "70% of retro prep is now automated. The 30% that isn't is the qualitative layer — the interpersonal dynamics, the context behind why something slipped that doesn't show up in a ticket, the things people wanted to say but didn't write down. That part gets better when the mechanical layer is already handled.",
    },
    {
      type: "heading",
      text: "What the 6 hours per week actually means",
    },
    {
      type: "paragraph",
      text: "The 6-hour number is real — I track it. Oncall triage time down, ops report writing time down, OKR first-draft time down, retro assembly time down. Six hours recovered per week across these four tools, across a team of three squads.",
    },
    {
      type: "paragraph",
      text: "Where those hours went matters more than how many there are. They went into two things: more 1:1 conversations that were previously getting squeezed into 25-minute slots, and a weekly architecture review cycle that I'd been trying to establish for two quarters without enough time to run it properly. Neither of those things produces a weekly metric. Both of them compound.",
    },
    {
      type: "paragraph",
      text: "The pattern I've noticed: AI reliably handles the work that is structurally repetitive and well-documented. Runbook lookup. Template generation. First-draft formatting. It degrades predictably on anything that requires holding cross-conversation context, making judgment calls about people, or navigating ambiguity in the inputs. The failure mode is never 'the tool stopped working.' It's 'the tool produced something plausible that was subtly wrong in a way I only caught because I knew what to look for.'",
    },
    {
      type: "heading",
      text: "What I would not automate",
    },
    {
      type: "paragraph",
      text: "Escalation decisions. Performance assessments. Decisions about who gets a hard project versus who needs a recovery cycle. Career conversations. Hiring bar calls. These require integrating information that doesn't live in any document — the thing someone said in a 1:1 three months ago, the pattern I've noticed across five conversations about one team's dynamics, the read I have on whether a project is the right stretch or the wrong kind of pressure for a specific person at a specific moment. AI can summarise what's written down. It can't reason about what was decided not to write down.",
    },
    {
      type: "paragraph",
      text: "I've also stopped trying to use AI to generate the final version of anything that requires my voice. It's genuinely faster to write a two-paragraph update myself than to edit four AI paragraphs into sounding like me. The ROI on AI writing assistance shows up at the structural layer — outlines, draft structures, first-pass gap checks — not at the voice layer.",
    },
    {
      type: "heading",
      text: "Why this matters for building engineering organisations",
    },
    {
      type: "paragraph",
      text: "The more interesting question isn't 'how many hours did you save.' It's 'what does a team of 15 engineers look like when the EM has an additional 6 hours of high-quality attention per week, every week, compounding.' I think the answer is that it looks like fewer dropped threads, more consistent feedback loops, and engineering culture that runs on intention rather than whoever had the most bandwidth that week.",
    },
    {
      type: "paragraph",
      text: "If you're building an engineering organisation that wants to think seriously about where AI fits in EM workflows — which tools are worth the design investment, where the ROI is real versus aspirational, how to establish the governance model before you have an incident — I'm actively exploring Senior Engineering Manager roles in the UK, Ireland, Europe, and Singapore. The full toolkit is live at Slice. I'd rather talk about the hard cases than describe the easy wins.",
    },
  ],
};

export default post;
