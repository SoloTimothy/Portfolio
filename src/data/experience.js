/*
  ============================================================
  ESPERIENZA — modifica SOLO questo file per aggiornare la
  timeline della sezione "Esperienza".

  Ogni tappa è un blocco { ... }.
  L'ordine qui è l'ordine sulla timeline: metti la più recente
  IN CIMA. Per aggiungere una tappa: copia un blocco intero,
  incollalo e cambia i valori.

  Campi:
  - periodo:     quando (es. '2025 — Oggi' oppure 'Mar 2024')
  - titolo:      ruolo o attività
  - luogo:       dove (azienda, team, oppure 'Progetto personale')
  - descrizione: cosa hai fatto, in 1-3 frasi
  - badge:       OPZIONALE. Se hai conseguito una certificazione
                 legata a questa tappa (es. Unity Essentials),
                 aggiungi { immagine: '/badges/nomefile.png',
                 link: 'https://www.credly.com/...' }.
                 Se non c'è ancora, lascia badge: null.
  ============================================================
*/
export const experience = [
  {
  periodo: '2024 — Oggi',
  titolo: 'Game Developer Indie',
  luogo: 'Napoli, Italia',
  descrizione:
    'Sviluppo di progetti 3D indipendenti in Unity: gameplay, tech art e pipeline di produzione, dalla prototipazione alla build.',
  badge: {
    immagine: '/favicon.svg',
    link: null,
    scala: 0.7, // scala l'immagine del badge (1 = dimensione originale)
  },
},
  {
  periodo: 'Giu 2026 — In corso',
  titolo: 'Corso Game Developer',
  luogo: 'SD Formazione',
  descrizione:
    'Percorso strutturato su quattro materie: Design, Tech Artist, 2D e Programmazione — dalle basi del game design agli shader, dalla pixel art al C#.',
  badge: {
    immagine: '/SD-FORMAZIONE.png',
    link: null,
  },
},
{
  periodo: 'Giu 2026',
  titolo: 'Unity Essentials',
  luogo: 'Unity — Certificazione',
  descrizione:
    'Certificazione base Unity: fondamenta dell\'editor, gestione asset, e primi passi in un percorso di certificazione strutturato.',
  badge: {
    immagine: '/Unity Essentials.png', // scarica l'immagine del badge da Credly una volta ottenuto
    link: 'https://www.credly.com/badges/02b6efb5-7b5a-4e3d-ab02-d90075c57327/public_url', // il link di verifica pubblico del TUO badge specifico
  },
},
{
  periodo: 'Giu 2025 — Dic 2025',
  titolo: 'Qualifica EQF5 — Web Programming',
  luogo: 'Nome istituto/scuola',
  descrizione:
    'Percorso formale in sviluppo web: HTML/CSS/JS, logica di programmazione e basi che ho poi portato con me passando al game dev.',
  badge: {
    immagine: '/Web Design.png',
    link: 'https://drive.google.com/file/d/1MhzimhVo1jFCR_E6AZr59OqrmoGaR97y/view',
    scala: 0.9,
  },
},
]