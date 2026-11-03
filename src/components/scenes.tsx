"use client";

// Tipos de escena del recorrido. Cada uno es un movimiento de cámara distinto; el guion de cada web
// (orden, imágenes y textos) se define en src/content/site.ts.
import { AnimatePresence, motion, useMotionValueEvent, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Media, SceneDef } from "@/content/types";
import { site } from "@/content/site";
import { asset, EASE, rich } from "@/lib/utils";
import { Caption, ChapterWord, CtaButton, Scene, Shot, Veil, useRange, useScene, type P } from "./cinema";
import Icon from "./Icon";

type Of<K extends SceneDef["kind"]> = Extract<SceneDef, { kind: K }>;

/** Mide una tira horizontal para el travelling (sin re-renderizar en cada scroll). */
function useTrack<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const dims = useRef({ track: 0, vw: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => { dims.current = { track: el.scrollWidth, vw: window.innerWidth }; });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, dims };
}

/** Llegada — avance hacia el primer plano; el nombre se abre y se desenfoca; fundido al segundo plano. */
function Arrival({ s }: { s: Of<"arrival"> }) {
  const { ref, p } = useScene();
  const hasB = !!s.b;
  const aScale = useRange(p, [0, hasB ? 0.6 : 1], [1.02, 1.4]);
  const bOpacity = useRange(p, [0.4, 0.56], [0, 1]);
  const bScale = useRange(p, [0.4, 1], [1.1, 1.42]);
  const tOpacity = useRange(p, [0, 0.2, 0.36], [1, 1, 0]);
  const tSpacing = useRange(p, [0, 0.36], ["0.16em", "0.6em"]);
  const tBlur = useRange(p, [0.12, 0.36], ["blur(0px)", "blur(14px)"]);
  const eOpacity = useRange(p, [0.56, 0.66, 0.86, 0.97], [0, 1, 1, 0]);
  const eScale = useRange(p, [0.56, 0.97], [0.9, 1.16]);
  const cue = useRange(p, [0, 0.08], [1, 0]);
  return (
    <Scene id={s.id} label={s.label} vh={hasB ? 320 : 220} sceneRef={ref}>
      <Shot media={s.a} eager style={{ scale: aScale }} />
      {s.b && <Shot media={s.b} eager style={{ opacity: bOpacity, scale: bScale }} />}
      <Veil />
      <motion.div style={{ opacity: tOpacity }} className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <p className="kicker fade-up mb-6 text-fg/85" style={{ animationDelay: ".7s" }}>{s.kicker}</p>
        <motion.h1 style={{ letterSpacing: tSpacing, paddingLeft: tSpacing, filter: tBlur }} className="brand-title track-in text-[clamp(46px,11.5vw,200px)] uppercase leading-[0.95]">
          {s.title}
        </motion.h1>
        {s.sub && <p className="kicker fade-up mt-7 text-fg/80" style={{ animationDelay: "1.2s" }}>{s.sub}</p>}
      </motion.div>
      {s.enter && (
        <motion.p style={{ opacity: eOpacity, scale: eScale }} className="caption-title pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-[clamp(46px,8vw,140px)] leading-[0.95]">
          {s.enter.split(" ").map((w, i) => <span key={i}>{w}</span>)}
        </motion.p>
      )}
      <motion.div style={{ opacity: cue }} className="kicker pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[9px] text-fg/80">
        Desliza
        <span className="relative block h-10 w-px overflow-hidden bg-fg/20"><span className="scroll-cue absolute inset-0 bg-fg" /></span>
      </motion.div>
    </Scene>
  );
}

