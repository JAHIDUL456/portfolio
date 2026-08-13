"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { site } from "@/data/site";

const words = ["AI systems", "web apps", "mobile apps", "real products"];

const heroSocials = [
  { label: "Email", href: `mailto:${site.contact.email}`, Icon: Mail },
  { label: "GitHub", href: site.contact.links[0].href, Icon: Github },
  { label: "LinkedIn", href: site.contact.links[1].href, Icon: Linkedin },
  { label: "Phone", href: site.contact.phoneHref, Icon: Phone },
];

export function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const [wi, setWi] = useState(0);

  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const gx = useSpring(mx, { stiffness: 60, damping: 20 });
  const gy = useSpring(my, { stiffness: 60, damping: 20 });
  const bg = useTransform(
    [gx, gy],
    ([px, py]: number[]) =>
      `radial-gradient(60rem 60rem at ${px}% ${py}%, rgba(244,243,240,0.06), transparent 60%)`
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

    const t = setInterval(() => setWi((w) => (w + 1) % words.length), 2600);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      clearInterval(t);
    };
  }, [mx, my]);

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* reactive light */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: bg }}
      />
      {/* drifting aurora */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 top-1/4 h-[60vh] w-[60vh] rounded-full bg-white/[0.04] blur-3xl"
        animate={{ x: [0, 50, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-1/4 bottom-0 h-[55vh] w-[55vh] rounded-full bg-white/[0.03] blur-3xl"
        animate={{ x: [0, -40, 15, 0], y: [0, 25, -15, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-edge flex-col items-center text-center">
        {/* availability pill */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-haze"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for new work
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow mb-6"
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

        <p className="mt-8 max-w-xl text-base text-haze md:text-lg">
          I build{" "}
          <span className="relative inline-grid text-bone">
            <AnimatePresence mode="wait">
              <motion.span
                key={wi}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="col-start-1 row-start-1"
              >
                {words[wi]}
              </motion.span>
            </AnimatePresence>
          </span>{" "}
          — and intelligent digital products.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          className="mt-12 flex flex-col items-center gap-7"
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

          {/* reach me directly */}
          <div className="flex items-center gap-2">
            {heroSocials.map((s) => {
              const Icon = s.Icon;
              const external = s.href.startsWith("http");
              return (
                <a
                  key={s.label}
                  href={s.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={s.label}
                  data-cursor="OPEN"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-haze transition-colors hover:border-white/30 hover:bg-white/5 hover:text-bone"
                >
                  <Icon size={18} strokeWidth={1.6} />
                </a>
              );
            })}
          </div>
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
