"use client";

import { motion } from "framer-motion";

const achievements = [
  "1st Prize · C4DX 2026 Challenge",
  "Amgen Scholar 2026 · Institut Pasteur",
  "1st Place · JetBrains Hackathon (PyCharm)",
  "Excellence Scholarship · Community of Madrid",
  "GPA 3.88/4.00 · Texas A&M University",
  "TOEFL iBT 100/120",
  "Grade 8.61/10 · UC3M",
];

export default function Marquee() {
  return (
    <motion.div
      className="overflow-hidden border-y border-border/50 bg-accent-rose/[0.03] py-5"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div
        className="flex"
        style={{
          width: "max-content",
          animation: "marquee 35s linear infinite",
        }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-12 pr-12">
            {achievements.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="flex items-center gap-3 whitespace-nowrap font-sans text-sm text-foreground-muted"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-rose/60" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
