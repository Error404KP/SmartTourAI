import { useId, useRef, useState } from 'react';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';

/** Campo de texto con etiqueta, ícono y (si es contraseña) botón para mostrarla. */
export function Campo({ etiqueta, icono: Icono, type = 'text', ayuda, ...props }) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const esPassword = type === 'password';

  return (
    <div className="campo">
      <label htmlFor={id}>{etiqueta}</label>
      <div className="campo-control">
        {Icono && <Icono className="campo-icono" size={18} aria-hidden="true" />}
        <input id={id} type={esPassword && visible ? 'text' : type} aria-describedby={ayuda ? `${id}-ayuda` : undefined} {...props} />
        {esPassword && (
          <button type="button" className="campo-ojo" onClick={() => setVisible((v) => !v)} aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
            <span className="icono-swap" aria-hidden="true">
              <Eye size={18} data-activo={!visible} />
              <EyeOff size={18} data-activo={visible} />
            </span>
          </button>
        )}
      </div>
      {ayuda && <p id={`${id}-ayuda`} className="campo-ayuda">{ayuda}</p>}
    </div>
  );
}

/**
 * Mensaje de error o éxito de un formulario. Cada mensaje nuevo (aunque repita el texto)
 * vuelve a montar el elemento, así el error se sacude otra vez al reintentar.
 */
export function Mensaje({ mensaje }) {
  const ultimo = useRef(mensaje);
  const vez = useRef(0);
  if (ultimo.current !== mensaje) {
    ultimo.current = mensaje;
    vez.current += 1;
  }
  if (!mensaje) return null;
  return (
    <p key={vez.current} className={`mensaje mensaje-${mensaje.tipo}`} role={mensaje.tipo === 'error' ? 'alert' : 'status'}>
      {mensaje.texto}
    </p>
  );
}

/**
 * Contenido de botón que cambia en su lugar ("Guardar" -> "Guardado").
 * Solo anima cuando `clave` cambia respecto a la primera; al montar no se mueve nada.
 */
export function TextoCambiante({ clave, children }) {
  const primera = useRef(clave);
  return (
    <span key={clave} className={clave !== primera.current ? 'texto-cambio' : 'texto-fijo'}>
      {children}
    </span>
  );
}

/** Indicador de espera dentro de un botón. */
export const Girando = () => <LoaderCircle size={18} className="girando" aria-hidden="true" />;

/** Botón que muestra un texto distinto mientras espera a la API. */
export function BotonEnvio({ cargando, textoCargando, children, className = 'boton boton-primario', ...props }) {
  return (
    <button type="submit" className={className} disabled={cargando} aria-busy={cargando} {...props}>
      <TextoCambiante clave={cargando ? 'cargando' : 'listo'}>{cargando ? <><Girando />{textoCargando}</> : children}</TextoCambiante>
    </button>
  );
}

/** Lee los campos de un <form> como objeto plano (por su atributo name). */
export const leerFormulario = (formulario) => Object.fromEntries(new FormData(formulario));
