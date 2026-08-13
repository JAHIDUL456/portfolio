"use client";

import { motion, useTransform } from "framer-motion";
import type { Project } from "@/data/projects";
import { useExperienceProgress } from "./useExperienceProgress";
import { ScreenStack } from "./ScreenStack";
import { SidePanel } from "./SidePanel";
import { ScrollProgress } from "../scroll/ScrollProgress";
import { MobileDevice } from "../devices/MobileDevice";

export function MobileExperience({ project }: { project: Project }) {
  const { sectionRef, scrollYProgress, enterEnd, exitStart, active, direction, reduced } =
    useExperienceProgress(project.screens.length);

  const vx = project.transition === "vertical" ? 8 : 0;
  const vy = project.transition === "horizontal" ? 13 : 0;

  const scale = useTransform(
    scrollYProgress,
    [0, enterEnd, exitStart, 1],
    reduced ? [1, 1, 1, 1] : [0.6, 1, 1, 0.66]
  );
  const y = useTransform(
    scrollYProgress,
    [0, enterEnd, exitStart, 1],
    reduced ? [0, 0, 0, 0] : [90, 0, 0, -36]
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, enterEnd, exitStart, 1],
    reduced ? [0, 0, 0, 0] : [vx, 0, 0, -vx * 0.3]
  );
  const rotateY = useTransform(
    scrollYProgress,
    [0, enterEnd, exitStart, 1],
    reduced ? [0, 0, 0, 0] : [vy, 0, 0, -vy * 0.3]
  );
  const vignette = useTransform(
    scrollYProgress,
    [0, enterEnd, exitStart, 1],
    reduced ? [1, 1, 1, 1] : [0, 1, 1, 0.45]
  );

  const sectionHeight = `${project.screens.length * 62 + 150}vh`;

  return (
    <section
      id={`work-${project.id}`}
      ref={sectionRef}
      style={{ height: sectionHeight }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* receding environment */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{ opacity: vignette, background: "rgba(4,4,6,0.92)" }}
        />
        {/* studio light behind device */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(244,243,240,0.06), transparent 60%)",
          }}
        />

        {/* giant faint index */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[34vw] leading-none text-white/[0.025]">
          {project.index}
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-edge items-center justify-center px-6 md:px-10">
          {/* device */}
          <div style={{ perspective: 1200 }} className="relative">
            <motion.div
              style={{ scale, y, rotateX, rotateY, transformStyle: "preserve-3d" }}
              data-cursor="SCROLL"
              className="relative"
            >
              <div className="w-[min(72vw,320px)]">
                <MobileDevice ratio={9 / 19.5}>
                  <ScreenStack
                    screens={project.screens}
                    active={active}
                    direction={direction}
                    transition={project.transition}
                    reduced={reduced}
                    fit="cover"
                  />
                </MobileDevice>
              </div>
            </motion.div>
          </div>

          {/* side panel — desktop */}
          <div className="absolute right-10 top-1/2 hidden w-[330px] -translate-y-1/2 md:block">
            <SidePanel project={project} active={active} reduced={reduced} />
          </div>

          {/* caption — mobile */}
          <div className="absolute bottom-[7vh] left-1/2 w-[86%] -translate-x-1/2 text-center md:hidden">
            <SidePanel project={project} active={active} reduced={reduced} />
          </div>

          <ScrollProgress
            progress={scrollYProgress}
            total={project.screens.length}
            current={active}
          />
        </div>
      </div>
    </section>
  );
}
