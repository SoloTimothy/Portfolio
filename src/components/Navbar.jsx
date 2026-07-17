import { useState } from 'react'
import Monogram from './Monogram.jsx'

/*
  Voci del menu di navigazione.
  Ogni `href` punta all'id di una sezione della pagina (es. <section id="progetti">).
  Per aggiungere una voce basta aggiungere un blocco { } qui.
*/
const navLinks = [
  { label: 'Progetti', href: '#progetti' },
  { label: 'Esperienza', href: '#esperienza' },
  { label: 'Stack', href: '#stack' },
]

/*
  Barra di navigazione fissa in alto.
  Layout: monogramma a sinistra — link al centro — bottone "Contattami" a destra.
  Su mobile i link centrali si nascondono e compare il bottone hamburger,
  che apre/chiude un piccolo menu a tendina (stato `menuOpen`).
*/
export default function Navbar() {
  // true = il menu mobile è aperto
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-neutral-950/80 backdrop-blur-md">
      <nav
        aria-label="Navigazione principale"
        className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-8 sm:px-12 lg:px-20"
      >
        {/* Sinistra: monogramma, cliccabile per tornare in cima */}
        <a
          href="#top"
          aria-label="Timothy Adamo — torna all'inizio"
          className="text-white transition-opacity hover:opacity-70"
        >
          <Monogram />
        </a>

        {/* Centro: link di navigazione (solo da tablet in su) */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-neutral-300 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Destra: call to action */}
          <a
            href="#contatti"
            className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-neutral-950 transition-opacity hover:opacity-80"
          >
            Contattami
          </a>

          {/* Bottone hamburger (solo su mobile) */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? 'Chiudi il menu' : 'Apri il menu'}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-white md:hidden"
          >
            {/* Icona: tre linee che diventano una X quando il menu è aperto */}
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              {menuOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Menu mobile a tendina: visibile solo quando menuOpen è true */}
      {menuOpen && (
        <ul
          id="menu-mobile"
          className="border-t border-white/10 bg-neutral-950 px-4 py-3 md:hidden"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                // Chiudiamo il menu quando l'utente sceglie una voce
                onClick={() => setMenuOpen(false)}
                className="block rounded-md px-2 py-3 text-base font-medium text-neutral-200 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
