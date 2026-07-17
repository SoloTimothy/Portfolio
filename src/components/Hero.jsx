import { lazy, Suspense } from 'react'
import useRevealOnScroll from '../hooks/useRevealOnScroll.js'

/*
  La scena 3D usa Three.js, una libreria pesante (~1 MB).
  Con lazy() la scarichiamo in un file separato, in parallelo,
  mentre il resto del sito è già visibile e usabile.
*/
const HeroScene = lazy(() => import('./HeroScene.jsx'))

/*
  Hero = la prima schermata del sito.
  A sinistra: slogan e presentazione. A destra: l'oggetto 3D interattivo.
  Su mobile le due parti si impilano (testo sopra, 3D sotto).
*/
export default function Hero() {
  const sectionRef = useRevealOnScroll()

  return (
    <section
      id="top"
      ref={sectionRef}
      className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center gap-8 px-8 pt-28 pb-16 sm:px-12 lg:grid-cols-2 lg:gap-x-24 lg:px-20 lg:pt-32 lg:pb-24"
    >
      {/* Colonna testo */}
      <div>
        <h1
          data-reveal
          className="text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Timothy Adamo
          <span className="block text-2xl font-semibold text-neutral-400 sm:text-3xl lg:text-4xl">
            Game Developer Indie
          </span>
        </h1>

        <p data-reveal className="mt-6 max-w-xl text-lg text-neutral-300">
          Progetto esperienze 3D e tech art in Unity: gameplay, illuminazione, shader e ambienti che raccontano qualcosa attraverso i dettagli.
        </p>

        {/* Le due call to action principali */}
        <div data-reveal className="mt-8 flex flex-wrap gap-4">
          <a
            href="#progetti"
            className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition-opacity hover:opacity-80"
          >
            Guarda i progetti
          </a>
          <a
            href="#contatti"
            className="rounded-md border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/60"
          >
            Contattami
          </a>
        </div>
      </div>

      {/* Colonna 3D: l'altezza fissa dà al canvas uno spazio in cui disegnare.
          Suspense mostra il fallback (qui: niente) finché la scena non è scaricata. */}
      <div data-reveal className="h-72 sm:h-96 lg:h-[28rem]">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>
    </section>
  )
}
