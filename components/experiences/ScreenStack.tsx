"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import type { Screen, Transition } from "@/data/projects";

function buildVariants(t: Transition): Variants {
  switch (t) {
    case "horizontal":
      return {
        enter: (dir: number) => ({ x: dir * 64, opacity: 0 }),
        center: { x: 0, y: 0, scale: 1, opacity: 1 },
        exit: (dir: number) => ({ x: dir * -64, opacity: 0 }),
      };
    case "depth":
      return {
        enter: () => ({ scale: 1.1, opacity: 0, filter: "blur(10px)" }),
        center: { x: 0, y: 0, scale: 1, opacity: 1, filter: "blur(0px)" },
        exit: () => ({ scale: 0.92, opacity: 0, filter: "blur(8px)" }),
      };
    case "vertical":
    default:
      return {
        enter: (dir: number) => ({ y: dir * 52, opacity: 0, scale: 1.02 }),
        center: { x: 0, y: 0, scale: 1, opacity: 1 },
        exit: (dir: number) => ({ y: dir * -52, opacity: 0, scale: 0.99 }),
      };
  }
}

const crossfade: Variants = {
  enter: () => ({ opacity: 0 }),
  center: { opacity: 1 },
  exit: () => ({ opacity: 0 }),
};

export function ScreenStack({
  screens,
  active,
  direction,
  transition,
  reduced,
  fit = "cover",
}: {
  screens: Screen[];
  active: number;
  direction: number;
  transition: Transition;
  reduced: boolean;
  fit?: "cover" | "contain";
}) {
  const variants = reduced ? crossfade : buildVariants(transition);
  const current = screens[active];

  return (
    <div className="absolute inset-0">
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={active}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: reduced ? 0.25 : 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <Image
            src={current.src}
            alt={current.title}
            fill
            sizes="(max-width: 768px) 90vw, 420px"
            className={fit === "contain" ? "object-contain" : "object-cover"}
            priority={active === 0}
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
