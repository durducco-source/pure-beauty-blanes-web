import { site } from "@/content/site";
import type { Media, SceneDef } from "@/content/types";

/** Primera imagen representativa de una escena (para el menú). */
function firstMedia(s: SceneDef): Media {
  switch (s.kind) {
    case "arrival": case "dive": case "pullback": case "tilt": case "finale": return s.a;
    case "door": return s.door;
    case "depth": case "list": return s.back;
    case "reel": return s.videos[0];
    case "strip": return s.items[0];
  }
}

const thumbOf = (m: Media) => (m.type === "video" ? m.poster ?? m.src : m.sm ?? m.src);

/** Capítulos del recorrido: menú, indicador de progreso y anclas. */
export const chapters = site.scenes.map((s) => ({ id: s.id, n: s.n, label: s.label, thumb: thumbOf(firstMedia(s)) }));
