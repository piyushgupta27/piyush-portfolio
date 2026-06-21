export interface ArcEntry {
  org: string;
  role?: string;
  type: "education" | "work";
  current?: boolean;
}

export const careerArc: ArcEntry[] = [
  {
    org: "IIT Roorkee",
    role: "B.Tech ECE",
    type: "education",
  },
  {
    org: "FAU Germany",
    role: "Exchange Semester",
    type: "education",
  },
  {
    org: "Shuttl",
    type: "work",
  },
  {
    org: "HyperTrack",
    type: "work",
  },
  {
    org: "Disney+ Hotstar",
    role: "Engineering Lead",
    type: "work",
  },
  {
    org: "JumpingMinds AI",
    role: "Co-Founder & CTO",
    type: "work",
  },
  {
    org: "Slice",
    role: "Engineering Manager",
    type: "work",
    current: true,
  },
];
