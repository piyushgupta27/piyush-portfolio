export interface Education {
  institution: string;
  degree: string;
  field?: string;
  location: string;
  period?: string;
  note?: string;
}

export const education: Education[] = [
  {
    institution: "Indian Institute of Technology Roorkee",
    degree: "B.Tech",
    field: "Electronics & Communication Engineering",
    location: "Roorkee, India",
    period: "2010 – 2014",
  },
  {
    institution: "FAU Erlangen-Nürnberg",
    degree: "Exchange Semester",
    location: "Erlangen, Germany",
    period: "Jun – Aug 2012",
    note: "European academic exchange",
  },
];
