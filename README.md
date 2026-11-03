# Pure Beauty · Centro de estética avanzado en Blanes

Web de **Pure Beauty**, centro de estética avanzado en Blanes (C/ Forn de la Calç, 12): tratamientos faciales, corporales y dietéticos, láser y HIFU.

Toda la web es **un único recorrido cinematográfico ligado al scroll** (inspirado en el Reel de referencia):
las fotografías y los vídeos son los protagonistas y el texto se reduce a una palabra por capítulo, una frase y los datos útiles.
Dirección creativa, diseño y desarrollo: **DURDUC**.

- Web publicada: https://durducco-source.github.io/pure-beauty-blanes-web/
- Código: https://github.com/durducco-source/pure-beauty-blanes-web
- Versión anterior conservada en la etiqueta git `v1-antes-recorrido`.

## El recorrido

| Escena | Movimiento de cámara |
|---|---|
| Inicio | Avance sobre el retrato; «PURE BEAUTY» se abre y se desenfoca |
| 01 Facial | Retroceso desde el rostro; deriva lateral a la segunda imagen |
| 02 Láser | Capas de profundidad sobre el tratamiento láser |
| 03 Servicios | Servicios por grupos sobre la cosmética Janssen |
| 04 Cita | La cámara se aleja; llamar, cómo llegar, email y horario |

## Tecnologías

Next.js 16 (App Router, exportación estática) · React 19 · TypeScript · Tailwind CSS 4 · Motion (Framer Motion).

## Ejecutar en local

Requisitos: Node.js 20 o superior.

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # web estática en out/
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run deploy     # compila y publica en GitHub Pages (rama gh-pages)
```

## Cómo editar

Todo el guion está en `src/content/site.ts`: cada escena tiene un `kind` (movimiento de cámara), sus imágenes/vídeos y textos.
Tipos disponibles: `arrival` (llegada), `dive` (picado), `door` (puerta corredera + travelling), `pullback` (retroceso),
`depth` (capas de profundidad), `tilt` (panorámica vertical), `reel` (vídeos verticales), `list` (carta), `strip` (tira con visor) y `finale`.
Colores en `src/app/globals.css` y tipografías en `src/app/layout.tsx`.

```
src/
├── app/              → layout (SEO, fuentes, JSON-LD), página y tema
├── components/
│   ├── cinema.tsx    → primitivas: Scene, Shot (imagen/vídeo con cámara), ChapterWord, Caption, useRange
│   ├── scenes.tsx    → los 10 tipos de escena y el pie
│   ├── Header.tsx    → barra fina, menú a pantalla completa y barra de acción móvil
│   └── Hud.tsx       → capítulo actual y progreso
├── content/          → site.ts (guion y contenido) y types.ts (modelo)
└── lib/              → utilidades (fullRange para animaciones de scroll) y capítulos
```

## Fuentes del contenido

- Instagram @centro.purebeauty: descripción, servicios, marcas y fotos. **Aviso:** la cuenta no publica desde 2020; las imágenes son recortes de sus publicaciones (sin textos promocionales ni precios antiguos). Se recomienda sustituirlas por fotos y vídeos reales del centro.
- Fichas públicas: teléfono fijo, horario (L–V 10–20 h, S 10–14 h), email y valoración (4,9 · 13 reseñas). Conviene confirmar el horario.
