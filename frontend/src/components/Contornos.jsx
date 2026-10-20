import { useEffect, useMemo, useRef } from 'react';

/**
 * Curvas de nivel ilustradas (la "firma" visual de SmartTour AI: la Sierra Gorda
 * vista como mapa topográfico). Se generan con una semilla fija, así cada
 * pantalla tiene su propio relieve pero no cambia entre recargas.
 */

function generador(semilla) {
  let s = semilla % 2147483647 || 1;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

// Curva cerrada suave (Catmull-Rom -> Bézier) a partir de puntos.
function trazoCerrado(puntos) {
  const n = puntos.length;
  let d = `M${puntos[0][0].toFixed(1)},${puntos[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const [p0, p1, p2, p3] = [puntos[(i - 1 + n) % n], puntos[i], puntos[(i + 1) % n], puntos[(i + 2) % n]];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return `${d}Z`;
}

export function generarContornos({ semilla = 7, ancho = 400, alto = 300, picos = 3, anillos = 9 }) {
  const azar = generador(semilla);
  const trazos = [];
  for (let p = 0; p < picos; p++) {
    const cx = ancho * (0.1 + azar() * 0.8);
    const cy = alto * (0.1 + azar() * 0.8);
    const fases = [azar() * 6.28, azar() * 6.28, azar() * 6.28];
    const paso = 14 + azar() * 10;
    const estiramiento = 0.7 + azar() * 0.6;
    for (let a = 1; a <= anillos; a++) {
      const r = a * paso;
      const puntos = [];
      for (let i = 0; i < 40; i++) {
        const t = (i / 40) * Math.PI * 2;
        const deriva = a * 0.18;
        const rr = r * (1 + 0.16 * Math.sin(3 * t + fases[0] + deriva) + 0.08 * Math.sin(5 * t + fases[1]) + 0.05 * Math.sin(7 * t + fases[2] - deriva));
        puntos.push([cx + Math.cos(t) * rr, cy + Math.sin(t) * rr * estiramiento]);
      }
      trazos.push({ d: trazoCerrado(puntos), mayor: a % 4 === 0 });
    }
  }
  return trazos;
}

/** vivo: el relieve se desplaza muy despacio; se pausa cuando no está en pantalla. */
export default function Contornos({ semilla, ancho = 400, alto = 300, picos, anillos, className = '', vivo = false }) {
  const trazos = useMemo(() => generarContornos({ semilla, ancho, alto, picos, anillos }), [semilla, ancho, alto, picos, anillos]);
  const svg = useRef(null);

  useEffect(() => {
    if (!vivo || !svg.current || !('IntersectionObserver' in window)) return;
    const observador = new IntersectionObserver(([entrada]) => {
      if (svg.current) svg.current.dataset.pausado = String(!entrada.isIntersecting);
    });
    observador.observe(svg.current);
    return () => observador.disconnect();
  }, [vivo]);

  return (
    <svg ref={svg} className={`contornos ${vivo ? 'contornos-vivos' : ''} ${className}`} viewBox={`0 0 ${ancho} ${alto}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {trazos.map((t, i) => (
        <path key={i} d={t.d} className={t.mayor ? 'contorno-mayor' : undefined} />
      ))}
    </svg>
  );
}
