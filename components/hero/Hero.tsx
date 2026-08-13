"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const gx = useSpring(mx, { stiffness: 60, damping: 20 });
  const gy = useSpring(my, { stiffness: 60, damping: 20 });
  const bg = useTransform(
    [gx, gy],
    ([px, py]: number[]) =>
      `radial-gradient(60rem 60rem at ${px}% ${py}%, rgba(244,243,240,0.05), transparent 60%)`
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 100);
      my.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, [mx, my]);

  const lines = [
    { text: "I build intelligent systems", delay: 0.35 },
    { text: "and digital products.", delay: 0.45 },
  ];

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: bg }}
      />

      <div className="relative z-10 mx-auto w-full max-w-edge text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow mb-8"
        >
          Md. Jahidul Islam — AI Engineer
        </motion.p>

        <h1 className="font-display text-[clamp(3rem,12vw,9.5rem)] leading-[0.92] tracking-tightest text-bone">
          {["Md. Jahidul", "Islam"].map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1 + i * 0.12,
                }}
                className="block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 space-y-1">
          {lines.map((l) => (
            <motion.p
              key={l.text}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: l.delay }}
              className="text-base text-haze md:text-lg"
            >
              {l.text}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          className="mt-12"
        >
          <a
            href="#work"
            data-cursor="EXPLORE"
            className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-7 py-3 text-xs uppercase tracking-[0.22em] text-bone transition-colors hover:border-white/40 hover:bg-white/5"
          >
            Explore Work
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-haze">
          <span>Scroll</span>
          <span className="relative h-10 w-px overflow-hidden bg-white/10">
            <motion.span
              className="absolute left-0 top-0 h-4 w-px bg-bone"
              animate={{ y: ["-16px", "40px"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
