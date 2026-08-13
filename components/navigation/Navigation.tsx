"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto flex max-w-edge items-center justify-between px-6 transition-all duration-500 md:px-10 ${
          scrolled
            ? "mt-3 rounded-full border border-white/10 bg-ink-900/70 py-3 backdrop-blur-xl"
            : "mt-5 py-4"
        }`}
      >
        <a
          href="#top"
          data-cursor="GO"
          className="text-sm font-medium uppercase tracking-[0.22em] text-bone"
        >
          Jahidul
        </a>

        <nav className="flex items-center gap-6 md:gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor="GO"
              className="group relative text-[11px] font-medium uppercase tracking-[0.2em] text-haze transition-colors hover:text-bone"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-bone transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
