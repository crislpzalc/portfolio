"use client";

import FadeInView from "@/components/animated/FadeInView";

export default function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-xl">
        <FadeInView>
          <h2 className="mb-12 font-serif text-3xl tracking-tight text-foreground md:text-4xl">
            About
          </h2>
        </FadeInView>

        <div className="space-y-5 font-sans text-base leading-relaxed text-foreground-muted">
          <FadeInView delay={0.1}>
            <p>
              I&apos;m a final-year Computer Science and Business Administration
              student at Universidad Carlos III de Madrid, focused on applying
              machine learning to real-world healthcare problems.
            </p>
          </FadeInView>

          <FadeInView delay={0.15}>
            <p>
              This summer I&apos;ll join Institut Pasteur as an Amgen Scholar,
              working on deep learning for 3D vascular network extraction from
              microscopy data.
            </p>
          </FadeInView>

          <FadeInView delay={0.2}>
            <p>
              Previously, my team&apos;s project SpineUp won the 1st Prize at
              the C4DX 2026 Challenge — a smart textile system to prevent
              musculoskeletal disorders in office settings.
            </p>
          </FadeInView>

          <FadeInView delay={0.25}>
            <p>
              I&apos;m particularly interested in clinical decision support,
              medical imaging, and the path from research-grade models to
              deployable systems.
            </p>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
