import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { CircleCheck } from 'lucide-react';
import { ITINERARIO_DEMO } from './datos.js';
import { llamarAPI } from './api.js';

/**
 * Estado compartido entre pantallas:
 *  - itinerario: el último itinerario generado (y sitios agregados desde el detalle).
 *  - usuario: datos del perfil (api/perfil/obtener_perfil.php), se piden una sola vez.
 *  - avisar(texto): muestra un aviso breve en la parte baja de la pantalla.
 */
const Contexto = createContext(null);

export function EstadoProvider({ children }) {
  const [itinerario, setItinerario] = useState(ITINERARIO_DEMO);
  const [usuario, setUsuario] = useState(null);
  const pidiendo = useRef(false);
  // El aviso se queda montado; data-open controla entrada y salida (transición interrumpible).
  const [aviso, setAviso] = useState({ texto: '', abierto: false });
  const temporizador = useRef();

  const avisar = useCallback((texto) => {
    clearTimeout(temporizador.current);
    setAviso({ texto, abierto: true });
    temporizador.current = setTimeout(() => setAviso((a) => ({ ...a, abierto: false })), 2600);
  }, []);

  const cargarUsuario = useCallback(() => {
    if (pidiendo.current) return;
    pidiendo.current = true;
    llamarAPI('perfil/obtener_perfil.php', null, 'GET').then((r) => {
      if (r.success) setUsuario(r.usuario);
      else pidiendo.current = false;
    });
  }, []);

  const agregarParada = useCallback((id) => {
    setItinerario((actual) =>
      actual.paradas.some((p) => p.id === id)
        ? actual
        : { ...actual, paradas: [...actual.paradas, { id, hora: 'Por definir', traslado: 'Se calculará al regenerar la ruta' }] }
    );
  }, []);

  return (
    <Contexto.Provider value={{ itinerario, setItinerario, agregarParada, avisar, usuario, setUsuario, cargarUsuario }}>
      {children}
      <div className="aviso-zona" aria-live="polite">
        <div className="aviso" data-open={aviso.abierto} aria-hidden={!aviso.abierto}>
          <CircleCheck size={15} strokeWidth={2.6} aria-hidden="true" />{aviso.texto}
        </div>
      </div>
    </Contexto.Provider>
  );
}

export const useEstado = () => useContext(Contexto);

export const iniciales = (nombre = '') => nombre.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('');
