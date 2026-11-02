import type { SiteContent } from "./types";

// Contenido verificado en Instagram @centro.purebeauty (descripción, servicios, marcas y fotos)
// y en fichas públicas del negocio (teléfono fijo, horario, email y valoración en Google).
// Nota: las publicaciones de Instagram son de 2020, por eso no se muestran precios ni promociones.
const MOBILE = "+34630472046";
const IG = "https://www.instagram.com/centro.purebeauty/";
const MAPS = "https://www.google.com/maps/dir/?api=1&destination=Carrer+del+Forn+de+la+Cal%C3%A7+12,+17300+Blanes";
const URL = "https://durducco-source.github.io/pure-beauty-blanes-web/";

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
  },
  nav: [
    { label: "El centro", href: "#centro" },
    { label: "Tratamientos", href: "#tratamientos" },
    { label: "Servicios", href: "#servicios" },
    { label: "Galería", href: "#galeria" },
    { label: "Contacto", href: "#contacto" },
  ],
  cta: { label: "Pedir cita", href: `tel:${MOBILE}` },
  hero: {
    scrollHint: "Desliza",
    acts: [
      { label: "Primer acto", title: "Ama y cuida *tu piel.*", text: "Centro de estética avanzado en Blanes: tratamientos faciales, corporales y dietéticos.", media: { type: "image", src: "/media/facial-sonrisa.jpg", alt: "Mujer sonriendo con la piel cuidada" } },
      { label: "Segundo acto", title: "La *tecnología.*", text: "Equipos con la más moderna tecnología láser para el tratamiento de la piel.", media: { type: "image", src: "/media/laser-tratamiento.jpg", alt: "Tratamiento láser facial con gafas de protección" } },
      { label: "Tercer acto", title: "La *experiencia.*", text: "Un equipo con años de experiencia en el manejo de los equipos, para mejores resultados.", media: { type: "image", src: "/media/facial-cuidado.jpg", alt: "Cuidado facial" } },
      { label: "Cuarto acto", title: "Tu *ritual.*", text: "Cosmética profesional Janssen Cosmetics para continuar el cuidado en casa.", media: { type: "image", src: "/media/cosmetica-janssen.jpg", alt: "Productos Janssen Cosmetics para piel sensible" } },
    ],
  },
  intro: {
    id: "centro",
    eyebrow: "El centro",
    title: "Estudios *100% personalizados.*",
    paragraphs: [
      "Pure Beauty es un centro especializado en todo tipo de tratamientos corporales, faciales y dietéticos, con estudios 100% personalizados para cada persona.",
      "Brindamos a tu piel y a tu cuerpo el cuidado necesario, con tecnología láser, cosmética profesional y asesoramiento en nutricosmética. Te esperamos en el centro de Blanes.",
    ],
    stats: [
      { value: "4,9", label: "Google · 13 reseñas" },
      { value: "100%", label: "Personalizado" },
      { value: "Láser", label: "Tecnología avanzada" },
      { value: "Blanes", label: "C/ Forn de la Calç" },
    ],
  },
  chapters: {
    id: "tratamientos",
    eyebrow: "Tratamientos",
    title: "Rostro, cuerpo *y bienestar.*",
    items: [
      {
        label: "Facial",
        title: "Cuidado *facial.*",
        text: "Tratamientos faciales personalizados para cada tipo de piel, también para pieles sensibles: limpieza, hidratación y cuidado del rostro.",
        bullets: ["Estudio personalizado de la piel", "Tratamientos para piel sensible", "Cosmética Janssen Cosmetics"],
        media: { type: "image", src: "/media/facial-calma.jpg", alt: "Mujer con los ojos cerrados disfrutando de un cuidado facial" },
        link: { label: "Pedir cita", href: `tel:${MOBILE}` },
      },
      {
        label: "Láser y HIFU",
        title: "Tecnología *láser.*",
        text: "Amplia gama de equipos con tecnología láser para el tratamiento de los problemas de la piel, y láser HIFU (ultrasonidos) para el rostro.",
        bullets: ["Tratamientos con tecnología láser", "HIFU · ultrasonidos focalizados", "Equipo con años de experiencia"],
        media: { type: "image", src: "/media/laser-hifu.jpg", alt: "Tratamiento con láser HIFU" },
        link: { label: "Consultar tratamiento", href: `tel:${MOBILE}` },
      },
      {
        label: "Corporal y dietético",
        title: "Cuidarse *desde dentro.*",
        text: "Tratamientos corporales y dietéticos, y asesoramiento en nutricosmética: un complemento de la rutina de belleza para mejorar piel y pelo desde el interior.",
        bullets: ["Tratamientos corporales", "Asesoramiento dietético", "Nutricosmética"],
        media: { type: "image", src: "/media/facial-sonrisa.jpg", alt: "Mujer sonriendo" },
      },
    ],
  },
  menu: {
    id: "servicios",
    eyebrow: "Servicios",
    title: "Todo lo que *te ofrecemos.*",
    intro: "Cada tratamiento empieza con un estudio personalizado. Para precios y disponibilidad, llámanos o pásate por el centro.",
    groups: [
      { name: "Facial", items: [
        { name: "Tratamientos faciales", detail: "Personalizados según tu tipo de piel" },
        { name: "Cuidado de piel sensible", detail: "Limpieza suave y tónico calmante" },
      ] },
      { name: "Láser", items: [
        { name: "Tratamientos láser", detail: "Para los problemas de la piel" },
        { name: "Láser HIFU", detail: "Ultrasonidos focalizados" },
      ] },
      { name: "Corporal", items: [
        { name: "Tratamientos corporales", detail: "Estudio 100% personalizado" },
        { name: "Tratamientos dietéticos", detail: "Asesoramiento y seguimiento" },
        { name: "Nutricosmética", detail: "Belleza desde el interior" },
      ] },
      { name: "Productos", items: [
        { name: "Janssen Cosmetics", detail: "Cosmética profesional para el cuidado de la piel" },
        { name: "Perfumes Essens", detail: "20% de esencia aromática, sin parabenos · catálogo en el centro" },
      ] },
    ],
    note: "Pide cita en el 630 47 20 46 o en el 972 33 03 84.",
  },
  gallery: {
    id: "galeria",
    eyebrow: "Galería",
    title: "Belleza *y salud.*",
    items: [
      { type: "image", src: "/media/facial-cuidado.jpg", alt: "Cuidado facial" },
      { type: "image", src: "/media/laser-tratamiento.jpg", alt: "Tratamiento láser" },
      { type: "image", src: "/media/facial-calma.jpg", alt: "Piel cuidada" },
      { type: "image", src: "/media/cosmetica-janssen.jpg", alt: "Cosmética Janssen Cosmetics" },
      { type: "image", src: "/media/laser-hifu.jpg", alt: "Láser HIFU" },
      { type: "image", src: "/media/facial-sonrisa.jpg", alt: "Sonrisa y piel luminosa" },
    ],
  },
  faq: {
    eyebrow: "Preguntas",
    title: "Antes de *tu cita.*",
    items: [
      { q: "¿Cómo pido cita?", a: "Llámanos al 630 47 20 46 o al 972 33 03 84, o pásate por el centro en la C/ Forn de la Calç, 12, en Blanes." },
      { q: "¿Los tratamientos son personalizados?", a: "Sí. Hacemos estudios 100% personalizados para elegir el tratamiento facial, corporal o dietético que mejor se adapta a ti." },
      { q: "¿Qué es la nutricosmética?", a: "Es un complemento de la rutina de belleza que ayuda a mejorar la piel y el pelo desde el interior. Infórmate en el centro." },
      { q: "¿Puedo comprar productos en el centro?", a: "Sí: trabajamos con Janssen Cosmetics y tenemos el catálogo de perfumes Essens a tu disposición." },
    ],
  },
  contact: {
    id: "contacto",
    eyebrow: "Contacto",
    title: "Te esperamos *en Blanes.*",
    address: ["C/ Forn de la Calç, 12", "17300 Blanes (Girona)"],
    directionsUrl: MAPS,
    mapEmbed: "https://www.google.com/maps?q=Carrer+del+Forn+de+la+Cal%C3%A7+12,+17300+Blanes&z=17&output=embed",
    phone: { label: "630 47 20 46", href: `tel:${MOBILE}` },
    email: { label: "centro.purebeauty@gmail.com", href: "mailto:centro.purebeauty@gmail.com" },
    hours: [
      { day: "Lunes a viernes", value: "10:00–20:00" },
      { day: "Sábado", value: "10:00–14:00" },
      { day: "Domingo", value: "Cerrado" },
    ],
    hoursNote: "Horario según fichas públicas del centro. Te recomendamos confirmar tu cita por teléfono (también 972 33 03 84).",
    socials: [{ label: "Instagram de Pure Beauty", href: IG, icon: "instagram" }],
  },
  finale: {
    title: "Tu piel *te lo agradecerá.*",
    text: "Reserva tu estudio personalizado en Pure Beauty.",
    cta: { label: "Llamar y pedir cita", href: `tel:${MOBILE}` },
    media: { type: "image", src: "/media/facial-calma.jpg", alt: "" },
  },
  floating: { label: "Pedir cita", href: `tel:${MOBILE}`, icon: "phone" },
  footer: { line: "© 2026 Pure Beauty · Centro de estética avanzado · Blanes", credit: "Diseño web por DURDUC" },
};
