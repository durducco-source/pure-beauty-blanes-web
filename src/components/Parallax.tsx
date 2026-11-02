"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/hooks";

/** Desplaza su contenido más despacio que el scroll (efecto de profundidad). */
export default function Parallax({ children, strength = 0.1, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const parent = el.parentElement ?? el;
    const update = () => {
      const r = parent.getBoundingClientRect();
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
      const offset = (r.top + r.height / 2 - window.innerHeight / 2) * strength;
      el.style.translate = `0 ${offset.toFixed(1)}px`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [strength, reduced]);

  return <div ref={ref} className={className}>{children}</div>;
}
