import Contornos from './Contornos.jsx';
import Palabras from './Palabras.jsx';
import Sala, { ICONO_CATEGORIA } from './Sala.jsx';
import { CATEGORIAS, ITINERARIO_DEMO, obtenerSitio } from '../datos.js';

/** Logotipo: disco naranja con la sierra y el sol. */
export function MarcaIcono({ tam = 28 }) {
  return (
    <svg viewBox="0 0 32 32" width={tam} height={tam} aria-hidden="true">
      <circle cx="16" cy="16" r="15" className="marca-disco" />
      <path d="M6 22 L13 12 L17 17 L20 13 L26 22 Z" className="marca-cerro" />
      <circle cx="21.5" cy="9.5" r="2.4" className="marca-sol" />
    </svg>
  );
}

export function Marca() {
  return (
    <span className="marca">
      <MarcaIcono />
      <span>SmartTour<span className="marca-ai">AI</span></span>
    </span>
  );
}

/**
 * Pantallas de acceso con el diseño Fitness: sala desenfocada de fondo y dos paneles
 * de vidrio (marca y agenda de ejemplo a la izquierda, formulario a la derecha).
 */
export default function AuthLayout({ titulo, subtitulo, children, pie, semilla = 3 }) {
  return (
    <div className="auth capa">
      <Sala />
      <div className="auth-grid">
        <aside className="vidrio auth-paisaje">
          <Contornos semilla={semilla} picos={4} anillos={11} vivo />
          <Marca />
          <div className="auth-lema">
            <p className="auth-lema-titulo"><Palabras texto="La Sierra Gorda," clave="st-intro-lema" /> <span className="acento">a tu ritmo.</span></p>
            <p className="auth-lema-texto">Dinos cuánto tiempo tienes y qué te interesa. Armamos la ruta por ti.</p>
          </div>
          <div className="auth-muestra" aria-label="Ejemplo de recorrido">
            <h3>Un recorrido de ejemplo</h3>
            {ITINERARIO_DEMO.paradas.map((p, k) => {
              const sitio = obtenerSitio(p.id);
              const Icono = ICONO_CATEGORIA[sitio.categoria];
              return (
                <div className="cita sube" key={p.id} style={{ '--i': k + 2 }}>
                  <span className="miniatura" style={{ '--degradado': CATEGORIAS[sitio.categoria].degradado }}><Icono size={20} aria-hidden="true" /></span>
                  <span className="t"><span className="tag">{sitio.categoria}</span><b>{sitio.nombre}</b><small>{sitio.visitaMin} min de visita</small></span>
                  <span className="h">{p.hora}</span>
                </div>
              );
            })}
          </div>
          <p className="auth-cobertura">Cobertura actual: Jalpan de Serra, Qro.</p>
        </aside>

        <main className="vidrio auth-hoja">
          <div className="auth-contenido sube" style={{ '--i': 1 }}>
            <h1>{titulo}</h1>
            {subtitulo && <p className="auth-subtitulo">{subtitulo}</p>}
            {children}
            {pie && <div className="auth-pie">{pie}</div>}
          </div>
        </main>
      </div>
    </div>
  );
}
