export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Engineering Leadership",
    icon: "Users",
    skills: [
      { name: "Engineering Management", level: 95 },
      { name: "Technical Strategy", level: 90 },
      { name: "Team Building", level: 92 },
      { name: "Agile Delivery", level: 88 },
      { name: "Regulatory Compliance", level: 82 },
    ],
  },
  {
    category: "Platform & Backend",
    icon: "Server",
    skills: [
      { name: "Go", level: 85 },
      { name: "TypeScript / Node.js", level: 88 },
      { name: "Distributed Systems", level: 87 },
      { name: "PostgreSQL / Redis", level: 83 },
      { name: "AWS / Kubernetes", level: 85 },
    ],
  },
  {
    category: "AI & LLM Tooling",
    icon: "Brain",
    skills: [
      { name: "LLM Integration", level: 82 },
      { name: "AI Agent Pipelines", level: 80 },
      { name: "NLP / Voice Bots", level: 78 },
      { name: "Vector Search / RAG", level: 76 },
      { name: "Python", level: 80 },
    ],
  },
];
