import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Clock, Flame, Landmark, MapPin, Mic, Sparkles, Star } from 'lucide-react';
import AppLayout from '../components/AppLayout.jsx';
import { ICONO_CATEGORIA } from '../components/Sala.jsx';
import Mapa from '../components/Mapa.jsx';
import { Cuenta, GraficaArea, Latido, Medidor, MiniBarras, TarjetaCifra } from '../components/Graficas.jsx';
import { Girando, Mensaje, TextoCambiante } from '../components/Formulario.jsx';
import { CATEGORIAS, ITINERARIO_DEMO, SITIOS } from '../datos.js';
import { llamarAPI } from '../api.js';
import { useEstado } from '../estado.jsx';

const TIEMPOS = ['Medio día', 'Día completo', 'Fin de semana'];
const FILTROS = ['Todas', 'Misiones', 'Ecoturismo', 'Historia'];
export { ICONO_CATEGORIA };

/**
 * Pide al backend que genere un itinerario con el componente de IA
 * (grafos + búsqueda heurística). Por ahora responde con datos simulados.
 */
const generarItinerario = (datos) => llamarAPI('itinerarios/generar_itinerario.php', datos);

// Datos de ejemplo para la gráfica "Mejor época para visitar".
const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const SERIES = [
  { nombre: 'Afluencia', datos: [38, 42, 61, 66, 44, 40, 58, 62, 41, 47, 52, 74], max: 80, unidad: '%', descripcion: 'Afluencia turística estimada por mes' },
  { nombre: 'Temperatura', datos: [18, 20, 24, 27, 29, 28, 27, 27, 26, 24, 21, 19], max: 40, unidad: '°C', descripcion: 'Temperatura promedio por mes' },
];

