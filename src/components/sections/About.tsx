"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
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

function Counter({
  target,
  decimals = 0,
  duration = 1500,
}: {
  target: number;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay((target * eased).toFixed(decimals));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target, decimals, duration]);

  return <span ref={ref}>{display}</span>;
}

const stats = [
  { value: 8.61, decimals: 2, label: "UC3M GPA", suffix: "/10" },
  { value: 3.88, decimals: 2, label: "Texas A&M GPA", suffix: "/4.0" },
  { value: 100, decimals: 0, label: "TOEFL iBT", suffix: "/120" },
  { value: 7, decimals: 0, label: "High Honor Distinctions", suffix: "" },
];

const paragraphs: ReactNode[] = [
  <>
    I&apos;m completing my Double Degree in Computer Science and Business
    Administration at <Highlight>Universidad Carlos III de Madrid</Highlight>,
    with all coursework finished and only final thesis projects remaining.
    Focused on applying <Highlight>machine learning</Highlight> to real-world
    healthcare problems.
  </>,
  <>
    This summer I&apos;ll join <Highlight>Institut Pasteur</Highlight> as an{" "}
    <Highlight>Amgen Scholar</Highlight>, working on deep learning for 3D
    vascular network extraction from microscopy data.
  </>,
  <>
    Previously, my team&apos;s project SpineUp won the{" "}
    <Highlight>1st Prize at the C4DX 2026 Challenge</Highlight>, a smart
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

      <div className="relative mx-auto max-w-2xl">
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

        <motion.div
          className="mt-16 grid grid-cols-2 gap-8 border-t border-border/50 pt-12 md:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-3xl text-foreground md:text-4xl">
                <Counter
                  target={stat.value}
                  decimals={stat.decimals}
                  duration={1800}
                />
                <span className="text-xl text-foreground-muted">
                  {stat.suffix}
                </span>
              </div>
              <p className="mt-2 font-sans text-xs text-foreground-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