/** Picado — zoom + giro sobre A, barrido lateral sobre B y retroceso sobre C. */
function Dive({ s }: { s: Of<"dive"> }) {
  const { ref, p } = useScene();
  const aScale = useRange(p, [0, 0.44], [1.02, 1.75]);
  const aRotate = useRange(p, [0, 0.44], [0, 7]);
  const aOpacity = useRange(p, [0.36, 0.46], [1, 0]);
  const bOpacity = useRange(p, [0.36, 0.46], [0, 1]);
  const bX = useRange(p, [0.36, 0.84], ["-7%", "7%"]);
  const cOpacity = useRange(p, [0.76, 0.86], [0, 1]);
  const cScale = useRange(p, [0.76, 1], [1.32, 1.04]);
  return (
    <Scene id={s.id} label={s.label} vh={420} sceneRef={ref}>
      <Shot media={s.b} style={{ opacity: bOpacity, x: bX, scale: 1.2 }} />
      <Shot media={s.a} preload style={{ opacity: aOpacity, scale: aScale, rotate: aRotate }} />
      {s.c && <Shot media={s.c} style={{ opacity: cOpacity, scale: cScale }} />}
      <Veil />
      <ChapterWord p={p} n={s.n} word={s.label} range={[0.03, 0.11, 0.24, 0.33]} />
      <Caption p={p} range={[0.48, 0.54, 0.74, 0.8]} n={s.n} title={s.title} sub={s.sub} cta={s.cta} />
    </Scene>
  );
}

/** Puerta corredera que abre el primer plano y travelling horizontal por la tira. */
function Door({ s }: { s: Of<"door"> }) {
  const { ref, p } = useScene();
  const clip = useRange(p, [0.02, 0.3], ["inset(0% 47% 0% 47%)", "inset(0% 0% 0% 0%)"]);
  const doorScale = useRange(p, [0.02, 0.36], [1.5, 1.08]);
  const dim = useRange(p, [0.32, 0.42], [0, 0.72]);
  const innerX = useRange(p, [0.34, 1], ["6%", "-6%"]);
  const trackOpacity = useRange(p, [0.32, 0.38], [0, 1]);
  const { ref: trackRef, dims } = useTrack<HTMLDivElement>();
  const x = useTransform(p, (v) => {
    const { track, vw } = dims.current;
    const t = Math.min(1, Math.max(0, (v - 0.34) / 0.66));
    return vw - t * (track + vw * 0.35);
  });
  return (
    <Scene id={s.id} label={s.label} vh={460} sceneRef={ref}>
      <motion.div style={{ clipPath: clip }} className="absolute inset-0">
        <Shot media={s.door} preload style={{ scale: doorScale }} />
      </motion.div>
      <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-deep" aria-hidden="true" />
      <ChapterWord p={p} n={s.n} word={s.label} range={[0, 0.06, 0.18, 0.27]} />
      <motion.div ref={trackRef} style={{ x, opacity: trackOpacity }} className="absolute top-[60%] flex -translate-y-1/2 items-center gap-[4vw] will-change-transform">
        {s.track.map((m, i) => {
          const shape = m.type === "video"
            ? "h-[54svh] aspect-[9/16]"
            : i % 2 ? "h-[42svh] w-[72vw] md:w-[40vw]" : "h-[54svh] w-[66vw] md:w-[32vw]";
          return (
            <figure key={m.src + i} className={`relative shrink-0 overflow-hidden ${shape} ${i % 2 ? "-translate-y-[5svh]" : "translate-y-[4svh]"}`}>
              <Shot media={m} className="h-full w-full" sizes="(min-width: 768px) 40vw, 72vw" style={{ x: m.type === "video" ? 0 : innerX, scale: m.type === "video" ? 1.02 : 1.2 }} />
              <figcaption className="kicker absolute bottom-3 left-3 right-3 text-[9px] text-fg/90">{m.alt}</figcaption>
            </figure>
          );
        })}
      </motion.div>
      <Caption p={p} range={[0.4, 0.46, 0.93, 0.99]} n={s.n} title={s.title} sub={s.sub} cta={s.cta} position="top" />
    </Scene>
  );
}

