import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@services': '/src/services',
      '@contexts': '/src/contexts',
      '@hooks': '/src/hooks',
      '@assets': '/src/assets',
      '@styles': '/src/styles',
      '@utils': '/src/utils',
    },
  },
});
