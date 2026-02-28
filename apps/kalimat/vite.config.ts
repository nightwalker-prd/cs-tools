import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          'quran-data': [
            './src/data/surah-names',
            './src/data/lemmas',
            './src/data/root-frequency',
            './src/data/root-to-lemma',
            './src/data/particles',
            './src/data/grammar-patterns',
            './src/data/surah-word-stats',
          ],
          'lemma-data': [
            './src/data/ayah-translations',
          ],
        },
      },
    },
  },
  server: {
    port: 5191,
    open: true,
  },
});