function GrupoOpciones({ leyenda, nombre, opciones, valor, onChange }) {
  return (
    <fieldset className="opciones">
      <legend>{leyenda}</legend>
      <div className="opciones-lista">
        {opciones.map((o) => (
          <label key={o} className="opcion">
            <input type="radio" name={nombre} value={o} checked={valor === o} onChange={() => onChange(o)} />
            <span>{o}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Ilustración de la "foto": la misión entre cerros (en lugar del corredor del diseño original). */
function FotoMision() {
  return (
    <div className="foto" aria-hidden="true">
      <i className="sol" /><i className="cerro c1" /><i className="cerro c2" /><i className="acera" />
      <svg className="mision" viewBox="0 0 80 90">
        <path className="muro-m" d="M10 90V44h10V30l6-8 6 8v14h16V30l6-8 6 8v14h10v46z" />
        <path className="detalle-m" d="M33 44c0-8 4-14 7-14s7 6 7 14z" />
        <path className="puerta-m" d="M33 90V68a7 7 0 0 1 14 0v22z" />
        <path className="detalle-m" d="M22 52h6v8h-6zM52 52h6v8h-6z" />
        <path className="cruz-m" d="M26 22v-9M23 16h6M54 22v-9M51 16h6M40 30v-8M37 25h6" />
      </svg>
    </div>
  );
}

export default function Inicio() {
  const navegar = useNavigate();
  const { setItinerario, usuario } = useEstado();
  const [busqueda, setBusqueda] = useState('');
  const [tiempo, setTiempo] = useState('Medio día');
  const [categoria, setCategoria] = useState('Todas');
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [serie, setSerie] = useState(0);

  async function generar(evento) {
    evento.preventDefault();
    setMensaje(null);
    setCargando(true);
    const resultado = await generarItinerario({ busqueda: busqueda.trim(), categoria, tiempo_disponible: tiempo });
    setCargando(false);
    if (resultado.success) {
      setItinerario({ ...ITINERARIO_DEMO, ...resultado.itinerario, plazo: `Para ${tiempo.toLowerCase()}` });
      navegar('/itinerario', { state: { recienGenerado: true } });
    } else {
      setMensaje({ tipo: 'error', texto: resultado.message || 'No pudimos generar el itinerario. Intenta de nuevo.' });
    }
  }

  const hora = new Date().getHours();
  const saludo = hora < 12 ? 'Buenos días' : hora < 19 ? 'Buenas tardes' : 'Buenas noches';
  const nombre = usuario ? usuario.nombre.split(' ')[0] : '';
  const destacados = categoria === 'Todas' ? SITIOS : SITIOS.filter((s) => s.categoria === categoria);
  const promedio = SITIOS.reduce((t, s) => t + s.calificacion, 0) / SITIOS.length;
  const minutosVisita = ITINERARIO_DEMO.paradas.reduce((t, p) => t + SITIOS.find((s) => s.id === p.id).visitaMin, 0);
  const km = parseFloat(ITINERARIO_DEMO.distancia);
  const s = SERIES[serie];

  return (
    <AppLayout
      activa="Explorar"
      titulo={<>{saludo}{nombre && <>, <b>{nombre}</b></>} <span className="mano" aria-hidden="true">👋</span></>}
      subtitulo={<><MapPin size={11} aria-hidden="true" /> Jalpan de Serra, Qro. · ¿Qué quieres conocer hoy?</>}
    >
      <div className="stats4">
        <TarjetaCifra i={1} titulo="Sitios en Jalpan" icono={Landmark} color="#FF6A1A" fondo="#FFF1E8"
          mini={<MiniBarras datos={[5, 8, 6, 9, 7, 10, 8]} color="#FF6A1A" />} valor={<Cuenta v={SITIOS.length} />} unidad="lugares" />
        <TarjetaCifra i={2} titulo="Calificación" icono={Star} color="#F0386B" fondo="#FFE9EF"
          mini={<Latido />} valor={<Cuenta v={promedio} d={1} />} unidad="de 5" />
        <TarjetaCifra i={3} titulo="Ruta sugerida" icono={MapPin} color="#16A34A" fondo="#E9F9EF"
          mini={<Medidor p={km / 20} />} valor={<Cuenta v={km} d={1} />} unidad="de 20 km" />
        <TarjetaCifra i={4} titulo="Tiempo de visita" icono={Clock} color="#4F7CFF" fondo="#ECF1FF"
          mini={<MiniBarras datos={[6, 7, 5, 8, 7, 9, 8]} color="#4F7CFF" />} valor={<Cuenta v={minutosVisita} />} unidad="min" />
      </div>

      <div className="fila2">
        <form className="blanca planeador sube" style={{ '--i': 5 }} onSubmit={generar}>
          <div className="tarjeta-head">
            <h2><Sparkles size={16} aria-hidden="true" /> Planea tu ruta</h2>
            <span className="chip-gris">IA · búsqueda heurística</span>
          </div>
          <div className="prompt">
            <label htmlFor="busqueda" className="solo-lectores">¿Qué quieres conocer hoy?</label>
            <textarea id="busqueda" rows={2} value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder='Ej. "Quiero visitar 3 sitios en Jalpan"' />
            <button type="button" className="prompt-voz" disabled aria-label="Dictar por voz (próximamente)" title="Dictado por voz: próximamente"><Mic size={16} /></button>
          </div>
          <GrupoOpciones leyenda="Tiempo disponible" nombre="tiempo" opciones={TIEMPOS} valor={tiempo} onChange={setTiempo} />
          <GrupoOpciones leyenda="Me interesa" nombre="categoria" opciones={FILTROS} valor={categoria} onChange={setCategoria} />
          <Mensaje mensaje={mensaje} />
          <button type="submit" className="boton boton-primario" disabled={cargando} aria-busy={cargando}>
            <TextoCambiante clave={cargando ? 'cargando' : 'listo'}>
              {cargando ? <Girando /> : <Sparkles size={16} aria-hidden="true" />}
              {cargando ? 'Armando tu ruta…' : 'Generar mi itinerario'}
            </TextoCambiante>
          </button>
        </form>

        <div className="blanca alza correr sube" style={{ '--i': 6 }}>
          <div className="datos">
            <h2>Ruta sugerida: Misiones y centro</h2>
            <div className="km"><Cuenta v={km} d={1} /> <small>km</small><span className="lbl">Distancia del recorrido</span></div>
            <div className="km"><Cuenta v={ITINERARIO_DEMO.paradas.length} /> <small>sitios</small><span className="lbl">Paradas en la ruta</span></div>
            <Link to="/itinerario" className="enlace-boton">Ver itinerario →</Link>
          </div>
          <FotoMision />
        </div>
      </div>

      <div className="fila2">
        <div className="blanca sube" style={{ '--i': 7 }}>
          <div className="tarjeta-head">
            <h2><Flame size={16} aria-hidden="true" /> Mejor época para visitar</h2>
            <button type="button" className="chip-gris" onClick={() => setSerie((serie + 1) % SERIES.length)}>{s.nombre} <ChevronDown size={12} /></button>
          </div>
          <GraficaArea datos={s.datos} etiquetas={MESES} max={s.max} unidad={s.unidad} descripcion={s.descripcion} />
          <p className="tarjeta-pie">Datos de ejemplo hasta conectar estadísticas reales de turismo.</p>
        </div>
        <div className="blanca sube" style={{ '--i': 8 }}>
          <div className="tarjeta-head"><h2><MapPin size={16} aria-hidden="true" /> Cerca de ti</h2></div>
          <Mapa puntos={SITIOS.map((x) => ({ x: x.x, y: x.y, etiqueta: x.nombre.split(' ').slice(0, 2).join(' ') }))} nota="Vista ilustrada. El mapa interactivo se integrará más adelante." />
        </div>
      </div>

      <div className="titulo-sec">
        <h2>Sitios destacados de Jalpan</h2>
        <button type="button" className="ver" onClick={() => setCategoria('Todas')}>Ver todo</button>
      </div>
      {destacados.length === 0 ? (
        <p className="vacio">Aún no hay sitios de esta categoría. Prueba con “Todas”.</p>
      ) : (
        <div className="dieta">
          {destacados.map((sitio, k) => {
            const Icono = ICONO_CATEGORIA[sitio.categoria];
            return (
              <Link key={sitio.id} to={`/destino/${sitio.id}`} className={`blanca plato sube ${k === 0 ? 'on' : ''}`} style={{ '--i': 9 + k }}>
                <div>
                  <b>{sitio.nombre}</b>
                  <p>{sitio.resena}</p>
                  <span className="dia"><Star size={11} aria-hidden="true" /> {sitio.calificacion} · {sitio.categoria}</span>
                </div>
                <span className="cuenco" style={{ '--degradado': CATEGORIAS[sitio.categoria].degradado }} aria-hidden="true"><Icono size={24} /></span>
              </Link>
            );
          })}
        </div>
      )}
    </AppLayout>
  );
}
