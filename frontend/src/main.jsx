import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { EstadoProvider } from './estado.jsx';
import './styles/tokens.css';
import './styles/base.css';
import './styles/auth.css';
import './styles/app.css';
import './styles/responsive.css';
import './styles/movimiento.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/SmartTourAI/app">
      <EstadoProvider>
        <App />
      </EstadoProvider>
    </BrowserRouter>
  </StrictMode>
);
