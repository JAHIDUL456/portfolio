"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/projects";

export function SidePanel({
  project,
  active,
  reduced,
  className = "",
}: {
  project: Project;
  active: number;
  reduced: boolean;
  className?: string;
}) {
  const screen = project.screens[active];

  return (
    <div className={className}>
      <div className="mb-8">
        <p className="eyebrow">
          {project.index} — {project.category}
        </p>
        <h3 className="mt-3 font-display text-4xl leading-none text-bone md:text-5xl">
          {project.name}
        </h3>
        <p className="mt-3 max-w-xs text-sm text-haze">{project.tagline}</p>
      </div>

      <div className="min-h-[7.5rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen.label}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: reduced ? 0.2 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow text-bone/70">{screen.label}</p>
            <p className="mt-2 font-display text-2xl leading-tight text-bone md:text-3xl">
              {screen.title}
            </p>
            <p className="mt-2 max-w-xs text-sm text-haze">
              {screen.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {project.technologies.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-haze"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
