import type { Media, SiteContent } from "./types";

// Contenido verificado en Instagram @centro.purebeauty (descripción, servicios, marcas y fotos)
// y en fichas públicas del negocio (teléfono fijo, horario, email y valoración en Google).
// Las publicaciones de Instagram son de 2020: no se muestran precios ni promociones; las fotos son recortes sin texto.
const MOBILE = "+34630472046";
const IG = "https://www.instagram.com/centro.purebeauty/";
const URL = "https://durducco-source.github.io/pure-beauty-blanes-web/";
const MAPS = "https://www.google.com/maps/dir/?api=1&destination=Carrer+del+Forn+de+la+Cal%C3%A7+12,+17300+Blanes";

const im = (name: string, alt: string): Media => ({ src: `/media/${name}.jpg`, alt });
const cita = { label: "Pedir cita", href: `tel:${MOBILE}` };

export const site: SiteContent = {
  lang: "es",
  brand: { name: "Pure Beauty", top: "Blanes", sub: "Centro de estética avanzado" },
  seo: {
    title: "Pure Beauty · Centro de estética avanzado en Blanes | Tratamientos faciales, corporales y láser",
    description:
      "Pure Beauty, centro de estética avanzado en Blanes (C/ Forn de la Calç, 12). Tratamientos faciales, corporales y dietéticos, tecnología láser y HIFU, cosmética Janssen Cosmetics. Pide cita: 630 47 20 46.",
    url: URL,
    image: `${URL}media/og-purebeauty.jpg`,
    keywords: ["centro de estética Blanes", "tratamientos faciales Blanes", "láser Blanes", "HIFU Blanes", "Janssen Cosmetics Blanes", "Pure Beauty"],
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "Pure Beauty · Centro de estética avanzado",
    url: URL,
    telephone: MOBILE,
    email: "centro.purebeauty@gmail.com",
    address: { "@type": "PostalAddress", streetAddress: "Carrer del Forn de la Calç, 12", addressLocality: "Blanes", postalCode: "17300", addressRegion: "Girona", addressCountry: "ES" },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "14:00" },
    ],
    sameAs: [IG],
  },
  primary: { label: "Pedir cita", href: `tel:${MOBILE}`, icon: "phone" },
  phone: MOBILE,

  scenes: [
    {
      kind: "arrival", id: "inicio", n: "00", label: "Inicio",
      a: im("facial-sonrisa", "Mujer sonriendo con la piel cuidada"),
      kicker: "Centro de estética avanzado · Blanes", title: "Pure Beauty", sub: "Estudios 100% personalizados",
    },
    {
      kind: "pullback", id: "facial", n: "01", label: "Facial",
      a: im("facial-calma", "Mujer con los ojos cerrados disfrutando de un cuidado facial"), origin: "55% 40%",
      b: im("facial-cuidado", "Cuidado facial"),
      title: "Ama y cuida tu piel", sub: "Tratamientos faciales personalizados para cada tipo de piel, también la sensible.", cta: cita,
    },
    {
      kind: "depth", id: "laser", n: "02", label: "Láser",
      back: im("laser-tratamiento", "Tratamiento láser facial con gafas de protección"),
      cards: [im("laser-hifu", "Tratamiento con láser HIFU")],
      title: "Tecnología láser y HIFU", sub: "Equipos de tecnología láser y un equipo con años de experiencia en su manejo.",
    },
    {
      kind: "list", id: "servicios", n: "03", label: "Servicios",
      back: im("cosmetica-janssen", "Productos Janssen Cosmetics para piel sensible"),
      title: "Todo lo que *te ofrecemos*",
      groups: [
        { name: "Facial y láser", items: [{ name: "Tratamientos faciales", detail: "Personalizados según tu tipo de piel" }, { name: "Tratamientos láser", detail: "Para los problemas de la piel" }, { name: "Láser HIFU", detail: "Ultrasonidos focalizados" }] },
        { name: "Corporal y bienestar", items: [{ name: "Tratamientos corporales", detail: "Estudio 100% personalizado" }, { name: "Tratamientos dietéticos", detail: "Asesoramiento y seguimiento" }, { name: "Nutricosmética", detail: "Belleza desde el interior" }] },
        { name: "Productos", items: [{ name: "Janssen Cosmetics", detail: "Cosmética profesional para la piel" }, { name: "Perfumes Essens", detail: "Catálogo disponible en el centro" }] },
      ],
      note: "Cada tratamiento empieza con un estudio personalizado. Precios y disponibilidad por teléfono.",
      cta: cita,
    },
    {
      kind: "finale", id: "cita", n: "04", label: "Cita",
      a: im("facial-cuidado", "Cuidado facial en Pure Beauty"),
      title: "Tu piel *te lo agradecerá*",
      ctas: [{ label: "Llamar y pedir cita", href: `tel:${MOBILE}` }, { label: "Cómo llegar", href: MAPS, external: true }, { label: "Escribir un email", href: "mailto:centro.purebeauty@gmail.com" }],
      info: [
        { label: "Dirección", value: "C/ Forn de la Calç, 12 · Blanes", href: MAPS },
        { label: "Horario", value: "L–V 10–20 h · S 10–14 h" },
      ],
    },
  ],

  footer: {
    address: { label: "C/ Forn de la Calç, 12 · 17300 Blanes", href: MAPS },
    contacts: [{ label: "630 47 20 46", href: `tel:${MOBILE}` }, { label: "972 33 03 84", href: "tel:+34972330384" }, { label: "centro.purebeauty@gmail.com", href: "mailto:centro.purebeauty@gmail.com" }],
    hours: [{ day: "Lunes a viernes", value: "10–20 h" }, { day: "Sábado", value: "10–14 h" }, { day: "Domingo", value: "Cerrado" }],
    hoursNote: "Horario según fichas públicas: confírmalo al pedir cita.",
    socials: [{ label: "Instagram", href: IG }],
    sources: "Fotos: Instagram @centro.purebeauty (2020)",
    line: "© 2026 Pure Beauty · Centro de estética avanzado · Blanes",
  },
};
