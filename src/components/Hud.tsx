"use client";

// Indicador fijo del recorrido: capítulo actual y progreso total.
import { motion, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { chapters } from "@/lib/chapters";

export default function Hud() {
  const { scrollYProgress } = useScroll();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(chapters.findIndex((c) => c.id === e.target.id));
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    chapters.forEach((c) => { const el = document.getElementById(c.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const c = chapters[Math.max(0, current)];
  return (
    <div className="pointer-events-none fixed bottom-7 right-[var(--gutter)] z-30 hidden items-center gap-4 sm:flex" aria-hidden="true">
      <span className="kicker tabular-nums text-fg/80">{c.n} · {c.label}</span>
      <span className="relative block h-px w-32 bg-fg/25">
        <motion.span className="absolute inset-0 origin-left bg-fg" style={{ scaleX: scrollYProgress }} />
      </span>
    </div>
  );
}
