// Renders Hebrew text that contains Spanish/Latin fragments, isolating each Latin run
// so the bidi algorithm doesn't scramble punctuation like "¡Hola!" or "me gusta".
const LATIN = /([¡¿]?[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ0-9\s'’,.:;!?¡¿…«»()/+=-]*[A-Za-zÀ-ÿ0-9!?.…»)]|[¡¿]?[A-Za-zÀ-ÿ])/g;

export default function Mixed({ text }) {
  if (!text) return null;
  const parts = String(text).split(LATIN);
  return parts.map((p, i) => (i % 2 === 1
    ? <bdi key={i} dir="ltr" lang="es">{p}</bdi>
    : p));
}
