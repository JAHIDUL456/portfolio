"use client";

import { useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

export type ExperienceProgress = {
  sectionRef: React.RefObject<HTMLDivElement>;
  scrollYProgress: MotionValue<number>;
  enterEnd: number;
  exitStart: number;
  active: number;
  direction: number;
  reduced: boolean;
};

export function useExperienceProgress(screenCount: number): ExperienceProgress {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const enterEnd = reduced ? 0.02 : 0.16;
  const exitStart = reduced ? 0.98 : 0.84;

  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const prev = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const e = (p - enterEnd) / (exitStart - enterEnd);
    const clamped = Math.min(1, Math.max(0, e));
    let idx = Math.floor(clamped * screenCount);
    if (idx >= screenCount) idx = screenCount - 1;
    if (idx !== prev.current) {
      setDirection(idx > prev.current ? 1 : -1);
      prev.current = idx;
      setActive(idx);
    }
  });

  return {
    sectionRef,
    scrollYProgress,
    enterEnd,
    exitStart,
    active,
    direction,
    reduced,
  };
}
