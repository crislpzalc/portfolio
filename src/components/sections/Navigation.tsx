"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" },
];

export default function Navigation() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 100);

      const ids = ["contact", "awards", "experience", "work", "about"];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActive(id);
          return;
        }
      }
      setActive("");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md"
        >
          <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
            <a href="#hero" className="font-serif text-lg text-foreground">
              CLA
            </a>
            <div className="flex gap-4 md:gap-8">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="relative py-1 text-xs font-sans transition-colors duration-200 md:text-sm"
                  style={{
                    color:
                      active === link.id
                        ? "var(--color-foreground)"
                        : "var(--color-foreground-muted)",
                  }}
                >
                  {link.label}
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-accent-rose"
                    />
                  )}
                </a>
              ))}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
