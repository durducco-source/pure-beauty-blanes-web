import Header from "@/components/Header";
import Hud from "@/components/Hud";
import Providers from "@/components/Providers";
import { Footer, SceneView } from "@/components/scenes";
import { site } from "@/content/site";

// La web es un único recorrido cinematográfico: las escenas (y su orden) se definen en src/content/site.ts.
export default function Home() {
  return (
    <Providers>
      <Header />
      <main id="contenido">
        {site.scenes.map((s) => <SceneView key={s.id} s={s} />)}
      </main>
      <Footer />
      <Hud />
    </Providers>
  );
}
