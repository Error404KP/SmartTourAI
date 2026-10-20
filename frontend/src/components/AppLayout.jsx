import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Bookmark, ChevronDown, CircleHelp, Compass, Ellipsis, Route, Search, Settings, User } from 'lucide-react';
import Sala, { ICONO_CATEGORIA } from './Sala.jsx';
import Calendario from './Calendario.jsx';
import { MarcaIcono } from './AuthLayout.jsx';
import { CATEGORIAS, SITIOS, obtenerSitio } from '../datos.js';
import { iniciales, useEstado } from '../estado.jsx';

const SECCIONES = [
  { a: '/inicio', texto: 'Explorar', icono: Compass },
  { a: '/itinerario', texto: 'Itinerario', icono: Route },
  { a: '/perfil#guardados', texto: 'Guardados', icono: Bookmark },
  { a: '/perfil', texto: 'Perfil', icono: User },
];

const normalizar = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/** Riel de íconos (izquierda en escritorio, barra superior en celular). */
function Riel({ activa }) {
  const { avisar } = useEstado();
  return (
    <nav className="vidrio riel" aria-label="Secciones">
      <Link to="/inicio" className="marca-riel" aria-label="SmartTour AI, ir a explorar"><MarcaIcono tam={34} /></Link>
      {SECCIONES.map(({ a, texto, icono: Icono }) => (
        <Link key={texto} to={a} className={`rbtn ${activa === texto ? 'on' : ''}`} aria-label={texto} aria-current={activa === texto ? 'page' : undefined}>
          <Icono size={19} strokeWidth={1.8} aria-hidden="true" /><span className="tip">{texto}</span>
        </Link>
      ))}
      <button type="button" className="rbtn" onClick={() => avisar('Centro de ayuda: próximamente')} aria-label="Ayuda"><CircleHelp size={19} strokeWidth={1.8} /><span className="tip">Ayuda</span></button>
      <button type="button" className="rbtn" onClick={() => avisar('Ajustes de la cuenta: próximamente')} aria-label="Ajustes"><Settings size={19} strokeWidth={1.8} /><span className="tip">Ajustes</span></button>
      <span className="sep" />
      <span className="extra" aria-hidden="true" />
    </nav>
  );
}

/** Buscador de sitios + campana (herramientas por defecto de la cabecera). */
function Herramientas() {
  const [q, setQ] = useState('');
  const navegar = useNavigate();
  const { avisar } = useEstado();
  function buscar(e) {
    if (e.key !== 'Enter' || !q.trim()) return;
    const sitio = SITIOS.find((s) => normalizar(s.nombreCompleto).includes(normalizar(q.trim())));
    if (sitio) { setQ(''); navegar(`/destino/${sitio.id}`); } else avisar(`No encontramos “${q.trim()}” en Jalpan`);
  }
  return (
    <div className="herr">
      <label className="buscar">
        <Search size={15} aria-hidden="true" />
        <span className="solo-lectores">Buscar un sitio</span>
        <input placeholder="Busca un sitio de Jalpan…" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={buscar} />
      </label>
      <button type="button" className="boton-icono con-punto" aria-label="Notificaciones" onClick={() => avisar('Tu itinerario de hoy está listo')}><Bell size={16} /></button>
    </div>
  );
}

/** Panel derecho: perfil, medidas, calendario y el recorrido de hoy. */
function PanelDerecho() {
  const { usuario, itinerario, avisar } = useEstado();
  return (
    <aside className="vidrio derecha" aria-label="Perfil y agenda">
      <div className="perfil-mini">
        <span className="cara" aria-hidden="true">{usuario ? iniciales(usuario.nombre) : ''}</span>
        <div>
          <b>{usuario ? usuario.nombre : <span className="esqueleto esqueleto-titulo" />} <ChevronDown size={12} aria-hidden="true" /></b>
          <small>{usuario?.correo ?? 'Cargando…'}</small>
        </div>
        <Link to="/perfil" className="mas" aria-label="Ir a mi perfil"><Ellipsis size={16} strokeWidth={3} /></Link>
      </div>
      <div className="medidas">
        <div><b className="num">{usuario?.rutas ?? '–'}</b><small>Rutas</small></div>
        <div><b className="num">{usuario?.sitios ?? '–'}</b><small>Sitios</small></div>
        <div><b className="num">{itinerario.paradas.length}</b><small>Paradas hoy</small></div>
      </div>
      <Calendario />
      <div className="agenda">
        <h3><span>Tu recorrido de hoy</span><Link to="/itinerario" className="ver">Ver todo</Link></h3>
        {itinerario.paradas.map((p, k) => {
          const sitio = obtenerSitio(p.id);
          const Icono = ICONO_CATEGORIA[sitio.categoria];
          return (
            <Link to={`/destino/${sitio.id}`} className="cita sube" key={p.id} style={{ '--i': k + 4 }}>
              <span className="miniatura" style={{ '--degradado': CATEGORIAS[sitio.categoria].degradado }}><Icono size={20} aria-hidden="true" /></span>
              <span className="t"><span className="tag">{sitio.categoria}</span><b>{sitio.nombre}</b><small>{sitio.visitaMin} min de visita</small></span>
              <span className="h">{p.hora}</span>
            </Link>
          );
        })}
        <button type="button" className="ver" onClick={() => avisar('Sincronizar con tu calendario: próximamente')}>+ Agregar a mi calendario</button>
      </div>
    </aside>
  );
}

/**
 * Marco de las pantallas internas (diseño Fitness):
 * riel | panel central (cabecera + contenido) | panel derecho.
 */
export default function AppLayout({ children, activa, titulo, subtitulo, acciones }) {
  const { pathname } = useLocation();
  const { cargarUsuario } = useEstado();
  useEffect(() => { cargarUsuario(); }, [cargarUsuario]);

  return (
    <div className="fit capa">
      <Sala />
      <div className="fit-grid">
        <Riel activa={activa} />
        <main className="vidrio centro">
          <div key={pathname}>
            <div className="cabeza">
              <div className="cabeza-texto">
                <div>
                  <h1>{titulo}</h1>
                  {subtitulo && <p>{subtitulo}</p>}
                </div>
              </div>
              {acciones ?? <Herramientas />}
            </div>
            {children}
          </div>
        </main>
        <PanelDerecho />
      </div>
    </div>
  );
}
