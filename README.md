# Portfolio — Timothy Adamo

Portfolio personale: game developer indie, sviluppo 3D e Tech Art in Unity.
Single page in **React + Vite**, stile con **Tailwind CSS**, animazioni con
**GSAP** e oggetto 3D nella Hero con **Three.js** (via @react-three/fiber).

## Comandi

```bash
npm install      # solo la prima volta (o dopo un clone)
npm run dev      # avvia il sito in locale su http://localhost:5173
npm run build    # crea la versione di produzione nella cartella dist/
npm run preview  # anteprima locale della build di produzione
```

## Dove si modificano i contenuti

| Cosa                    | File                                   |
| ----------------------- | -------------------------------------- |
| **Progetti**            | `src/data/projects.js`                 |
| **Esperienza/timeline** | `src/data/experience.js`               |
| Card statistiche        | array in cima a `src/components/StatsSection.jsx` |
| Strumenti che uso       | array in cima a `src/components/ToolsSection.jsx` |
| Stack tecnologico       | array in cima a `src/components/TechStackSection.jsx` |
| Social nel footer       | array in cima a `src/components/Footer.jsx` |
| Voci della navbar       | array in cima a `src/components/Navbar.jsx` |
| Slogan e testo Hero     | `src/components/Hero.jsx`              |

Per progetti ed esperienza basta aprire il file, copiare un blocco `{ ... }`
e modificarne i valori: il sito si aggiorna da solo.

## Cose da sostituire quando saranno pronte

- **Monogramma**: `src/components/Monogram.jsx` (istruzioni nel file)
  e `public/favicon.svg`
- **Oggetto 3D della Hero**: l'icosaedro placeholder è in
  `src/components/HeroScene.jsx` — quando avrai un modello .glb tuo,
  è il `<mesh>` dentro `FloatingShape` da sostituire
- **Form contatti**: oggi è un placeholder senza backend; istruzioni per
  collegarlo (Formspree o Cloudflare Pages Functions) in cima a
  `src/components/ContactSection.jsx`
- **Immagini dei progetti**: mettile in `public/` e indica il percorso
  nel campo `immagine` di `src/data/projects.js` (es. `'/progetto-1.jpg'`)

## Deploy su Cloudflare Pages

1. Pubblica questa cartella su un repository GitHub
2. Su [Cloudflare Pages](https://pages.cloudflare.com): **Create a project**
   → collega il repository
3. Impostazioni di build:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Salva: ogni push sul branch principale rifà il deploy da solo

## Struttura del progetto

```
index.html                  pagina base (titolo, meta, favicon)
src/
  main.jsx                  punto di ingresso React
  App.jsx                   la pagina: elenco delle sezioni in ordine
  index.css                 Tailwind + stili globali (focus, selection)
  data/
    projects.js             ← I TUOI PROGETTI
    experience.js           ← LA TUA TIMELINE
  hooks/
    useRevealOnScroll.js    effetto "reveal" riutilizzabile (GSAP)
  components/
    Navbar.jsx              barra fissa: monogramma, nav, CTA
    Monogram.jsx            monogramma SVG (placeholder da sostituire)
    Hero.jsx                slogan + presentazione + 3D
    HeroScene.jsx           scena Three.js (icosaedro interattivo)
    StatsSection.jsx        le 4 card statistiche
    ProjectsSection.jsx     griglia progetti (legge data/projects.js)
    ToolsSection.jsx        fascia "Strumenti che uso"
    ExperienceSection.jsx   timeline animata (legge data/experience.js)
    TechStackSection.jsx    griglia stack tecnologico
    ContactSection.jsx      form contatti (placeholder)
    Footer.jsx              nome, copyright, social
```

## Accessibilità e animazioni

- Il sito rispetta `prefers-reduced-motion`: con "riduci animazioni"
  attivo nel sistema operativo, niente reveal GSAP e l'oggetto 3D resta fermo
- Il focus da tastiera è sempre visibile (anello bianco)
- Link "Salta al contenuto" per chi naviga con Tab
