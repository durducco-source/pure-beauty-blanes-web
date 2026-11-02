"use client";

import { useState } from "react";
import type { SiteContent } from "@/content/types";
import { rich } from "@/lib/utils";
import Reveal from "./Reveal";
import { Eyebrow } from "./Sections";

/** Carta / servicios con pestañas accesibles (flechas del teclado incluidas). */
export default function Menu({ site }: { site: SiteContent }) {
  const m = site.menu;
  const [tab, setTab] = useState(0);
  if (!m) return null;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + m.groups.length) % m.groups.length;
    setTab(next);
    document.getElementById(`tab-${next}`)?.focus();
  };

  return (
    <section id={m.id} className="section" aria-labelledby="menu-title">
      <div className="wrap grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <Reveal><Eyebrow>{m.eyebrow}</Eyebrow></Reveal>
          <Reveal delay={80}><h2 id="menu-title" className="heading">{rich(m.title)}</h2></Reveal>
          {m.intro && <Reveal delay={140}><p className="mt-6 max-w-md text-fg/70">{m.intro}</p></Reveal>}
        </div>
        <div>
          {m.groups.length > 1 && (
            <div role="tablist" aria-label="Categorías" className="mb-6 flex gap-2 overflow-x-auto pb-1">
              {m.groups.map((g, i) => (
                <button
                  key={g.name}
                  id={`tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={tab === i}
                  aria-controls={`panel-${i}`}
                  tabIndex={tab === i ? 0 : -1}
                  onClick={() => setTab(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={`shrink-0 border px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] transition-colors ${tab === i ? "border-accent bg-accent text-bg" : "border-line text-fg/70 hover:border-fg/40"}`}
                >
                  {g.name}
                </button>
              ))}
            </div>
          )}
          {m.groups.map((g, i) => (
            <ul key={g.name} id={`panel-${i}`} role="tabpanel" aria-labelledby={`tab-${i}`} hidden={tab !== i} className="border-t border-line">
              {g.items.map((it, j) => (
                <li key={it.name} className="menu-row flex items-baseline justify-between gap-6 border-b border-line py-5" style={{ animationDelay: `${j * 50}ms` }}>
                  <div>
                    <p className="font-display text-[clamp(20px,1.9vw,27px)] italic leading-tight">{it.name}</p>
                    {it.detail && <p className="mt-1 text-[14px] text-fg/55">{it.detail}</p>}
                  </div>
                  {it.price && <p className="shrink-0 font-mono text-[13px] tracking-[0.1em] text-accent">{it.price}</p>}
                </li>
              ))}
            </ul>
          ))}
          {m.note && <p className="mt-6 text-[13px] text-fg/50">{m.note}</p>}
        </div>
      </div>
    </section>
  );
}
