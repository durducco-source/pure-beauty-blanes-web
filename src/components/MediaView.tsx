"use client";

import { useEffect, useRef } from "react";
import type { Media } from "@/content/types";
import { asset } from "@/lib/utils";

type Props = {
  media: Media;
  className?: string;
  /** Reproduce el vídeo sólo cuando es true (si es undefined, se reproduce al verse). */
  playing?: boolean;
  eager?: boolean;
};

/** Imagen o vídeo (silenciado, en bucle) con carga diferida y pausa fuera de pantalla. */
export default function MediaView({ media, className = "", playing, eager = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Los navegadores sólo permiten la reproducción automática de vídeos silenciados
    v.muted = true;
    let shouldPlay = false;
    const tryPlay = () => { if (shouldPlay && v.paused) v.play().catch(() => {}); };
    const set = (on: boolean) => {
      shouldPlay = on;
      if (on) tryPlay();
      else v.pause();
    };
    v.addEventListener("canplay", tryPlay);

    let obs: IntersectionObserver | undefined;
    if (playing !== undefined) set(playing);
    else {
      obs = new IntersectionObserver(([e]) => set(e.isIntersecting), { threshold: 0.2 });
      obs.observe(v);
    }
    return () => {
      v.removeEventListener("canplay", tryPlay);
      obs?.disconnect();
    };
  }, [playing]);

  if (media.type === "video") {
    return (
      <video
        ref={ref}
        className={className}
        src={asset(media.src)}
        poster={media.poster ? asset(media.poster) : undefined}
        muted
        autoPlay={playing !== false}
        loop
        playsInline
        preload={eager ? "auto" : "metadata"}
        aria-label={media.alt}
      />
    );
  }
  return (
    <img
      className={className}
      src={asset(media.src)}
      alt={media.alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
