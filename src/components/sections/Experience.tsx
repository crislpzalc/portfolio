"use client";

import FadeInView from "@/components/animated/FadeInView";
import { timeline } from "@/data/experience";

const dotColor: Record<string, string> = {
  research: "bg-accent-lavender",
  education: "bg-accent-rose",
  work: "bg-accent-sage",
};

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <FadeInView>
          <h2 className="mb-16 font-serif text-3xl tracking-tight text-foreground md:text-4xl">
            Experience &amp; Education
          </h2>
        </FadeInView>

        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

          <div className="space-y-12">
            {timeline.map((entry, i) => (
              <FadeInView key={entry.institution + entry.role} delay={i * 0.1}>
                <div className="relative pl-10">
                  <div
                    className={`absolute left-0.5 top-2 h-3.5 w-3.5 rounded-full ${dotColor[entry.type]}`}
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
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
