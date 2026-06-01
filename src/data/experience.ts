export interface TimelineEntry {
  institution: string;
  role: string;
  location: string;
  dates: string;
  description: string;
  type: "research" | "education" | "work";
}

export const timeline: TimelineEntry[] = [
  {
    institution: "Institut Pasteur",
    role: "Amgen Scholar, Deep Learning Research Intern (Incoming)",
    location: "Paris, France",
    dates: "Jul 2026 – Sep 2026",
    description:
      "BioImage Analysis Unit. Topology-aware deep learning for 3D vascular network extraction from confocal microscopy. Results to be presented at the Amgen Scholars European Symposium at the University of Cambridge.",
    type: "research",
  },
  {
    institution: "Universidad Carlos III de Madrid",
    role: "Double Degree in Computer Science & Business Administration",
    location: "Madrid, Spain",
    dates: "Sep 2021 – Jun 2026",
    description:
      "Grade: 8.61/10 · 7 High Honor Distinctions. All coursework completed; only final thesis projects (TFGs) remain. Focus areas: AI, ML, Neural Networks, Distributed Systems, IoT, Software Engineering.",
    type: "education",
  },
  {
    institution: "Texas A&M University",
    role: "International Academic Exchange",
    location: "College Station, TX, USA",
    dates: "Aug 2024 – May 2025",
    description:
      "GPA: 3.88/4.00. Full academic year in CS and Engineering, entirely in English.",
    type: "education",
  },
  {
    institution: "Siemens Rail Automation",
    role: "Data Manager Intern",
    location: "Madrid, Spain",
    dates: "Oct 2023 – Apr 2024",
    description:
      "Managed and restructured large-scale operational datasets in a safety-critical railway automation environment. Data cleaning, standardization and validation across engineering teams.",
    type: "work",
  },
];
