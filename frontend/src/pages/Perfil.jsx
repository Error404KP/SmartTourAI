import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Bookmark, LogOut, MapPin, Pencil, Route, ShieldCheck, UserRound } from 'lucide-react';
import AppLayout from '../components/AppLayout.jsx';
import { Cuenta, Medidor, MiniBarras, TarjetaCifra } from '../components/Graficas.jsx';
import { SITIOS } from '../datos.js';
import { llamarAPI } from '../api.js';
import { useEstado } from '../estado.jsx';

const actualizarPerfil = (datos) => llamarAPI('perfil/actualizar_perfil.php', datos);
const listarItinerariosGuardados = () => llamarAPI('itinerarios/listar_itinerarios.php', null, 'GET');

// Fechas de ejemplo mientras la API no las devuelva.
const FECHAS_DEMO = { 'demo-001': '12 oct 2026', 'demo-002': '30 sep 2026' };

// Preferencias de avisos: solo visuales hasta que exista backend.
const AVISOS = [
  ['Recordatorio antes de cada visita', '15 min antes de la hora de la parada'],
  ['Cambios de clima en la ruta', 'Lluvia o calor fuerte en Jalpan'],
  ['Nuevos sitios en Jalpan', 'Cuando agreguemos lugares al catálogo'],
];

