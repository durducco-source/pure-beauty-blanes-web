import { Fragment } from "react";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Ruta a un archivo de /public teniendo en cuenta el basePath de GitHub Pages. */
export const asset = (path: string) => `${base}${path}`;

/** Convierte "texto *destacado*" en texto con <em>. */
export function rich(text: string) {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : <Fragment key={i}>{part.replace(/\*/g, "")}</Fragment>,
  );
}

export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Completa un rango de useTransform para que cubra todo el scroll (0 → 1).
 * Motion acelera estas animaciones con ScrollTimeline nativo; si el rango no empieza en 0
 * o no termina en 1, el navegador rellena los extremos con el valor base y el efecto "vuelve".
 */
export function fullRange<T>(input: number[], output: T[]): [number[], T[]] {
  const i = [...input];
  const o = [...output];
  if (i[0] > 0) { i.unshift(0); o.unshift(o[0]); }
  if (i[i.length - 1] < 1) { i.push(1); o.push(o[o.length - 1]); }
  return [i, o];
}
