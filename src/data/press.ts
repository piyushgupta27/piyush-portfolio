export interface PressItem {
  award: string;
  outlet: string;
  year: string;
  url: string;
  description?: string;
  featured?: boolean;
}

export const pressItems: PressItem[] = [
  {
    award: "BW 40 Under 40 Change Agents",
    outlet: "BW Wellbeing World",
    year: "2023",
    url: "https://www.bwwellbeingworld.com/article/wellbeings-40-under-40-change-agents-471680",
    description:
      "Recognised among India's top 40 leaders driving change in mental health and wellbeing.",
    featured: true,
  },
  {
    award: "National Winner — Mental Health App of the Year",
    outlet: "ET HealthWorld Healthcare Awards",
    year: "2023",
    url: "https://health.economictimes.indiatimes.com/healthcare-awards-2023/winners-list",
  },
  {
    award: "Medix Digital Health Innovation Winner",
    outlet: "The Hans India",
    year: "2023",
    url: "https://www.thehansindia.com/life-style/medix-global-announced-the-winners-of-the-digital-health-innovation-challenge-2023-817689",
  },
  {
    award: "Best CTO of the Year",
    outlet: "Indian Angel Forum",
    year: "2022",
    url: "https://www.iafindia.com/awards/",
  },
  {
    award: "Google for Startups Accelerator",
    outlet: "Google",
    year: "2022",
    url: "https://startup.google.com/alumni/stories/jumpingminds/",
  },
  {
    award: "Best Hidden Gem of 2021",
    outlet: "Google Play · Business Standard",
    year: "2021",
    url: "https://www.business-standard.com/article/technology/from-bitclass-to-jumping-minds-google-play-store-s-best-apps-of-2021-121113000548_1.html",
  },
];

export const featuredPress = pressItems.find((p) => p.featured)!;
export const supportingPress = pressItems.filter((p) => !p.featured);
