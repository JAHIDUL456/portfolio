"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import {
  Brain,
  Atom,
  Database,
  Code,
  Cpu,
  Wind,
  Globe,
  Sparkles,
  Download,
} from "lucide-react";
import { education, experiences, skillGroups } from "@/data/about";

const phases = [
  { key: "education", label: "Education", tag: "Education" },
  { key: "skills", label: "Skills", tag: "Capabilities" },
  { key: "experience", label: "Experience", tag: "Career" },
] as const;

const tint = [
  "radial-gradient(70vh 70vh at 28% 42%, rgba(180,200,255,0.08), transparent 60%)",
  "radial-gradient(70vh 70vh at 28% 42%, rgba(150,230,255,0.09), transparent 60%)",
  "radial-gradient(70vh 70vh at 28% 42%, rgba(244,243,240,0.07), transparent 60%)",
];

function CountUp({ to, decimals = 2, play }: { to: number; decimals?: number; play: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!play) return;
    let raf = 0;
    const start = performance.now();
    const dur = 950;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(to * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, to]);
  return <>{val.toFixed(decimals)}</>;
}

const orbit = [Brain, Atom, Database, Code, Cpu, Wind, Globe, Sparkles];

function EducationVisual({ play }: { play: boolean }) {
  const C = 2 * Math.PI * 52;
  return (
    <div className="relative flex h-56 w-56 items-center justify-center">
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full -rotate-90">
        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
        <motion.circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="#f4f3f0"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: play ? C * (1 - 3.6 / 4) : C }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="text-center">
        <div className="font-display text-4xl text-bone">
          <CountUp to={3.6} play={play} />
        </div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-haze">CGPA / 4.00</div>
      </div>
    </div>
  );
}

function SkillsVisual() {
  const reduced = useReducedMotion() ?? false;
  return (
    <div className="relative h-56 w-56">
      <motion.div
        className="absolute inset-0"
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        {orbit.map((Icon, i) => {
          const angle = (i / orbit.length) * Math.PI * 2 - Math.PI / 2;
          const r = 46;
          const left = 50 + Math.cos(angle) * r;
          const top = 50 + Math.sin(angle) * r;
          return (
            <motion.div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-ink-850/80 p-3 text-bone backdrop-blur"
              style={{ left: `${left}%`, top: `${top}%` }}
              animate={reduced ? {} : { rotate: -360 }}
              transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            >
              <Icon size={18} strokeWidth={1.6} />
            </motion.div>
          );
        })}
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-full border border-white/10 bg-ink-900/70 px-4 py-2 text-center backdrop-blur">
          <p className="font-display text-lg text-bone">AI</p>
          <p className="text-[9px] uppercase tracking-[0.18em] text-haze">Full Stack</p>
        </div>
      </div>
    </div>
  );
}

