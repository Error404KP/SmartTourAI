import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// La app se compila a ../app y Apache (XAMPP) la sirve en /SmartTourAI/app/.
// En desarrollo (npm run dev) las llamadas a /SmartTourAI/api se reenvían a Apache.
export default defineConfig({
  plugins: [react()],
  base: '/SmartTourAI/app/',
  build: {
    outDir: '../app',
    emptyOutDir: true,
  },
  server: {
    proxy: {
      // En XAMPP es Apache (puerto 80); en Codespaces se usa API_PROXY (servidor PHP en el puerto 8080).
      '/SmartTourAI/api': process.env.API_PROXY || 'http://localhost',
    },
  },
});
