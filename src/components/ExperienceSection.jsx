import { useRef, useState, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { experience } from '../data/experience.js'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function ExperienceSection() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const lastItemRef = useRef(null)

  // Quanto è alta la linea, calcolato per fermarsi al centro
  // dell'ultimo marker (cerchio/badge), non alla fine di tutto il testo.
  const [lineHeight, setLineHeight] = useState(0)

  useLayoutEffect(() => {
    if (!lastItemRef.current) return

    const lastStep = experience[experience.length - 1]
    // Se l'ultima tappa ha un badge grande (h-24 = 96px), il centro
    // è a metà di quello. Se è il pallino piccolo (h-4, top-1.5),
    // il centro è più in alto.
    const markerCenter = lastStep.badge ? 48 : 14

    setLineHeight(lastItemRef.current.offsetTop + markerCenter)
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(lineRef.current, {
          scaleY: 0,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 75%',
            scrub: true,
          },
        })

        const items = gsap.utils.toArray('[data-timeline-item]')
        items.forEach((item, index) => {
          const fromLeft = index % 2 === 0
          gsap.from(item, {
            opacity: 0,
            x: fromLeft ? -50 : 50,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
          })
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      id="esperienza"
      ref={sectionRef}
      className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center gap-8 px-8 pt-28 pb-16 sm:px-12 lg:gap-x-24 lg:px-20 lg:pt-32 lg:pb-24"
    >
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Esperienza
      </h2>
      <p className="mt-3 max-w-xl text-neutral-400">
        Il percorso fin qui, una tappa alla volta.
      </p>

      <div className="relative mt-12">
        {/* La linea ora ha un'altezza calcolata, non più "h-full" */}
        <div
          ref={lineRef}
          aria-hidden="true"
          style={{ height: lineHeight }}
          className="absolute top-0 left-4 w-px bg-white/20 md:left-1/2"
        />

        <ol>
          {experience.map((step, index) => {
            const isLeft = index % 2 === 0
            const isLast = index === experience.length - 1

            return (
              <li
                key={`${step.periodo}-${step.titolo}`}
                ref={isLast ? lastItemRef : null}
                data-timeline-item
                className={`relative mb-16 pl-16 last:mb-0 md:w-1/2 md:pl-0 ${
                  isLeft ? 'md:pr-16 md:text-right' : 'md:ml-auto md:pl-16'
                }`}
              >
                {step.badge ? (
                  /* Badge grande SULLA linea, al posto del pallino */
                  
                  <a  href={step.badge.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Verifica il badge: ${step.titolo}`}
                    className={`absolute top-0 left-4 flex h-24 w-24 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-neutral-900 p-2 shadow-[0_0_20px_rgba(255,255,255,0.08)] transition-transform hover:scale-110 ${
                      isLeft
                        ? 'md:right-0 md:left-auto md:translate-x-1/2'
                        : 'md:left-0 md:-translate-x-1/2'
                    }`}
                  >
                    <img
                      src={step.badge.immagine}
                      alt=""
                      className="h-full w-full object-contain"
                      style={{ transform: `scale(${step.badge.scala ?? 1})` }}
                    />
                  </a>
                ) : (
                  /* Pallino classico per le tappe senza badge */
                  <span
                    aria-hidden="true"
                    className={`absolute top-1.5 left-4 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-neutral-950 bg-white ${
                      isLeft
                        ? 'md:right-0 md:left-auto md:translate-x-1/2'
                        : 'md:left-0 md:-translate-x-1/2'
                    }`}
                  />
                )}

                <p className="text-sm font-medium tracking-widest text-neutral-500 uppercase">
                  {step.periodo}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-white">
                  {step.titolo}
                </h3>
                <p className="mt-0.5 text-sm text-neutral-400">{step.luogo}</p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                  {step.descrizione}
                </p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}