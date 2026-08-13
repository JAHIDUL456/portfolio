import type { Project } from "@/data/projects";

export function ProjectIntro({ project }: { project: Project }) {
  return (
    <section className="px-6 md:px-10">
      <div className="mx-auto max-w-edge py-28 md:py-44">
        <div className="flex items-baseline gap-5">
          <span className="font-display text-6xl text-white/10 md:text-8xl">
            {project.index}
          </span>
          <span className="eyebrow">{project.category}</span>
        </div>
        <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-tightest text-bone">
          {project.name}
        </h2>
        <p className="mt-7 max-w-md text-base text-haze">
          {project.description}
        </p>
        <p className="mt-12 eyebrow text-bone/45">Scroll to step inside →</p>
      </div>
    </section>
  );
}
