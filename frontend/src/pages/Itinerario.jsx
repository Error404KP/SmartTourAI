import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark, Check, ChevronDown, Clock, Download, MapPin, Navigation, Route, Shuffle, Wallet } from 'lucide-react';
import AppLayout from '../components/AppLayout.jsx';
import Mapa from '../components/Mapa.jsx';
import { Cuenta, Latido, Medidor, MiniBarras, TarjetaCifra } from '../components/Graficas.jsx';
import { Girando, TextoCambiante } from '../components/Formulario.jsx';
import { obtenerSitio } from '../datos.js';
import { llamarAPI } from '../api.js';
import { useEstado } from '../estado.jsx';

const guardarItinerario = (datos) => llamarAPI('itinerarios/guardar_itinerario.php', datos);

/** Minutos de un texto como "15 min de traslado" (0 si todavía no se calcula). */
const minutos = (texto) => parseInt(texto, 10) || 0;
const formatoMin = (min) => (min < 60 ? `${min} min` : `${Math.floor(min / 60)} h${min % 60 ? ` ${min % 60} min` : ''}`);

/** Reparte el día en segmentos de visita y traslado, en el orden del recorrido. */
function resumirDia(paradas) {
  const segmentos = paradas.flatMap((p) => {
    const sitio = obtenerSitio(p.id);
    const traslado = minutos(p.traslado ?? '');
    return [
      ...(traslado ? [{ tipo: 'traslado', min: traslado, nombre: 'Traslado' }] : []),
      { tipo: 'visita', min: sitio.visitaMin, nombre: sitio.nombre },
    ];
  });
  const visitas = segmentos.filter((s) => s.tipo === 'visita').reduce((t, s) => t + s.min, 0);
  const traslados = segmentos.filter((s) => s.tipo === 'traslado').reduce((t, s) => t + s.min, 0);
  return { segmentos, visitas, traslados, total: visitas + traslados };
}

function BarraDia({ dia: { segmentos, visitas, traslados, total } }) {
  return (
    <div>
      <div className="tarjeta-head"><h2><Clock size={16} aria-hidden="true" /> Tu día</h2><span className="chip-gris">{formatoMin(total)} en total</span></div>
      <div className="dia-barra" role="img" aria-label={`${visitas} minutos de visitas y ${traslados} de traslados`}>
        {segmentos.map((s, i) => (
          <span key={i} className={`dia-segmento dia-${s.tipo}`} style={{ flexGrow: s.min }} title={`${s.nombre}: ${s.min} min`} />
        ))}
      </div>
      <ul className="dia-leyenda" aria-hidden="true">
        <li style={{ '--muestra': 'var(--naranja)' }}>Visitas <strong>{visitas} min</strong></li>
        <li style={{ '--muestra': '#D6D0CA' }}>Traslados <strong>{traslados} min</strong></li>
      </ul>
    </div>
  );
}