function ExperienceVisual() {
  const reduced = useReducedMotion() ?? false;
  return (
    <div className="relative h-56 w-56">
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-white/5 via-white/25 to-white/5" />
      {experiences.map((x, i) => (
        <motion.div
          key={x.company}
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-3"
          style={{ top: `${(i / (experiences.length - 1)) * 100}%` }}
          initial={reduced ? { opacity: 0, scale: 0.8 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, duration: 0.5 }}
        >
          <span className="h-3 w-3 rounded-full border border-bone/40 bg-ink-950" />
          <span className="whitespace-nowrap rounded-full border border-white/10 bg-ink-850/80 px-3 py-1 text-[11px] text-bone backdrop-blur">
            {x.company}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
};

export function AboutExperience() {
  const N = phases.length;
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [phase, setPhase] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const f = Math.min(Math.max(p * (N - 1), 0), N - 1);
    setActiveSafe(Math.round(f));
  });

  // separate setter to satisfy lint (state update in motion callback)
  function setActiveSafe(v: number) {
    setPhase((prev) => (prev === v ? prev : v));
  }

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const current = phases[phase];
  const ruet = education.find((e) => e.level === "college")!;

  const jumpTo = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.offsetTop + (i / (N - 1)) * total;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ height: `${N * 100 + 140}vh` }}
      className="relative scroll-mt-24"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden bg-ink-950 md:flex-row md:justify-center md:gap-16">
        {/* scene tint */}
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none absolute inset-0 z-0"
            style={{ background: tint[phase] }}
          />
        </AnimatePresence>

        {/* giant faint word */}
        <motion.div
          aria-hidden
          key={current.label}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[16vw] uppercase leading-none text-white/[0.03] md:text-[10vw]"
        >
          {current.label}
        </motion.div>

        {/* heading */}
        <div className="absolute left-6 top-24 z-30 md:left-10">
          <p className="eyebrow">About</p>
          <p className="mt-2 font-display text-2xl text-bone">{current.tag}</p>
        </div>

        {/* visual */}
        <div className="relative z-10 mb-8 md:mb-0">
          {phase === 0 && <EducationVisual play={phase === 0} />}
          {phase === 1 && <SkillsVisual />}
          {phase === 2 && <ExperienceVisual />}
        </div>

        {/* content */}
        <div className="relative z-10 w-[88%] max-w-md md:w-[40%]">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              variants={container}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {phase === 0 && (
                <div>
                  <motion.h3 variants={item} className="font-display text-3xl text-bone md:text-4xl">
                    {ruet.school}
                  </motion.h3>
                  <motion.p variants={item} className="mt-2 text-sm text-haze">
                    {ruet.degree}
                  </motion.p>
                  <motion.p variants={item} className="mt-1 text-xs text-haze/70">
                    {ruet.period} — {ruet.location}
                  </motion.p>
                  <motion.div variants={item} className="mt-5 space-y-2 text-sm text-bone/85">
                    <p>CGPA {ruet.score} · {ruet.note}</p>
                    <p className="text-haze">
                      RUET Academic Excellence Scholarship — awarded in all
                      eligible semesters (4×), top of department.
                    </p>
                  </motion.div>
                  <motion.a
                    variants={item}
                    href="/cv/MD_JAHIDUL_ISLAM_Resume.pdf"
                    download
                    data-cursor="OPEN"
                    className="group mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-bone transition-colors hover:text-haze"
                  >
                    <Download size={14} /> Download CV
                  </motion.a>
                </div>
              )}

              {phase === 1 && (
                <div>
                  <motion.h3 variants={item} className="font-display text-3xl text-bone md:text-4xl">
                    Skills
                  </motion.h3>
                  <motion.p variants={item} className="mt-2 text-sm text-haze">
                    What I build with — from AI systems to full-stack product.
                  </motion.p>
                  <div className="mt-6 space-y-5">
                    {skillGroups.map((g) => (
                      <motion.div variants={item} key={g.label}>
                        <p className="eyebrow mb-3 text-bone/60">{g.label}</p>
                        <ul className="flex flex-wrap gap-2">
                          {g.items.map((it) => {
                            const Icon = it.icon;
                            return (
                              <li
                                key={it.name}
                                data-cursor="VIEW"
                                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-bone transition-colors hover:border-white/30 hover:bg-white/[0.07]"
                              >
                                <Icon size={14} strokeWidth={1.6} className="text-haze" />
                                {it.name}
                              </li>
                            );
                          })}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {phase === 2 && (
                <div>
                  <motion.h3 variants={item} className="font-display text-3xl text-bone md:text-4xl">
                    Experience
                  </motion.h3>
                  <motion.p variants={item} className="mt-2 text-sm text-haze">
                    Shipping AI products in production.
                  </motion.p>
                  <div className="mt-6 space-y-5">
                    {experiences.map((x) => (
                      <motion.div variants={item} key={x.company} className="border-t border-white/10 pt-4">
                        <div className="flex items-baseline justify-between gap-3">
                          <p className="text-bone">{x.company}</p>
                          <p className="shrink-0 text-xs text-haze/70">{x.period}</p>
                        </div>
                        <p className="text-sm text-bone/90">{x.role}</p>
                        <p className="text-xs text-haze/70">{x.location}</p>
                        <p className="mt-2 text-sm leading-relaxed text-haze">{x.summary}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {x.stack.map((s) => (
                            <span
                              key={s}
                              className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-haze"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* phase rail */}
        <nav
          aria-label="About sections"
          className="absolute right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-4 md:flex"
        >
          {phases.map((p, i) => (
            <button
              key={p.key}
              type="button"
              onClick={() => jumpTo(i)}
              aria-current={i === phase}
              data-cursor="GO"
              className="group flex items-center justify-end gap-3"
            >
              <span
                className={`text-[10px] tabular-nums uppercase tracking-[0.15em] transition-colors ${
                  i === phase ? "text-bone" : "text-haze/50 group-hover:text-haze"
                }`}
              >
                {p.label}
              </span>
              <span
                className={`h-px rounded-full transition-all duration-300 ${
                  i === phase ? "w-8 bg-bone" : "w-4 bg-white/15 group-hover:w-6 group-hover:bg-white/40"
                }`}
              />
            </button>
          ))}
        </nav>

        {/* progress */}
        <div className="absolute bottom-8 left-1/2 z-30 h-[2px] w-32 -translate-x-1/2 overflow-hidden rounded-full bg-white/10">
          <motion.div className="h-full rounded-full bg-bone" style={{ width: progressWidth }} />
        </div>
      </div>
    </section>
  );
}
