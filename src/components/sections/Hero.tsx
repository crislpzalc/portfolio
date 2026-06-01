"use client";

import EEGWave from "@/components/animated/EEGWave";
import FadeInView from "@/components/animated/FadeInView";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <EEGWave />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <FadeInView>
          <h1 className="font-serif text-5xl tracking-tight text-foreground md:text-7xl">
            Cristina López Alcázar
          </h1>
        </FadeInView>

        <FadeInView delay={0.15}>
          <p className="mt-6 font-sans text-lg text-foreground md:text-xl">
            AI for Healthcare. Building reproducible ML for clinical impact.
          </p>
        </FadeInView>

        <FadeInView delay={0.25}>
          <p className="mt-3 font-sans text-sm text-foreground-muted md:text-base">
            Computer Science &amp; Business student at UC3M · Incoming Amgen
            Scholar at Institut Pasteur
          </p>
        </FadeInView>

        <FadeInView delay={0.35}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#work"
              className="rounded-full bg-accent-peach px-7 py-3 font-sans text-sm text-foreground transition-all hover:shadow-md"
            >
              View work
            </a>
            <a
              href="/CV_Cristina_Lopez_Alcazar.pdf"
              download
              className="rounded-full border border-accent-rose px-7 py-3 font-sans text-sm text-foreground transition-all hover:bg-accent-rose/10"
            >
              Download CV
            </a>
            <a
              href="#contact"
              className="rounded-full border border-accent-rose px-7 py-3 font-sans text-sm text-foreground transition-all hover:bg-accent-rose/10"
            >
              Get in touch
            </a>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
