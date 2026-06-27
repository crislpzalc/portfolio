export interface Project {
  title: string;
  subtitle: string;
  description: string;
  metrics?: string[];
  tags: string[];
  links?: { label: string; url: string }[];
  color: "cyan" | "pink" | "violet" | "green";
  featured?: boolean;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  grade?: string;
  highlights: string[];
  color: "cyan" | "pink" | "violet" | "green";
}

export interface Award {
  title: string;
  org: string;
  year: string;
  description: string;
  color: "cyan" | "pink" | "violet" | "green";
}

export const projects: Project[] = [
  {
    title: "3D Vascular Network Extraction",
    subtitle: "Institut Pasteur, Paris · Amgen Scholars Program",
    description:
      "Topology-aware deep learning pipeline that extracts 3D vascular networks from confocal microscopy. Turns raw image volumes into clean graphs (raw volume → segmentation → skeleton → graph) while preserving vessel connectivity. Results to be presented at the University of Cambridge.",
    tags: ["Deep Learning", "3D Segmentation", "Confocal Microscopy", "Topology"],
    links: [],
    color: "cyan",
    featured: true,
  },
  {
    title: "EEG Seizure Detection System",
    subtitle: "Clinical Decision Support · Ongoing",
    description:
      "End-to-end system for seizure detection from EEG signals using the CHB-MIT dataset. Modular pipeline spanning data ingestion, preprocessing, feature extraction, 1D CNN training, and deployment-oriented inference with model calibration, uncertainty estimation and explainability.",
    tags: ["EEG", "1D CNN", "FastAPI", "Docker", "Uncertainty"],
    links: [
      { label: "GitHub", url: "https://github.com/crislpzalc/neuro-eeg-cdss" },
    ],
    color: "violet",
  },
  {
    title: "Multi-label Chest X-ray Classification",
    subtitle: "NIH Dataset · 112k+ Images",
    description:
      "End-to-end PyTorch pipeline for multi-label classification of 15 thoracic findings. Multi-label stratified splitting, transfer learning with ResNet-18, weighted loss functions and per-class threshold optimization.",
    metrics: ["Macro AUC-ROC: 0.821", "15 thoracic findings", "112k+ images"],
    tags: ["PyTorch", "Transfer Learning", "ResNet-18", "Medical Imaging"],
    links: [
      {
        label: "Kaggle",
        url: "https://kaggle.com/cristinalopezalcazar/multi-label-chest-x-ray-classification-nih-chest",
      },
    ],
    color: "pink",
  },
  {
    title: "Pneumonia Detection CNN",
    subtitle: "Chest X-ray Images · Deployed",
    description:
      "Full end-to-end pipeline on 6,298 chest X-ray images. Compact CNN with BatchNorm, Dropout and threshold tuning. Implemented Grad-CAM visualisations for clinical explainability with a live web demo deployed for open-access reproducibility.",
    metrics: ["96.8% accuracy", "0.97 F1-score", "0.99 AUC-ROC"],
    tags: ["CNN", "Grad-CAM", "Explainability", "Deployed"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/crislpzalc/Pneumonia_detection_CNN",
      },
    ],
    color: "green",
  },
  {
    title: "SpineUp — Smart Textile for Posture",
    subtitle: "IoT · C4DX 2026 Challenge · 1st Prize",
    description:
      "Co-led a 6-person interdisciplinary team designing an IoT-based posture reeducation system combining capacitive textile sensors and pneumatic actuators. Architected the data flow from sensor layer to mobile app and analytics dashboard.",
    tags: ["IoT", "Sensors", "Mobile App", "Analytics"],
    links: [],
    color: "cyan",
  },
  {
    title: "From Stem to Specialist",
    subtitle: "Self-Improving AI Agent",
    description:
      "An AI agent that rewrites its own reasoning pipeline to specialize into a given task. It self-critiques, rolls back regressions, and detects convergence. Validated across six domains with 74 passing tests and continuous integration.",
    tags: ["AI Agents", "Self-Improvement", "CI/CD", "Testing"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/crislpzalc/from-stem-to-specialist",
      },
    ],
    color: "violet",
  },
  {
    title: "Care Phenotypes & AI Model Errors",
    subtitle: "Early-stage Research · MIMIC-CXR & MIMIC-IV",
    description:
      "Exploring whether care phenotypes — how a patient was actually treated — explain repeated AI model errors better than demographics alone. Using MIMIC-CXR and MIMIC-IV datasets.",
    tags: ["Clinical AI", "MIMIC", "Bias", "Research"],
    links: [],
    color: "pink",
  },
  {
    title: "Circadian Time from Gene Expression",
    subtitle: "Bachelor Thesis · In Progress",
    description:
      "Benchmarking methods for inferring circadian time from gene expression data, comparing approaches such as CPCA, CYCLOPS 2.0, ORI-TSP and circular t-SNE on simulated and real transcriptomic data.",
    tags: ["Bioinformatics", "Gene Expression", "Circadian Rhythms"],
    links: [],
    color: "green",
  },
];

