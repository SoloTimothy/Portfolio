import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

/*
  Gli strumenti mostrati nella fascia.
  Aggiungi o togli nomi direttamente da questo array.
*/
const tools = [
  'Unity',
  'C#',
  'Shader Graph',
  'Blender',
  'Aseprite',
  'Affinity',
  'Git & GitHub',
  'Obsidian',
  'Lighting',
]

/*
  Un "gruppo" = una copia intera della lista, con lo spazio verso
  il prossimo gruppo incluso come padding-right (pr-8), non come
  gap esterno. Ogni parola ha sempre il suo pallino davanti,
  incluso il primo elemento — così il ritmo resta uniforme
  anche nel punto di giunzione tra due gruppi.
*/
function ToolGroup() {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {tools.map((tool) => (
        <span key={tool} className="flex shrink-0 items-center gap-8">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-white/40"
          />
          <span className="text-lg font-semibold tracking-wide text-neutral-200 sm:text-xl">
            {tool}
          </span>
        </span>
      ))}
    </div>
  )
}

/*
  Fascia "Strumenti che uso": un nastro (marquee) che scorre
  continuamente da destra verso sinistra, in loop infinito e senza scatti.

  Usiamo 4 copie del gruppo (non 2) perché con poche parole il
  contenuto totale rischiava di non essere abbastanza largo da
  coprire tutto lo schermo su monitor grandi — il nastro "finiva"
  prima che la copia successiva arrivasse, lasciando un vuoto
  seguito da uno scatto. Con 4 copie e xPercent: -25 (un quarto
  della larghezza totale), il nastro resta sempre pieno.
*/
export default function ToolsSection() {
  const trackRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to(trackRef.current, {
          xPercent: -25,
          duration: 20,
          ease: 'none',
          repeat: -1,
        })
      })
    },
    { scope: trackRef },
  )

  return (
    <section aria-label="Strumenti che uso" className="overflow-hidden py-10">
      <div className="w-full overflow-hidden">
        <div ref={trackRef} className="flex w-max">
          <ToolGroup />
          <ToolGroup />
          <ToolGroup />
          <ToolGroup />
        </div>
      </div>
    </section>
  )
}