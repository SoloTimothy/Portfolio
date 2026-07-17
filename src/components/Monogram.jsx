/*
  Monogramma PLACEHOLDER (le iniziali "TA" in un quadrato).

  Quando avrai il monogramma definitivo:
  1. apri questo file
  2. sostituisci il contenuto del tag <svg> con il tuo SVG
  3. mantieni gli attributi `className` e `aria-hidden` sul tag <svg>
     così dimensioni e accessibilità continuano a funzionare.
*/
export default function Monogram({ className = 'h-9 w-9' }) {
  return (
    <img
      src="/favicon.svg"
      alt=""
      aria-hidden="true"
      className={className}
    />
  )
}
