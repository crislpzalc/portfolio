"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const DeskScene = dynamic(() => import("@/components/scene/DeskScene"), {
  ssr: false,
});
const MicroscopeWorld = dynamic(
  () => import("@/components/microscope/MicroscopeWorld"),
  { ssr: false }
);

type Phase = "desk" | "transitioning" | "microscope";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("desk");
  const [microscopeHovered, setMicroscopeHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [zooming, setZooming] = useState(false);
  const [lensOverlay, setLensOverlay] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 500);
    return () => clearTimeout(t);
  }, []);

  const handleMicroscopeClick = useCallback(() => {
    if (phase !== "desk" || zooming) return;
    setZooming(true);
    setMicroscopeHovered(false);
  }, [phase, zooming]);

  useEffect(() => {
    if (zooming) {
      const t = setTimeout(() => setLensOverlay(true), 700);
      return () => clearTimeout(t);
    }
  }, [zooming]);

  const handleZoomComplete = useCallback(() => {
    setPhase("transitioning");
    setTimeout(() => {
      setPhase("microscope");
    }, 600);
  }, []);

  useEffect(() => {
    if (phase === "microscope") {
      const t = setTimeout(() => {
        setLensOverlay(false);
        setZooming(false);
      }, 100);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const handleExit = useCallback(() => {
    setPhase("desk");
    setZooming(false);
    setLensOverlay(false);
    setMicroscopeHovered(false);
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#f5ede8]">
      {/* Loading screen */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="loader"
            className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-[#f5ede8]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-12 h-12 rounded-full border-2 border-[#d4a0c8]/20 border-t-[#d4a0c8]"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="mt-6 text-sm text-[#8a7a7a] tracking-widest font-light">
              Preparing the workspace...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 1: 3D Desk Scene */}
      <div
        className="absolute inset-0 z-10"
        style={{
          opacity: phase === "microscope" ? 0 : 1,
          transition: "opacity 0.6s ease",
          pointerEvents: phase === "desk" && !zooming ? "auto" : "none",
        }}
      >
        <DeskScene
          onMicroscopeClick={handleMicroscopeClick}
          onZoomComplete={handleZoomComplete}
          zooming={zooming}
          microscopeHovered={microscopeHovered}
          onMicroscopeHover={setMicroscopeHovered}
        />

        {/* Site title overlay — bottom left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: loaded && !zooming ? 1 : 0,
            y: loaded ? 0 : 20,
          }}
          transition={{ delay: zooming ? 0 : 1, duration: zooming ? 0.4 : 1 }}
          className="absolute bottom-8 left-8 z-20 pointer-events-none"
        >
          <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-[#3a2a3a]/85">
            Cristina López Alcázar
          </h1>
          <p className="text-sm tracking-[0.2em] text-[#c4a0b8]/80 mt-1 font-light uppercase">
            AI for Healthcare
          </p>
        </motion.div>

        {/* Subtle instruction — bottom right */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded && !zooming ? 1 : 0 }}
          transition={{ delay: zooming ? 0 : 2, duration: zooming ? 0.3 : 1 }}
          className="absolute bottom-8 right-8 z-20 text-xs text-[#a09090]/60 tracking-wider pointer-events-none"
        >
          Drag to explore &middot; Click the microscope to enter
        </motion.p>
      </div>

      {/* Lens overlay — fades in as camera zooms toward eyepiece, fades out when content appears */}
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          opacity: lensOverlay ? 1 : 0,
          transition: lensOverlay
            ? "opacity 1.0s ease-in"
            : "opacity 0.8s ease-out",
          background:
            "radial-gradient(circle at 50% 50%, rgba(252,250,248,1) 0%, rgba(248,244,240,1) 30%, rgba(240,235,228,0.98) 60%, rgba(232,224,218,0.95) 100%)",
        }}
      />

      {/* Phase 3: Content world inside microscope */}
      <AnimatePresence>
        {(phase === "transitioning" || phase === "microscope") && (
          <motion.div
            key="microscope"
            className="absolute inset-0 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <MicroscopeWorld onExit={handleExit} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
