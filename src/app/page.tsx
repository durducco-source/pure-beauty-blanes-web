import { site } from "@/content/site";
import CinemaHero from "@/components/CinemaHero";
import Gallery from "@/components/Gallery";
import Menu from "@/components/Menu";
import Nav from "@/components/Nav";
import Reels from "@/components/Reels";
import { Chapters, Contact, Faq, Finale, FloatingCta, Footer, Intro, Reviews } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Nav site={site} />
      <main id="contenido">
        <CinemaHero acts={site.hero.acts} scrollHint={site.hero.scrollHint} />
        <Intro site={site} />
        <Chapters site={site} />
        <Menu site={site} />
        <Gallery site={site} />
        <Reels site={site} />
        <Reviews site={site} />
        <Faq site={site} />
        <Contact site={site} />
        <Finale site={site} />
      </main>
      <Footer site={site} />
      <FloatingCta site={site} />
    </>
  );
}
