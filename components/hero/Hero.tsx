"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { site } from "@/data/site";
import { experiences } from "@/data/about";

const currentCompany = experiences[0]?.company ?? "";

const heroSocials = [
  { label: "Email", href: `mailto:${site.contact.email}`, Icon: Mail },
  { label: "GitHub", href: site.contact.links[0].href, Icon: Github },
  { label: "LinkedIn", href: site.contact.links[1].href, Icon: Linkedin },
  { label: "Phone", href: site.contact.phoneHref, Icon: Phone },
];

export function Hero() {
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
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 100);
      my.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
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
        {/* circular profile photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-7 h-40 w-40 overflow-hidden rounded-full ring-1 ring-white/15 shadow-[0_0_70px_-15px_rgba(244,243,240,0.3)] md:h-44 md:w-44"
        >
          <Image
            src="/profile.png"
            alt={`${site.name} — ${site.role}`}
            fill
            priority
            sizes="(max-width: 768px) 160px, 176px"
            className="object-cover"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-display text-4xl leading-tight tracking-tightest text-bone md:text-5xl"
        >
          {site.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-haze md:text-base"
        >
          <span className="text-bone">{site.role}</span>
          {currentCompany && (
            <>
              <span className="text-haze/70">@</span>
              <span className="text-bone">{currentCompany}</span>
            </>
          )}
        </motion.div>

        {/* contact icons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.34 }}
          className="mt-8 flex items-center gap-2"
        >
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
        </motion.div>

        {/* scroll hint — kept clear of the icons with a gap */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-haze"
        >
          <span>Scroll</span>
          <span className="relative h-10 w-px overflow-hidden bg-white/10">
            <motion.span
              className="absolute left-0 top-0 h-4 w-px bg-bone"
              animate={{ y: ["-16px", "40px"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
