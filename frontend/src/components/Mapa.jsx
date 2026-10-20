import { useMemo } from 'react';
import { generarContornos } from './Contornos.jsx';

/**
 * Mapa ilustrado de Jalpan (placeholder hasta integrar un mapa real).
 * - puntos: [{ x, y, etiqueta }]
 * - ruta: si es true, une los puntos en orden y los numera (es una secuencia real).
 * - animar: dibuja la ruta y hace aparecer las paradas (solo justo después de generar).
 */
export default function Mapa({ puntos, ruta = false, animar = false, semilla = 21, nota }) {
  const contornos = useMemo(() => generarContornos({ semilla, ancho: 400, alto: 260, picos: 3, anillos: 7 }), [semilla]);

  const trazoRuta = useMemo(() => {
    if (!ruta || puntos.length < 2) return null;
    let d = `M${puntos[0].x},${puntos[0].y}`;
    for (let i = 1; i < puntos.length; i++) {
      const a = puntos[i - 1];
      const b = puntos[i];
      // Ligera curva entre paradas para que se lea como camino, no como línea recta.
      const mx = (a.x + b.x) / 2 + (b.y - a.y) * 0.25;
      const my = (a.y + b.y) / 2 - (b.x - a.x) * 0.25;
      d += ` Q${mx},${my} ${b.x},${b.y}`;
    }
    return d;
  }, [puntos, ruta]);

  return (
    <figure className={`mapa ${ruta && animar ? 'mapa-animada' : ''}`}>
      <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" role="img" aria-label={ruta ? 'Mapa con la ruta del itinerario' : 'Mapa de sitios cercanos'}>
        <rect width="400" height="260" className="mapa-fondo" />
        <g className="mapa-relieve">
          {contornos.map((c, i) => <path key={i} d={c.d} className={c.mayor ? 'contorno-mayor' : undefined} />)}
        </g>
        {/* Río Jalpan, estilizado */}
        <path className="mapa-rio" d="M-10,210 C60,190 110,230 170,200 S260,150 300,186 S370,240 410,226" />
        {trazoRuta && (
          <>
            <path d={trazoRuta} className="mapa-ruta-borde" pathLength="1" />
            <path d={trazoRuta} className="mapa-ruta" pathLength="1" />
          </>
        )}
        {puntos.map((p, i) => (
          <g key={p.etiqueta} className="mapa-pin" transform={`translate(${p.x} ${p.y})`} style={{ '--retraso': `${150 + i * 220}ms` }}>
            <circle r={ruta ? 11 : 6} />
            {ruta && <text dy="4" textAnchor="middle">{i + 1}</text>}
            <text className="mapa-etiqueta" x={ruta ? 15 : 10} dy="4">{p.etiqueta}</text>
          </g>
        ))}
      </svg>
      {nota && <figcaption>{nota}</figcaption>}
    </figure>
  );
}
