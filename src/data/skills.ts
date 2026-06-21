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
      { name: "Team Building", level: 95 },
      { name: "Career Development", level: 88 },
      { name: "OKRs", level: 85 },
      { name: "Incident Management", level: 90 },
      { name: "Architecture Reviews", level: 92 },
      { name: "Delivery Execution", level: 93 },
    ],
  },
  {
    category: "AI & Agentic Systems",
    icon: "Brain",
    skills: [
      { name: "LLM APIs", level: 87 },
      { name: "Claude Agent SDK", level: 90 },
      { name: "n8n", level: 80 },
      { name: "Azure OpenAI", level: 82 },
      { name: "RAG / Vector Search", level: 83 },
      { name: "Agentic Workflow Design", level: 88 },
    ],
  },
  {
    category: "Backend Engineering",
    icon: "Code",
    skills: [
      { name: "TypeScript", level: 88 },
      { name: "Node.js", level: 88 },
      { name: "Python", level: 85 },
      { name: "Go", level: 82 },
      { name: "Java / Kotlin", level: 85 },
      { name: "Django", level: 82 },
    ],
  },
  {
    category: "Infrastructure",
    icon: "Layers",
    skills: [
      { name: "AWS", level: 85 },
      { name: "GCP", level: 80 },
      { name: "Kubernetes", level: 80 },
      { name: "Kafka", level: 78 },
      { name: "Docker", level: 83 },
      { name: "Redis", level: 82 },
      { name: "Postgres", level: 83 },
      { name: "Terraform", level: 72 },
    ],
  },
  {
    category: "Payments & Fintech",
    icon: "CreditCard",
    skills: [
      { name: "Payment APIs", level: 85 },
      { name: "Distributed Transactions", level: 82 },
      { name: "Loan Origination Systems", level: 75 },
      { name: "Payment Aggregator Integrations", level: 78 },
      { name: "Bank Account Verification", level: 78 },
    ],
  },
];
