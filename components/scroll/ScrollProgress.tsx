"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

export function ScrollProgress({
  progress,
  total,
  current,
}: {
  progress: MotionValue<number>;
  total: number;
  current: number;
}) {
  const width = useTransform(
    progress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3">
      <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-haze">
        <span className="tabular-nums text-bone">
          {String(current + 1).padStart(2, "0")}
        </span>
        <span className="h-px w-8 bg-white/15" />
        <span className="tabular-nums">{String(total).padStart(2, "0")}</span>
      </div>
      <div className="h-[2px] w-28 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-bone"
          style={{ width }}
        />
      </div>
    </div>
  );
}
