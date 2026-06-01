export interface Project {
  title: string;
  subtitle: string;
  year: string;
  description: string;
  highlight: string;
  stack: string[];
  link: string | null;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "SpineUp",
    subtitle: "Smart Textile for Posture Reeducation",
    year: "2026",
    description:
      "IoT-based smart chair cover that turns any office chair into an active posture reeducation device. Combines capacitive textile sensors with pneumatic actuators to deliver subtle proprioceptive corrections in real time, paired with a mobile app for employee gamification and anonymized analytics for occupational health teams.",
    highlight: "1st Prize · C4DX 2026 Challenge",
    stack: ["IoT", "System Design", "Project Management", "UCP Estimation"],
    link: null,
    featured: true,
  },
  {
    title: "EEG Seizure Detection",
    subtitle: "Clinical Decision Support System",
    year: "Ongoing",
    description:
      "End-to-end CDSS for seizure detection from EEG signals using the CHB-MIT dataset (BIDS format). Modular pipeline with 1D CNN, clinical-grade calibration, uncertainty estimation and explainability. REST API with FastAPI and reproducible Docker workflows.",
    highlight: "Patient-independent validation",
    stack: ["PyTorch", "FastAPI", "Docker", "BIDS", "Signal Processing"],
    link: "https://github.com/crislpzalc/neuro-eeg-cdss",
  },
  {
    title: "Multi-label Chest X-ray Classification",
    subtitle: "NIH ChestX-ray14",
    year: "2025",
    description:
      "PyTorch pipeline for multi-label classification of 15 thoracic findings on 112k+ chest X-ray images. Multi-label stratified splitting, transfer learning with ResNet-18, class-imbalance handling via pos_weight, and per-class threshold optimization on the precision-recall curve.",
    highlight: "0.811 macro AUC-ROC on held-out test",
    stack: ["PyTorch", "Transfer Learning", "Multi-label", "Medical Imaging"],
    link: "https://www.kaggle.com/code/cristinalopezalcazar/multi-label-chest-x-ray-classification-nih-chest",
  },
  {
    title: "Pneumonia Detection",
    subtitle: "CNN with Grad-CAM Explainability",
    year: "2025",
    description:
      "Full end-to-end pipeline detecting pneumonia from chest X-rays. Compact CNN (11.3M params) with BatchNorm, Dropout and threshold tuning. Grad-CAM visualizations for clinical explainability. Live demo deployed on Hugging Face Spaces + Google Colab notebook for reproducibility.",
    highlight: "96.8% accuracy · 0.99 AUC-ROC",
    stack: ["PyTorch", "CNN", "Grad-CAM", "Hugging Face"],
    link: "https://github.com/crislpzalc/Pneumonia_detection_CNN",
  },
];
