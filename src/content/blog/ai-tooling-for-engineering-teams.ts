import type { BlogPostData } from "./types";

const post: BlogPostData = {
  slug: "ai-tooling-for-engineering-teams",
  title: "AI Tooling for Engineering Teams: What Actually Moves the Needle",
  date: "2026-04-08",
  tag: "AI Tooling",
  excerpt:
    "Most teams adopt AI coding tools and measure the wrong thing. Here's what I've learned after integrating agentic workflows into a 20-person platform team.",
  content: [
    {
      type: "paragraph",
      text: "Most teams adopt AI coding tools and measure the wrong thing. They track tokens used, code accepted, or hours theoretically saved — metrics that tell you something was generated but nothing about whether it was useful. After running agentic SDLC workflows on my team for several months, here's what I've learned about what actually moves the needle.",
    },
    {
      type: "heading",
      text: "The Wrong Metric Trap",
    },
    {
      type: "paragraph",
      text: "Copilot acceptance rate is the most common metric I see. It measures whether developers accept AI suggestions — not whether those suggestions improved the code, shipped faster, or reduced bugs. I've seen teams with 40% acceptance rates that haven't shipped any faster, and teams with 15% acceptance rates where the rejected suggestions taught engineers what not to write.",
    },
    {
      type: "paragraph",
      text: "The metric I care about: time from ticket-open to production-deploy, broken down by phase (spec, code, review, test, merge). AI tooling should shrink one or more of those phases. If it doesn't show up there, you haven't found the right application yet.",
    },
    {
      type: "heading",
      text: "Where AI Actually Helps on a Platform Team",
    },
    {
      type: "paragraph",
      text: "The highest-leverage AI applications I've found aren't in code generation — they're in context surfacing. When a new engineer needs to understand why a particular architectural decision was made, AI that can synthesise across PRs, ADRs, and Slack threads saves hours of onboarding. When an on-call engineer is debugging a production issue, AI that can correlate deployment events with error spikes cuts mean time to recovery.",
    },
    {
      type: "paragraph",
      text: "Code generation helps most in high-boilerplate, low-ambiguity tasks: writing tests for an interface you've already designed, generating migration scripts, scaffolding new service endpoints from an existing pattern. It helps least in the places engineers spend the most time: designing the right abstraction, debugging emergent behaviour, making the call between two reasonable approaches.",
    },
    {
      type: "heading",
      text: "The Blast-Radius Problem",
    },
    {
      type: "paragraph",
      text: "The most important question nobody asks when adopting AI tooling: what's the blast radius of a wrong AI suggestion? In a tightly-coupled monolith, one plausible-but-wrong refactor propagates across dozens of callers. In a microservice with a small surface area, the same error is contained. AI tooling should be deployed where blast radius is manageable and human review catches the tail.",
    },
    {
      type: "paragraph",
      text: "For ai-sdlc, my personal project building agentic SDLC pipelines, I added a literal blast-radius gate: before any AI agent can write to critical infrastructure files, a script scores the change by tier and routes high-risk changes to human review. The AI generates; the gate decides what gets through. That combination is what I'd recommend to any team at scale.",
    },
    {
      type: "heading",
      text: "What to Try Next",
    },
    {
      type: "paragraph",
      text: "If your team hasn't adopted AI tooling: start with test generation and PR summarisation — high signal, low blast radius, easy to measure. If you're already using code generation: move up the stack into spec-writing and design-review automation. The biggest leverage in AI-augmented engineering isn't faster code — it's faster decisions, and that's where the tooling is still immature and the opportunity is largest.",
    },
  ],
};

export default post;
