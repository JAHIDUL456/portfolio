import { Mail, Phone, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";

const socialIcon: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
};

export function Contact() {
  const { email, phone, phoneHref, links } = site.contact;
  return (
    <section id="contact" className="px-6 md:px-10">
      <div className="mx-auto max-w-edge border-t border-white/10 py-28 md:py-44">
        <p className="eyebrow mb-8">Contact</p>
        <h2 className="max-w-3xl font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-tightest text-bone">
          Let&apos;s build something intelligent.
        </h2>

        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${email}`}
              data-cursor="EMAIL"
              className="group inline-flex w-fit items-center gap-3 rounded-full border border-white/15 px-6 py-4 text-base text-bone transition-colors hover:border-white/40 hover:bg-white/5"
            >
              <Mail size={18} strokeWidth={1.6} className="text-haze" />
              {email}
              <ArrowUpRight
                size={16}
                className="text-haze transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <a
              href={phoneHref}
              data-cursor="CALL"
              className="group inline-flex w-fit items-center gap-3 rounded-full border border-white/15 px-6 py-4 text-base text-bone transition-colors hover:border-white/40 hover:bg-white/5"
            >
              <Phone size={18} strokeWidth={1.6} className="text-haze" />
              {phone}
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <p className="eyebrow text-bone/50">Or find me on</p>
            <div className="flex flex-wrap gap-3">
              {links.map((l) => {
                const Icon = socialIcon[l.label] ?? Github;
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={l.label}
                    data-cursor="OPEN"
                    className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-xs uppercase tracking-[0.18em] text-bone transition-colors hover:border-white/30 hover:bg-white/5"
                  >
                    <Icon size={16} strokeWidth={1.6} className="text-haze" />
                    {l.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
