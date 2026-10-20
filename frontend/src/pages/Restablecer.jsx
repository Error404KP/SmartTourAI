import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, ShieldCheck } from 'lucide-react';
import AuthLayout from '../components/AuthLayout.jsx';
import { BotonEnvio, Campo, leerFormulario, Mensaje } from '../components/Formulario.jsx';
import { llamarAPI } from '../api.js';

const restablecerContrasena = (datos) => llamarAPI('auth/restablecer_contrasena.php', datos);

export default function Restablecer() {
  const navegar = useNavigate();
  // En el flujo real este token llega en el enlace que se envía por correo.
  const [parametros] = useSearchParams();
  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(false);

  async function enviar(evento) {
    evento.preventDefault();
    const { nueva_contrasena, confirmar_contrasena } = leerFormulario(evento.currentTarget);
    if (nueva_contrasena.length < 8) {
      setMensaje({ tipo: 'error', texto: 'La contraseña necesita al menos 8 caracteres.' });
      return;
    }
    if (nueva_contrasena !== confirmar_contrasena) {
      setMensaje({ tipo: 'error', texto: 'Las contraseñas no coinciden. Escríbelas de nuevo.' });
      return;
    }
    setMensaje(null);
    setCargando(true);
    const resultado = await restablecerContrasena({ token: parametros.get('token') ?? '', nueva_contrasena });
    setCargando(false);

    if (resultado.success) {
      navegar('/login', { state: { mensaje: { tipo: 'exito', texto: 'Contraseña guardada. Ya puedes iniciar sesión con ella.' } } });
    } else {
      setMensaje({ tipo: 'error', texto: resultado.message || 'El enlace ya no es válido. Pide uno nuevo desde "Recupera tu contraseña".' });
    }
  }

  return (
    <AuthLayout titulo="Elige una nueva contraseña" subtitulo="Úsala la próxima vez que inicies sesión." semilla={41}>
      <Mensaje mensaje={mensaje} />
      <form onSubmit={enviar} noValidate className="formulario">
        <Campo etiqueta="Nueva contraseña" icono={Lock} type="password" name="nueva_contrasena" autoComplete="new-password" ayuda="Mínimo 8 caracteres." required minLength={8} />
        <Campo etiqueta="Confirma la nueva contraseña" icono={Lock} type="password" name="confirmar_contrasena" autoComplete="new-password" required />
        <BotonEnvio cargando={cargando} textoCargando="Guardando…">Guardar contraseña</BotonEnvio>
      </form>
      <p className="nota-seguridad">
        <ShieldCheck size={16} aria-hidden="true" />
        Este enlace sirve una sola vez y por tiempo limitado.
      </p>
    </AuthLayout>
  );
}
