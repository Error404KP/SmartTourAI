import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import Verificar from './pages/Verificar.jsx';
import Recuperar from './pages/Recuperar.jsx';
import Restablecer from './pages/Restablecer.jsx';
import Inicio from './pages/Inicio.jsx';
import Itinerario from './pages/Itinerario.jsx';
import Destino from './pages/Destino.jsx';
import Perfil from './pages/Perfil.jsx';

const TITULOS = {
  '/login': 'Iniciar sesión',
  '/registro': 'Crea tu cuenta',
  '/verificar': 'Verifica tu correo',
  '/recuperar': 'Recuperar contraseña',
  '/restablecer': 'Restablecer contraseña',
  '/inicio': 'Inicio',
  '/itinerario': 'Tu itinerario',
  '/perfil': 'Mi perfil',
};

export default function App() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const titulo = TITULOS[pathname] ?? (pathname.startsWith('/destino') ? 'Detalle del destino' : null);
    document.title = titulo ? `${titulo} · SmartTour AI` : 'SmartTour AI';
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/verificar" element={<Verificar />} />
      <Route path="/recuperar" element={<Recuperar />} />
      <Route path="/restablecer" element={<Restablecer />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/itinerario" element={<Itinerario />} />
      <Route path="/destino/:id" element={<Destino />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