/** Retroceso — la cámara empieza muy cerca y se aleja; deriva lateral al segundo plano. */
function Pullback({ s }: { s: Of<"pullback"> }) {
  const { ref, p } = useScene();
  const aScale = useRange(p, [0, s.b ? 0.56 : 0.9], [2.0, 1.02]);
  const bOpacity = useRange(p, [0.52, 0.62], [0, 1]);
  const bX = useRange(p, [0.52, 1], ["4%", "-4%"]);
  return (
    <Scene id={s.id} label={s.label} vh={320} sceneRef={ref}>
      <Shot media={s.a} preload style={{ scale: aScale, transformOrigin: s.origin ?? "50% 55%" }} />
      {s.b && <Shot media={s.b} style={{ opacity: bOpacity, x: bX, scale: 1.12 }} />}
      <Veil />
      <ChapterWord p={p} n={s.n} word={s.label} range={[0.03, 0.1, 0.24, 0.33]} />
      <Caption p={p} range={[0.62, 0.68, 0.92, 0.98]} n={s.n} title={s.title} sub={s.sub} cta={s.cta} />
    </Scene>
  );
}

/** Profundidad — fondo lento y piezas que suben a distinta velocidad. */
function Depth({ s }: { s: Of<"depth"> }) {
  const { ref, p } = useScene();
  const backScale = useRange(p, [0, 1], [1.05, 1.32]);
  const backY = useRange(p, [0, 1], ["0%", "-5%"]);
  const farY = useRange(p, [0.08, 1], ["0svh", "-150svh"]);
  const nearY = useRange(p, [0.18, 0.95], ["0svh", "-175svh"]);
  const [far, near] = s.cards;
  const card = (m: Media) => (m.type === "video" ? "aspect-[9/16]" : "aspect-[4/5]");
  return (
    <Scene id={s.id} label={s.label} vh={360} sceneRef={ref}>
      <Shot media={s.back} preload style={{ scale: backScale, y: backY }} />
      <Veil />
      {far && (
        <motion.figure style={{ y: farY }} className="absolute right-[36%] top-full w-[42vw] overflow-hidden shadow-2xl md:right-[30%] md:w-[22vw]">
          <Shot media={far} className={`w-full ${card(far)}`} sizes="30vw" />
        </motion.figure>
      )}
      {near && (
        <motion.figure style={{ y: nearY }} className="absolute right-[5%] top-full w-[50vw] overflow-hidden shadow-2xl md:right-[8%] md:w-[26vw]">
          <Shot media={near} className={`w-full ${card(near)}`} sizes="35vw" />
        </motion.figure>
      )}
      <ChapterWord p={p} n={s.n} word={s.label} range={[0.02, 0.1, 0.22, 0.3]} />
      <Caption p={p} range={[0.36, 0.42, 0.88, 0.95]} n={s.n} title={s.title} sub={s.sub} cta={s.cta} />
    </Scene>
  );
}

/** Panorámica vertical (la cámara sube) y avance al segundo plano. */
function Tilt({ s }: { s: Of<"tilt"> }) {
  const { ref, p } = useScene();
  const tilt = useRange(p, [0, s.b ? 0.58 : 0.95], ["-26%", "0%"]);
  const bOpacity = useRange(p, [0.5, 0.6], [0, 1]);
  const bScale = useRange(p, [0.5, 1], [1.02, 1.28]);
  return (
    <Scene id={s.id} label={s.label} vh={340} sceneRef={ref}>
      <Shot media={s.a} preload style={{ y: tilt }} className="absolute inset-x-0 top-0 h-[135%] w-full" />
      {s.b && <Shot media={s.b} style={{ opacity: bOpacity, scale: bScale }} />}
      <Veil />
      <ChapterWord p={p} n={s.n} word={s.label} range={[0.03, 0.1, 0.22, 0.3]} />
      <Caption p={p} range={s.b ? [0.3, 0.36, 0.44, 0.5] : [0.36, 0.42, 0.9, 0.97]} n={s.n} title={s.title} cta={s.b ? undefined : s.cta} />
      {s.b && s.title2 && <Caption p={p} range={[0.64, 0.7, 0.92, 0.98]} title={s.title2} cta={s.cta} align="right" />}
    </Scene>
  );
}

