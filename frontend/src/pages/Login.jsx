import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import AuthLayout from '../components/AuthLayout.jsx';
import { BotonEnvio, Campo, leerFormulario, Mensaje } from '../components/Formulario.jsx';
import { llamarAPI } from '../api.js';

/** Flujo: formulario -> iniciarSesion() -> api/auth/iniciar_sesion.php */
const iniciarSesion = (datos) => llamarAPI('auth/iniciar_sesion.php', datos);

export default function Login() {
  const navegar = useNavigate();
  const { state } = useLocation();
  const [mensaje, setMensaje] = useState(state?.mensaje ?? null);
  const [cargando, setCargando] = useState(false);

  async function enviar(evento) {
    evento.preventDefault();
    const { correo, contrasena } = leerFormulario(evento.currentTarget);
    if (!correo.trim() || !contrasena) {
      setMensaje({ tipo: 'error', texto: 'Escribe tu correo y tu contraseña para entrar.' });
      return;
    }
    setMensaje(null);
    setCargando(true);
    const resultado = await iniciarSesion({ correo: correo.trim(), contrasena });
    setCargando(false);

    if (resultado.success) navegar('/inicio');
    // Mensaje genérico a propósito: no revela si el correo existe.
    else setMensaje({ tipo: 'error', texto: resultado.message || 'El correo o la contraseña no coinciden.' });
  }

  return (
    <AuthLayout
      titulo="Inicia sesión"
      subtitulo="Entra para retomar tus rutas por Jalpan."
      pie={<p>¿Aún no tienes cuenta? <Link to="/registro">Regístrate</Link></p>}
    >
      <Mensaje mensaje={mensaje} />
      <form onSubmit={enviar} noValidate className="formulario">
        <Campo etiqueta="Correo electrónico" icono={Mail} type="email" name="correo" placeholder="tucorreo@ejemplo.com" autoComplete="email" required />
        <Campo etiqueta="Contraseña" icono={Lock} type="password" name="contrasena" autoComplete="current-password" required />
        <Link to="/recuperar" className="enlace-secundario">¿Olvidaste tu contraseña?</Link>
        <BotonEnvio cargando={cargando} textoCargando="Entrando…">Iniciar sesión</BotonEnvio>
      </form>
      <BotonGoogle />
    </AuthLayout>
  );
}

/** Solo visual (decisión del equipo: fuera del alcance de FPT-2). */
export function BotonGoogle() {
  return (
    <>
      <div className="separador"><span>o</span></div>
      <button type="button" className="boton boton-google" disabled>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.3-4.8 3.3-8z" />
          <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.7c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.8A11 11 0 0 0 12 23z" />
          <path fill="#FBBC05" d="M5.8 14.2a6.6 6.6 0 0 1 0-4.3V7.1H2.1a11 11 0 0 0 0 9.9z" />
          <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7.1l3.7 2.8C6.7 7.3 9.1 5.4 12 5.4z" />
        </svg>
        Continuar con Google
        <span className="etiqueta-pronto">Próximamente</span>
      </button>
    </>
  );
}
