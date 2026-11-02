import type { SiteContent } from "@/content/types";
import { rich } from "@/lib/utils";
import Icon from "./Icon";
import MediaView from "./MediaView";
import Reveal from "./Reveal";
import Parallax from "./Parallax";

export function Eyebrow({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <p className={`eyebrow ${center ? "justify-center" : ""}`}>
      <span className="h-px w-8 bg-current opacity-60" />
      {children}
      {center && <span className="h-px w-8 bg-current opacity-60" />}
    </p>
  );
}

export function Heading({ children, className = "" }: { children: string; className?: string }) {
  return <h2 className={`heading ${className}`}>{rich(children)}</h2>;
}

/* ------------------------------------------------------------------ Presentación */
export function Intro({ site }: { site: SiteContent }) {
  const { intro } = site;
  return (
    <section id={intro.id} className="section" aria-labelledby="intro-title">
      <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
        <div>
          <Reveal><Eyebrow>{intro.eyebrow}</Eyebrow></Reveal>
          <Reveal delay={80}><h2 id="intro-title" className="heading text-[clamp(40px,6vw,88px)]">{rich(intro.title)}</h2></Reveal>
        </div>
        <div className="space-y-5 text-[17px] leading-relaxed text-fg/75">
          {intro.paragraphs.map((p, i) => (
            <Reveal key={i} delay={120 + i * 80}><p>{p}</p></Reveal>
          ))}
        </div>
      </div>
      {intro.stats && (
        <div className="wrap mt-16">
          <dl className="grid grid-cols-2 border-y border-line md:grid-cols-4">
            {intro.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90} className={`px-4 py-8 text-center ${i ? "md:border-l border-line" : ""} ${i % 2 ? "max-md:border-l border-line" : ""} ${i > 1 ? "max-md:border-t" : ""}`}>
                <dt className="font-display text-[clamp(34px,4vw,54px)] italic leading-none text-fg">{s.value}</dt>
                <dd className="mt-3 text-[11px] uppercase tracking-[0.24em] text-fg/55">{s.label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ Capítulos (imagen + texto alternos) */
export function Chapters({ site }: { site: SiteContent }) {
  const { chapters } = site;
  return (
    <section id={chapters.id} className="section pt-0" aria-label={chapters.eyebrow}>
      <div className="wrap mb-16">
        <Reveal><Eyebrow>{chapters.eyebrow}</Eyebrow></Reveal>
        <Reveal delay={80}><Heading>{chapters.title}</Heading></Reveal>
      </div>
      <div className="space-y-24 md:space-y-36">
        {chapters.items.map((c, i) => (
          <article key={c.title} className="wrap grid items-center gap-10 md:grid-cols-12">
            <Reveal className={`relative md:col-span-7 ${i % 2 ? "md:order-2 md:col-start-6" : ""}`}>
              <div className="frame aspect-[4/3] overflow-hidden">
                <Parallax strength={0.08} className="h-[118%] w-full -translate-y-[9%]">
                  <MediaView media={c.media} className="h-full w-full object-cover" />
                </Parallax>
              </div>
              <span className="absolute -top-4 left-4 font-mono text-[11px] tracking-[0.3em] text-accent md:-left-2">{String(i + 1).padStart(2, "0")}</span>
            </Reveal>
            <div className={`md:col-span-5 ${i % 2 ? "md:order-1" : ""}`}>
              <Reveal><p className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-accent">{c.label}</p></Reveal>
              <Reveal delay={80}><h3 className="font-display text-[clamp(32px,3.6vw,52px)] font-semibold italic leading-[1.02]">{rich(c.title)}</h3></Reveal>
              <Reveal delay={140}><p className="mt-5 text-fg/75">{c.text}</p></Reveal>
              {c.bullets && (
                <ul className="mt-6 space-y-3 border-t border-line pt-6">
                  {c.bullets.map((b, j) => (
                    <Reveal as="li" key={b} delay={180 + j * 60} className="flex gap-3 text-[15px] text-fg/85">
                      <span className="mt-2.5 h-px w-4 shrink-0 bg-accent" />{b}
                    </Reveal>
                  ))}
                </ul>
              )}
              {c.link && (
                <Reveal delay={260} className="mt-8">
                  <a className="link-arrow" href={c.link.href} target={c.link.external ? "_blank" : undefined} rel={c.link.external ? "noopener" : undefined}>
                    {c.link.label}<Icon name="arrow" className="size-4" />
                  </a>
                </Reveal>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Opiniones */
export function Reviews({ site }: { site: SiteContent }) {
  const r = site.reviews;
  if (!r) return null;
  return (
    <section className="section border-y border-line bg-bg-2" aria-labelledby="reviews-title">
      <div className="wrap grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <div>
          <Reveal><Eyebrow>{r.eyebrow}</Eyebrow></Reveal>
          {r.score ? (
            <Reveal delay={80}>
              <p id="reviews-title" className="font-display text-[clamp(110px,14vw,200px)] italic leading-[.85]">{r.score}</p>
              <p className="mt-4 flex items-center gap-1 text-accent">{Array.from({ length: 5 }).map((_, i) => <Icon key={i} name="star" className="size-4" />)}</p>
              {r.scoreLabel && <p className="mt-3 text-fg/60">{r.scoreLabel}</p>}
            </Reveal>
          ) : (
            <Reveal delay={80}><Heading>{r.title}</Heading></Reveal>
          )}
          <Reveal delay={140}><p className="mt-4 text-[12px] uppercase tracking-[0.2em] text-fg/45">{r.source}</p></Reveal>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {r.quotes.map((q, i) => (
            <Reveal key={i} delay={i * 90} className="card flex flex-col justify-between gap-6 p-7">
              <p className="font-display text-[clamp(19px,1.6vw,23px)] italic leading-snug">“{q.text}”</p>
              <p className="text-[11px] uppercase tracking-[0.22em] text-accent">{q.author}{q.meta && <span className="text-fg/45"> · {q.meta}</span>}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Preguntas frecuentes */
export function Faq({ site }: { site: SiteContent }) {
  const f = site.faq;
  if (!f) return null;
  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="wrap grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <Reveal><Eyebrow>{f.eyebrow}</Eyebrow></Reveal>
          <Reveal delay={80}><h2 id="faq-title" className="heading">{rich(f.title)}</h2></Reveal>
        </div>
        <div className="border-t border-line">
          {f.items.map((it, i) => (
            <Reveal key={it.q} delay={i * 60}>
              <details name="faq" className="faq group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-[clamp(19px,1.7vw,24px)] italic">
                  {it.q}
                  <Icon name="plus" className="size-5 shrink-0 text-accent transition-transform duration-500 group-open:rotate-45" />
                </summary>
                <p className="max-w-2xl pb-6 text-fg/70">{it.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Contacto y mapa */
export function Contact({ site }: { site: SiteContent }) {
  const c = site.contact;
  return (
    <section id={c.id} className="section bg-bg-2" aria-labelledby="contact-title">
      <div className="wrap grid gap-12 lg:grid-cols-2">
        <div>
          <Reveal><Eyebrow>{c.eyebrow}</Eyebrow></Reveal>
          <Reveal delay={80}><h2 id="contact-title" className="heading mb-10">{rich(c.title)}</h2></Reveal>
          <ul className="space-y-7">
            <Reveal as="li" className="flex gap-4">
              <Icon name="pin" className="mt-1 size-5 shrink-0 text-accent" />
              <div>
                <h3 className="label">Dirección</h3>
                <p className="text-[17px]">{c.address.map((l) => <span key={l} className="block">{l}</span>)}</p>
                <a className="link-arrow mt-3" href={c.directionsUrl} target="_blank" rel="noopener">Cómo llegar<Icon name="arrow" className="size-4" /></a>
              </div>
            </Reveal>
            {(c.phone || c.whatsapp || c.email) && (
              <Reveal as="li" className="flex gap-4">
                <Icon name="phone" className="mt-1 size-5 shrink-0 text-accent" />
                <div className="space-y-1">
                  <h3 className="label">Contacto</h3>
                  {c.phone && <a className="block text-[17px] hover:text-accent" href={c.phone.href}>{c.phone.label}</a>}
                  {c.whatsapp && <a className="block text-[17px] hover:text-accent" href={c.whatsapp.href} target="_blank" rel="noopener">{c.whatsapp.label}</a>}
                  {c.email && <a className="block text-[17px] hover:text-accent" href={c.email.href}>{c.email.label}</a>}
                </div>
              </Reveal>
            )}
            {c.hours && (
              <Reveal as="li" className="flex gap-4">
                <Icon name="clock" className="mt-1 size-5 shrink-0 text-accent" />
                <div className="w-full max-w-sm">
                  <h3 className="label">Horario</h3>
                  <table className="w-full text-[15px]">
                    <tbody>
                      {c.hours.map((h) => (
                        <tr key={h.day} className="border-b border-dashed border-line">
                          <th className="py-2 text-left font-normal text-fg/80">{h.day}</th>
                          <td className="py-2 text-right text-fg/60">{h.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {c.hoursNote && <p className="mt-3 text-[13px] text-fg/50">{c.hoursNote}</p>}
                </div>
              </Reveal>
            )}
          </ul>
          <Reveal className="mt-10 flex gap-2">
            {c.socials.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener" aria-label={s.label} className="grid size-11 place-items-center border border-line text-fg/80 transition-colors hover:border-accent hover:text-accent">
                <Icon name={s.icon} className="size-[18px]" />
              </a>
            ))}
          </Reveal>
        </div>
        <Reveal className="frame min-h-[380px] overflow-hidden lg:min-h-full">
          <iframe
            title={`Mapa: ${site.brand.name}`}
            src={c.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[380px] w-full border-0 grayscale-[.6] invert-[.88] hue-rotate-180"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Cierre */
export function Finale({ site }: { site: SiteContent }) {
  const f = site.finale;
  return (
    <section className="relative isolate overflow-hidden py-[clamp(120px,18vw,240px)] text-center" aria-labelledby="finale-title">
      <Parallax strength={0.1} className="absolute inset-[-15%_0] -z-10">
        <MediaView media={f.media} className="h-full w-full object-cover" />
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-black/60" />
      <div className="wrap">
        <Reveal><h2 id="finale-title" className="font-display text-[clamp(44px,7vw,108px)] font-semibold italic leading-[0.98] text-white">{rich(f.title)}</h2></Reveal>
        <Reveal delay={100}><p className="mx-auto mt-6 max-w-lg text-white/80">{f.text}</p></Reveal>
        <Reveal delay={180} className="mt-10">
          <a className="btn-solid" href={f.cta.href} target={f.cta.external ? "_blank" : undefined} rel={f.cta.external ? "noopener" : undefined}>
            {f.cta.label}<Icon name="arrow" className="size-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Pie */
export function Footer({ site }: { site: SiteContent }) {
  return (
    <footer className="border-t border-line py-14">
      <div className="wrap grid gap-10 md:grid-cols-3 md:items-end">
        <div className="flex flex-col leading-none">
          {site.brand.top && <span className="text-[9px] uppercase tracking-[0.5em] text-fg/50">{site.brand.top}</span>}
          <span className="font-display text-3xl uppercase tracking-[0.16em]">{site.brand.name}</span>
          {site.brand.sub && <span className="mt-2 text-[9px] uppercase tracking-[0.36em] text-accent">{site.brand.sub}</span>}
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-fg/60" aria-label="Pie de página">
          {site.nav.map((l) => <a key={l.href} href={l.href} className="hover:text-fg">{l.label}</a>)}
        </nav>
        <div className="text-[13px] text-fg/50 md:text-right">
          <p>{site.footer.line}</p>
          <p className="mt-1">{site.footer.credit}</p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ Botón flotante */
export function FloatingCta({ site }: { site: SiteContent }) {
  const f = site.floating;
  return (
    <a
      href={f.href}
      target={f.external ? "_blank" : undefined}
      rel={f.external ? "noopener" : undefined}
      className="floating fixed bottom-5 right-5 z-40 flex items-center gap-2.5 border border-accent bg-bg/85 px-5 py-3.5 text-[11px] font-medium uppercase tracking-[0.24em] text-fg backdrop-blur-md transition-colors hover:bg-accent hover:text-bg"
    >
      <Icon name={f.icon} className="size-[18px]" />{f.label}
    </a>
  );
}
