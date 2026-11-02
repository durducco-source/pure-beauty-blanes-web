// Modelo de contenido de la web. Todos los textos e imágenes viven en src/content/site.ts,
// así que para editar la web normalmente basta con tocar ese archivo.
// En los títulos, el texto entre *asteriscos* se muestra en cursiva destacada.

export type Media = {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
};

export type Link = { label: string; href: string; external?: boolean };

export type Act = {
  label: string;
  title: string;
  text: string;
  media: Media;
};

export type Chapter = {
  label: string;
  title: string;
  text: string;
  bullets?: string[];
  media: Media;
  link?: Link;
};

export type MenuGroup = {
  name: string;
  items: { name: string; detail?: string; price?: string }[];
};

export type Quote = { text: string; author: string; meta?: string };

export type SiteContent = {
  lang: string;
  brand: { name: string; top?: string; sub?: string };
  seo: {
    title: string;
    description: string;
    url: string;
    image: string;
    keywords: string[];
    jsonLd: Record<string, unknown>;
  };
  nav: Link[];
  cta: Link;
  hero: { acts: Act[]; scrollHint: string };
  intro: {
    id: string;
    eyebrow: string;
    title: string;
    paragraphs: string[];
    stats?: { value: string; label: string }[];
  };
  chapters: { id: string; eyebrow: string; title: string; items: Chapter[] };
  menu?: { id: string; eyebrow: string; title: string; intro?: string; groups: MenuGroup[]; note?: string };
  gallery: { id: string; eyebrow: string; title: string; items: Media[] };
  reels?: { id?: string; eyebrow: string; title: string; items: Media[] };
  reviews?: { eyebrow: string; title: string; score?: string; scoreLabel?: string; source: string; quotes: Quote[] };
  faq?: { eyebrow: string; title: string; items: { q: string; a: string }[] };
  contact: {
    id: string;
    eyebrow: string;
    title: string;
    address: string[];
    directionsUrl: string;
    mapEmbed: string;
    phone?: { label: string; href: string };
    whatsapp?: { label: string; href: string };
    email?: { label: string; href: string };
    hours?: { day: string; value: string }[];
    hoursNote?: string;
    socials: { label: string; href: string; icon: "instagram" | "facebook" | "tiktok" | "youtube" | "web" }[];
  };
  finale: { title: string; text: string; cta: Link; media: Media };
  floating: Link & { icon: "whatsapp" | "calendar" | "phone" };
  footer: { line: string; credit: string };
};
