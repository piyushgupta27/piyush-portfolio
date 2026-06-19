import type { BlogPostData } from "./types";

const post: BlogPostData = {
  slug: "shipping-with-confidence",
  title: "Shipping with Confidence: A Process Playbook for Platform Teams",
  date: "2026-03-15",
  tag: "Process",
  excerpt:
    "Most platform outages aren't caused by a single bad deployment — they're caused by a missing process that let a risky deployment through without the right checks. Here's the playbook I've refined across three platform teams.",
  content: [
    {
      type: "paragraph",
      text: "Most platform outages aren't caused by a single bad deployment — they're caused by a missing process that let a risky deployment through without the right checks. After running platform engineering at Hotstar (50M+ concurrent users) and Slice (10M+ daily actives), I've refined a process playbook that balances shipping velocity with production confidence.",
    },
    {
      type: "heading",
      text: "Classify Before You Deploy",
    },
    {
      type: "paragraph",
      text: "The first question before any deployment isn't 'is the code ready?' — it's 'what tier is this change?' A tier-1 change (database schema migration, auth middleware rewrite, payment flow modification) needs a different process than a tier-3 change (copy update, feature flag toggle, UI colour change). Treating everything as equally risky creates process overhead that engineers route around. Treating everything as equally safe creates incidents.",
    },
    {
      type: "paragraph",
      text: "The classification system I use: tier by blast radius (how many users affected if this fails), reversibility (can we roll back in under 5 minutes), and dependency surface (how many other systems touch this change). High blast radius + low reversibility + broad dependency surface = tier 1, requires explicit sign-off. Low blast radius + high reversibility + narrow surface = tier 3, auto-deploys on passing CI.",
    },
    {
      type: "heading",
      text: "The Pre-Mortem as Standard Practice",
    },
    {
      type: "paragraph",
      text: "For any tier-1 or tier-2 change, I run a 20-minute pre-mortem: assume the deployment goes wrong, write down what happened, trace back to the decision that made it possible. This exercise surfaces assumptions that aren't written down anywhere — the implicit 'of course X is true' that turns out not to be true at 3am during an incident.",
    },
    {
      type: "paragraph",
      text: "Pre-mortems don't need to be long. The useful format: one sentence describing the failure, one sentence on the first indicator we'd see, one action we can take now to make recovery faster. Three sentences. Twenty minutes. The engineers who've run this with me consistently report that the discipline of writing it down forces clarity that 'talking through it' doesn't.",
    },
    {
      type: "heading",
      text: "On-Call Rotation Design",
    },
    {
      type: "paragraph",
      text: "The on-call rotation is where process meets reality. Two anti-patterns I've eliminated from every team I've run: the 'hero on-call' (one senior engineer who everyone calls when things go wrong) and the 'round-robin by default' (everyone on-call for everything, regardless of domain knowledge). Both create perverse incentives.",
    },
    {
      type: "paragraph",
      text: "What works: on-call ownership by service boundary, not by seniority. Every engineer who ships to a service is on-call for that service. This aligns incentives perfectly — the engineer who introduced the bug is the one paged at 2am. It also accelerates the feedback loop between shipping and operating, which is the fastest way to improve service quality.",
    },
    {
      type: "heading",
      text: "The Retrospective That Closes Loops",
    },
    {
      type: "paragraph",
      text: "Every outage gets a retrospective. The format I've standardised on: timeline of events (factual, no blame), contributing factors (systems and processes, not people), and exactly two action items. The two-item constraint is the key. A retrospective that produces ten action items produces zero accountability — nobody owns them, they're not tracked, they're forgotten by the next incident.",
    },
    {
      type: "paragraph",
      text: "Two items, each with a named owner and a due date. One should be a structural fix (change the system so this class of failure is prevented). One should be a detection fix (we should have seen this coming sooner). Review them at the next retrospective. This is the loop that actually closes.",
    },
  ],
};

export default post;
