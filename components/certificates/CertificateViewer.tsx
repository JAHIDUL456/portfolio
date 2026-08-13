"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Certificate } from "@/data/certificates";

export function CertificateViewer({
  cert,
  onClose,
}: {
  cert: Certificate;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Certificate: ${cert.title}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md md:p-10"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close inspection"
        data-cursor="CLOSE"
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-bone transition-colors hover:bg-white/10"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M3 3l10 10M13 3L3 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl"
      >
        <div className="relative aspect-[1.31] w-full overflow-hidden rounded-lg bg-ink-800 ring-1 ring-white/10 device-shadow">
          <Image
            src={cert.image}
            alt={`${cert.title}${cert.issuer ? ` — ${cert.issuer}` : ""}`}
            fill
            priority
            sizes="100vw"
            className="object-contain"
            draggable={false}
          />
        </div>

        <div className="mt-6 text-center">
          <p className="font-display text-2xl text-bone md:text-3xl">
            {cert.title}
          </p>
          {(cert.issuer || cert.date) && (
            <p className="mt-2 text-sm text-haze">
              {[cert.issuer, cert.date].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
