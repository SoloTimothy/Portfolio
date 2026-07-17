import { useRef } from 'react'
import useRevealOnScroll from '../hooks/useRevealOnScroll.js'
import { projects, placeholderLabel } from '../data/projects.js'
import useTilt from '../hooks/useTilt.js'

export default function ProjectsSection() {
  const sectionRef = useRevealOnScroll()

  return (
    <section
      id="progetti"
      ref={sectionRef}
      className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center gap-8 px-8 pt-28 pb-16 sm:px-12 lg:gap-x-24 lg:px-20 lg:pt-32 lg:pb-24"
    >
      <h2
        data-reveal
        className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
      >
        Progetti
      </h2>
      <p data-reveal className="mt-3 max-w-xl text-neutral-400">
        Sviluppo 3D e tech art in Unity. I primi progetti sono in
        lavorazione: torna presto.
      </p>

      <ul className="mt-10 grid grid-cols-1 gap-6 [perspective:1000px] sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.titolo} data-reveal>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function ProjectCard({ project }) {
  const tilt = useTilt()
  const videoRef = useRef(null)

  // Il video parte solo quando il mouse entra nella card
  function handleMouseEnter() {
    videoRef.current?.play()
  }

  // Al mouse-leave: ferma il video E lo riporta al primo fotogramma,
  // così ogni volta che rientri riparte da capo, pulito.
  function handleMouseLeave(e) {
    tilt.onMouseLeave(e) // mantiene anche l'effetto tilt che avevi già
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <article
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/25 [transform-style:preserve-3d]"
    >
      <div className="relative aspect-video overflow-hidden border-b border-white/10">
        {project.video ? (
          <video
            ref={videoRef}
            src={project.video}
            loop
            muted
            playsInline
            preload="metadata"
            className="h-full w-full scale-100 object-cover"
          />
        ) : project.immagine ? (
          <img
            src={project.immagine}
            alt={`Anteprima del progetto ${project.titolo}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.08),transparent_60%)]">
            <span className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium tracking-widest text-neutral-300 uppercase">
              {placeholderLabel}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-white">
          {project.link ? (
            
            <a  href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {project.titolo}
            </a>
          ) : (
            project.titolo
          )}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-400">
          {project.descrizione}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tag.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-white/5 px-3 py-1 text-xs text-neutral-300"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}