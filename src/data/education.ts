export interface Education {
  institution: string;
  degree: string;
  field?: string;
  location: string;
  note?: string;
}

export const education: Education[] = [
  {
    institution: "Indian Institute of Technology Roorkee",
    degree: "B.Tech",
    field: "Electronics & Communication Engineering",
    location: "Roorkee, India",
  },
  {
    institution: "FAU Erlangen-Nürnberg",
    degree: "Exchange Semester",
    location: "Erlangen, Germany",
    note: "European academic exchange",
  },
];
