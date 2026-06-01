"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import FadeInView from "@/components/animated/FadeInView";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="work" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <FadeInView>
          <h2 className="mb-16 font-serif text-3xl tracking-tight text-foreground md:text-4xl">
            Selected Work
          </h2>
        </FadeInView>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <FadeInView key={project.title} delay={i * 0.1}>
              <ProjectCard project={typeof project === "object" ? project : project} />
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const Wrapper = project.link ? motion.a : motion.div;
  const wrapperProps = project.link
    ? {
        href: project.link,
        target: "_blank" as const,
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group flex h-full flex-col rounded-2xl border border-border bg-accent-rose/[0.04] p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-accent-rose/10"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="mb-3 flex items-start justify-between">
        <h3 className="font-serif text-xl text-foreground">{project.title}</h3>
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

      <div className="mb-4">
        <span className="inline-block rounded-full bg-accent-lavender/20 px-3 py-1 font-sans text-xs font-medium text-foreground">
          {project.highlight}
        </span>
      </div>

      <div className="mt-auto flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-border px-2.5 py-0.5 font-sans text-[11px] text-foreground-muted"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.link && (
        <div className="mt-4 flex items-center gap-1 font-sans text-xs text-foreground-muted transition-colors group-hover:text-foreground">
          <span>View project</span>
          <ArrowUpRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      )}
    </Wrapper>
  );
}
