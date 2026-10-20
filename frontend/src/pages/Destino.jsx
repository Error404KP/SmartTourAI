import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Bookmark, Check, Clock, Info, MapPin, Plus, Share2, Sparkles, Star, Sun } from 'lucide-react';
import AppLayout from '../components/AppLayout.jsx';
import { ICONO_CATEGORIA } from '../components/Sala.jsx';
import { Girando, TextoCambiante } from '../components/Formulario.jsx';
import { Cuenta } from '../components/Graficas.jsx';
import Contornos from '../components/Contornos.jsx';
import { CATEGORIAS, obtenerSitio } from '../datos.js';
import { llamarAPI } from '../api.js';
import { useEstado } from '../estado.jsx';

const obtenerDetalleDestino = (id) => llamarAPI(`destinos/obtener_detalle_destino.php?id=${encodeURIComponent(id)}`, null, 'GET');

export default function Destino() {
  const { id } = useParams();
  const navegar = useNavigate();
  const { itinerario, agregarParada, avisar } = useEstado();
  const [agregando, setAgregando] = useState(false);
  const sitio = obtenerSitio(id);
  if (!sitio) return <Navigate to="/inicio" replace />;

  const cat = CATEGORIAS[sitio.categoria];
  const yaAgregado = itinerario.paradas.some((p) => p.id === sitio.id);
  const Icono = ICONO_CATEGORIA[sitio.categoria];

  async function agregar() {
    setAgregando(true);
    const resultado = await obtenerDetalleDestino(sitio.id);
    setAgregando(false);
    if (!resultado.success) {
      avisar(resultado.message || 'No se pudo agregar el sitio.');
      return;
    }
    agregarParada(sitio.id);
    avisar(`${sitio.nombre} se agregó a tu itinerario`);
  }

  async function compartir() {
    if (navigator.share) {
      try { await navigator.share({ title: sitio.nombreCompleto, url: window.location.href }); } catch { /* el usuario canceló */ }
    } else {
      await navigator.clipboard?.writeText(window.location.href);
      avisar('Enlace copiado');
    }
  }

  return (
    <AppLayout
      activa="Explorar"
      titulo={<b>{sitio.nombreCompleto}</b>}
      subtitulo={<><MapPin size={11} aria-hidden="true" /> {sitio.direccion}</>}
      acciones={
        <div className="herr">
          <button type="button" className="boton-icono" onClick={() => navegar(-1)} aria-label="Volver"><ArrowLeft size={16} /></button>
          <button type="button" className="boton-icono" aria-label="Guardar sitio" onClick={() => avisar('Guardar sitios estará disponible pronto')}><Bookmark size={16} /></button>
          <button type="button" className="boton-icono" aria-label="Compartir" onClick={compartir}><Share2 size={16} /></button>
        </div>
      }
    >
      <div className="fila2">
        <div className="blanca alza correr sube" style={{ '--i': 1 }}>
          <div className="datos">
            <span className="pastilla" style={{ background: cat.suave, color: cat.color, justifySelf: 'start', alignSelf: 'flex-start' }}>{sitio.categoria}</span>
            <div className="km"><Cuenta v={sitio.calificacion} d={1} /> <small>de 5</small><span className="lbl">Calificación de visitantes</span></div>
            <div className="km"><Cuenta v={sitio.visitaMin} /> <small>min</small><span className="lbl">Visita recomendada · Abierto hoy</span></div>
          </div>
          <div className="portada" style={{ '--degradado': cat.degradado }} role="img" aria-label="Foto principal del sitio (pendiente)">
            <Contornos semilla={sitio.nombre.length * 13} picos={3} anillos={9} />
            <Icono size={64} strokeWidth={1.2} aria-hidden="true" />
            <span className="foto-nota">Foto principal (pendiente)</span>
          </div>
        </div>

        <div className="blanca sube" style={{ '--i': 2 }}>
          <div className="tarjeta-head"><h2><Sparkles size={16} aria-hidden="true" /> Reseña de SmartTour AI</h2></div>
          <p className="resena-texto">{sitio.resena}</p>
          <ul className="datos-sitio" style={{ marginTop: 12 }}>
            <li><Clock size={14} aria-hidden="true" /> {sitio.visitaMin} min recomendados</li>
            <li><Star size={14} className="estrella" aria-hidden="true" /> {sitio.calificacion} de 5</li>
          </ul>
        </div>
      </div>

      <div className="blanca sube" style={{ '--i': 3, marginTop: 12 }}>
        <div className="tarjeta-head"><h2>Antes de ir</h2></div>
        <dl className="zonas">
          <div className="zona">
            <dt><Sun size={15} aria-hidden="true" /> Mejor horario</dt>
            <dd>{sitio.mejorHorario}</dd>
          </div>
          <div className="zona">
            <dt><Info size={15} aria-hidden="true" /> Normas del lugar</dt>
            <dd>{sitio.normas}</dd>
          </div>
        </dl>
      </div>

      <div className="titulo-sec"><h2>Galería</h2><span className="ver">Fotos pendientes</span></div>
      <div className="galeria">
        {[1, 2, 3].map((n) => (
          <div key={n} className="galeria-foto sube" style={{ '--degradado': cat.degradado, '--i': 3 + n }} role="img" aria-label={`Foto ${n} pendiente`}>
            <Contornos semilla={n * 97} picos={2} anillos={5} />
            <span>Foto {n}</span>
          </div>
        ))}
      </div>

      <div className="barra-accion">
        <button type="button" className="boton boton-primario" onClick={agregar} disabled={agregando || yaAgregado} aria-busy={agregando}>
          <TextoCambiante clave={yaAgregado ? 'agregado' : agregando ? 'agregando' : 'agregar'}>
            {yaAgregado ? <><Check size={16} aria-hidden="true" /> Ya está en tu itinerario</> : <>{agregando ? <Girando /> : <Plus size={16} aria-hidden="true" />} {agregando ? 'Agregando…' : 'Agregar a mi itinerario'}</>}
          </TextoCambiante>
        </button>
      </div>
    </AppLayout>
  );
}
