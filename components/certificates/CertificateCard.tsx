"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import type { Certificate } from "@/data/certificates";

// Vertical lanes for a staggered "gallery wall" composition (vh).
const LANE_Y = [0, -7, 8];
const SLOT_VW = 30;

export function CertificateCard({
  cert,
  index,
  active,
  activeFloat,
  reduced,
  onOpen,
}: {
  cert: Certificate;
  index: number;
  active: number;
  activeFloat: MotionValue<number>;
  reduced: boolean;
  onOpen: (cert: Certificate) => void;
}) {
  const lane = index % 3;
  const isActive = index === active;

  const transform = useTransform(activeFloat, (v) => {
    const rel = index - v;
    const x = rel * SLOT_VW;
    const y = LANE_Y[lane];
    const focus = Math.max(0, 1 - Math.abs(rel));
    const sc = reduced ? 0.82 : 1 - Math.min(Math.abs(rel), 2) * 0.1 + focus * 0.14;
    const ry = reduced ? 0 : rel * -6;
    return `translate(-50%, -50%) translateX(${x}vw) translateY(${y}vh) scale(${sc}) rotateY(${ry}deg)`;
  });

  const opacity = useTransform(activeFloat, (v) => {
    const rel = Math.abs(index - v);
    return rel > 2.6 ? 0 : 1 - rel / 2.6;
  });

  const filter = useTransform(activeFloat, (v) =>
    reduced ? "blur(0px)" : `blur(${Math.min(Math.abs(index - v), 2) * 3}px)`
  );

  const dim = useTransform(activeFloat, (v) =>
    reduced ? 0 : Math.min(Math.abs(index - v), 2) / 2 * 0.5
  );

  const zIndex = useTransform(activeFloat, (v) =>
    Math.round(100 - lane * 8 - Math.abs(index - v) * 4)
  );

  const near = Math.abs(index - active) <= 3;

  return (
    <motion.button
      type="button"
      onClick={() => isActive && onOpen(cert)}
      aria-label={isActive ? `Inspect certificate: ${cert.title}` : cert.title}
      tabIndex={isActive ? 0 : -1}
      style={{ transform, opacity, filter, zIndex }}
      data-cursor={isActive ? "VIEW" : undefined}
      className="absolute left-1/2 top-1/2 block w-[min(70vw,360px)] touch-manipulation outline-none"
    >
      {isActive && !reduced && (
        <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[2rem] bg-bone/10 blur-3xl" />
      )}

      <motion.div
        className="relative aspect-[1.31] w-full overflow-hidden rounded-md bg-ink-800 ring-1 ring-white/10 device-shadow"
        animate={reduced ? undefined : { y: [0, -6, 0] }}
        transition={{
          duration: 5 + (index % 4),
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {near && (
          <Image
            src={cert.image}
            alt={`${cert.title}${cert.issuer ? ` — ${cert.issuer}` : ""}`}
            fill
            sizes="(max-width: 768px) 70vw, 360px"
            className="object-cover"
            draggable={false}
            priority={isActive}
          />
        )}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-black"
          style={{ opacity: dim }}
        />
      </motion.div>
    </motion.button>
  );
}
