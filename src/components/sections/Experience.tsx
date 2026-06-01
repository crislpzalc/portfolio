"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { timeline } from "@/data/experience";

const dotColors: Record<string, { bg: string; glow: string }> = {
  research: { bg: "bg-accent-lavender", glow: "rgba(200,182,226,0.6)" },
  education: { bg: "bg-accent-rose", glow: "rgba(232,180,188,0.6)" },
  work: { bg: "bg-accent-sage", glow: "rgba(168,197,160,0.6)" },
};

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative px-6 py-24">
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-72 w-72 rounded-full bg-accent-sage/[0.05] blur-[100px]" />

      <div className="relative mx-auto max-w-3xl">
        <motion.h2
          className="mb-16 font-serif text-3xl tracking-tight text-foreground md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Experience &amp; Education
        </motion.h2>

        <div ref={containerRef} className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
          <motion.div
            className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-accent-rose/40"
            style={{ scaleY: lineScale }}
          />

          <div className="space-y-12">
            {timeline.map((entry, i) => {
              const colors = dotColors[entry.type];
              return (
                <motion.div
                  key={entry.institution + entry.role}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative pl-10"
                >
                  <div
                    className={`absolute left-0.5 top-2 h-3.5 w-3.5 rounded-full ${colors.bg}`}
                    style={
                      {
                        animation: "pulse-dot 3s ease-in-out infinite",
                        animationDelay: `${i * 0.5}s`,
                        "--dot-color": colors.glow,
                      } as React.CSSProperties
                    }
                  />

                  <h3 className="font-serif text-xl text-foreground">
                    {entry.institution}
                  </h3>
                  <p className="mt-1 font-sans text-sm text-foreground">
                    {entry.role}
                  </p>
                  <p className="mt-1 font-sans text-xs text-foreground-muted">
                    {entry.location} · {entry.dates}
                  </p>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-foreground-muted">
                    {entry.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
