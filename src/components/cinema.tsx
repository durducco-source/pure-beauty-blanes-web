"use client";

// Primitivas del recorrido: escena fija ligada al scroll, imagen/vídeo con "cámara",
// palabra de capítulo y pie de foto. Todas las animaciones dependen del progreso de la escena (0 → 1).
import { motion, useScroll, useTransform, type MotionStyle, type MotionValue } from "motion/react";
import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import type { Cta, Media } from "@/content/types";
import { asset, fullRange } from "@/lib/utils";
import Icon from "./Icon";

export type P = MotionValue<number>;

/** Progreso de scroll de una escena: 0 cuando entra arriba, 1 cuando termina. */
export function useScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return { ref, p: scrollYProgress };
}

/** useTransform con el rango completado de 0 a 1 (necesario con ScrollTimeline acelerado). */
export function useRange<T>(p: P, input: number[], output: T[]): MotionValue<T> {
  const [i, o] = fullRange(input, output);
  return useTransform(p, i, o) as MotionValue<T>;
}

/** Escena: sección alta con un "plató" fijo a pantalla completa. */
export function Scene({ id, label, vh, sceneRef, children }: { id: string; label: string; vh: number; sceneRef: RefObject<HTMLElement | null>; children: ReactNode }) {
  return (
    <section id={id} ref={sceneRef} data-chapter={id} aria-label={label} className="relative bg-deep" style={{ height: `${vh}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">{children}</div>
    </section>
  );
}

/**
 * Imagen o vídeo movido por la "cámara". Los vídeos (silenciados, en bucle) sólo se reproducen
 * mientras están en pantalla. `preload` da algo más de prioridad a la primera imagen de cada escena.
 */
export function Shot({
  media,
  style,
  className = "absolute inset-0 h-full w-full",
  eager = false,
  preload = false,
  sizes = "100vw",
}: {
  media: Media;
  style?: MotionStyle;
  className?: string;
  eager?: boolean;
  preload?: boolean;
  sizes?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const isVideo = media.type === "video";

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.05 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const cls = `grade object-cover will-change-transform ${className}`;
  if (isVideo) {
    return (
      <motion.video
        ref={ref}
        src={asset(media.src)}
        poster={media.poster ? asset(media.poster) : undefined}
        muted
        loop
        playsInline
        autoPlay
        preload={eager || preload ? "auto" : "metadata"}
        aria-label={media.alt}
        style={style}
        className={cls}
      />
    );
  }
  return (
    <motion.img
      src={asset(media.src)}
      srcSet={media.sm ? `${asset(media.sm)} 900w, ${asset(media.src)} 1920w` : undefined}
      sizes={media.sm ? sizes : undefined}
      alt={media.alt}
      // Siempre "eager": las imágenes que se mueven con transform (travelling, tiras) no disparan bien la carga diferida.
      // La prioridad baja evita que compitan con la portada.
      loading="eager"
      fetchPriority={eager ? "high" : preload ? "auto" : "low"}
      decoding="async"
      style={style}
      className={cls}
    />
  );
}

/** Velo cinematográfico: viñeta y degradados para leer el texto sin tapar la imagen. */
export function Veil({ strength }: { strength?: MotionValue<number> }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-deep/20" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,transparent_45%,rgba(0,0,0,.55)_100%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-deep/90 via-deep/30 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-deep/60 to-transparent" aria-hidden="true" />
      {strength && <motion.div style={{ opacity: strength }} className="pointer-events-none absolute inset-0 bg-deep" aria-hidden="true" />}
    </>
  );
}

/** Palabra de capítulo enorme y espaciada que se abre y se desenfoca al pasar. */
export function ChapterWord({ p, n, word, range }: { p: P; n: string; word: string; range: [number, number, number, number] }) {
  const opacity = useRange(p, range, [0, 1, 1, 0]);
  const spacing = useRange(p, range, ["0.6em", "0.22em", "0.28em", "0.7em"]);
  const blur = useRange(p, range, ["blur(12px)", "blur(0px)", "blur(0px)", "blur(10px)"]);
  return (
    <motion.div style={{ opacity }} className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center" aria-hidden="true">
      <span className="kicker mb-5 text-fg/80">{n}</span>
      <motion.span style={{ letterSpacing: spacing, paddingLeft: spacing, filter: blur }} className="chapter-word whitespace-nowrap text-[clamp(38px,10vw,176px)] uppercase leading-none">
        {word}
      </motion.span>
    </motion.div>
  );
}

export function CtaButton({ cta, variant = "solid", small = false }: { cta: Cta; variant?: "solid" | "line"; small?: boolean }) {
  return (
    <a
      href={cta.href}
      {...(cta.external ? { target: "_blank", rel: "noopener" } : {})}
      className={`btn ${variant === "solid" ? "btn-solid" : "btn-line"} ${small ? "btn-sm" : ""}`}
    >
      {cta.label} <Icon name={cta.external ? "arrowUpRight" : "arrow"} size={14} />
    </a>
  );
}

/** Pie de foto: número, frase corta y, opcionalmente, una línea y un botón píldora. */
export function Caption({
  p,
  range,
  n,
  title,
  sub,
  cta,
  align = "left",
  position = "bottom",
}: {
  p: P;
  range: [number, number, number, number];
  n?: string;
  title: string;
  sub?: string;
  cta?: Cta;
  align?: "left" | "right";
  position?: "bottom" | "top";
}) {
  const opacity = useRange(p, range, [0, 1, 1, 0]);
  const y = useRange(p, range, [36, 0, 0, -36]);
  const pointerEvents = useTransform(opacity, (o) => (o > 0.6 ? "auto" : "none"));
  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className={`wrap absolute inset-x-0 flex flex-col ${position === "top" ? "top-0 pt-24" : "bottom-0 pb-[clamp(96px,15vh,150px)]"} ${align === "right" ? "items-end text-right" : "items-start"}`}
    >
      {n && <span className="caption-n text-[clamp(24px,2.6vw,40px)] text-accent">{n}</span>}
      <h3 className="caption-title mt-2 max-w-[17ch] text-[clamp(30px,3.8vw,60px)] leading-[1.04]">{title}</h3>
      {sub && <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-fg/80">{sub}</p>}
      {cta && <div className="mt-6"><CtaButton cta={cta} small /></div>}
    </motion.div>
  );
}
