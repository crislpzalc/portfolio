"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { type Project } from "@/data/projects";

function SpineAnimation() {
  const bars = 16;
  return (
    <div className="flex items-end justify-center h-full gap-1.5 px-8 pb-6">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-2 rounded-t-full bg-accent-rose/40"
          animate={{
            height: [10, 28 + Math.sin(i * 0.6) * 14, 10],
          }}
          transition={{
            duration: 1.6,
            delay: i * 0.08,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function EEGAnimation() {
  const points = 24;
  return (
    <div className="relative h-full w-full overflow-hidden">
      {[0, 1, 2].map((line) => (
        <div
          key={line}
          className="absolute left-4 right-4 flex items-center gap-px"
          style={{ top: `${22 + line * 28}%` }}
        >
          {Array.from({ length: points }).map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-full bg-accent-lavender/50"
              style={{ height: 2 }}
              animate={{
                scaleY: [1, 4 + Math.sin(i * 0.8 + line) * 6, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 0.7 + Math.sin(i) * 0.3,
                delay: i * 0.04 + line * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function XrayAnimation() {
  const grid = 8;
  return (
    <div className="flex items-center justify-center h-full">
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${grid}, 1fr)` }}
      >
        {Array.from({ length: grid * 6 }).map((_, i) => {
          const row = Math.floor(i / grid);
          const col = i % grid;
          return (
            <motion.div
              key={i}
              className="h-4 w-4 rounded-sm"
              animate={{
                backgroundColor: [
                  "rgba(168,197,160,0.08)",
                  "rgba(168,197,160,0.45)",
                  "rgba(168,197,160,0.08)",
                ],
              }}
              transition={{
                duration: 2.2,
                delay: (row + col) * 0.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function GradCAMAnimation() {
  return (
    <div className="relative h-full w-full flex items-center justify-center">
      {[0, 1, 2, 3, 4].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border-2 border-accent-peach/25"
          animate={{
            width: [8, 100 + ring * 25],
            height: [8, 100 + ring * 25],
            opacity: [0.7, 0],
          }}
          transition={{
            duration: 2.8,
            delay: ring * 0.45,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
      <motion.div
        className="h-3 w-3 rounded-full bg-accent-peach/70"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

const animationMap: Record<string, React.FC> = {
  SpineUp: SpineAnimation,
  "EEG Seizure Detection": EEGAnimation,
  "Multi-label Chest X-ray Classification": XrayAnimation,
  "Pneumonia Detection": GradCAMAnimation,
};

const gradientMap: Record<string, string> = {
  SpineUp: "from-accent-rose/25 via-accent-rose/8 to-accent-lavender/5",
  "EEG Seizure Detection":
    "from-accent-lavender/25 via-accent-lavender/8 to-accent-rose/5",
  "Multi-label Chest X-ray Classification":
    "from-accent-sage/25 via-accent-sage/8 to-accent-lavender/5",
  "Pneumonia Detection":
    "from-accent-peach/25 via-accent-peach/8 to-accent-rose/5",
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [project, handleEsc]);

  const Animation = project
    ? animationMap[project.title] || SpineAnimation
    : null;
  const gradient = project
    ? gradientMap[project.title] || gradientMap.SpineUp
    : "";

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-background/80 p-2 text-foreground-muted backdrop-blur-sm transition-colors hover:text-foreground"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div
              className={`relative h-36 overflow-hidden bg-gradient-to-br ${gradient}`}
            >
              {Animation && <Animation />}
              {project.featured && (
                <span className="absolute left-4 top-4 rounded-full bg-accent-rose/20 px-3 py-1 font-sans text-[10px] font-medium text-foreground-muted backdrop-blur-sm">
                  Featured
                </span>
              )}
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-1 flex items-start justify-between gap-3">
                <h3 className="font-serif text-2xl text-foreground md:text-3xl">
                  {project.title}
                </h3>
                <span className="shrink-0 pt-1 font-sans text-sm text-foreground-muted">
                  {project.year}
                </span>
              </div>

              <p className="mb-5 font-sans text-sm font-medium text-foreground-muted">
                {project.subtitle}
              </p>

              <div className="mb-6 flex flex-wrap gap-3">
                {project.metrics.map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    className="rounded-xl border border-border px-4 py-2.5 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                  >
                    <div className="font-serif text-lg text-foreground">
                      {metric.value}
                    </div>
                    <div className="font-sans text-[10px] text-foreground-muted">
                      {metric.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.span
                className="mb-6 inline-block rounded-full bg-accent-lavender/20 px-4 py-1.5 font-sans text-xs font-medium text-foreground"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
              >
                {project.highlight}
              </motion.span>

              <div className="mb-5 mt-6">
                <h4 className="mb-2 font-sans text-[11px] font-medium uppercase tracking-wider text-foreground-muted">
                  Approach
                </h4>
                <p className="font-sans text-sm leading-relaxed text-foreground-muted">
                  {project.methodology}
                </p>
              </div>

              <div className="mb-5">
                <h4 className="mb-2 font-sans text-[11px] font-medium uppercase tracking-wider text-foreground-muted">
                  Key Results
                </h4>
                <ul className="space-y-2">
                  {project.results.map((result, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2 font-sans text-sm text-foreground-muted"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.06 }}
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-rose/60" />
                      {result}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="mb-5 flex flex-wrap gap-1.5">
                {project.stack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="rounded-full border border-border px-2.5 py-0.5 font-sans text-[11px] text-foreground-muted"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.03 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent-peach/20 px-4 py-2 font-sans text-sm text-foreground transition-colors hover:bg-accent-peach/30"
                >
                  <span>View project</span>
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