function Parada({ parada, numero, retraso }) {
  const [abierta, setAbierta] = useState(false);
  const sitio = obtenerSitio(parada.id);
  return (
    <li className="parada-item" style={{ '--retraso': retraso }}>
      {parada.traslado && <p className="parada-traslado">{parada.traslado}</p>}
      <div className="blanca alza parada">
        <button type="button" className="parada-cabeza" aria-expanded={abierta} onClick={() => setAbierta((a) => !a)}>
          <span className="parada-numero" aria-hidden="true">{numero}</span>
          <span className="parada-texto">
            <span className="parada-hora">{parada.hora}</span>
            <span className="parada-nombre">{sitio.nombre}</span>
          </span>
          <span className="parada-visita">{sitio.visitaMin} min</span>
          <ChevronDown size={18} className="parada-flecha" aria-hidden="true" />
        </button>
        {/* Siempre montado para animar apertura y cierre; inert lo saca del tabulador cuando está cerrado. */}
        <div className="parada-detalle" data-open={abierta} inert={abierta ? undefined : ''}>
          <div className="parada-detalle-interior">
            <div className="parada-detalle-contenido">
              <p>{sitio.resena}</p>
              <Link to={`/destino/${sitio.id}`}>Ver detalle del sitio →</Link>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Itinerario() {
  const { itinerario, avisar } = useEstado();
  const { pathname, state } = useLocation();
  const navegar = useNavigate();
  // La ruta se dibuja solo al llegar desde "Generar".
  const [animarRuta] = useState(() => Boolean(state?.recienGenerado));
  const [guardado, setGuardado] = useState('no'); // 'no' | 'guardando' | 'si'
  const sitios = itinerario.paradas.map((p) => obtenerSitio(p.id));
  const dia = resumirDia(itinerario.paradas);
  const km = parseFloat(itinerario.distancia) || 0;

  useEffect(() => {
    if (state?.recienGenerado) navegar(pathname, { replace: true, state: null });
  }, [state, pathname, navegar]);

  async function guardar() {
    setGuardado('guardando');
    const resultado = await guardarItinerario({ id_itinerario: itinerario.id });
    setGuardado(resultado.success ? 'si' : 'no');
    if (resultado.success) avisar('Itinerario guardado en tu perfil');
    else avisar(resultado.message || 'No se pudo guardar el itinerario. Intenta de nuevo.');
  }

  return (
    <AppLayout
      activa="Itinerario"
      titulo={<>Tu itinerario: <b>{sitios.length} sitios en Jalpan</b></>}
      subtitulo={`${itinerario.plazo} · ruta continua según cercanía y tu tiempo disponible`}
      acciones={
        <div className="herr">
          <span className="pastilla pastilla-vidrio">{itinerario.plazo}</span>
          <Link to="/inicio" className="boton-icono" aria-label="Volver a explorar"><ArrowLeft size={16} /></Link>
        </div>
      }
    >
      <div className="stats4">
        <TarjetaCifra i={1} titulo="Duración" icono={Clock} color="#FF6A1A" fondo="#FFF1E8"
          mini={<MiniBarras datos={dia.segmentos.map((s) => s.min)} color="#FF6A1A" resaltar={0} />} valor={<Cuenta v={dia.total} />} unidad="min" />
        <TarjetaCifra i={2} titulo="Distancia" icono={Route} color="#F0386B" fondo="#FFE9EF"
          mini={<Latido />} valor={<Cuenta v={km} d={1} />} unidad="km" />
        <TarjetaCifra i={3} titulo="Costo estimado" icono={Wallet} color="#16A34A" fondo="#E9F9EF"
          mini={<Medidor p={1} />} valor={itinerario.costo === '$0' ? 'Gratis' : itinerario.costo} unidad="entradas libres" />
        <TarjetaCifra i={4} titulo="Paradas" icono={MapPin} color="#4F7CFF" fondo="#ECF1FF"
          mini={<MiniBarras datos={sitios.map((s) => s.visitaMin)} color="#4F7CFF" />} valor={<Cuenta v={sitios.length} />} unidad="sitios" />
      </div>

      <div className="fila2">
        <div className="blanca sube" style={{ '--i': 5 }}>
          <div className="tarjeta-head">
            <h2><Route size={16} aria-hidden="true" /> Ruta en el mapa</h2>
            <button type="button" className="chip-gris" onClick={() => avisar('Comparar rutas alternativas estará disponible pronto')}><Shuffle size={12} aria-hidden="true" /> Ruta alternativa</button>
          </div>
          <Mapa ruta animar={animarRuta} semilla={33} puntos={sitios.map((x) => ({ x: x.x, y: x.y, etiqueta: x.nombre.split(' ').slice(0, 2).join(' ') }))} />
        </div>
        <div className="blanca sube" style={{ '--i': 6 }}>
          <BarraDia dia={dia} />
          <div className="estrategia">
            <p><strong>Cómo la armamos:</strong> {itinerario.estrategia}</p>
          </div>
          <div className="acciones">
            <button type="button" className="boton boton-primario" onClick={() => avisar('La navegación en vivo estará disponible pronto')}>
              <Navigation size={16} aria-hidden="true" /> Iniciar navegación en vivo
            </button>
            <div className="acciones-secundarias">
              <button type="button" className={`boton boton-contorno ${guardado === 'si' ? 'boton-confirmado' : ''}`} onClick={guardar} disabled={guardado !== 'no'}>
                <TextoCambiante clave={guardado}>
                  {guardado === 'si' ? <Check size={16} aria-hidden="true" /> : guardado === 'guardando' ? <Girando /> : <Bookmark size={16} aria-hidden="true" />}
                  {{ no: 'Guardar', guardando: 'Guardando…', si: 'Guardado' }[guardado]}
                </TextoCambiante>
              </button>
              <button type="button" className="boton boton-contorno" onClick={() => avisar('La descarga sin conexión estará disponible pronto')}>
                <Download size={16} aria-hidden="true" /> Sin conexión
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="titulo-sec"><h2>Tu recorrido</h2><span className="ver">Toca una parada para ver el detalle</span></div>
      <ol className={`drills ${animarRuta ? 'sendero-animado' : ''}`}>
        {itinerario.paradas.map((p, i) => (
          <Parada key={p.id} parada={p} numero={i + 1} retraso={`${150 + i * 220}ms`} />
        ))}
      </ol>
    </AppLayout>
  );
}
