export interface Project {
  title: string;
  description: string;
  tech: string[];
  gradient: string;
  icon: string;
  link?: string;
}

export const projects: Project[] = [
  {
    title: "ai-sdlc",
    description:
      "Autonomous SDLC platform with multi-agent pipeline (BUILDER/TESTER/REVIEWER), hash-chained audit, and blast-radius gates. Self-hosted as its own first testbed.",
    tech: ["TypeScript", "Node 22", "Claude Code"],
    gradient: "from-cyan-500/20 to-blue-600/20",
    icon: "Workflow",
    link: "https://github.com/piyushgupta27/ai-sdlc",
  },
  {
    title: "trip-research",
    description:
      "Local-first hotel meta-search across 6 platforms with cross-platform price intelligence.",
    tech: ["TypeScript", "Playwright", "SQLite"],
    gradient: "from-purple-500/20 to-pink-600/20",
    icon: "Search",
  },
  {
    title: "career-automation",
    description:
      "End-to-end personal job-application automation: sourcing, research, fit-check, and tailored resumes.",
    tech: ["TypeScript", "SQLite", "Playwright", "Claude SDK"],
    gradient: "from-green-500/20 to-emerald-600/20",
    icon: "Briefcase",
  },
  {
    title: "ai-finance-tracker",
    description:
      "Personal finance dashboard with bank-statement ingestion, categorization, and monthly LLM-summarized reports.",
    tech: ["Python", "DuckDB", "Claude"],
    gradient: "from-orange-500/20 to-red-600/20",
    icon: "BarChart2",
  },
  {
    title: "ai-health-agent",
    description:
      "Personal health aggregator (Apple Health + sleep + workouts) with weekly LLM insights.",
    tech: ["Swift", "Python", "Claude"],
    gradient: "from-pink-500/20 to-violet-600/20",
    icon: "Activity",
  },
];
