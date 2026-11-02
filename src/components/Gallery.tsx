"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/content/types";
import { useReducedMotion, useScrollProgress } from "@/lib/hooks";
import { asset, pad, rich } from "@/lib/utils";
import MediaView from "./MediaView";
import Modal from "./Modal";
import { Eyebrow } from "./Sections";

/**
 * Galería horizontal "en raíl": al hacer scroll vertical, las fotos se desplazan en horizontal
 * como una tira de película. Al pulsar una foto se abre el visor.
 */
export default function Gallery({ site }: { site: SiteContent }) {
  const g = site.gallery;
  const [ref, progress] = useScrollProgress<HTMLElement>();
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const measure = () => {
      const t = trackRef.current;
      if (t) setDistance(Math.max(0, t.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    const imgs = trackRef.current?.querySelectorAll("img") ?? [];
    imgs.forEach((i) => i.addEventListener("load", measure));
    return () => {
      window.removeEventListener("resize", measure);
      imgs.forEach((i) => i.removeEventListener("load", measure));
    };
  }, []);

  const n = g.items.length;
  const prev = useCallback(() => setOpen((i) => (i === null ? i : (i - 1 + n) % n)), [n]);
  const next = useCallback(() => setOpen((i) => (i === null ? i : (i + 1) % n)), [n]);
  const close = useCallback(() => setOpen(null), []);
  const current = open === null ? null : g.items[open];

  return (
    <section id={g.id} ref={ref} className="relative" style={{ height: reduced ? "auto" : `calc(100svh + ${distance}px)` }} aria-labelledby="gallery-title">
      <div className={`${reduced ? "" : "sticky top-0 h-svh"} flex flex-col justify-center overflow-hidden py-16`}>
        <div className="wrap mb-10 flex items-end justify-between gap-6">
          <div>
            <Eyebrow>{g.eyebrow}</Eyebrow>
            <h2 id="gallery-title" className="heading">{rich(g.title)}</h2>
          </div>
          <span className="hidden font-mono text-[11px] tracking-[0.2em] text-fg/60 md:block">
            {pad(Math.min(n, Math.floor(progress * n) + 1))} / {pad(n)}
          </span>
        </div>
        <div
          ref={trackRef}
          className={`flex gap-4 px-[var(--gutter)] will-change-transform md:gap-6 ${reduced ? "overflow-x-auto" : ""}`}
          style={reduced ? undefined : { transform: `translate3d(${-progress * distance}px,0,0)` }}
        >
          {g.items.map((m, i) => (
            <button
              key={m.src}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Ampliar: ${m.alt}`}
              className={`group frame relative shrink-0 overflow-hidden ${i % 3 === 1 ? "h-[46svh] w-[min(70vw,520px)]" : "h-[58svh] w-[min(62vw,420px)]"} ${i % 2 ? "self-end" : "self-start"}`}
            >
              <MediaView media={m} className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
              <span className="absolute bottom-3 left-3 font-mono text-[10px] tracking-[0.2em] text-white/80">{pad(i + 1)}</span>
            </button>
          ))}
        </div>
      </div>

      <Modal open={open !== null} onClose={close} onPrev={prev} onNext={next} label="Galería">
        {current && (
          <figure className="m-0 text-center">
            {current.type === "video" ? (
              <video src={asset(current.src)} controls autoPlay playsInline className="mx-auto max-h-[78svh] w-auto" />
            ) : (
              <img src={asset(current.src)} alt={current.alt} className="mx-auto max-h-[78svh] w-auto" />
            )}
            <figcaption className="mt-4 font-display text-lg italic text-white/80">{current.alt}</figcaption>
          </figure>
        )}
      </Modal>
    </section>
  );
}
