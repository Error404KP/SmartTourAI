import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout.jsx';
import { BotonEnvio, Mensaje } from '../components/Formulario.jsx';
import { llamarAPI } from '../api.js';

const verificarCodigo = (datos) => llamarAPI('auth/verificar_codigo.php', datos);
const reenviarCodigo = (datos) => llamarAPI('auth/reenviar_codigo.php', datos);

const DIGITOS = 6;
const ESPERA_REENVIO = 30;

export default function Verificar() {
  const navegar = useNavigate();
  const [parametros] = useSearchParams();
  const correo = parametros.get('correo') ?? '';
  const [codigo, setCodigo] = useState(Array(DIGITOS).fill(''));
  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [espera, setEspera] = useState(ESPERA_REENVIO);
  const campos = useRef([]);

  useEffect(() => {
    if (espera <= 0) return;
    const t = setTimeout(() => setEspera((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [espera]);

  function escribir(indice, valor) {
    const limpio = valor.replace(/\D/g, '');
    if (!limpio) {
      setCodigo((c) => c.map((d, i) => (i === indice ? '' : d)));
      return;
    }
    // Permite pegar el código completo en cualquier casilla.
    const nuevo = [...codigo];
    limpio.slice(0, DIGITOS - indice).split('').forEach((d, k) => (nuevo[indice + k] = d));
    setCodigo(nuevo);
    campos.current[Math.min(indice + limpio.length, DIGITOS - 1)]?.focus();
  }

  function teclear(indice, evento) {
    if (evento.key === 'Backspace' && !codigo[indice] && indice > 0) campos.current[indice - 1]?.focus();
    if (evento.key === 'ArrowLeft' && indice > 0) campos.current[indice - 1]?.focus();
    if (evento.key === 'ArrowRight' && indice < DIGITOS - 1) campos.current[indice + 1]?.focus();
  }

  async function enviar(evento) {
    evento.preventDefault();
    const valor = codigo.join('');
    if (valor.length < DIGITOS) {
      setMensaje({ tipo: 'error', texto: `Escribe los ${DIGITOS} dígitos del código que llegó a tu correo.` });
      return;
    }
    setMensaje(null);
    setCargando(true);
    const resultado = await verificarCodigo({ correo, codigo: valor });
    setCargando(false);
    // Auto-login propuesto tras verificar: lleva directo a la pantalla principal.
    if (resultado.success) navegar('/inicio');
    else setMensaje({ tipo: 'error', texto: resultado.message || 'El código no es válido o ya expiró. Pide uno nuevo.' });
  }

  async function reenviar() {
    setEspera(ESPERA_REENVIO);
    await reenviarCodigo({ correo });
    setMensaje({ tipo: 'exito', texto: 'Te enviamos un código nuevo. Revisa también la carpeta de spam.' });
  }

  return (
    <AuthLayout
      titulo="Verifica tu correo"
      subtitulo={<>Escribe el código de 6 dígitos que enviamos a <strong>{correo || 'tu correo'}</strong>.</>}
      semilla={17}
      pie={
        <p>
          ¿No te llegó?{' '}
          <button type="button" className="enlace-boton" onClick={reenviar} disabled={espera > 0}>
            {espera > 0 ? `Reenviar en ${espera} s` : 'Reenviar código'}
          </button>
        </p>
      }
    >
      <Mensaje mensaje={mensaje} />
      <form onSubmit={enviar} noValidate className="formulario">
        <fieldset className="codigo">
          <legend className="solo-lectores">Código de verificación</legend>
          {codigo.map((d, i) => (
            <input
              key={i}
              ref={(el) => (campos.current[i] = el)}
              value={d}
              data-lleno={Boolean(d)}
              onChange={(e) => escribir(i, e.target.value)}
              onKeyDown={(e) => teclear(i, e)}
              onFocus={(e) => e.target.select()}
              inputMode="numeric"
              autoComplete={i === 0 ? 'one-time-code' : 'off'}
              aria-label={`Dígito ${i + 1} de ${DIGITOS}`}
              maxLength={DIGITOS}
            />
          ))}
        </fieldset>
        <BotonEnvio cargando={cargando} textoCargando="Verificando…">Verificar y continuar</BotonEnvio>
      </form>
    </AuthLayout>
  );
}