/** Un vídeo del "reel": se funde en su tramo y sólo se reproduce mientras se ve. */
function ReelVideo({ media, p, input, output }: { media: Media; p: P; input: number[]; output: number[] }) {
  const opacity = useRange(p, input, output);
  const ref = useRef<HTMLVideoElement>(null);
  useMotionValueEvent(opacity, "change", (o) => {
    const v = ref.current;
    if (!v) return;
    if (o > 0.05 && v.paused) v.play().catch(() => {});
    else if (o <= 0.05 && !v.paused) v.pause();
  });
  useEffect(() => { if (ref.current) ref.current.muted = true; }, []);
  return (
    <motion.video
      ref={ref}
      src={asset(media.src)}
      poster={media.poster ? asset(media.poster) : undefined}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={media.alt}
      style={{ opacity }}
      className="grade absolute inset-0 h-full w-full object-cover"
    />
  );
}

/** Pantalla vertical — los vídeos 9:16 se suceden dentro de un marco que crece. */
function Reel({ s }: { s: Of<"reel"> }) {
  const { ref, p } = useScene();
  const n = s.videos.length;
  const frameScale = useRange(p, [0, 0.22], [0.72, 1]);
  const frameRadius = useRange(p, [0, 0.22], [28, 2]);
  const seg = 0.86 / n;
  const bg = s.videos[0].poster ?? s.videos[0].src;
  return (
    <Scene id={s.id} label={s.label} vh={140 + n * 90} sceneRef={ref}>
      <img src={asset(bg)} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-125 object-cover opacity-50 blur-3xl" />
      <div className="absolute inset-0 bg-deep/45" aria-hidden="true" />
      <motion.div
        style={{ scale: frameScale, borderRadius: frameRadius }}
        className="absolute inset-0 overflow-hidden shadow-2xl md:inset-auto md:right-[10%] md:top-1/2 md:aspect-[9/16] md:h-[80svh] md:-translate-y-1/2"
      >
        {s.videos.map((v, i) => {
          const start = 0.06 + i * seg;
          // Cada vídeo ocupa su tramo; el primero empieza visible y el último se queda al final
          const input = n === 1 ? [0, 1] : i === 0 ? [start + seg, start + seg + 0.06] : i === n - 1 ? [start - 0.04, start + 0.02] : [start - 0.04, start + 0.02, start + seg, start + seg + 0.06];
          const output = n === 1 ? [1, 1] : i === 0 ? [1, 0] : i === n - 1 ? [0, 1] : [0, 1, 1, 0];
          return <ReelVideo key={v.src} media={v} p={p} input={input} output={output} />;
        })}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-deep/85 to-transparent md:hidden" aria-hidden="true" />
      </motion.div>
      <ChapterWord p={p} n={s.n} word={s.label} range={[0.0, 0.04, 0.14, 0.22]} />
      <Caption p={p} range={[0.2, 0.26, 0.94, 1]} n={s.n} title={s.title} sub={s.sub} cta={s.cta} />
    </Scene>
  );
}

