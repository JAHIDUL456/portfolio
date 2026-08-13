const capabilities = [
  "AI Engineering",
  "Applied Machine Learning",
  "LLM & RAG Systems",
  "Computer Vision",
  "Product Design",
  "Full-Stack Development",
  "Cloud & MLOps",
  "Research to Production",
];

export function Capabilities() {
  return (
    <section className="px-6 md:px-10">
      <div className="mx-auto max-w-edge border-t border-white/10 py-24 md:py-32">
        <p className="eyebrow mb-12">Capabilities</p>
        <ul className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c) => (
            <li
              key={c}
              className="bg-ink-950 px-5 py-8 text-sm text-bone/80"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
