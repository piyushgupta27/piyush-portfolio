export interface ExperienceDetail {
  slug: string;
  company: string;
  role: string;
  period: string;
  overview: string;
  highlights: string[];
  tech: string[];
  stub?: boolean;
  links?: Array<{ label: string; href: string; description?: string }>;
}

export const experienceDetails: ExperienceDetail[] = [
  {
    slug: "slice",
    company: "Slice Small Finance Bank",
    role: "Engineering Manager",
    period: "Sep 2024 — Present",
    overview:
      "Engineering Manager at Slice, one of India's fastest-growing fintech banks. Leading 3 product squads across payment APIs, merchant banking, and digital lending — while rebuilding the team's engineering workflows with AI.",
    highlights: [
      "Leading 3 product squads (15+ engineers) across payment APIs, merchant banking, and digital lending",
      "PayIn P99 latency improved 15× (200s → 7.5s)",
      "7× payment revenue growth in 6 months",
      "AI Oncall Bot: 71% query hit rate, 90s avg resolution vs. 5–10 min baseline — adopted org-wide",
      "AI OpEx Reporter: 4h/week per pod saved via CloudWatch/Sentry → Confluence/Slack automation",
      "PA/PG customer onboarding automation via n8n — complex multi-step flows",
      "Managerial AI Toolkit: 6h/week off EM calendar, 70% retro prep saved",
      "Built Cortex — multi-tenant RAG platform (SliceLab hackathon — productionisation underway)",
    ],
    tech: [
      "Platform Engineering",
      "Payments",
      "AI Systems",
      "Reliability",
      "Fintech",
    ],
  },
  {
    slug: "jumpingminds",
    company: "JumpingMinds AI",
    role: "Co-Founder & CTO",
    period: "Jun 2021 — Aug 2024",
    overview:
      "Co-founded JumpingMinds AI from zero — an AI-powered mental health platform. Owned product, engineering, and GTM as the technical co-founder, growing from 2 founders to a 15-engineer team. Wound down cleanly in Aug 2024.",
    highlights: [
      "Grew from 2 founders to 15-engineer team (6 backend, 3 mobile, 3 web/infra, 3 product)",
      "Built 'Snuggles' — 24×7 AI companion chatbot in early 2022, months before ChatGPT's public launch (Nov 2022)",
      "LLM-integrated agentic NLP matching engine (v1 rule-based → v4 real-time sentiment + agentic feedback loops)",
      "Chat API p99 3s → 250ms (12×) under live traffic with zero downtime",
      "35 min daily engagement vs. 10–15 min industry avg (2.3×); 40M+ AI training data points; 30% positive mood shift for 3-month+ users",
      "Grew to 1M+ users across India, US, UK, and Scandinavia",
      "Content-first GTM: built 118K Instagram followers before app launch; 7M+ Reels impressions; 30% follower growth in 6 months",
      "10+ enterprise B2B clients including Medibuddy, BluSmart, Marsh India",
      "Backed by ex-Disney India CEO, ex-Disney CTO, and ex-Disney SVP Product. $1.3M funded",
      "Google for Startups Accelerator 2022. Google Play Best Hidden Gem 2021",
    ],
    tech: [
      "Co-Founder",
      "LLM / NLP Systems",
      "Google for Startups '22",
      "Python / Django",
      "HIPAA/GDPR",
    ],
    links: [
      {
        label: "Google for Startups Alumni Story",
        href: "https://startup.google.com/alumni/stories/jumpingminds/",
        description: "Verified alumni profile",
      },
    ],
  },
  {
    slug: "disney-hotstar",
    company: "Disney+ Hotstar",
    role: "Engineering Lead",
    period: "Jan 2018 — Jun 2021",
    overview:
      "Engineering Lead for the Social, Gaming & Sports pod at Disney+ Hotstar, one of Asia's largest streaming platforms. Built real-time messaging infrastructure that served live cricket matches to tens of millions of concurrent users — a scale problem with no off-the-shelf solution.",
    highlights: [
      "Built PubSub/MQTT real-time messaging infrastructure serving 35M+ concurrent users at sub-second latency in production — scaled to 50M+ CCU on the same architecture",
      "250B+ messages delivered during IPL 2019",
      "Led a 15-engineer pod (Social, Gaming & Sports) through India's biggest live-streaming events",
      "Co-founded the Architecture Council — weekly design reviews across 15+ engineering teams platform-wide",
      "Shipped SEA localisation platform: eliminated 80% of manual ops per new country launch, cut launch time by 3 weeks",
    ],
    tech: [
      "Real-time Systems",
      "PubSub/MQTT",
      "50M CCU",
      "Architecture Council",
      "SEA Expansion",
    ],
    links: [
      {
        label: "Talk: PubSub Realtime Messaging @ RootConf Delhi 2020",
        href: "https://www.youtube.com/watch?v=GmjMUzbbOLI",
        description:
          "40-min technical deep dive at HasGeek — the full architecture story",
      },
    ],
  },
  {
    slug: "hypertrack",
    company: "HyperTrack",
    role: "Content pending",
    period: "2016 — 2018",
    overview: "",
    highlights: [],
    tech: [],
    stub: true,
  },
  {
    slug: "shuttl",
    company: "Shuttl",
    role: "Content pending",
    period: "2015",
    overview: "",
    highlights: [],
    tech: [],
    stub: true,
  },
];

export function getExperienceBySlug(
  slug: string,
): ExperienceDetail | undefined {
  return experienceDetails.find((d) => d.slug === slug);
}

export function getAllExperienceSlugs(): string[] {
  return experienceDetails.map((d) => d.slug);
}