/** Carta — los grupos se suceden sobre un fondo en zoom lento. */
function MenuScene({ s }: { s: Of<"list"> }) {
  const { ref, p } = useScene();
  const backScale = useRange(p, [0, 1], [1.05, 1.28]);
  const head = useRange(p, [0.02, 0.1, 0.92, 1], [0, 1, 1, 0]);
  const g = s.groups.length;
  const seg = 0.8 / g;
  return (
    <Scene id={s.id} label={s.label} vh={160 + g * 70} sceneRef={ref}>
      <Shot media={s.back} preload style={{ scale: backScale }} />
      <Veil />
      <div className="pointer-events-none absolute inset-0 bg-deep/60" aria-hidden="true" />
      <motion.div style={{ opacity: head }} className="wrap absolute inset-x-0 top-0 pt-24">
        <span className="caption-n text-[clamp(22px,2.2vw,34px)] text-accent">{s.n}</span>
        <h2 className="caption-title mt-1 text-[clamp(32px,4vw,64px)] leading-none">{rich(s.title)}</h2>
      </motion.div>
      {s.groups.map((grp, i) => (
        <MenuGroupView key={grp.name} p={p} range={[0.08 + i * seg, 0.12 + i * seg, 0.06 + (i + 1) * seg, 0.1 + (i + 1) * seg]} group={grp} last={i === g - 1} />
      ))}
      <motion.div style={{ opacity: head }} className="wrap absolute inset-x-0 bottom-0 flex flex-col items-start gap-4 pb-[clamp(90px,13vh,130px)]">
        {s.note && <p className="max-w-md text-sm text-fg/75">{s.note}</p>}
        {s.cta && <CtaButton cta={s.cta} small />}
      </motion.div>
    </Scene>
  );
}

