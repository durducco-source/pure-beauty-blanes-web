"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { asset, EASE } from "@/lib/utils";
import { chapters } from "@/lib/chapters";
import Icon from "./Icon";

/** Desplaza hasta un ancla después de cerrar el menú (cuando el scroll ya está desbloqueado). */
function goTo(href: string) {
  window.setTimeout(() => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", href);
  }, 80);
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [past, setPast] = useState(false);
  const [hover, setHover] = useState(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();
  const primary = site.primary;
  const external = primary.external ? { target: "_blank", rel: "noopener" } : {};

  useMotionValueEvent(scrollY, "change", (v) => {
    setSolid(v > 40);
    setPast(v > window.innerHeight * 0.9);
  });

  // Menú abierto: bloquea el scroll, Escape para cerrar y devuelve el foco al botón
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 text-fg transition-[background-color,box-shadow] duration-700 ${
          open ? "" : solid ? "bg-bg/85 shadow-[0_1px_0_var(--line)] backdrop-blur-md" : "bg-deep/20 backdrop-blur-[3px]"
        }`}
      >
        <div className="wrap flex h-16 items-center justify-between gap-6">
          <a
            href={`#${chapters[0].id}`}
            onClick={(e) => { if (open) { e.preventDefault(); setOpen(false); goTo(`#${chapters[0].id}`); } }}
            className="flex flex-col leading-none"
            aria-label={`${site.brand.name}, ir al inicio`}
          >
            {site.brand.top && <span className="kicker text-[8px] text-fg/60">{site.brand.top}</span>}
            <span className="mt-1 text-[15px] font-normal uppercase tracking-[0.36em]">{site.brand.name}</span>
          </a>

          <nav aria-label="Capítulos" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {chapters.slice(1, -1).map((c) => (
                <li key={c.id}><a href={`#${c.id}`} className="kicker ulink text-fg/80 transition-colors hover:text-fg">{c.label}</a></li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3 sm:gap-6">
            <a href={primary.href} {...external} className="btn btn-line btn-sm hidden sm:inline-flex">{primary.label}</a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="menu"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="group -mr-3 flex min-h-11 min-w-11 items-center justify-center gap-3 px-3 lg:hidden"
            >
              <span className="relative block h-3 w-8" aria-hidden="true">
                <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu"
            aria-label="Menú principal"
            className="fixed inset-0 z-40 overflow-y-auto bg-deep text-fg"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="wrap grid min-h-full gap-10 pb-10 pt-24 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <ul className="flex flex-col">
                {chapters.map((c, i) => (
                  <li key={c.id} className="overflow-hidden border-b border-fg/10">
                    <motion.a
                      href={`#${c.id}`}
                      onClick={(e) => { e.preventDefault(); setOpen(false); goTo(`#${c.id}`); }}
                      onMouseEnter={() => setHover(i)}
                      onFocus={() => setHover(i)}
                      className="group flex items-baseline gap-5 py-3"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.3 + i * 0.05 }}
                    >
                      <span className="kicker w-6 text-accent">{c.n}</span>
                      <span className="caption-title text-[clamp(34px,6vw,76px)] transition-[transform,color] duration-500 group-hover:translate-x-3 group-hover:text-accent">{c.label}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
              <div className="relative hidden aspect-[4/5] max-h-[62vh] overflow-hidden lg:block">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={hover}
                    src={asset(chapters[hover].thumb)}
                    alt=""
                    className="grade absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0, scale: 1.12 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: EASE }}
                  />
                </AnimatePresence>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Barra de acción fija en móvil (aparece tras la portada) */}
      <div className={`fixed inset-x-0 bottom-0 z-30 grid grid-cols-[1fr_auto] border-t border-fg/10 bg-deep text-fg transition-transform duration-700 sm:hidden ${past && !open ? "translate-y-0" : "translate-y-full"}`}>
        <a href={primary.href} {...external} className="kicker flex items-center justify-center gap-3 py-4">
          {primary.icon && primary.icon !== "arrow" && <Icon name={primary.icon} size={16} />} {primary.label} <Icon name="arrow" />
        </a>
        {site.phone && (
          <a href={`tel:${site.phone}`} className="flex items-center border-l border-fg/15 px-5" aria-label="Llamar">
            <Icon name="phone" size={18} />
          </a>
        )}
      </div>
    </>
  );
}
