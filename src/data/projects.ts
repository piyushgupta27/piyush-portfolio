export interface Project {
  title: string;
  description: string;
  tech: string[];
  gradient: string;
  link?: string;
  highlight?: string;
}

export const projects: Project[] = [
  {
    title: "ai-sdlc",
    description:
      "Engineering teams lose hours to context-switching between review, testing, and merge cycles. I built a multi-agent SDLC platform (BUILDER / TESTER / REVIEWER) with hash-chained audit trails and blast-radius gates that block high-risk changes automatically. The platform manages its own development — every PR ships through the same pipeline it improves.",
    tech: ["TypeScript", "Node 22", "Claude Code"],
    gradient: "from-cyan-500/20 to-blue-600/20",
    link: "https://github.com/piyushgupta27/ai-sdlc",
    highlight: "5× faster PR cycle · ~$3–5/ticket · blast-radius gates",
  },
  {
    title: "trip-research",
    description:
      "Comparing hotel prices across Booking, Airbnb, Expedia, and 3 other platforms meant 6 tabs and 20 minutes of manual work per trip. I built a local-first meta-search engine that scrapes, normalises, and ranks results from all 6 platforms in a single query. Cross-platform price intelligence cuts pre-trip research from 20 minutes to under 2.",
    tech: ["TypeScript", "Playwright", "SQLite"],
    gradient: "from-purple-500/20 to-pink-600/20",
    highlight: "6 platforms, 1 query",
  },
  {
    title: "career-automation",
    description:
      "Manual job-hunting — parsing JDs, tailoring resumes, and tracking applications — consumed hours per week. I built an end-to-end pipeline that sources roles, runs an LLM fit-check against my profile, and generates a tailored resume and cover letter per role. The system cut active application time by ~80% while increasing targeting precision.",
    tech: ["TypeScript", "SQLite", "Playwright", "Claude SDK"],
    gradient: "from-green-500/20 to-emerald-600/20",
    highlight: "~80% reduction in active application time",
  },
  {
    title: "ai-finance-tracker",
    description:
      "Most personal finance tools require manual categorisation or expensive bank integrations. I built a local pipeline that ingests raw bank-statement CSVs, auto-categorises transactions with an LLM, and produces a monthly narrative summary alongside spend charts. Zero manual entry — all insight, no data-entry overhead.",
    tech: ["Python", "DuckDB", "Claude"],
    gradient: "from-orange-500/20 to-red-600/20",
    highlight: "Zero manual entry",
  },
  {
    title: "ai-health-agent",
    description:
      "Health data lives in silos — Apple Health exports, sleep-tracker CSVs, and workout logs never talk to each other. I built an aggregation agent that unifies four data sources and surfaces a weekly LLM digest: trends, anomalies, and one actionable recommendation. Single weekly read replaces four disconnected dashboards.",
    tech: ["Swift", "Python", "Claude"],
    gradient: "from-pink-500/20 to-violet-600/20",
    highlight: "4 sources → 1 weekly digest",
  },
];
