# Under the Lens — Cristina López Alcázar

Personal portfolio built as an immersive 3D experience. A rose-gold desk scene invites you to click the microscope, triggering a cinematic zoom that transitions into the content world — a metaphor for looking deeper into the work.

## Tech Stack

- **Next.js 16** — App Router, static export, TypeScript
- **React Three Fiber** — 3D desk scene with procedural geometry (no GLTF)
- **@react-three/drei** — OrbitControls, ContactShadows, Text3D
- **Framer Motion** — page transitions, AnimatePresence
- **Tailwind CSS v4** — `@theme` directive, custom design tokens

## Project Structure

```
src/
├── app/
│   ├── globals.css              # Theme tokens, scrollbar styles
│   ├── icon.svg                 # Favicon
│   ├── layout.tsx               # Root layout, Google Fonts, metadata
│   └── page.tsx                 # Phase orchestrator (desk → transition → microscope)
├── components/
│   ├── microscope/
│   │   └── MicroscopeWorld.tsx  # Content world shell
│   └── scene/
│       ├── Desk.tsx             # Wood desk surface
│       ├── DeskObjects.tsx      # Laptop, headphones, notebooks, 3D university text
│       ├── DeskScene.tsx        # Canvas wrapper, camera zoom animation
│       ├── Microscope3D.tsx     # Procedural microscope with hover glow
│       └── SceneLighting.tsx    # Three-point lighting setup
└── data/
    └── portfolio.ts             # Projects, education, awards, skills, experience
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How It Works

1. **Desk phase** — A 3D scene renders a study desk with a microscope, laptop, headphones, and university decorations. OrbitControls let the user drag to explore. The microscope glows on hover.
2. **Zoom transition** — Clicking the microscope animates the camera toward the eyepiece while a radial-gradient lens overlay fades in.
3. **Microscope world** — Content appears inside the microscope view. Press Escape or click the back arrow to return.

## Build & Deploy

```bash
npm run build
```

Static pages are generated to `.next/`. Optimized for Vercel — push to main for automatic deployment.

## Design

- **Palette:** warm beige background, rose-gold metals, lavender glass accents
- **Fonts:** Instrument Serif (headings), Inter (body), JetBrains Mono (code)
- **Aesthetic:** soft, scientific — a confocal-microscopy metaphor

## License

All rights reserved.
