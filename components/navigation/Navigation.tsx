"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { site } from "@/data/site";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socialIcon: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
};

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
      className="absolute inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto flex max-w-edge items-center justify-between gap-4 px-6 transition-all duration-500 md:px-10 ${
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

        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-1.5">
            {site.contact.links.map((l) => {
              const Icon = socialIcon[l.label] ?? Github;
              return (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={l.label}
                  data-cursor="OPEN"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-haze transition-colors hover:bg-white/10 hover:text-bone"
                >
                  <Icon size={17} strokeWidth={1.6} />
                </a>
              );
            })}
          </div>

          <nav className="flex items-center gap-5 md:gap-8">
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
      </div>
    </motion.header>
  );
}
