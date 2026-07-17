import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import useRevealOnScroll from '../hooks/useRevealOnScroll.js'
import useTilt from '../hooks/useTilt.js'

gsap.registerPlugin(useGSAP)

/*
  Le voci dello stack tecnologico.
  `icona` è il percorso dell'immagine. Salva i file dentro public/stack/.
  `scala` è OPZIONALE: un numero per correggere immagini con margini diversi.
*/
const stack = [
  { titolo: 'Unity', icona: 'public/Icon/Uniti icon.webp', scala: 1.6 },
  { titolo: 'C#', icona: 'public/Icon/csharp.png', scala: 2.5 },
  { titolo: 'Blender', icona: 'public/Icon/Blneder-Icon.png', scala: 1.2 },
  { titolo: 'Git & GitHub', icona: 'public/Icon/GitHub.webp', scala: 1.2 },
  { titolo: 'Tech Art & Visual FX', icona: 'public/Icon/FX.png', scala: 1.8 },
]

/*
  Card ovale: icona grande sopra, nome sotto.
  Effetto tilt 3D al passaggio del mouse + fluttuazione continua
  dell'icona, indipendente dal mouse.
*/
function StackCard({ titolo, icona, scala }) {
  const tilt = useTilt()
  const iconRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(iconRef.current, {
        y: -8,
        duration: 2 + Math.random(),
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    })
  }, [])

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      data-reveal
      className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-16 text-center [transform-style:preserve-3d]"
    >
      <img
        ref={iconRef}
        src={icona}
        alt=""
        className="h-20 w-20 object-contain"
        style={{ scale: scala ?? 1 }}
      />
      <h3 className="text-base font-semibold text-white">{titolo}</h3>
    </div>
  )
}

export default function TechStackSection() {
  const sectionRef = useRevealOnScroll()

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="mx-auto max-w-screen-2xl px-8 py-20 sm:px-12 lg:px-20"
    >
      <h2
        data-reveal
        className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
      >
        Stack tecnologico
      </h2>
      <p data-reveal className="mt-2 text-neutral-400">
        Le tecnologie su cui costruisco i miei progetti.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 [perspective:1000px] sm:grid-cols-3 lg:grid-cols-5">
        {stack.map((voce) => (
          <StackCard key={voce.titolo} {...voce} />
        ))}
      </div>
    </section>
  )
}