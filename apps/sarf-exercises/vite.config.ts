import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, '../../node_modules/pdfjs-dist/cmaps/*'),
          dest: 'cmaps/',
        },
        {
          src: path.resolve(__dirname, '../../node_modules/pdfjs-dist/standard_fonts/*'),
          dest: 'standard_fonts/',
        },
      ],
    }),
  ],
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
          sarf: ['@arabiyya/sarf'],
          pdf: ['react-pdf', 'pdfjs-dist'],
        },
      },
    },
  },
  server: {
    port: 5196,
    open: true,
  },
});
