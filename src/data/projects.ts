export interface Project {
  title: string;
  subtitle: string;
  year: string;
  description: string;
  highlight: string;
  stack: string[];
  link: string | null;
  featured?: boolean;
  methodology: string;
  results: string[];
  metrics: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    title: "EEG Seizure Detection",
    subtitle: "Clinical Decision Support System",
    year: "Ongoing",
    description:
      "End-to-end CDSS for seizure detection from EEG signals using the CHB-MIT dataset (BIDS format). Modular pipeline with 1D CNN, clinical-grade calibration, uncertainty estimation and explainability. REST API with FastAPI and reproducible Docker workflows.",
    highlight: "Patient-independent validation",
    stack: ["PyTorch", "FastAPI", "Docker", "BIDS", "Signal Processing"],
    link: "https://github.com/crislpzalc/neuro-eeg-cdss",
    methodology:
      "Built a modular pipeline processing raw EEG signals from the CHB-MIT dataset in BIDS format. Implemented a 1D CNN architecture with clinical-grade probability calibration, MC Dropout for uncertainty estimation, and SHAP-based explainability. Containerized with Docker and exposed via FastAPI REST endpoints.",
    results: [
      "Patient-independent cross-validation protocol",
      "Calibrated probability outputs for clinical decision trust",
      "Uncertainty-aware predictions via MC Dropout",
      "Explainable model outputs with SHAP values",
    ],
    metrics: [
      { label: "Architecture", value: "1D CNN" },
      { label: "Validation", value: "Patient-ind." },
      { label: "Deployment", value: "Docker + API" },
    ],
  },
  {
    title: "SpineUp",
    subtitle: "Smart Textile for Posture Reeducation",
    year: "2026",
    description:
      "IoT-based smart chair cover that turns any office chair into an active posture reeducation device. Combines capacitive textile sensors with pneumatic actuators to deliver subtle proprioceptive corrections in real time, paired with a mobile app for employee gamification and anonymized analytics for occupational health teams.",
    highlight: "1st Prize, C4DX 2026 Challenge",
    stack: ["IoT", "System Design", "Project Management", "UCP Estimation"],
    link: null,
    featured: true,
    methodology:
      "Designed a full-system architecture combining hardware (capacitive textile sensors, pneumatic actuators) with software (mobile app, analytics dashboard). Used UCP estimation for project scoping and agile methodologies for cross-functional team coordination.",
    results: [
      "Won 1st Prize at the C4DX 2026 Challenge",
      "Real-time posture detection and proprioceptive correction",
      "Gamified mobile app for sustained employee engagement",
      "Anonymized analytics for occupational health compliance",
    ],
    metrics: [
      { label: "Award", value: "1st Prize" },
      { label: "Correction", value: "Real-time" },
      { label: "Team", value: "Cross-functional" },
    ],
  },
  {
    title: "Multi-label Chest X-ray Classification",
    subtitle: "NIH ChestX-ray14",
    year: "2025",
    description:
      "PyTorch pipeline for multi-label classification of 15 thoracic findings on 112k+ chest X-ray images. Multi-label stratified splitting, transfer learning with ResNet-18, class-imbalance handling via pos_weight, and per-class threshold optimization on the precision-recall curve.",
    highlight: "0.821 macro AUC-ROC on held-out test",
    stack: ["PyTorch", "Transfer Learning", "Multi-label", "Medical Imaging"],
    link: "https://www.kaggle.com/code/cristinalopezalcazar/multi-label-chest-x-ray-classification-nih-chest",
    methodology:
      "Developed a complete multi-label classification pipeline for 15 thoracic pathologies using 112,120 frontal-view chest X-ray images from NIH ChestX-ray14. Applied multi-label stratified splitting to preserve label distributions, transfer learning with pretrained ResNet-18, class-imbalance handling via pos_weight, and per-class threshold optimization on the precision-recall curve.",
    results: [
      "0.821 macro AUC-ROC on held-out test set",
      "Per-class threshold optimization via PR curves",
      "Robust handling of severe label imbalance",
      "Reproducible pipeline with stratified data splits",
    ],
    metrics: [
      { label: "AUC-ROC", value: "0.821" },
      { label: "Images", value: "112K+" },
      { label: "Pathologies", value: "15" },
    ],
  },
  {
    title: "Pneumonia Detection",
    subtitle: "CNN with Grad-CAM Explainability",
    year: "2025",
    description:
      "Full end-to-end pipeline detecting pneumonia from chest X-rays. Compact CNN (11.3M params) with BatchNorm, Dropout and threshold tuning. Grad-CAM visualizations for clinical explainability. Live demo deployed on Hugging Face Spaces + Google Colab notebook for reproducibility.",
    highlight: "96.8% accuracy, 0.99 AUC-ROC",
    stack: ["PyTorch", "CNN", "Grad-CAM", "Hugging Face"],
    link: "https://github.com/crislpzalc/Pneumonia_detection_CNN",
    methodology:
      "Built a compact CNN (11.3M parameters) with BatchNorm and Dropout for binary pneumonia classification. Applied threshold tuning to optimize the sensitivity-specificity tradeoff. Integrated Grad-CAM for visual explanations of model predictions. Deployed a live demo on Hugging Face Spaces with full reproducibility via Google Colab.",
    results: [
      "96.8% accuracy on the test set",
      "0.99 AUC-ROC",
      "Grad-CAM visualizations for clinical interpretability",
      "Live demo deployed on Hugging Face Spaces",
    ],
    metrics: [
      { label: "Accuracy", value: "96.8%" },
      { label: "AUC-ROC", value: "0.99" },
      { label: "Parameters", value: "11.3M" },
    ],
  },
];
