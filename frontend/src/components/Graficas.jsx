import { useEffect, useRef, useState } from 'react';

/* Mini gráficas del diseño Fitness: cifras que cuentan, barritas, latido, medidor y área. */

const fmt = (n, d = 0) => Number(n).toLocaleString('es-MX', { minimumFractionDigits: d, maximumFractionDigits: d });
const sinMovimiento = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function useCuenta(meta, ms = 1100) {
  const [v, setV] = useState(() => (sinMovimiento() ? meta : 0));
  useEffect(() => {
    if (sinMovimiento()) { setV(meta); return undefined; }
    let r; let t0;
    const paso = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / ms);
      setV(meta * (1 - Math.pow(1 - p, 3)));
      if (p < 1) r = requestAnimationFrame(paso);
    };
    r = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(r);
  }, [meta, ms]);
  return v;
}

/** Número que cuenta desde 0 hasta `v`. */
export function Cuenta({ v, d = 0 }) {
  const x = useCuenta(v);
  return <span className="num">{fmt(x, d)}</span>;
}

export function MiniBarras({ datos, color, resaltar = datos.length - 2 }) {
  const m = Math.max(...datos);
  return (
    <div className="barritas" aria-hidden="true">
      {datos.map((d, k) => (
        <span key={k} style={{ height: `${(d / m) * 100}%`, background: color, opacity: k === resaltar ? 1 : 0.55, '--k': k }} />
      ))}
    </div>
  );
}

export function Latido({ color = '#F0386B' }) {
  return (
    <svg width="96" height="34" viewBox="0 0 96 34" aria-hidden="true">
      <path className="trazo" d="M0 20h22l4-8 5 16 6-24 6 22 4-6h12l3-5 4 8 3-3h27" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export function Medidor({ p, color = '#22C55E', fondo = '#EAF7EF' }) {
  const [valor, setValor] = useState(0);
  useEffect(() => { const t = setTimeout(() => setValor(p), 200); return () => clearTimeout(t); }, [p]);
  return (
    <svg width="80" height="40" viewBox="0 0 80 44" aria-hidden="true">
      <path d="M8 40a32 32 0 0 1 64 0" fill="none" stroke={fondo} strokeWidth="7" strokeLinecap="round" />
      <path d="M8 40a32 32 0 0 1 64 0" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round"
        style={{ strokeDasharray: 101, strokeDashoffset: 101 * (1 - valor), transition: 'stroke-dashoffset 1.4s cubic-bezier(.2,.8,.2,1)' }} />
    </svg>
  );
}

/** Tarjeta de cifra: título con ícono, mini gráfica y valor. */
export function TarjetaCifra({ titulo, icono: Icono, color, fondo, mini, valor, unidad, nota, i }) {
  return (
    <div className="blanca alza stat-f sube" style={{ '--i': i }}>
      <div className="t">{titulo} {Icono && <span className="ic" style={{ background: fondo, color }}><Icono size={13} aria-hidden="true" /></span>}</div>
      {mini && <div className="mini">{mini}</div>}
      <div className="v" style={{ color }}>{valor}{unidad && <small>{unidad}</small>}</div>
      {nota && <div className="tarjeta-pie">{nota}</div>}
    </div>
  );
}

function curva(pts) {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]; const p1 = pts[i]; const p2 = pts[i + 1]; const p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }
  return d;
}

/** Gráfica de área con punto que sigue al mouse (como "Seguimiento de actividad"). */
export function GraficaArea({ datos, etiquetas, max, unidad, descripcion }) {
  const W = 520; const H = 150; const L = 30; const B = 20;
  const x = (i) => L + (i * (W - L - 6)) / (datos.length - 1);
  const y = (v) => 6 + (H - B - 6) * (1 - v / max);
  const pts = datos.map((v, i) => [x(i), y(v)]);
  const linea = curva(pts);
  const pico = datos.indexOf(Math.max(...datos));
  const [sel, setSel] = useState(pico);
  const caja = useRef(null);
  useEffect(() => setSel(datos.indexOf(Math.max(...datos))), [datos]);
  const mover = (e) => {
    const r = caja.current.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    let mejor = 0;
    pts.forEach((p, i) => { if (Math.abs(p[0] - px) < Math.abs(pts[mejor][0] - px)) mejor = i; });
    setSel(mejor);
  };
  const marcas = [0, max / 4, max / 2, (max * 3) / 4, max];
  return (
    <div className="area" ref={caja} onMouseMove={mover} onMouseLeave={() => setSel(pico)}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label={descripcion}>
        <defs>
          <linearGradient id="relleno" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#FF6A1A" stopOpacity=".28" />
            <stop offset="1" stopColor="#FF6A1A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="ejes">
          {marcas.map((t) => (
            <g key={t}>
              <line x1={L} x2={W} y1={y(t)} y2={y(t)} stroke="#F0ECE8" strokeDasharray="3 4" />
              <text x={L - 8} y={y(t) + 3} textAnchor="end">{Math.round(t)}</text>
            </g>
          ))}
          {etiquetas.map((m, i) => <text key={m} x={x(i)} y={H - 4} textAnchor="middle">{m}</text>)}
        </g>
        <path d={`${linea} L${x(datos.length - 1)},${H - B} L${L},${H - B} Z`} fill="url(#relleno)" />
        <path key={datos.join()} d={linea} fill="none" stroke="#FF6A1A" strokeWidth="2.6" strokeLinecap="round" className="trazo" style={{ strokeDasharray: 900, strokeDashoffset: 900 }} />
        <line x1={pts[sel][0]} x2={pts[sel][0]} y1={pts[sel][1]} y2={H - B} stroke="#FF6A1A" strokeOpacity=".35" strokeDasharray="3 3" />
        <circle cx={pts[sel][0]} cy={pts[sel][1]} r="5.5" fill="#FFFFFF" stroke="#FF6A1A" strokeWidth="3" />
      </svg>
      <span className="burbuja" style={{ left: `${(pts[sel][0] / W) * 100}%`, top: `${(pts[sel][1] / H) * 100}%` }}>{datos[sel]}{unidad} · {etiquetas[sel]}</span>
    </div>
  );
}
