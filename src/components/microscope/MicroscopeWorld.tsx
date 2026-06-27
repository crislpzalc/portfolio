"use client";

import { useEffect } from "react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <button
        onClick={onExit}
        className="absolute right-6 top-6 rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground-muted transition-colors hover:bg-accent-rose/10 hover:text-foreground"
      >
        Back to desk
      </button>
    </div>
  );
}
