export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
}

export const experiences: Experience[] = [
  {
    company: "Slice",
    role: "Sr Engineering Manager",
    period: "2024 — Present",
    description:
      "Leading platform engineering on the lending product serving 10M+ users monthly. Owns reliability, payments rails, and the experimentation stack.",
    tech: ["Platform Engineering", "Payments", "Reliability", "Experimentation"],
  },
  {
    company: "jumpingMinds",
    role: "Co-founder & CPO",
    period: "2018 — 2024",
    description:
      "Built India's largest mental-health community from 0 to 3M+ users. Led product, engineering, and growth. YC W21 alumnus.",
    tech: ["Product", "Engineering", "Growth", "YC W21"],
  },
];