export default function Perfil() {
  const navegar = useNavigate();
  const { hash } = useLocation();
  const { avisar, usuario, setUsuario } = useEstado();
  const [guardados, setGuardados] = useState(null);
  const [editando, setEditando] = useState(false);
  const [nombre, setNombre] = useState('');
  const [avisos, setAvisos] = useState([true, false, true]);
  const seccionGuardados = useRef(null);

  useEffect(() => {
    listarItinerariosGuardados().then((r) => setGuardados(r.success ? r.itinerarios : []));
  }, []);

  useEffect(() => {
    if (hash === '#guardados' && guardados) {
      const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      seccionGuardados.current?.scrollIntoView({ behavior: reducido ? 'auto' : 'smooth' });
    }
  }, [hash, guardados]);

  async function guardarNombre(evento) {
    evento.preventDefault();
    const limpio = nombre.trim();
    if (!limpio) {
      avisar('Escribe tu nombre para guardarlo');
      return;
    }
    const resultado = await actualizarPerfil({ nombre: limpio });
    if (resultado.success) {
      setUsuario((u) => ({ ...u, nombre: limpio }));
      setEditando(false);
      avisar('Nombre actualizado');
    } else {
      avisar(resultado.message || 'No se pudo actualizar el nombre');
    }
  }

  return (
    <AppLayout
      activa={hash === '#guardados' ? 'Guardados' : 'Perfil'}
      titulo={<>Mi <b>perfil</b></>}
      subtitulo="Administra tu cuenta, tus avisos y tus rutas guardadas."
    >
      <div className="stats4">
        <TarjetaCifra i={1} titulo="Rutas guardadas" icono={Bookmark} color="#FF6A1A" fondo="#FFF1E8"
          mini={<MiniBarras datos={[3, 5, 4, 7, 6, 8, 6]} color="#FF6A1A" />} valor={usuario ? <Cuenta v={usuario.rutas} /> : '–'} unidad="rutas" />
        <TarjetaCifra i={2} titulo="Sitios visitados" icono={MapPin} color="#16A34A" fondo="#E9F9EF"
          mini={<Medidor p={usuario ? Math.min(1, usuario.sitios / (SITIOS.length + 2)) : 0} />} valor={usuario ? <Cuenta v={usuario.sitios} /> : '–'} unidad="lugares" />
        <TarjetaCifra i={3} titulo="Itinerarios" icono={Route} color="#4F7CFF" fondo="#ECF1FF"
          mini={<MiniBarras datos={[4, 6, 5, 8, 6, 7, 9]} color="#4F7CFF" />} valor={guardados ? <Cuenta v={guardados.length} /> : '–'} unidad="en tu lista" />
        <TarjetaCifra i={4} titulo="Cuenta" icono={ShieldCheck} color="#F0386B" fondo="#FFE9EF"
          mini={<Medidor p={1} color="#F0386B" fondo="#FFE9EF" />} valor="Verificada" />
      </div>

      <div className="fila2 pareja">
        <section className="blanca sube" style={{ '--i': 5 }}>
          <div className="tarjeta-head"><h2><UserRound size={16} aria-hidden="true" /> Tu cuenta</h2></div>
          <dl className="lista-ajustes">
            <div>
              <dt>Nombre</dt>
              {editando ? (
                <dd>
                  <form className="edicion-en-linea" onSubmit={guardarNombre}>
                    <input aria-label="Nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} autoFocus />
                    <button type="submit" className="enlace-boton">Guardar</button>
                    <button type="button" className="enlace-boton enlace-tenue" onClick={() => setEditando(false)}>Cancelar</button>
                  </form>
                </dd>
              ) : (
                <dd>
                  <span>{usuario?.nombre ?? <span className="esqueleto esqueleto-titulo" />}</span>
                  <button type="button" className="enlace-boton" onClick={() => { setNombre(usuario?.nombre ?? ''); setEditando(true); }}>
                    <Pencil size={13} aria-hidden="true" /> Editar
                  </button>
                </dd>
              )}
            </div>
            <div>
              <dt>Correo electrónico</dt>
              <dd><span>{usuario?.correo ?? <span className="esqueleto esqueleto-linea" />}</span></dd>
            </div>
            <div>
              <dt>Contraseña</dt>
              <dd><span aria-label="Oculta">••••••••</span><Link to="/recuperar" className="enlace-boton">Cambiar</Link></dd>
            </div>
          </dl>
          <p className="nota-seguridad"><ShieldCheck size={15} aria-hidden="true" /> Verificaste tu cuenta por correo al registrarte.</p>
        </section>

        <section className="blanca sube" style={{ '--i': 6 }}>
          <div className="tarjeta-head"><h2><Bell size={16} aria-hidden="true" /> Avisos</h2><span className="chip-gris">Próximamente</span></div>
          <div className="alarmas-lista">
            {AVISOS.map(([t, d], k) => (
              <div key={t} className="alarma">
                <div><b>{t}</b><small>{d}</small></div>
                <button type="button" className="interruptor" role="switch" aria-checked={avisos[k]} aria-label={t}
                  onClick={() => setAvisos(avisos.map((x, i) => (i === k ? !x : x)))} />
              </div>
            ))}
          </div>
          <div className="salir">
            {/* Cuando exista manejo real de sesión, esto llamará a una API que la destruya. */}
            <button type="button" className="boton boton-salir" onClick={() => navegar('/login')}>
              <LogOut size={16} aria-hidden="true" /> Cerrar sesión
            </button>
          </div>
        </section>
      </div>

      <div className="titulo-sec" id="guardados" ref={seccionGuardados}>
        <h2>Itinerarios guardados</h2>
        <Link to="/inicio" className="ver">+ Generar otro</Link>
      </div>
      {guardados === null ? (
        <ul className="drills" aria-busy="true">
          <li className="solo-lectores">Cargando tus itinerarios…</li>
          {[0, 1].map((n) => (
            <li key={n} className="blanca drill"><div><span className="esqueleto esqueleto-titulo" /><span className="esqueleto esqueleto-linea" /></div></li>
          ))}
        </ul>
      ) : guardados.length === 0 ? (
        <p className="vacio">Todavía no guardas ninguno. <Link to="/inicio">Genera tu primer itinerario</Link>.</p>
      ) : (
        <ul className="drills">
          {guardados.map((it, k) => (
            <li key={it.id}>
              <Link to="/itinerario" className="blanca alza drill sube" style={{ '--i': 7 + k }}>
                <div><small style={{ color: k === 0 ? 'var(--naranja)' : 'var(--azul-f)' }}>{FECHAS_DEMO[it.id] ?? 'Guardado'}</small><b>{it.nombre}</b></div>
                <span className={`estado ${k === 0 ? 'e-curso' : 'e-mañana'}`}>{it.sitios} sitios →</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AppLayout>
  );
}
