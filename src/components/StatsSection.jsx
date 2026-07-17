import useRevealOnScroll from '../hooks/useRevealOnScroll.js'
import useTilt from '../hooks/useTilt.js'

/*
  I numeri mostrati nelle 4 card.
  Modifica direttamente questo array: `value` è il numero grande,
  `label` è la scritta sotto.
*/
const stats = [
  { value: '1', label: 'Progetti completati' },
  { value: 'Unity', label: 'Engine padroneggiato' },
  { value: '2+', label: 'Anni di esperienza' },
  { value: '7', label: 'Game jam affrontate' },
]

/*
  Una singola card statistica con effetto tilt 3D al passaggio del mouse.
*/
function StatCard({ value, label }) {
  const tilt = useTilt()

  return (
    <li
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      data-reveal
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center [transform-style:preserve-3d]"
    >
      <span className="block text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {value}
      </span>
      <span className="mt-2 block text-sm text-neutral-400">{label}</span>
    </li>
  )
}

/*
  Fascia con le 4 card statistiche, subito sotto la Hero.
  Su mobile: 2 colonne. Da tablet in su: 4 colonne.
*/
export default function StatsSection() {
  const sectionRef = useRevealOnScroll()

  return (
    <section
      ref={sectionRef}
      aria-label="Statistiche"
      className="mx-auto max-w-screen-2xl px-8 sm:px-12 lg:px-20"
    >
      <ul className="grid grid-cols-2 gap-4 [perspective:1000px] lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </ul>
    </section>
  )
}