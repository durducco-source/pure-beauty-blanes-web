"use client";

import { useCallback, useState } from "react";
import type { SiteContent } from "@/content/types";
import { asset, rich } from "@/lib/utils";
import Icon from "./Icon";
import MediaView from "./MediaView";
import Modal from "./Modal";
import Reveal from "./Reveal";
import { Eyebrow } from "./Sections";

/** Vídeos verticales: se reproducen en silencio al verse y con sonido al abrirlos. */
export default function Reels({ site }: { site: SiteContent }) {
  const r = site.reels;
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  if (!r) return null;
  const current = open === null ? null : r.items[open];

  return (
    <section id={r.id} className="section" aria-labelledby="reels-title">
      <div className="wrap mb-12">
        <Reveal><Eyebrow>{r.eyebrow}</Eyebrow></Reveal>
        <Reveal delay={80}><h2 id="reels-title" className="heading">{rich(r.title)}</h2></Reveal>
      </div>
      <div className="wrap grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {r.items.map((m, i) => (
          <Reveal key={m.src} delay={i * 80} className={i % 2 ? "md:translate-y-10" : ""}>
            <button type="button" onClick={() => setOpen(i)} aria-label={`Ver vídeo: ${m.alt}`} className="group frame relative block aspect-[9/16] w-full overflow-hidden">
              <MediaView media={m} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="absolute right-3 top-3 grid size-10 place-items-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur transition-colors group-hover:bg-accent group-hover:text-bg">
                <Icon name="play" className="size-4" />
              </span>
              <span className="absolute bottom-3 left-3 right-3 text-left font-display text-[15px] italic leading-tight text-white md:text-lg">{m.alt}</span>
            </button>
          </Reveal>
        ))}
      </div>
      <Modal open={open !== null} onClose={close} label="Vídeo">
        {current && <video key={current.src} src={asset(current.src)} controls autoPlay playsInline className="max-h-[84svh] w-auto" />}
      </Modal>
    </section>
  );
}
