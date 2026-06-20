export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
}

export const experiences: Experience[] = [
  {
    company: "Slice Small Finance Bank",
    role: "Sr Engineering Manager",
    period: "Sep 2024 — Present",
    description:
      "Leading platform engineering across Lending, Banking, and PSP domains for 10M+ users daily. Built AI-powered collection infra using NLP voice bots (+40% loan recovery). Deployed Cortex RAG and Merchant Brain for LLM-driven merchant insights; shipped an AI oncall bot hitting 71% query resolution (90s vs 5–10 min baseline). Owns reliability, payments rails, and the experimentation stack.",
    tech: ["Platform Engineering", "AI / LLMs", "Payments", "Reliability"],
  },
  {
    company: "jumpingMinds",
    role: "Co-Founder & CTO",
    period: "Jun 2021 — Aug 2024",
    description:
      "Co-founded a mental-health community platform from zero, scaling to 1M+ users within 18 months. Built cloud-native infra on AWS/GCP with 99.99% uptime and HIPAA/GDPR compliance. Integrated GenAI and sentiment-aware NLP for 30% better personalisation and 50% higher retention. Google for Startups Accelerator 2022 cohort.",
    tech: ["Product", "GenAI", "HealthTech", "Startup"],
  },
  {
    company: "Disney+ Hotstar",
    role: "Engineering Manager",
    period: "Jan 2018 — Jun 2021",
    description:
      "Led backend engineering for Social, Gaming & Sports serving 50M concurrent users at peak (IPL). Built real-time PubSub/MQTT messaging infra driving $100K ad revenues and 2× engagement for 500M+ total users. Co-founded the Architecture Council across 15+ teams, improving design quality org-wide. Promoted from SDE to EM within 2 years.",
    tech: ["Real-time Systems", "Backend", "Streaming", "Architecture"],
  },
];
