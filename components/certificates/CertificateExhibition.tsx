"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
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

  const current = certificates[active];

  return (
    <section
      id="certifications"
      ref={sectionRef}
      style={{ height: `${N * 38 + 160}vh` }}
      className="relative scroll-mt-24"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-ink-950">
        {/* studio light */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(244,243,240,0.05), transparent 60%)",
          }}
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
          style={{ perspective: 1400 }}
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

        {/* counter */}
        <div className="absolute left-6 top-24 z-40 md:left-10">
          <p className="eyebrow">Certifications</p>
          <p className="mt-2 font-display text-2xl text-bone">
            {pad(active + 1)}
            <span className="text-haze"> / {pad(N)}</span>
          </p>
        </div>

        {/* caption */}
        <div className="absolute bottom-24 left-1/2 z-40 w-[88%] -translate-x-1/2 text-center md:w-[60%]">
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
