import { site } from "@/data/site";

export function Contact() {
  return (
    <section id="contact" className="px-6 md:px-10">
      <div className="mx-auto max-w-edge border-t border-white/10 py-28 md:py-44">
        <p className="eyebrow mb-8">Contact</p>
        <h2 className="max-w-3xl font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-tightest text-bone">
          Let&apos;s build something intelligent.
        </h2>

        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <a
            href={`mailto:${site.contact.email}`}
            data-cursor="EMAIL"
            className="group inline-flex items-center gap-3 text-lg text-bone transition-colors hover:text-haze"
          >
            {site.contact.email}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>

          <div className="flex flex-wrap gap-6">
            {site.contact.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN"
                className="group relative text-[11px] uppercase tracking-[0.2em] text-haze transition-colors hover:text-bone"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-bone transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
