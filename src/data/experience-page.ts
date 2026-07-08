interface BaseEntry {
  slug: string;
  company: string;
  role: string;
  period: string;
}

export interface FullExperienceEntry extends BaseEntry {
  minimal?: false;
  scope: string;
  mode: string;
  situation: string;
  outcomes: string[];
  theCall: string;
  tech: string[];
  links?: Array<{ label: string; href: string }>;
}

export interface MinimalExperienceEntry extends BaseEntry {
  minimal: true;
  description: string;
}

export type ExperiencePageEntry = FullExperienceEntry | MinimalExperienceEntry;

export const experiencePageEntries: ExperiencePageEntry[] = [
  {
    slug: "slice",
    company: "Slice Small Finance Bank",
    role: "Engineering Manager",
    period: "Apr 2024 — Present",
    scope: "3 squads · 15+ engineers",
    mode: "Builder + Manager",
    situation:
      "Slice became a bank in late 2024 with no merchant product. Joined in April 2024 to build it — 4 live payment API product lines across merchant banking, payment APIs, and digital lending.",
    outcomes: [
      "Built Slice's PA/PG merchant business from scratch — 1 customer and <₹5L/month to 4 live product lines (Account Validation, Payouts, PayIns, Mandates) generating ₹70L+/month in 15 months",
      "PayIn P99 latency: 200s → 7.5s (15×) — rebuilt architecture under live production traffic while simultaneously scaling the product",
      "AI Oncall Bot: 71% query hit rate, 90s avg resolution vs. 5–10 min baseline — adopted org-wide beyond my squads",
      "AI OpEx Reporter: 4h/week per squad saved via automated CloudWatch/Sentry → Confluence/Slack pipeline",
      "Managerial AI Toolkit: 6h/week off EM calendar, 70% retro prep saved across the org",
      "Cortex — multi-tenant RAG platform shipped at SliceLab hackathon; productionisation underway",
    ],
    theCall:
      "The decision to rebuild PayIn was a product and business call — not mine. What I owned was the engineering: running a full architecture overhaul under live production traffic, no downtime, no rollback, while the team was simultaneously building new product lines. That kind of execution — high-stakes, constrained, no clean room — is where I operate best. P99 went from 200s to 7.5s. No major incidents during the migration.",
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
    scope: "2 founders → 15 engineers",
    mode: "Founder + Builder",
    situation:
      "Built an AI mental health platform from scratch before LLMs were mainstream. Grew to 1M+ users, then wound it down without wasting investor money chasing a broken model.",
    outcomes: [
      "Snuggles AI companion shipped early 2022 — months before ChatGPT (Nov 2022); datable, production AI system in a regulated consumer context",
      "1M+ users across India, US, UK, Scandinavia — 35 min daily engagement vs. 10–15 min industry average",
      "Chat API P99: 3s → 250ms (12×) rebuilt under live traffic as user base scaled",
      "$1.3M raised · Google for Startups Accelerator 2022 · backed by ex-Disney India CEO, CTO, and SVP Product",
      "Pivoted to B2B corporate wellness in 2023 funding winter — extended runway by 14 months without external capital",
    ],
    theCall:
      "During the 2023 funding winter we were offered a 51% JV acquisition — the best deal available for the next 12 months. We said no: couldn't respect the acquirer's track record, and freedom to operate was non-negotiable. Chose a clean wind-down in August 2024 over the wrong partnership. The B2C unit economics had peaked; the right move was acknowledging it, not chasing the deal.",
    tech: ["AI / LLM", "Python / Django", "Consumer Product", "0 → 1", "HIPAA"],
    links: [
      {
        label: "Google for Startups Alumni Story",
        href: "https://startup.google.com/alumni/stories/jumpingminds/",
      },
    ],
  },
  {
    slug: "disney-hotstar",
    company: "Disney+ Hotstar",
    role: "Engineering Lead",
    period: "Jan 2018 — Jun 2021",
    scope: "15 engineers · Social, Gaming & Sports",
    mode: "Tech Lead + EM",
    situation:
      "Live cricket at 50M+ concurrent users — sub-second latency — and no off-the-shelf product that could handle the fan-out. Built the real-time messaging infrastructure from scratch.",
    outcomes: [
      "PubSub/MQTT infrastructure scaled from 35M → 50M+ CCU at <1s latency — 250B+ messages during the 2019 IPL World Cup final",
      "Architecture held across 5 IPL seasons without rearchitecting — built right the first time",
      "Co-founded the Architecture Council with Ashutosh Agrawal (now Staff SSE, Google DeepMind) — cross-team design reviews across 15+ teams, backed by CTO's office",
      "SEA localisation platform — 80% reduction in operational effort per new country launch",
      "RootConf Delhi 2020: public technical talk on the real-time infrastructure (40-min deep dive)",
    ],
    theCall:
      "Every commercial PubSub product we evaluated hit a ceiling at live sports concurrency — the fan-out characteristics of 50M users reacting to the same ball in the same second had no prior art. Built the infrastructure from scratch rather than adapting something that would fail at scale. That same architecture ran IPL 2020, 2021, 2022, 2023 — no structural changes required.",
    tech: [
      "Real-time Systems",
      "PubSub / MQTT",
      "Consumer Scale",
      "Architecture",
      "SEA Expansion",
    ],
    links: [
      {
        label: "RootConf Delhi 2020 talk",
        href: "https://hasgeek.com/rootconf/2020-delhi/sub/pubsub-realtime-messaging-service-hotstar-LP7A7b7ZVu6ibfgYFAcvXZ",
      },
    ],
  },
  {
    slug: "hypertrack",
    company: "HyperTrack",
    role: "Lead Software Engineer",
    period: "2016 — 2018",
    minimal: true,
    description:
      "Location intelligence platform — backend systems and real-time movement tracking infrastructure.",
  },
  {
    slug: "shuttl",
    company: "Shuttl",
    role: "Senior Software Engineer",
    period: "2015 — 2016",
    minimal: true,
    description: "Bus aggregation platform — early backend and routing APIs.",
  },
];
