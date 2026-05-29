import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        packages: resolve(__dirname, 'packages.html'),
        equipment: resolve(__dirname, 'equipment.html'),
        dj: resolve(__dirname, 'dj.html'),
        privacy: resolve(__dirname, 'privacy.html')
      }
    }
  }
});
