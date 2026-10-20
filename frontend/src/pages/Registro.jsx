import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, User } from 'lucide-react';
import AuthLayout from '../components/AuthLayout.jsx';
import { BotonEnvio, Campo, leerFormulario, Mensaje } from '../components/Formulario.jsx';
import { BotonGoogle } from './Login.jsx';
import { llamarAPI } from '../api.js';

/**
 * Función central del flujo de registro:
 * formulario -> guardarRegistroUsuario() -> api/auth/guardar_registro_usuario.php -> (futuro) sp_crear_usuario
 */
const guardarRegistroUsuario = (datos) => llamarAPI('auth/guardar_registro_usuario.php', datos);

export default function Registro() {
  const navegar = useNavigate();
  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(false);

  async function enviar(evento) {
    evento.preventDefault();
    const f = leerFormulario(evento.currentTarget);
    const datos = { nombre: f.nombre.trim(), correo: f.correo.trim(), contrasena: f.contrasena, confirmar_contrasena: f.confirmar_contrasena };

    const error =
      (!datos.nombre || !datos.correo || !datos.contrasena) ? 'Completa tu nombre, correo y contraseña.'
      : datos.contrasena.length < 8 ? 'La contraseña necesita al menos 8 caracteres.'
      : datos.contrasena !== datos.confirmar_contrasena ? 'Las contraseñas no coinciden. Escríbelas de nuevo.'
      : !f.acepto_terminos ? 'Acepta los términos y la política de privacidad para crear tu cuenta.'
      : null;
    if (error) {
      setMensaje({ tipo: 'error', texto: error });
      return;
    }

    setMensaje(null);
    setCargando(true);
    const resultado = await guardarRegistroUsuario(datos);
    setCargando(false);

    if (resultado.success) navegar(`/verificar?correo=${encodeURIComponent(datos.correo)}`);
    else setMensaje({ tipo: 'error', texto: resultado.message || 'No se pudo crear la cuenta. Intenta de nuevo.' });
  }

  return (
    <AuthLayout
      titulo="Crea tu cuenta"
      subtitulo="Guarda tus itinerarios y retómalos desde cualquier dispositivo."
      semilla={11}
      pie={<p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>}
    >
      <Mensaje mensaje={mensaje} />
      <form onSubmit={enviar} noValidate className="formulario">
        <Campo etiqueta="Nombre completo" icono={User} name="nombre" placeholder="Tu nombre y apellidos" autoComplete="name" required />
        <Campo etiqueta="Correo electrónico" icono={Mail} type="email" name="correo" placeholder="tucorreo@ejemplo.com" autoComplete="email" required />
        <Campo etiqueta="Contraseña" icono={Lock} type="password" name="contrasena" autoComplete="new-password" ayuda="Mínimo 8 caracteres." required minLength={8} />
        <Campo etiqueta="Confirma tu contraseña" icono={Lock} type="password" name="confirmar_contrasena" autoComplete="new-password" required />
        <label className="casilla">
          <input type="checkbox" name="acepto_terminos" />
          <span>Acepto los términos y la política de privacidad de SmartTour AI.</span>
        </label>
        <BotonEnvio cargando={cargando} textoCargando="Creando cuenta…">Crear cuenta</BotonEnvio>
      </form>
      <BotonGoogle />
    </AuthLayout>
  );
}
