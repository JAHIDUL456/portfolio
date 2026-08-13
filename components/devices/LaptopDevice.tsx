import { ReactNode } from "react";

export function LaptopDevice({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full">
      {/* Screen */}
      <div className="relative device-shadow rounded-t-2xl bg-ink-700 p-[10px] ring-1 ring-white/10">
        <div className="absolute inset-0 rounded-t-2xl ring-1 ring-inset ring-white/5" />

        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[10px] bg-black">
          {/* browser chrome hint */}
          <div className="absolute inset-x-0 top-0 z-30 flex h-9 items-center gap-2 border-b border-white/5 bg-ink-850/80 px-4 backdrop-blur">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="ml-3 h-5 flex-1 rounded-full bg-white/5" />
          </div>

          <div className="absolute inset-0 pt-9">{children}</div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 30%)",
            }}
          />
        </div>
      </div>

      {/* Base / keyboard deck */}
      <div className="relative mx-auto h-3 w-[calc(100%+2.5rem)] -translate-x-[1.25rem] rounded-b-2xl bg-gradient-to-b from-ink-700 to-ink-800 ring-1 ring-white/10">
        <div className="absolute -bottom-1 left-1/2 h-1.5 w-24 -translate-x-1/2 rounded-full bg-black/60 blur-[2px]" />
      </div>
    </div>
  );
}