function MenuGroupView({ p, range, group, last }: { p: P; range: [number, number, number, number]; group: Of<"list">["groups"][number]; last: boolean }) {
  const opacity = useRange(p, last ? range.slice(0, 2) : range, last ? [0, 1] : [0, 1, 1, 0]);
  const y = useRange(p, last ? range.slice(0, 2) : range, last ? [30, 0] : [30, 0, 0, -30]);
  return (
    <motion.div style={{ opacity, y }} className="wrap pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2">
      <div className="ml-auto max-w-xl">
        <p className="kicker mb-5 text-accent">{group.name}</p>
        <ul className="divide-y divide-fg/15 border-y border-fg/15">
          {group.items.map((it) => (
            <li key={it.name} className="flex items-baseline justify-between gap-6 py-3.5">
              <span>
                <span className="caption-title block text-[clamp(20px,1.8vw,26px)] leading-tight">{it.name}</span>
                {it.detail && <span className="mt-1 block text-[13px] text-fg/65">{it.detail}</span>}
              </span>
              {it.price && <span className="caption-title shrink-0 text-[clamp(18px,1.6vw,24px)] text-accent">{it.price}</span>}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// Formato y altura de cada fotograma de la tira (ritmo irregular, como un montaje)
const SHAPES = [
  "h-[58svh] w-[70vw] md:w-[36vw] translate-y-[4svh]",
  "h-[40svh] w-[62vw] md:w-[26vw] -translate-y-[16svh]",
  "h-[50svh] w-[74vw] md:w-[32vw] translate-y-[12svh]",
  "h-[62svh] w-[66vw] md:w-[28vw] -translate-y-[2svh]",
  "h-[42svh] w-[70vw] md:w-[30vw] translate-y-[16svh]",
  "h-[56svh] w-[64vw] md:w-[26vw] -translate-y-[10svh]",
];

/** Fragmentos — tira de película horizontal con visor a pantalla completa. */
function Strip({ s }: { s: Of<"strip"> }) {
  const { ref, p } = useScene();
  const items = s.items;
  const { ref: trackRef, dims } = useTrack<HTMLUListElement>();
  const x = useTransform(p, (v) => {
    const { track, vw } = dims.current;
    return vw * 0.15 - v * (track - vw * 0.7);
  });
  const innerX = useRange(p, [0, 1], ["8%", "-8%"]);
  const head = useRange(p, [0, 0.08, 0.9, 1], [0, 1, 1, 0]);

  const [open, setOpen] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(null), []);
  const go = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + items.length) % items.length)), [items.length]);
  useEffect(() => {
    if (open === null) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const trigger = lastTrigger.current;
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open, close, go]);

  const current = open === null ? null : items[open];
  return (
    <>
      <Scene id={s.id} label={s.label} vh={140 + items.length * 26} sceneRef={ref}>
        <motion.div style={{ opacity: head }} className="wrap pointer-events-none absolute inset-x-0 top-24 flex items-baseline gap-4">
          <span className="caption-n text-[clamp(22px,2.2vw,32px)] text-accent">{s.n}</span>
          <h2 className="chapter-word text-[clamp(20px,2.2vw,32px)] uppercase tracking-[0.3em]">{s.label}</h2>
        </motion.div>
        <motion.ul ref={trackRef} style={{ x }} className="absolute top-1/2 flex -translate-y-1/2 items-center gap-[5vw] will-change-transform md:gap-[3vw]">
          {items.map((m, i) => (
            <li key={m.src + i} className={`relative shrink-0 ${m.type === "video" ? "h-[58svh] aspect-[9/16]" : SHAPES[i % SHAPES.length]}`}>
              <button
                type="button"
                onClick={(e) => { lastTrigger.current = e.currentTarget; setOpen(i); }}
                className="group relative block h-full w-full cursor-zoom-in overflow-hidden"
                aria-label={`Ampliar: ${m.alt}`}
              >
                <Shot media={m.type === "video" ? m : { ...m, src: m.sm ?? m.src, sm: undefined }} className="h-full w-full transition-[filter] duration-700 group-hover:brightness-110" style={{ x: m.type === "video" ? 0 : innerX, scale: m.type === "video" ? 1 : 1.2 }} />
              </button>
              <span className="kicker mt-3 block text-[9px] text-fg/60">{String(i + 1).padStart(2, "0")} · {m.alt}</span>
            </li>
          ))}
        </motion.ul>
      </Scene>

      <AnimatePresence>
        {current && open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            className="fixed inset-0 z-[70] flex flex-col bg-deep/95 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            onClick={close}
          >
            <div className="wrap flex h-16 shrink-0 items-center justify-between">
              <span className="kicker text-fg/70">{String(open + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
              <button ref={closeRef} type="button" onClick={close} className="kicker flex min-h-11 items-center gap-3">
                Cerrar <Icon name="close" size={20} />
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait" initial={false}>
                {current.type === "video" ? (
                  <motion.video key={open} src={asset(current.src)} poster={current.poster ? asset(current.poster) : undefined} controls autoPlay playsInline className="max-h-full max-w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                ) : (
                  <motion.img key={open} src={asset(current.src)} alt={current.alt} className="max-h-full max-w-full object-contain" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: EASE }} />
                )}
              </AnimatePresence>
              <button type="button" onClick={() => go(-1)} className="absolute left-1 top-1/2 -translate-y-1/2 p-3 hover:text-accent sm:left-6" aria-label="Anterior"><Icon name="prev" size={30} /></button>
              <button type="button" onClick={() => go(1)} className="absolute right-1 top-1/2 -translate-y-1/2 p-3 hover:text-accent sm:right-6" aria-label="Siguiente"><Icon name="next" size={30} /></button>
            </div>
            <p className="wrap py-6 text-center text-sm text-fg/70">{current.alt}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Despedida — la cámara se aleja y aparecen las llamadas a la acción y los datos clave. */
function Finale({ s }: { s: Of<"finale"> }) {
  const { ref, p } = useScene();
  const scale = useRange(p, [0, 0.75], [1.5, 1.02]);
  const y = useRange(p, [0, 0.75], ["6%", "0%"]);
  const dim = useRange(p, [0.1, 0.6], [0, 0.5]);
  const tOpacity = useRange(p, [0.15, 0.35], [0, 1]);
  const tY = useRange(p, [0.15, 0.35], [40, 0]);
  const cOpacity = useRange(p, [0.35, 0.5], [0, 1]);
  const pointerEvents = useTransform(cOpacity, (o) => (o > 0.6 ? "auto" : "none"));
  return (
    <Scene id={s.id} label={s.label} vh={240} sceneRef={ref}>
      <Shot media={s.a} preload style={{ scale, y }} />
      <Veil strength={dim} />
      <div className="wrap absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.h2 style={{ opacity: tOpacity, y: tY }} className="caption-title max-w-[13ch] text-[clamp(40px,6.4vw,108px)] leading-[0.98]">{rich(s.title)}</motion.h2>
        <motion.div style={{ opacity: cOpacity, pointerEvents }} className="mt-10 flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-3">
            {s.ctas.map((c, i) => <CtaButton key={c.label} cta={c} variant={i === 0 ? "solid" : "line"} />)}
          </div>
          {s.note && <p className="max-w-md text-sm leading-relaxed text-fg/80">{s.note}</p>}
          {s.info && (
            <dl className="mt-2 grid gap-x-10 gap-y-3 text-sm sm:grid-cols-2">
              {s.info.map((it) => (
                <div key={it.label} className="flex flex-col items-center">
                  <dt className="kicker text-fg/55">{it.label}</dt>
                  <dd className="mt-1 text-fg/90">{it.href ? <a className="ulink" href={it.href} {...(it.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}>{it.value}</a> : it.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </motion.div>
      </div>
    </Scene>
  );
}

/** Pinta cada escena del guion según su tipo. */
export function SceneView({ s }: { s: SceneDef }) {
  switch (s.kind) {
    case "arrival": return <Arrival s={s} />;
    case "dive": return <Dive s={s} />;
    case "door": return <Door s={s} />;
    case "pullback": return <Pullback s={s} />;
    case "depth": return <Depth s={s} />;
    case "tilt": return <Tilt s={s} />;
    case "reel": return <Reel s={s} />;
    case "list": return <MenuScene s={s} />;
    case "strip": return <Strip s={s} />;
    case "finale": return <Finale s={s} />;
  }
}

export function Footer() {
  const f = site.footer;
  return (
    <footer className="bg-deep pb-24 pt-20 sm:pb-12">
      <div className="wrap">
        <p className="brand-title select-none text-center text-[clamp(40px,10vw,170px)] uppercase tracking-[0.16em] text-fg/90">{site.brand.name}</p>
        <div className="mt-16 grid gap-8 border-t border-line pt-10 text-sm text-fg/75 md:grid-cols-4">
          <div>
            <p className="kicker mb-3 text-fg/45">Dirección</p>
            <a href={f.address.href} target="_blank" rel="noopener" className="ulink">{f.address.label}</a>
          </div>
          <div>
            <p className="kicker mb-3 text-fg/45">Contacto</p>
            <ul className="flex flex-col gap-1.5">
              {f.contacts.map((c) => <li key={c.label}><a href={c.href} {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})} className="ulink">{c.label}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="kicker mb-3 text-fg/45">{f.hours ? "Horario" : "Canales"}</p>
            {f.hours ? (
              <>
                <ul className="flex flex-col gap-1.5">{f.hours.map((h) => <li key={h.day} className="flex justify-between gap-4"><span>{h.day}</span><span className="text-fg/60">{h.value}</span></li>)}</ul>
                {f.hoursNote && <p className="mt-2 text-xs text-fg/45">{f.hoursNote}</p>}
              </>
            ) : (
              <ul className="flex flex-wrap gap-x-5 gap-y-2">{f.socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener" className="ulink">{s.label}</a></li>)}</ul>
            )}
          </div>
          <div className="md:text-right">
            {f.hours && (
              <>
                <p className="kicker mb-3 text-fg/45">Canales</p>
                <ul className="mb-5 flex flex-wrap gap-x-5 gap-y-2 md:justify-end">{f.socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener" className="ulink">{s.label}</a></li>)}</ul>
              </>
            )}
            <p className="kicker mb-3 text-fg/45">Créditos</p>
            <p>{f.sources}</p>
            <p>Diseño y desarrollo: DURDUC</p>
          </div>
        </div>
        <p className="mt-10 text-xs text-fg/40">{f.line}</p>
      </div>
    </footer>
  );
}
