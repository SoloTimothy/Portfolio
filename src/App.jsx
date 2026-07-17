import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import StatsSection from './components/StatsSection.jsx'
import ProjectsSection from './components/ProjectsSection.jsx'
import ToolsSection from './components/ToolsSection.jsx'
import ExperienceSection from './components/ExperienceSection.jsx'
import TechStackSection from './components/TechStackSection.jsx'
import Footer from './components/Footer.jsx'

/*
  App = la pagina intera.
  È una singola pagina a scorrimento: ogni sezione è un componente separato,
  impilato qui nell'ordine in cui appare sullo schermo.
*/
export default function App() {
  return (
    <>
      {/*
        Link "salta al contenuto": invisibile finché non riceve il focus
        con Tab. Permette a chi usa la tastiera di saltare la navbar.
      */}
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-neutral-950"
      >
        Salta al contenuto
      </a>

      <Navbar />

      <main id="contenuto">
        <Hero />
        <StatsSection />
        <ProjectsSection />
        <ToolsSection />
        <ExperienceSection />
        <TechStackSection />
      </main>

      <Footer />
    </>
  )
}
