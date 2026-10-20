import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, ShieldCheck } from 'lucide-react';
import AuthLayout from '../components/AuthLayout.jsx';
import { BotonEnvio, Campo, leerFormulario, Mensaje } from '../components/Formulario.jsx';
import { llamarAPI } from '../api.js';

const solicitarRecuperacion = (datos) => llamarAPI('auth/solicitar_recuperacion.php', datos);

export default function Recuperar() {
  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(false);

  async function enviar(evento) {
    evento.preventDefault();
    const formulario = evento.currentTarget;
    const { correo } = leerFormulario(formulario);
    if (!correo.trim()) {
      setMensaje({ tipo: 'error', texto: 'Escribe el correo con el que te registraste.' });
      return;
    }
    setCargando(true);
    await solicitarRecuperacion({ correo: correo.trim() });
    setCargando(false);
    formulario.reset();
    // Mismo mensaje exista o no la cuenta (evita enumerar correos registrados).
    setMensaje({ tipo: 'exito', texto: 'Si el correo está registrado, te enviamos un enlace para restablecer tu contraseña.' });
  }

  return (
    <AuthLayout
      titulo="Recupera tu contraseña"
      subtitulo="Escribe el correo de tu cuenta y te mandamos un enlace para elegir una nueva."
      semilla={29}
      pie={<Link to="/login" className="enlace-volver"><ArrowLeft size={16} aria-hidden="true" /> Volver a iniciar sesión</Link>}
    >
      <Mensaje mensaje={mensaje} />
      <form onSubmit={enviar} noValidate className="formulario">
        <Campo etiqueta="Correo electrónico" icono={Mail} type="email" name="correo" placeholder="tucorreo@ejemplo.com" autoComplete="email" required />
        <BotonEnvio cargando={cargando} textoCargando="Enviando…">Enviar enlace</BotonEnvio>
      </form>
      <p className="nota-seguridad">
        <ShieldCheck size={16} aria-hidden="true" />
        Por seguridad mostramos el mismo mensaje exista o no una cuenta con ese correo.
      </p>
    </AuthLayout>
  );
}
