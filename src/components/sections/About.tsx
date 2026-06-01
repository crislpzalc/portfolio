"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline">
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute bottom-0.5 left-0 right-0 -z-0 h-[5px] rounded-full bg-accent-rose/25"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        style={{ originX: 0 }}
      />
    </span>
  );
}

const paragraphs: ReactNode[] = [
  <>
    I&apos;m a final-year Computer Science and Business Administration student
    at <Highlight>Universidad Carlos III de Madrid</Highlight>, focused on
    applying <Highlight>machine learning</Highlight> to real-world healthcare
    problems.
  </>,
  <>
    This summer I&apos;ll join <Highlight>Institut Pasteur</Highlight> as an{" "}
    <Highlight>Amgen Scholar</Highlight>, working on deep learning for 3D
    vascular network extraction from microscopy data.
  </>,
  <>
    Previously, my team&apos;s project SpineUp won the{" "}
    <Highlight>1st Prize at the C4DX 2026 Challenge</Highlight> — a smart
    textile system to prevent musculoskeletal disorders in office settings.
  </>,
  <>
    I&apos;m particularly interested in{" "}
    <Highlight>clinical decision support</Highlight>, medical imaging, and the
    path from research-grade models to deployable systems.
  </>,
];

export default function About() {
  return (
    <section id="about" className="relative px-6 py-24">
      <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-accent-lavender/[0.06] blur-[100px]" />

      <div className="relative mx-auto max-w-xl">
        <motion.h2
          className="mb-12 font-serif text-3xl tracking-tight text-foreground md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          About
        </motion.h2>

        <div className="space-y-5 font-sans text-base leading-relaxed text-foreground-muted">
          {paragraphs.map((content, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: "easeOut",
              }}
            >
              {content}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
