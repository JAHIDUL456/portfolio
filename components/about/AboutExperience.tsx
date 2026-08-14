"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
  type Variants,
  type MotionValue,
} from "framer-motion";
import {
  Download,
  ChevronLeft,
  ChevronRight,
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

function SkillsConstellation({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (i: number) => void;
}) {
  const reduced = useReducedMotion() ?? false;
  const radius = 37;
  const nodes = skillGroups.map((g, i) => {
    const angle = (i / skillGroups.length) * Math.PI * 2 - Math.PI / 2;
    const Icon = g.items[0].icon;
    return {
      g,
      Icon,
      left: 50 + Math.cos(angle) * radius,
      top: 50 + Math.sin(angle) * radius,
    };
  });

  return (
    <div className="relative h-[340px] w-[340px]">
      {/* slow rotating dashed track */}
      <motion.div
        className="absolute inset-[10%] rounded-full border border-dashed border-white/10"
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
      />
      {/* connector lines */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none">
        {nodes.map((n, i) => (
          <line
            key={i}
            x1={50}
            y1={50}
            x2={n.left}
            y2={n.top}
            className={i === active ? "stroke-bone/40" : "stroke-white/10"}
            strokeWidth={0.4}
          />
        ))}
      </svg>

      {/* group nodes */}
      {nodes.map((n, i) => {
        const isActive = i === active;
        const Icon = n.Icon;
        return (
          <button
            key={n.g.label}
            type="button"
            onClick={() => onSelect(i)}
            data-cursor="VIEW"
            aria-label={n.g.label}
            className="absolute -translate-x-1/2 -translate-y-1/2 outline-none"
            style={{ left: `${n.left}%`, top: `${n.top}%` }}
          >
            <div
              className={`flex flex-col items-center gap-1.5 transition-transform duration-300 ${
                isActive ? "scale-110" : "hover:scale-105"
              }`}
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-full border backdrop-blur transition-colors ${
                  isActive
                    ? "border-bone bg-white/10 text-bone shadow-[0_0_32px_-6px_rgba(244,243,240,0.65)]"
                    : "border-white/15 bg-ink-850/80 text-haze hover:text-bone"
                }`}
              >
                <Icon size={22} strokeWidth={1.5} />
              </span>
              <span
                className={`text-[10px] uppercase tracking-[0.12em] ${
                  isActive ? "text-bone" : "text-haze/70"
                }`}
              >
                {n.g.label}
              </span>
            </div>
          </button>
        );
      })}

      {/* core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-ink-900/70 px-4 py-3 text-center backdrop-blur">
        <p className="font-display text-base text-bone">{skillGroups[active].items.length}</p>
        <p className="text-[9px] uppercase tracking-[0.16em] text-haze">skills</p>
      </div>
    </div>
  );
}

const ROAD =
  "M180 20 C 320 130, 40 230, 180 340 C 300 430, 60 500, 180 580 C 300 650, 120 690, 180 700";

function ExperienceJourney({
  progress,
  active,
  onJump,
}: {
  progress: MotionValue<number>;
  active: number;
  onJump: (i: number) => void;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pts, setPts] = useState<{ left: number; top: number }[]>([]);
  const tx = useMotionValue(50);
  const ty = useMotionValue(4);

  const place = (t: number) => {
    const el = pathRef.current;
    if (!el) return;
    const len = el.getTotalLength();
    const p = el.getPointAtLength(Math.max(0, Math.min(1, t)) * len);
    tx.set((p.x / 360) * 100);
    ty.set((p.y / 720) * 100);
  };

  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const len = el.getTotalLength();
    setPts(
      experiences.map((_, i) => {
        const p = el.getPointAtLength((i / (experiences.length - 1)) * len);
        return { left: (p.x / 360) * 100, top: (p.y / 720) * 100 };
      })
    );
    place(progress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(progress, "change", place);

  const left = useTransform(tx, (v) => `${v}%`);
  const top = useTransform(ty, (v) => `${v}%`);
  const draw = useTransform(progress, [0, 1], ["1", "0"]);

  return (
    <div className="relative h-[520px] w-[260px] md:h-[600px] md:w-[300px]">
      <svg viewBox="0 0 360 720" className="h-full w-full" fill="none">
        {/* base road */}
        <path
          ref={pathRef}
          d={ROAD}
          pathLength={1}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={4}
          strokeLinecap="round"
        />
        {/* travelled road */}
        <motion.path
          d={ROAD}
          pathLength={1}
          stroke="#f4f3f0"
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={1}
          style={{ strokeDashoffset: draw }}
        />
        {/* milestones */}
        {pts.map((p, i) => {
          const isActive = i === active;
          const isCurrent = i === 0;
          return (
            <g
              key={i}
              transform={`translate(${(p.left / 100) * 360} ${(p.top / 100) * 720})`}
              onClick={() => onJump(i)}
              className="cursor-pointer"
            >
              {/* hit area */}
              <circle r={26} className="fill-transparent" />
              <circle
                r={isActive ? 11 : 8}
                className={isActive ? "fill-bone" : "fill-ink-950 transition-all"}
                stroke={isCurrent ? "#34d399" : isActive ? "#f4f3f0" : "rgba(255,255,255,0.4)"}
                strokeWidth={2.5}
              />
              {isCurrent && <circle r={16} className="fill-none stroke-emerald-400/40" strokeWidth={1.5} />}
              <text
                x={22}
                y={4}
                className={`pointer-events-none select-none text-[11px] ${isActive ? "fill-bone" : "fill-haze"}`}
              >
                {experiences[i].company}
              </text>
            </g>
          );
        })}
      </svg>

      {/* traveller = profile, moving along the road */}
      <motion.div style={{ left, top }} className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-bone shadow-[0_0_28px_-6px_rgba(244,243,240,0.7)]">
          <Image src="/profile.png" alt="" fill sizes="32px" className="object-cover" />
        </div>
      </motion.div>
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
  const [active, setActive] = useState(0);
  const [skillIdx, setSkillIdx] = useState(0);

  // each phase owns an equal 1/N slice of the scroll (phase 0,1,2 = thirds)
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setPhase((prev) => {
      const next = Math.min(N - 1, Math.floor(p * N));
      return prev === next ? prev : next;
    });
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  // experience journey progress: only the LAST phase (p from (N-1)/N to 1)
  const exprogress = useTransform(scrollYProgress, [(N - 1) / N, 1], [0, 1]);
  useMotionValueEvent(exprogress, "change", (t) => {
    if (phase !== 2) return;
    const idx = Math.max(
      0,
      Math.min(experiences.length - 1, Math.round(t * (experiences.length - 1)))
    );
    setActive((prev) => (prev === idx ? prev : idx));
  });
  // skills reveal progress: the MIDDLE phase (p from 1/N to 2/N)
  const skillProgress = useTransform(scrollYProgress, [1 / N, 2 / N], [0, 1]);
  useMotionValueEvent(skillProgress, "change", (t) => {
    if (phase !== 1) return;
    const idx = Math.max(
      0,
      Math.min(skillGroups.length - 1, Math.round(t * (skillGroups.length - 1)))
    );
    setSkillIdx((prev) => (prev === idx ? prev : idx));
  });
  const current = phases[phase];
  const ruet = education.find((e) => e.level === "college")!;

  const jumpTo = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.offsetTop + ((i + 0.5) / N) * total;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  };

  // jump to a specific experience milestone along the winding journey
  const scrollToMilestone = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const fi = experiences.length > 1 ? i / (experiences.length - 1) : 0;
    const p = (N - 1) / N + fi * (1 / N);
    const top = el.offsetTop + p * total;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ height: `${N * 100 + 420}vh` }}
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
          {phase === 1 && <SkillsConstellation active={skillIdx} onSelect={setSkillIdx} />}
          {phase === 2 && <ExperienceJourney progress={exprogress} active={active} onJump={scrollToMilestone} />}
        </div>

        {/* content */}
        <div
          className={`relative z-10 w-[88%] ${
            phase === 2 ? "max-w-2xl md:w-[58%]" : "max-w-md md:w-[40%]"
          }`}
        >
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

                  {/* group tabs */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {skillGroups.map((g, i) => (
                      <button
                        key={g.label}
                        type="button"
                        onClick={() => setSkillIdx(i)}
                        data-cursor="VIEW"
                        aria-pressed={i === skillIdx}
                        className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                          i === skillIdx
                            ? "border-white/30 bg-white/10 text-bone"
                            : "border-white/10 text-haze hover:text-bone"
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>

                  {/* active group skills */}
                  <div className="mt-5">
                    <AnimatePresence mode="wait">
                      <motion.ul
                        key={skillIdx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-wrap gap-2"
                      >
                        {skillGroups[skillIdx].items.map((it, idx) => {
                          const Icon = it.icon;
                          return (
                            <motion.li
                              key={it.name}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.04, duration: 0.3 }}
                              data-cursor="VIEW"
                              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-bone transition-colors hover:border-white/30 hover:bg-white/[0.07]"
                            >
                              <Icon size={14} strokeWidth={1.6} className="text-haze" />
                              {it.name}
                            </motion.li>
                          );
                        })}
                      </motion.ul>
                    </AnimatePresence>
                  </div>

                  <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-haze/60">
                    {skillIdx + 1} / {skillGroups.length} · scroll to reveal each group
                  </p>
                </div>
              )}

              {phase === 2 && (
                <div>
                  <motion.h3 variants={item} className="font-display text-3xl text-bone md:text-4xl">
                    Experience
                  </motion.h3>
                  <motion.div variants={item} className="mt-2 flex flex-wrap items-center gap-2 text-sm text-haze">
                    <span>Currently at</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {experiences[0].company}
                    </span>
                    <span>— {experiences[0].role}</span>
                  </motion.div>

                  <div className="mt-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <p className="text-bone">{experiences[active].company}</p>
                          <p className="shrink-0 text-[11px] text-haze/70">{experiences[active].period}</p>
                        </div>
                        <p className="mt-1 text-sm text-bone/90">{experiences[active].role}</p>
                        <p className="text-[11px] text-haze/70">{experiences[active].location}</p>
                        <p className="mt-3 text-sm leading-relaxed text-haze">{experiences[active].summary}</p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {experiences[active].stack.map((s) => (
                            <span
                              key={s}
                              className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-haze"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => scrollToMilestone(active - 1)}
                          disabled={active === 0}
                          data-cursor="GO"
                          aria-label="Previous role"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-bone transition-colors hover:border-white/30 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <ChevronLeft size={16} strokeWidth={1.8} />
                        </button>
                        <span className="text-[11px] tabular-nums text-haze">
                          {active + 1} / {experiences.length}
                        </span>
                        <button
                          type="button"
                          onClick={() => scrollToMilestone(active + 1)}
                          disabled={active === experiences.length - 1}
                          data-cursor="GO"
                          aria-label="Next role"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-bone transition-colors hover:border-white/30 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <ChevronRight size={16} strokeWidth={1.8} />
                        </button>
                      </div>
                      <p className="text-right text-[11px] uppercase tracking-[0.18em] text-haze/60">
                        Scroll or tap to explore
                      </p>
                    </div>
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
