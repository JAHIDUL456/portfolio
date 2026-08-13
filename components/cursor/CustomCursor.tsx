"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    setEnabled(true);
    document.body.classList.add("cursor-hidden");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = (e.target as HTMLElement)?.closest?.(
        "[data-cursor]"
      ) as HTMLElement | null;
      setLabel(target?.dataset.cursor || null);
    };

    const leave = () => setVisible(false);
    const down = () => document.body.classList.add("cursor-down");
    const up = () => document.body.classList.remove("cursor-down");

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseout", leave);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseout", leave);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.body.classList.remove("cursor-hidden");
    };
  }, [x, y]);

  if (!enabled) return null;

  const active = Boolean(label);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        animate={{
          opacity: visible ? 1 : 0,
          scale: active ? 1 : 0.85,
        }}
        transition={{ duration: 0.18 }}
      >
        {active ? (
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full border border-bone/30 bg-bone/10 text-[10px] font-medium uppercase tracking-[0.18em] text-bone backdrop-blur-md"
          >
            {label}
          </div>
        ) : (
          <div className="h-2 w-2 rounded-full bg-bone mix-blend-difference" />
        )}
      </motion.div>
    </motion.div>
  );
}
