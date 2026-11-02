"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/content/types";
import { useLockBody } from "@/lib/hooks";

export default function Nav({ site }: { site: SiteContent }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useLockBody(open);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const { brand, nav, cta } = site;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid && !open ? "bg-bg/80 backdrop-blur-md border-b border-line" : "bg-gradient-to-b from-black/60 to-transparent"
        }`}
      >
        <div className="wrap flex h-[72px] items-center justify-between gap-6">
          <a href="#inicio" className="flex flex-col leading-none" aria-label={`${brand.name}, inicio`}>
            {brand.top && <span className="text-[9px] tracking-[0.5em] uppercase text-fg/60">{brand.top}</span>}
            <span className="font-display text-[22px] tracking-[0.16em] uppercase">{brand.name}</span>
            {brand.sub && <span className="mt-1 text-[8.5px] tracking-[0.36em] uppercase text-accent">{brand.sub}</span>}
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
            {nav.map((l) => (
              <a key={l.href} href={l.href} className="nav-link text-[11px] font-medium tracking-[0.22em] uppercase text-fg/80 hover:text-fg">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={cta.href}
              target={cta.external ? "_blank" : undefined}
              rel={cta.external ? "noopener" : undefined}
              className="btn-outline hidden sm:inline-flex"
            >
              {cta.label}
            </a>
            <button
              type="button"
              className="relative size-11 lg:hidden"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              aria-controls="menu-movil"
              onClick={() => setOpen((v) => !v)}
            >
              <span className={`absolute left-2.5 right-2.5 h-px bg-fg transition-all duration-500 ${open ? "top-[21.5px] rotate-45" : "top-[17px]"}`} />
              <span className={`absolute left-2.5 right-2.5 h-px bg-fg transition-all duration-500 ${open ? "top-[21.5px] -rotate-45" : "top-[26px]"}`} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-movil"
        hidden={!open}
        className="fixed inset-0 z-[45] flex flex-col justify-between bg-bg px-[var(--gutter)] pb-10 pt-28 lg:hidden"
      >
        <nav className="flex flex-col" aria-label="Menú">
          {nav.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                // Primero se desbloquea el scroll al cerrar el menú y después se navega a la sección
                e.preventDefault();
                setOpen(false);
                setTimeout(() => {
                  document.querySelector(l.href)?.scrollIntoView();
                  history.replaceState(null, "", l.href);
                }, 60);
              }}
              className="menu-item font-display text-[clamp(34px,9vw,52px)] italic leading-tight"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a href={cta.href} target={cta.external ? "_blank" : undefined} rel={cta.external ? "noopener" : undefined} className="btn-solid justify-center" onClick={() => setOpen(false)}>
          {cta.label}
        </a>
      </div>
    </>
  );
}
