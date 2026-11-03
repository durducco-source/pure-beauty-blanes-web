import type { Metadata, Viewport } from "next";
import { Newsreader, Figtree } from "next/font/google";
import { site } from "@/content/site";
import { asset } from "@/lib/utils";
import "./globals.css";

// Titulares en la tipografía de la marca (pesos finos); textos y etiquetas en sans.
const display = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], weight: ["300", "400", "500"], variable: "--font-display-face" });
const sans = Figtree({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-sans-face" });

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: site.seo.title,
  description: site.seo.description,
  keywords: site.seo.keywords,
  alternates: { canonical: "./" },
  icons: { icon: asset("/icon.svg"), apple: asset("/apple-touch-icon.png") },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: site.brand.name,
    title: site.seo.title,
    description: site.seo.description,
    url: site.seo.url,
    images: [{ url: site.seo.image, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#090c0b", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.lang} className={`${display.variable} ${sans.variable}`}>
      <body>
        <a href="#contenido" className="fixed left-4 top-[-60px] z-[100] bg-accent px-4 py-2 text-deep focus:top-4">Saltar al contenido</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(site.jsonLd) }} />
      </body>
    </html>
  );
}
