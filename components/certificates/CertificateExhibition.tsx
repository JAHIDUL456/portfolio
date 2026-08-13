"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { certificates } from "@/data/certificates";
import { CertificateCard } from "./CertificateCard";
import { CertificateViewer } from "./CertificateViewer";

const pad = (n: number) => String(n).padStart(2, "0");

export function CertificateExhibition() {
  const N = certificates.length;
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const activeFloat = useTransform(scrollYProgress, [0, 1], [0, N - 1]);
  const [active, setActive] = useState(0);
  const [viewing, setViewing] = useState<(typeof certificates)[number] | null>(
    null
  );

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.round(p * (N - 1)));
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Parallax background layers (move at different speeds than the cert rail)
  const gridX = useTransform(activeFloat, (v) => `${v * 30 * 0.3}vw`);
  const auraX = useTransform(activeFloat, (v) => `${v * 30 * 0.6}vw`);

  // Cursor spotlight
  const mx = useMotionValue(50);
  const my = useMotionValue(45);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });
  const spotlight = useTransform(
    [sx, sy],
    ([x, y]: number[]) =>
      `radial-gradient(34rem 34rem at ${x}% ${y}%, rgba(244,243,240,0.08), transparent 60%)`
  );

  const current = certificates[active];

  const jumpTo = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.offsetTop + (N > 1 ? i / (N - 1) : 0) * total;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  };

  const onMouseMove = (e: { clientX: number; clientY: number }) => {
    mx.set((e.clientX / window.innerWidth) * 100);
    my.set((e.clientY / window.innerHeight) * 100);
  };

  return (
    <section
      id="certifications"
      ref={sectionRef}
      style={{ height: `${N * 18 + 120}vh` }}
      className="relative scroll-mt-24"
    >
      <div
        className="sticky top-0 h-screen overflow-hidden bg-ink-950"
        onMouseMove={onMouseMove}
      >
        {/* far parallax grid */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 z-0 w-[200%] opacity-60"
          style={{
            translateX: gridX,
            backgroundImage:
              "radial-gradient(rgba(244,243,240,0.05) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* mid parallax aurora */}
        {!reduced && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={{ translateX: auraX }}
          >
            <motion.div
              className="absolute -left-1/4 top-1/4 h-[70vh] w-[70vh] rounded-full bg-white/[0.04] blur-3xl"
              animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -right-1/4 bottom-0 h-[60vh] w-[60vh] rounded-full bg-white/[0.03] blur-3xl"
              animate={{ x: [0, -50, 20, 0], y: [0, 30, -20, 0] }}
              transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}

        {/* cursor spotlight */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: spotlight }}
        />

        {/* intro heading */}
        <motion.div
          aria-hidden
          style={{ opacity: headingOpacity }}
          className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center text-center"
        >
          <p className="eyebrow mb-5">Selected Milestones</p>
          <h2 className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-none tracking-tightest text-bone">
            Certifications
          </h2>
        </motion.div>

        {/* stage */}
        <div
          style={{ perspective: 1500 }}
          className="relative flex h-full items-center justify-center"
        >
          {certificates.map((cert, i) => (
            <CertificateCard
              key={cert.id}
              cert={cert}
              index={i}
              active={active}
              activeFloat={activeFloat}
              reduced={reduced}
              onOpen={setViewing}
            />
          ))}
        </div>

        {/* clickable index rail */}
        <nav
          aria-label="Certificate navigation"
          className="absolute right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex"
        >
          {certificates.map((cert, i) => (
            <button
              key={cert.id}
              type="button"
              onClick={() => jumpTo(i)}
              aria-current={i === active}
              aria-label={`Go to certificate ${i + 1}: ${cert.title}`}
              data-cursor="GO"
              className="group flex items-center justify-end gap-3"
            >
              <span
                className={`text-[10px] tabular-nums tracking-[0.15em] transition-colors ${
                  i === active ? "text-bone" : "text-haze/50 group-hover:text-haze"
                }`}
              >
                {pad(i + 1)}
              </span>
              <span
                className={`h-px rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-8 bg-bone"
                    : "w-4 bg-white/15 group-hover:w-6 group-hover:bg-white/40"
                }`}
              />
            </button>
          ))}
        </nav>

        {/* counter */}
        <div className="absolute left-6 top-24 z-40 md:left-10">
          <p className="eyebrow">Certifications</p>
          <p className="mt-2 font-display text-2xl text-bone">
            {pad(active + 1)}
            <span className="text-haze"> / {pad(N)}</span>
          </p>
        </div>

        {/* caption */}
        <div className="absolute bottom-24 left-1/2 z-40 w-[88%] -translate-x-1/2 text-center md:w-[56%]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: reduced ? 0.2 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-2xl leading-tight text-bone md:text-3xl">
                {current.title}
              </p>
              {(current.issuer || current.date) && (
                <p className="mt-2 text-sm text-haze">
                  {[current.issuer, current.date].filter(Boolean).join(" · ")}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
          <p className="mt-4 eyebrow text-bone/40">Click to inspect ↗</p>
        </div>

        {/* progress */}
        <div className="absolute bottom-8 left-1/2 z-40 h-[2px] w-32 -translate-x-1/2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-bone"
            style={{ width: progressWidth }}
          />
        </div>
      </div>

      <AnimatePresence>
        {viewing && (
          <CertificateViewer cert={viewing} onClose={() => setViewing(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
