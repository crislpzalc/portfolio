"use client";

import { motion } from "framer-motion";
import EEGWave from "@/components/animated/EEGWave";

export default function Hero() {
  const nameWords = ["Cristina", "López", "Alcázar"];

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <EEGWave />

      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <div className="h-[500px] w-[700px] rounded-full bg-accent-rose/[0.08] blur-[120px]" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h1 className="font-serif text-5xl tracking-tight text-foreground md:text-7xl lg:text-8xl">
          <span className="sr-only">Cristina López Alcázar</span>
          <span aria-hidden="true" className="block">
            {nameWords.map((word, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden"
                style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
              >
                <motion.span
                  className="inline-block"
                  initial={{ y: "120%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.9,
                    delay: 0.3 + i * 0.14,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
                {i < nameWords.length - 1 && (
                  <span className="inline-block w-[0.3em]" />
                )}
              </span>
            ))}
          </span>
        </h1>

        <motion.p
          className="mt-6 font-sans text-lg text-foreground md:text-xl"
          initial={{ opacity: 0, filter: "blur(12px)", y: 10 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
        >
          AI for Healthcare. Building reproducible ML for clinical impact.
        </motion.p>

        <motion.p
          className="mt-3 font-sans text-sm text-foreground-muted md:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          Computer Science &amp; Business student at UC3M · Incoming Amgen
          Scholar at Institut Pasteur
        </motion.p>

        <motion.div
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-4 py-2 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-sage opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-sage" />
          </span>
          <span className="font-sans text-xs text-foreground-muted">
            Available for research positions
          </span>
        </motion.div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {[
            { href: "#work", label: "View work", style: "primary" as const },
            {
              href: "/CV_Cristina_Lopez_Alcazar.pdf",
              label: "Download CV",
              style: "outline" as const,
              download: true,
            },
            {
              href: "#contact",
              label: "Get in touch",
              style: "outline" as const,
            },
          ].map((cta, i) => (
            <motion.a
              key={cta.label}
              href={cta.href}
              {...(cta.download ? { download: true } : {})}
              className={
                cta.style === "primary"
                  ? "group relative overflow-hidden rounded-full bg-accent-peach px-7 py-3 font-sans text-sm text-foreground transition-shadow hover:shadow-lg hover:shadow-accent-peach/25"
                  : "rounded-full border border-accent-rose px-7 py-3 font-sans text-sm text-foreground transition-all hover:bg-accent-rose/10 hover:scale-[1.03]"
              }
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 1.6 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {cta.label}
              {cta.style === "primary" && (
                <span className="pointer-events-none absolute inset-0 -translate-x-full rotate-[30deg] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
