"use client";

import type { Act } from "@/content/types";
import { useReducedMotion, useScrollProgress } from "@/lib/hooks";
import { pad, rich } from "@/lib/utils";
import MediaView from "./MediaView";

/**
 * Portada "cinematográfica": la sección es alta y su contenido queda fijo (sticky).
 * Al hacer scroll avanza de un acto al siguiente, como si fuera una película:
 * la imagen hace un lento zoom, el texto del acto cambia y el contador avanza.
 */
export default function CinemaHero({ acts, scrollHint }: { acts: Act[]; scrollHint: string }) {
  const [ref, progress] = useScrollProgress<HTMLElement>();
  const reduced = useReducedMotion();
  const n = acts.length;
  const pos = progress * n;
  const index = Math.min(n - 1, Math.floor(pos));
  const local = Math.min(1, pos - index);
  const act = acts[index];

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative"
      style={{ height: `${n * 110 + 30}svh` }}
      aria-label="Presentación"
    >
      <div className="sticky top-0 h-svh overflow-hidden bg-black">
        {acts.map((a, i) => {
          const active = i === index;
          const scale = reduced ? 1 : active ? 1.14 - local * 0.14 : i < index ? 1 : 1.14;
          return (
            <div
              key={a.title}
              className="absolute inset-0 transition-opacity duration-[1100ms] ease-out"
              style={{ opacity: active ? 1 : 0 }}
              aria-hidden={!active}
            >
              <div className="absolute inset-0 will-change-transform" style={{ transform: `scale(${scale})` }}>
                <MediaView media={a.media} playing={active} eager={i === 0} className="h-full w-full object-cover" />
              </div>
            </div>
          );
        })}

        {/* Viñeta, degradados y franjas de cine */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,.55)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
        <div className="letterbox pointer-events-none absolute inset-x-0 top-0 h-[3.2svh] bg-black" />
        <div className="letterbox pointer-events-none absolute inset-x-0 bottom-0 h-[3.2svh] bg-black" />

        {/* Texto del acto */}
        <div className="wrap absolute inset-x-0 bottom-[11svh] z-10">
          <div key={index} className="act-in max-w-xl">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.32em] text-accent">{act.label}</p>
            <h1 className="font-display text-[clamp(44px,7vw,96px)] font-semibold italic leading-[0.95] tracking-[-0.01em] text-white">
              {rich(act.title)}
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/80 md:text-base">{act.text}</p>
          </div>
        </div>

        {/* Contador tipo vídeo */}
        <div className="wrap absolute inset-x-0 bottom-[6svh] z-10 flex items-center justify-end gap-4 max-md:justify-start">
          <span className="font-mono text-[11px] tracking-[0.2em] text-white/80">
            00:{pad(index + 1)} / 00:{pad(n)}
          </span>
          <span className="relative h-px w-28 bg-white/25 md:w-44">
            <span className="absolute inset-y-0 left-0 bg-accent" style={{ width: `${progress * 100}%` }} />
          </span>
        </div>

        {/* Indicador de scroll (sólo al principio) */}
        <div
          className="absolute left-1/2 top-[78svh] z-10 -translate-x-1/2 text-center transition-opacity duration-500 max-md:hidden"
          style={{ opacity: progress < 0.03 ? 1 : 0 }}
          aria-hidden="true"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/70">{scrollHint}</span>
          <span className="scroll-line mx-auto mt-3 block h-10 w-px bg-white/30" />
        </div>
      </div>
    </section>
  );
}
