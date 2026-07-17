import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Registriamo i plugin di GSAP una sola volta, qui.
gsap.registerPlugin(ScrollTrigger, useGSAP)

/*
  Hook riutilizzabile per l'effetto "reveal on scroll".

  Come si usa in una sezione:

    const sectionRef = useRevealOnScroll()

    <section ref={sectionRef}>
      <h2 data-reveal>Titolo</h2>
      <p data-reveal>Testo</p>
    </section>

  Tutti gli elementi con l'attributo `data-reveal` dentro la sezione
  compaiono con una dissolvenza dal basso quando la sezione entra
  nello schermo, uno dopo l'altro (stagger).

  Accessibilità: l'animazione è avvolta in gsap.matchMedia() e parte
  SOLO se l'utente non ha attivato "riduci animazioni" nel sistema
  operativo (prefers-reduced-motion). In quel caso il contenuto è
  semplicemente visibile, senza effetti.
*/
export default function useRevealOnScroll() {
  const sectionRef = useRef(null)

  // useGSAP è la versione di useEffect pensata per GSAP:
  // pulisce da sola le animazioni quando il componente viene smontato.
  useGSAP(
    () => {
      const targets = sectionRef.current.querySelectorAll('[data-reveal]')
      if (targets.length === 0) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // gsap.from = "parti da questi valori e arriva allo stato normale".
        // Se l'animazione non parte (reduced motion), l'elemento resta
        // com'è nel CSS: perfettamente visibile.
        gsap.from(targets, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        })
      })
    },
    { scope: sectionRef },
  )

  return sectionRef
}
