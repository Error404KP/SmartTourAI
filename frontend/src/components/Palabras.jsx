import { Fragment, useEffect, useState } from 'react';

/**
 * Hace que un título entre palabra por palabra, solo la primera vez por sesión
 * (al volver a la pantalla o recargar ya aparece quieto).
 */
const decisiones = {};

function primeraVez(clave) {
  if (!(clave in decisiones)) {
    let animar = false;
    try {
      animar = !sessionStorage.getItem(clave);
      sessionStorage.setItem(clave, '1');
    } catch { /* sin almacenamiento: no se anima */ }
    decisiones[clave] = animar;
  }
  return decisiones[clave];
}

export default function Palabras({ texto, clave }) {
  const [animar] = useState(() => primeraVez(clave));
  useEffect(() => { decisiones[clave] = false; }, [clave]);

  if (!animar) return texto;
  const palabras = texto.split(' ');
  return palabras.map((p, i) => (
    <Fragment key={i}>
      <span className="palabra" style={{ '--i': i }}>{p}</span>
      {i < palabras.length - 1 && ' '}
    </Fragment>
  ));
}
