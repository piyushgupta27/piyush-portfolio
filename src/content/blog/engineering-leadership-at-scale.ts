import type { BlogPostData } from "./types";

const post: BlogPostData = {
  slug: "engineering-leadership-at-scale",
  title: "Engineering Leadership at Scale: From IC to EM",
  date: "2026-05-12",
  tag: "Engineering Leadership",
  excerpt:
    "The hardest part of becoming an engineering manager isn't learning to stop coding — it's learning to multiply your impact through others without losing the technical credibility that got you here.",
  content: [
    {
      type: "paragraph",
      text: "The hardest part of becoming an engineering manager isn't learning to stop coding — it's learning to multiply your impact through others without losing the technical credibility that got you here. After managing teams at Disney+ Hotstar and Slice, I've built a mental model that helps me navigate this balance.",
    },
    {
      type: "heading",
      text: "The Leverage Shift",
    },
    {
      type: "paragraph",
      text: "As an IC, your leverage is linear: your output scales with your hours. As an EM, your leverage is multiplicative: a single conversation, a well-structured review cycle, or a clear technical direction can unlock 5× or 10× your individual output across the team. The transition isn't about working less — it's about working on different things.",
    },
    {
      type: "paragraph",
      text: "At Hotstar, when we were building realtime messaging infrastructure for 50M+ concurrent users, my job shifted from writing the critical path code to making sure the right engineers owned it, had the context they needed, and weren't blocked by organisational friction. The technical decisions still mattered — but my job was to create the conditions for them to be made well, not to make them alone.",
    },
    {
      type: "heading",
      text: "Technical Credibility Without Being a Bottleneck",
    },
    {
      type: "paragraph",
      text: "The EM trap is becoming the team's senior architect while also being responsible for headcount, roadmap, and culture. You end up being a bottleneck on both tracks. The fix I landed on: stay deeply technical on one or two systems, stay directionally technical on everything else, and make your technical opinion earnable — not automatic.",
    },
    {
      type: "paragraph",
      text: "Earnable means: I'll have a strong view, I'll share the reasoning, and I'll update it when someone shows me a better model. Engineers will bring you their hardest problems if they believe you'll engage seriously and won't just rubber-stamp the loudest voice in the room.",
    },
    {
      type: "heading",
      text: "The Operating Cadence That Actually Works",
    },
    {
      type: "paragraph",
      text: "I run three recurring rituals that have scaled across team sizes of 6 to 30: weekly 1:1s with a shared doc (engineer owns the agenda, I own follow-through), a biweekly tech-debt hour where the team nominates one problem and we fix it together, and a monthly retrospective that produces exactly two action items — one the team owns, one I own.",
    },
    {
      type: "paragraph",
      text: "The constraint of two action items sounds artificial, but it forces prioritisation. A retro that produces twelve action items produces zero accountability. Two items, owned specifically, with a due date: that closes loops.",
    },
    {
      type: "heading",
      text: "What I'd Tell My Earlier Self",
    },
    {
      type: "paragraph",
      text: "Don't measure your effectiveness by how many PRs you review or how often you're in the critical path. Measure it by whether your team is shipping better, growing faster, and running into fewer of the same problems twice. The best signal I've found: can your team make good decisions when you're not in the room? If yes, you're doing the job. If no, you have work to do.",
    },
  ],
};

export default post;
