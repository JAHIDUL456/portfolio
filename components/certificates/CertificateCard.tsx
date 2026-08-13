"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import type { Certificate } from "@/data/certificates";

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
  const isActive = index === active;

  // Continuous "camera" position of this certificate relative to focus.
  const transform = useTransform(activeFloat, (v) => {
    const x = index - v;
    const tx = x * 44; // vw of horizontal travel
    const sc = reduced ? 1 : 1 - Math.min(Math.abs(x), 1) * 0.16;
    const ry = reduced ? 0 : x * -8; // subtle 3D turn
    return `translate(-50%, -50%) translateX(${tx}vw) scale(${sc}) rotateY(${ry}deg)`;
  });

  const opacity = useTransform(activeFloat, (v) => {
    const x = Math.abs(index - v);
    return x >= 1 ? 0 : 1 - x;
  });

  const filter = useTransform(activeFloat, (v) =>
    reduced ? "blur(0px)" : `blur(${Math.min(Math.abs(index - v), 1) * 7}px)`
  );

  const zIndex = useTransform(activeFloat, (v) =>
    Math.round(100 - Math.abs(index - v) * 10)
  );

  // Only mount nearby images to keep memory/network light.
  const near = Math.abs(index - active) <= 2;

  return (
    <motion.button
      type="button"
      onClick={() => isActive && onOpen(cert)}
      aria-label={isActive ? `Inspect certificate: ${cert.title}` : cert.title}
      tabIndex={isActive ? 0 : -1}
      style={{ transform, opacity, filter, zIndex }}
      data-cursor={isActive ? "VIEW" : undefined}
      className="absolute left-1/2 top-1/2 block w-[min(88vw,640px)] touch-manipulation outline-none"
    >
      <div className="aspect-[1.31] w-full overflow-hidden rounded-md bg-ink-800 ring-1 ring-white/10 device-shadow">
        {near && (
          <Image
            src={cert.image}
            alt={`${cert.title}${cert.issuer ? ` — ${cert.issuer}` : ""}`}
            fill
            sizes="(max-width: 768px) 88vw, 640px"
            className="object-cover"
            draggable={false}
            priority={isActive}
          />
        )}
      </div>
    </motion.button>
  );
}
