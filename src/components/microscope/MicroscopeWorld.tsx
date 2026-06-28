"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
  onExit: () => void;
}

export default function MicroscopeWorld({ onExit }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onExit();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onExit]);

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Back to desk — arrow */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onExit}
        className="fixed left-6 top-6 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-accent-rose/30 bg-background/80 backdrop-blur-sm transition-colors hover:border-accent-rose hover:bg-accent-rose/10"
        aria-label="Back to desk"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-accent-rose)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </motion.button>
    </div>
  );
}
