import { useRef } from 'react'
import gsap from 'gsap'

/*
  Hook riutilizzabile per l'effetto "tilt 3D": l'elemento si inclina
  seguendo la posizione del mouse, come se avesse profondità reale.

  Come si usa in qualsiasi card:

    const tiltRef = useTilt()

    <div ref={tiltRef} className="... [transform-style:preserve-3d]">
      contenuto della card
    </div>

  Il contenitore genitore (la griglia) deve avere [perspective:1000px]
  perché l'effetto si veda correttamente.
*/
export default function useTilt() {
  const ref = useRef(null)

  function handleMouseMove(e) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    gsap.to(el, {
      rotateX: y * -12,
      rotateY: x * 12,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 600,
    })
  }

  function handleMouseLeave() {
    gsap.to(ref.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
  }

  return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave }
}