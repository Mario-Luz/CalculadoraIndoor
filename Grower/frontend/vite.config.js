import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuração para publicar no GitHub Pages
export default defineConfig({
  plugins: [react()],
  // O "base" precisa ser o nome do repositório
  base: '/CalculadoraIndoor/', 
});
