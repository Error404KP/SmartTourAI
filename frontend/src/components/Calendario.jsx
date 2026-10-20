import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Calendario del panel derecho. Días de ejemplo hasta que exista historial real:
 * verde = sitios visitados, naranja = hoy, rosa = próxima ruta planeada.
 */
export default function Calendario() {
  const hoy = new Date();
  const [mes, setMes] = useState(new Date(hoy.getFullYear(), hoy.getMonth(), 1));
  const [sel, setSel] = useState(null);
  const esActual = mes.getMonth() === hoy.getMonth() && mes.getFullYear() === hoy.getFullYear();
  const primero = (mes.getDay() + 6) % 7; // lunes = 0
  const total = new Date(mes.getFullYear(), mes.getMonth() + 1, 0).getDate();
  const visitados = [2, 6, 9, 13, 16].filter((d) => d < hoy.getDate());
  const proxima = Math.min(total, hoy.getDate() + 6);
  const clase = (d) => {
    if (!esActual) return '';
    if (d === hoy.getDate()) return 'n';
    if (visitados.includes(d)) return 'v';
    if (d === proxima) return 'r';
    return '';
  };
  const m0 = mes.toLocaleDateString('es-MX', { month: 'long' });
  const nombre = `${m0[0].toUpperCase()}${m0.slice(1)} ${mes.getFullYear()}`;

  return (
    <div className="cal">
      <div className="cal-cab">
        <b>{nombre}</b>
        <div>
          <button type="button" className="flecha" aria-label="Mes anterior" onClick={() => setMes(new Date(mes.getFullYear(), mes.getMonth() - 1, 1))}><ChevronLeft size={13} /></button>
          <button type="button" className="flecha" aria-label="Mes siguiente" onClick={() => setMes(new Date(mes.getFullYear(), mes.getMonth() + 1, 1))}><ChevronRight size={13} /></button>
        </div>
      </div>
      <div className="dias">
        {['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'].map((d) => <span key={d} className="sem">{d}</span>)}
        {Array.from({ length: primero }, (_, i) => <span key={`v${i}`} />)}
        {Array.from({ length: total }, (_, i) => i + 1).map((d) => (
          <button type="button" key={d} className={`${clase(d)} ${sel === d ? 'sel' : ''}`} onClick={() => setSel(d)} aria-label={`${d} de ${nombre}`} aria-pressed={sel === d}>{d}</button>
        ))}
      </div>
      <div className="cal-ley">
        <span><i style={{ background: 'var(--verde)' }} />Visitado</span>
        <span><i style={{ background: 'var(--naranja)' }} />Hoy</span>
        <span><i style={{ background: 'var(--rosa)' }} />Próxima ruta</span>
      </div>
    </div>
  );
}
