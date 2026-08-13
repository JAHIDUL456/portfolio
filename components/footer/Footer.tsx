import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="px-6 md:px-10">
      <div className="mx-auto flex max-w-edge flex-col gap-4 border-t border-white/10 py-10 text-[11px] uppercase tracking-[0.18em] text-haze sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>AI Engineer — Portfolio</span>
        <a href="#top" data-cursor="GO" className="transition-colors hover:text-bone">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
