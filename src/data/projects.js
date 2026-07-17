/*
  ============================================================
  PROGETTI — modifica SOLO questo file per aggiornare la
  sezione "Progetti" del sito.

  Ogni progetto è un blocco { ... }.
  Per aggiungerne uno: copia un blocco intero (dalla { alla },
  virgola compresa), incollalo sotto e cambia i valori.
  Per rimuoverne uno: cancella il suo blocco.

  Campi:
  - titolo:      nome del progetto
  - immagine:    percorso dell'immagine (mettila nella cartella
                 `public/`, es. '/progetto-1.jpg').
                 Usa null se non hai ancora un'immagine:
                 il sito mostrerà un segnaposto elegante.
  - descrizione: 1-2 frasi su cosa è e cosa hai fatto tu
  - link:        URL del progetto (itch.io, GitHub, video...).
                 Usa null se non c'è ancora un link.
  - tag:         piccole etichette mostrate sulla card
  ============================================================
*/
export const projects = [
  {
    titolo: 'Progetto 3D in sviluppo',
    immagine: null,
    descrizione:
      'Esperienza 3D in Unity attualmente in lavorazione. Presto qui: screenshot, breakdown tecnico e build giocabile.',
    link: null,
    tag: ['Unity', '3D'],
  },
  {
    titolo: 'Stanza Isometrica',
    video: 'public/Recordings/IsometricVideo.mp4',
    immagine: null,
    descrizione: 'Esercizio di lighting e composizione: illuminazione realtime/baked, reflection probe e atmosfera notturna.',
    link: null,
    tag: ['Unity', 'Lighting', 'Tech Art'],
  },
  {
    titolo: 'Ambiente 3D — Environment Art',
    immagine: null,
    descrizione:
      'Ambiente 3D modellato in Blender e integrato in Unity, con focus su lighting e atmosfera.',
    link: null,
    tag: ['Blender', 'Unity'],
  },
]

/*
  Testo mostrato sulle card senza immagine.
  Quando i progetti saranno pronti, questo segnaposto sparirà
  da solo appena imposti il campo `immagine`.
*/
export const placeholderLabel = 'In arrivo — Ottobre 2026'
