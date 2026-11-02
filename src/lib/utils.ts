import { createElement, Fragment, type ReactNode } from "react";

/** Prefija las rutas de /public con el basePath (necesario en GitHub Pages). */
export function asset(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/** Convierte "Texto *destacado*" en nodos con <em>. */
export function rich(text: string): ReactNode {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return createElement(
    Fragment,
    null,
    ...parts.map((p, i) =>
      p.startsWith("*") && p.endsWith("*")
        ? createElement("em", { key: i }, p.slice(1, -1))
        : createElement(Fragment, { key: i }, p),
    ),
  );
}

export const pad = (n: number) => String(n).padStart(2, "0");
