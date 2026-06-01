"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Award,
  Star,
  GraduationCap,
  Sparkles,
  BookOpen,
} from "lucide-react";
import FadeInView from "@/components/animated/FadeInView";
import { type LucideIcon } from "lucide-react";

interface AwardItem {
  title: string;
  org: string;
  year: string;
  detail: string;
  Icon: LucideIcon;
  iconBg: string;
}

const awards: AwardItem[] = [
  {
    title: "1st Prize, C4DX 2026 Challenge",
    org: "UC3M",
    year: "2026",
    detail: "SpineUp: Smart textile for posture reeducation",
    Icon: Trophy,
    iconBg: "bg-accent-rose/15 text-accent-rose",
  },
  {
    title: "Amgen Scholars Program",
    org: "Institut Pasteur",
    year: "2026",
    detail: "Acceptance rate below 5%",
    Icon: Award,
    iconBg: "bg-accent-lavender/15 text-accent-lavender",
  },
  {
    title: "1st Place, JetBrains Hackathon",
    org: "PyCharm Plugin Track",
    year: "2024",
    detail: "Developed an educational PyCharm plugin",
    Icon: Trophy,
    iconBg: "bg-accent-peach/15 text-accent-peach",
  },
  {
    title: "Excellence Scholarship",
    org: "Community of Madrid",
    year: "2024 – 2025",
    detail: "Academic excellence award",
    Icon: Star,
    iconBg: "bg-accent-sage/15 text-accent-sage",
  },
  {
    title: "7 High Honor Distinctions",
    org: "UC3M",
    year: "2021 – 2026",
    detail: "Matrículas de Honor across CS and Business coursework",
    Icon: Sparkles,
    iconBg: "bg-accent-lavender/15 text-accent-lavender",
  },
  {
    title: "First-Year Tuition Waiver",
    org: "UC3M",
    year: "2021",
    detail: "Merit-based university entrance award",
    Icon: GraduationCap,
    iconBg: "bg-accent-rose/15 text-accent-rose",
  },
  {
    title: "Bachillerato de Excelencia",
    org: "I.E.S. Los Rosales",
    year: "2021",
    detail: "10/10 with Matrícula de Honor",
    Icon: BookOpen,
    iconBg: "bg-accent-peach/15 text-accent-peach",
  },
];

export default function Awards() {
  return (
    <section id="awards" className="relative px-6 py-24">
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-80 w-80 rounded-full bg-accent-lavender/[0.05] blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/3 h-60 w-60 rounded-full bg-accent-rose/[0.05] blur-[100px]" />

      <div className="relative mx-auto max-w-4xl">
        <FadeInView>
          <h2 className="mb-16 font-serif text-3xl tracking-tight text-foreground md:text-4xl">
            Honors &amp; Awards
          </h2>
        </FadeInView>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {awards.map((award, i) => (
            <FadeInView key={award.title} delay={i * 0.07}>
              <motion.div
                className="group relative overflow-hidden rounded-2xl border border-border bg-background p-5"
                whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.06)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className={`shrink-0 rounded-xl p-2.5 ${award.iconBg}`}
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <award.Icon size={20} />
                  </motion.div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-base text-foreground">
                      {award.title}
                    </h3>
                    <p className="mt-0.5 font-sans text-xs text-foreground-muted">
                      {award.org} · {award.year}
                    </p>
                    <p className="mt-1.5 font-sans text-xs leading-relaxed text-foreground-muted/70">
                      {award.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
