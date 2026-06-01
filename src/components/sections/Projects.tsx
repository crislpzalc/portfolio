"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import FadeInView from "@/components/animated/FadeInView";
import ProjectModal from "@/components/sections/ProjectModal";
import { projects, type Project } from "@/data/projects";

const cardStyles: Record<
  string,
  { glow: string; border: string; gradient: string }
> = {
  SpineUp: {
    glow: "rgba(232,180,188,0.15)",
    border: "rgba(232,180,188,0.4)",
    gradient: "from-accent-rose/20 via-accent-rose/8 to-accent-lavender/5",
  },
  "EEG Seizure Detection": {
    glow: "rgba(200,182,226,0.15)",
    border: "rgba(200,182,226,0.4)",
    gradient:
      "from-accent-lavender/20 via-accent-lavender/8 to-accent-rose/5",
  },
  "Multi-label Chest X-ray Classification": {
    glow: "rgba(168,197,160,0.15)",
    border: "rgba(168,197,160,0.4)",
    gradient: "from-accent-sage/20 via-accent-sage/8 to-accent-lavender/5",
  },
  "Pneumonia Detection": {
    glow: "rgba(244,199,171,0.15)",
    border: "rgba(244,199,171,0.4)",
    gradient: "from-accent-peach/20 via-accent-peach/8 to-accent-rose/5",
  },
};

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="work" className="relative px-6 py-24">
      <div className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 rounded-full bg-accent-peach/[0.05] blur-[120px]" />

      <div className="relative mx-auto max-w-4xl">
        <FadeInView>
          <h2 className="mb-16 font-serif text-3xl tracking-tight text-foreground md:text-4xl">
            Selected Work
          </h2>
        </FadeInView>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <FadeInView key={project.title} delay={i * 0.1}>
              <GlowCard
                project={project}
                index={i}
                onClick={() => setSelected(project)}
              />
            </FadeInView>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function GlowCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(200);
  const mouseY = useMotionValue(200);

  const styles = cardStyles[project.title] || cardStyles.SpineUp;

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(200);
    mouseY.set(200);
  };

  const glowBg = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, ${styles.glow}, transparent 80%)`;
  const borderGlow = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, ${styles.border}, transparent 80%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="group relative h-full cursor-pointer"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: borderGlow }}
      />

      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background">
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glowBg }}
        />

        <div
          className={`relative h-20 overflow-hidden bg-gradient-to-br ${styles.gradient}`}
        >
          <span className="absolute -right-2 -top-3 select-none font-serif text-8xl leading-none text-foreground/[0.04]">
            {String(index + 1).padStart(2, "0")}
          </span>
          {project.featured && (
            <span className="absolute left-4 top-4 rounded-full bg-accent-rose/20 px-3 py-1 font-sans text-[10px] font-medium text-foreground-muted backdrop-blur-sm">
              Featured
            </span>
          )}
        </div>

        <div className="relative flex h-full flex-col p-6">
          <div className="mb-3 flex items-start justify-between">
            <h3 className="font-serif text-xl text-foreground">
              {project.title}
            </h3>
            <span className="shrink-0 pl-3 font-sans text-xs text-foreground-muted">
              {project.year}
            </span>
          </div>

          <p className="mb-4 font-sans text-sm font-medium text-foreground-muted">
            {project.subtitle}
          </p>

          <p className="mb-5 font-sans text-sm leading-relaxed text-foreground-muted/80">
            {project.description}
          </p>

          <motion.div
            className="mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.2 + index * 0.1,
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
          >
            <span className="inline-block rounded-full bg-accent-lavender/20 px-3 py-1 font-sans text-xs font-medium text-foreground">
              {project.highlight}
            </span>
          </motion.div>

          <div className="mt-auto flex flex-wrap gap-1.5">
            {project.stack.map((tech, techIndex) => (
              <motion.span
                key={tech}
                className="rounded-full border border-border px-2.5 py-0.5 font-sans text-[11px] text-foreground-muted"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + techIndex * 0.04 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <span className="mt-4 flex items-center gap-1 font-sans text-xs text-foreground-muted transition-colors group-hover:text-foreground">
            <span>View details</span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
