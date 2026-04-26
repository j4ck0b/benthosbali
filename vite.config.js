import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        diving: resolve(__dirname, 'diving.html'),
        accommodation: resolve(__dirname, 'accommodation.html'),
        packages: resolve(__dirname, 'packages.html'),
        contact: resolve(__dirname, 'contacto.html'),
      },
    },
  },
  server: {
    port: 3000,
  },
});
