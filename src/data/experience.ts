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
    role: "Engineering Manager",
    period: "Sep 2024 — Present",
    description:
      "Engineering Manager at Slice, one of India's fastest-growing fintech banks. Leading 3 product squads (15+ engineers) across payment APIs, merchant banking, and digital lending. Shipped four AI systems now live org-wide: AI Oncall Bot (Slack — 71% query hit rate, 90s resolution vs. 5–10 min baseline); AI OpEx Reporter (CloudWatch/Sentry → Confluence/Slack — 4h/week per pod saved); PA/PG customer onboarding automation (n8n — complex multi-step flows); Managerial AI Toolkit (6h/week off EM calendar, 70% retro prep saved). Also built Cortex — a multi-tenant RAG platform (SliceLab hackathon — productionisation underway). PayIn P99 latency improved 15× (200s → 7.5s). 7× payment revenue growth in 6 months.",
    tech: [
      "Platform Engineering",
      "Payments",
      "AI Systems",
      "Reliability",
      "Fintech",
    ],
  },
  {
    company: "JumpingMinds AI",
    role: "Co-Founder & CTO",
    period: "Jun 2021 — Aug 2024",
    description:
      "Co-founded JumpingMinds AI from zero. Grew from 2 founders to 15-engineer team (6 backend, 3 mobile, 3 web/infra, 3 product). Built LLM-integrated agentic NLP matching engine (v1 rule-based → v4 real-time sentiment + feedback loops); Chat API p99 3s → 250ms (12×) under live traffic with zero downtime. Grew to 1M+ users across India, US, UK, and Scandinavia. 10+ enterprise B2B clients including Medibuddy, BluSmart, Marsh India. Backed by ex-Disney India CEO, ex-Disney CTO, and ex-Disney SVP Product. $1.3M funded. Google for Startups Accelerator 2022. Google Play Best Hidden Gem 2021. Wound down cleanly Aug 2024.",
    tech: [
      "Co-Founder",
      "LLM / NLP Systems",
      "Google for Startups '22",
      "Python / Django",
      "HIPAA/GDPR",
    ],
  },
  {
    company: "Disney+ Hotstar",
    role: "Engineering Lead",
    period: "Jan 2018 — Jun 2021",
    description:
      "Engineering Lead for the Social, Gaming & Sports pod (15 engineers). Built PubSub/MQTT real-time messaging infrastructure serving 35M+ concurrent users at sub-second latency in production — the same architecture scaled to 50M+ CCU on a platform of 500M+ total users. 250B+ messages delivered during IPL 2019. Co-founded the Architecture Council — weekly design reviews across 15+ engineering teams. Shipped SEA localisation platform: eliminated 80% of manual ops per new country launch, cut launch time by 3 weeks.",
    tech: [
      "Real-time Systems",
      "PubSub/MQTT",
      "50M CCU",
      "Architecture Council",
      "SEA Expansion",
    ],
  },
];
