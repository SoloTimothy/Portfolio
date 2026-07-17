import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

/*
  Piccolo hook che ci dice se l'utente ha attivato
  "riduci animazioni" nelle impostazioni del sistema operativo.
  Se sì, l'oggetto 3D resta fermo invece di ruotare.
*/
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(query.matches)

    // Aggiorna se l'utente cambia l'impostazione mentre il sito è aperto
    const onChange = (event) => setReduced(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/*
  L'oggetto 3D vero e proprio: un icosaedro (forma geometrica a 20 facce)
  con materiale sfaccettato che riflette la luce.

  È un PLACEHOLDER pensato per essere sostituito: quando avrai un modello
  tuo (es. esportato da Blender in formato .glb), questo <mesh> è l'unica
  parte da cambiare.

  Interazioni:
  - ruota lentamente da solo
  - si inclina seguendo il puntatore del mouse
  - si ingrandisce leggermente al passaggio del mouse
*/
function FloatingShape({ reducedMotion }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  // useFrame viene chiamato ad ogni fotogramma (~60 volte al secondo).
  // `state.pointer` contiene la posizione del mouse da -1 a 1.
  useFrame((state, delta) => {
    const mesh = meshRef.current
    if (!mesh || reducedMotion) return

    // Rotazione continua e lenta sull'asse Y
    mesh.rotation.y += delta * 0.25

    // Inclinazione morbida verso il puntatore (interpolazione graduale:
    // ogni frame ci avviciniamo del 5% alla posizione desiderata)
    const targetTiltX = state.pointer.y * 0.4
    const targetTiltZ = -state.pointer.x * 0.3
    mesh.rotation.x += (targetTiltX - mesh.rotation.x) * 0.05
    mesh.rotation.z += (targetTiltZ - mesh.rotation.z) * 0.05

    // Leggero galleggiamento su e giù
    mesh.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15

    // Zoom morbido quando il mouse è sopra l'oggetto
    const targetScale = hovered ? 1.12 : 1
    const nextScale = mesh.scale.x + (targetScale - mesh.scale.x) * 0.1
    mesh.scale.setScalar(nextScale)
  })

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* La geometria: raggio 1.4, dettaglio 0 = facce grandi e nette */}
      <icosahedronGeometry args={[1.4, 0]} />
      {/* flatShading rende ogni faccia piatta: perfetto per lo stile low-poly */}
      <meshStandardMaterial
        color="#e5e5e5"
        flatShading
        roughness={0.35}
        metalness={0.15}
      />
    </mesh>
  )
}

/*
  La "scena": il canvas 3D con le luci e l'oggetto.
  In Three.js una scena funziona come un set fotografico:
  servono una camera, delle luci e un soggetto.
*/
export default function HeroScene() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    // aria-hidden: l'oggetto è decorativo, gli screen reader lo ignorano
    <div className="h-full w-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 2]}
        // Con "riduci animazioni" attivo disegniamo solo quando serve,
        // invece di ridisegnare 60 volte al secondo.
        frameloop={reducedMotion ? 'demand' : 'always'}
      >
        {/* Luce ambientale: schiarisce leggermente tutta la scena */}
        <ambientLight intensity={0.2} />
        {/* Luce principale (bianca, dall'alto a destra): crea i contrasti */}
        <directionalLight position={[4, 5, 3]} intensity={2.2} />
        {/* Luce di riempimento debole dal lato opposto, per non avere zone nere */}
        <pointLight position={[-4, -2, -3]} intensity={0.6} />

        <FloatingShape reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  )
}
