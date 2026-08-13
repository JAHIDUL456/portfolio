import type { Project } from "@/data/projects";

export function ProjectOutro({ project }: { project: Project }) {
  return (
    <section className="px-6 md:px-10">
      <div className="mx-auto max-w-edge border-t border-white/10 py-24 text-center md:py-32">
        <p className="eyebrow text-bone/45">— Left {project.name} —</p>
        <p className="mx-auto mt-5 max-w-xl font-display text-3xl leading-tight text-bone/80 md:text-4xl">
          You just used the product.
        </p>
      </div>
    </section>
  );
}