export const education: Education[] = [
  {
    institution: "Universidad Carlos III de Madrid",
    degree: "Double Degree: Computer Science & Business Administration",
    period: "Sep 2021 — Dec 2026",
    grade: "8.61 / 10",
    highlights: [
      "7 High Honor Distinctions (Matrícula de Honor) across both degrees",
      "First-year tuition waiver for outstanding academic merit",
    ],
    color: "cyan",
  },
  {
    institution: "Texas A&M University",
    degree: "International Academic Exchange · Computer Science",
    period: "Aug 2024 — May 2025",
    grade: "GPA: 3.88 / 4.00",
    highlights: [
      "Full academic year completed entirely in English",
      "Excellence Scholarship of the Community of Madrid",
    ],
    color: "pink",
  },
  {
    institution: "Real Colegio Complutense at Harvard University",
    degree: "Artificial Intelligence in Healthcare",
    period: "Jun 2026",
    highlights: [
      "Faculty from Harvard Medical School, MIT & Mass General Brigham",
    ],
    color: "violet",
  },
  {
    institution: "I.E.S. Los Rosales — Bachillerato de Excelencia",
    degree: "High School Honors Program",
    period: "Sep 2019 — Jun 2021",
    grade: "10 / 10 · Matrícula de Honor",
    highlights: ["Selected for a highly competitive academic program"],
    color: "green",
  },
];

export const awards: Award[] = [
  {
    title: "Amgen Scholars Program",
    org: "Institut Pasteur, Paris",
    year: "2026",
    description:
      "Selected for one of the most competitive international undergraduate research programs in life sciences (acceptance rate <5%). Presenting at Cambridge.",
    color: "cyan",
  },
  {
    title: "1st Prize — C4DX 2026 Challenge",
    org: "Cátedra IRSST – UC3M",
    year: "2026",
    description:
      "Winning team project (SpineUp) in the 6th edition of the C4DX Challenge on Digital Transformation in Occupational Health and Safety.",
    color: "pink",
  },
  {
    title: "1st Place — JetBrains Hackathon",
    org: "PyCharm Plugin Track",
    year: "2026",
    description:
      "Built a context-aware PyCharm plugin integrating GitHub, Jira, Slack and email for dynamic code annotations. MVP delivered under time-constrained conditions.",
    color: "violet",
  },
  {
    title: "Excellence Scholarship",
    org: "Community of Madrid",
    year: "2024–2025",
    description:
      "Granted by the regional government to top-performing university students based on academic merit.",
    color: "green",
  },
  {
    title: "First-Year Tuition Waiver",
    org: "Universidad Carlos III de Madrid",
    year: "2021",
    description: "Granted for outstanding academic merit at university entry.",
    color: "cyan",
  },
];

export const skills = {
  languages: ["Python", "Java", "C", "C++", "JavaScript", "SQL", "HTML/CSS", "Bash"],
  ml: [
    "PyTorch",
    "TensorFlow",
    "scikit-learn",
    "Computer Vision",
    "Medical Imaging",
    "Transfer Learning",
    "Grad-CAM",
    "Uncertainty Estimation",
  ],
  systems: [
    "End-to-end Pipelines",
    "FastAPI",
    "Docker",
    "Hugging Face",
    "TensorBoard",
    "Linux",
  ],
  cloud: ["Google Cloud Platform", "REST APIs", "System Integration", "Git"],
};

export const experience = [
  {
    role: "Amgen Scholars Research Intern",
    company: "Institut Pasteur, Paris",
    period: "Jul 2026 — Sep 2026",
    description:
      "Deep learning pipeline for 3D vascular network extraction from confocal microscopy. Presenting at Cambridge.",
  },
  {
    role: "Data Manager Intern",
    company: "Siemens Rail Automation",
    period: "Oct 2023 — Apr 2024",
    description:
      "Managed large-scale operational datasets in a safety-critical railway automation environment.",
  },
  {
    role: "Peer Mentor & Onboarding Advisor",
    company: "UC3M",
    period: "Sep 2022 — Jun 2024",
    description:
      "Mentored 6 first-year students across two academic years through a structured peer-mentoring program.",
  },
];
