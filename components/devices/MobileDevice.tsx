import { ReactNode } from "react";

export function MobileDevice({
  children,
  ratio = 9 / 19.5,
}: {
  children: ReactNode;
  ratio?: number;
}) {
  return (
    <div
      className="device-shadow relative w-full rounded-[2.9rem] bg-gradient-to-b from-[#2c2c30] via-[#161618] to-[#0a0a0c] p-[12px] ring-1 ring-white/10"
      style={{ aspectRatio: String(ratio) }}
    >
      {/* outer edge highlight */}
      <div className="absolute inset-0 rounded-[2.9rem] ring-1 ring-inset ring-white/10" />

      {/* side buttons */}
      <span className="absolute -left-[2px] top-[110px] h-9 w-[3px] rounded-l bg-[#1a1a1d]" />
      <span className="absolute -left-[2px] top-[160px] h-9 w-[3px] rounded-l bg-[#1a1a1d]" />
      <span className="absolute -right-[2px] top-[140px] h-14 w-[3px] rounded-r bg-[#1a1a1d]" />

      {/* screen */}
      <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] bg-black">
        {/* dynamic island */}
        <div className="absolute left-1/2 top-3 z-30 flex h-[30px] w-[96px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-3 ring-1 ring-white/10">
          <span className="h-2 w-2 rounded-full bg-[#0c1b2e]" />
        </div>

        <div className="absolute inset-0">{children}</div>

        {/* glass reflection */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 26%, rgba(255,255,255,0) 100%)",
          }}
        />
        {/* subtle inner vignette for depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
        />
      </div>
    </div>
  );
}
