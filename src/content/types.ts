// Modelo de contenido del recorrido cinematográfico.
// La web es una sucesión de escenas ligadas al scroll; cada "kind" es un movimiento de cámara distinto.
// En los títulos, el texto entre *asteriscos* se muestra destacado.

export type Media = {
  type?: "image" | "video";
  src: string;
  /** Versión ligera (móvil) de una foto, si existe. */
  sm?: string;
  /** Fotograma de portada de un vídeo. */
  poster?: string;
  alt: string;
};

export type Cta = { label: string; href: string; external?: boolean };

type Base = { id: string; n: string; label: string };

export type MenuGroup = { name: string; items: { name: string; detail?: string; price?: string }[] };

export type SceneDef =
  /** Llegada: avance sobre el primer plano, el nombre se abre y se desenfoca; fundido al segundo plano. */
  | (Base & { kind: "arrival"; a: Media; b?: Media; kicker: string; title: string; sub?: string; enter?: string })
  /** Picado: zoom + giro sobre A, barrido lateral sobre B y retroceso sobre C. */
  | (Base & { kind: "dive"; a: Media; b: Media; c?: Media; title: string; sub?: string; cta?: Cta })
  /** Puerta corredera que abre el primer plano y travelling horizontal por una tira de imágenes/vídeos. */
  | (Base & { kind: "door"; door: Media; track: Media[]; title: string; sub?: string; cta?: Cta })
  /** Retroceso: la cámara empieza muy cerca y se aleja; deriva lateral al segundo plano. */
  | (Base & { kind: "pullback"; a: Media; b?: Media; origin?: string; title: string; sub?: string; cta?: Cta })
  /** Profundidad: fondo lento y piezas que suben por delante a distinta velocidad. */
  | (Base & { kind: "depth"; back: Media; cards: Media[]; title: string; sub?: string; cta?: Cta })
  /** Panorámica vertical (la cámara sube) y avance al segundo plano. */
  | (Base & { kind: "tilt"; a: Media; b?: Media; title: string; title2?: string; cta?: Cta })
  /** Pantalla vertical: los vídeos (formato 9:16) se suceden dentro de un marco que crece. */
  | (Base & { kind: "reel"; videos: Media[]; title: string; sub?: string; cta?: Cta })
  /** Carta: grupos que se suceden sobre un fondo en zoom lento. */
  | (Base & { kind: "list"; back: Media; title: string; groups: MenuGroup[]; note?: string; cta?: Cta })
  /** Fragmentos: tira de película horizontal con visor. */
  | (Base & { kind: "strip"; items: Media[] })
  /** Despedida: la cámara se aleja y aparecen las llamadas a la acción y los datos clave. */
  | (Base & { kind: "finale"; a: Media; title: string; note?: string; ctas: Cta[]; info?: { label: string; value: string; href?: string }[] });

export type SiteContent = {
  lang: string;
  brand: { name: string; top?: string; sub?: string };
  seo: { title: string; description: string; url: string; image: string; keywords: string[] };
  jsonLd: Record<string, unknown>;
  /** Botón principal de la cabecera y de la barra móvil. */
  primary: Cta & { icon?: "whatsapp" | "calendar" | "phone" | "arrow" };
  phone?: string;
  scenes: SceneDef[];
  footer: {
    address: { label: string; href: string };
    contacts: { label: string; href: string }[];
    hours?: { day: string; value: string }[];
    hoursNote?: string;
    socials: { label: string; href: string }[];
    sources: string;
    line: string;
  };
};
