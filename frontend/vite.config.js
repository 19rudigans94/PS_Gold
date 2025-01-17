import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store')
    }
  },
  build: {
    // Отключаем source maps для уменьшения потребления памяти
    sourcemap: false,
    // Используем более легкую минификацию
    minify: 'esbuild',
    // Отключаем модульное разделение для экономии памяти
    modulePreload: false,
    // Настраиваем Rollup для экономии памяти
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react-vendor';
            if (id.includes('@mui')) return 'mui-vendor';
            if (id.includes('redux')) return 'redux-vendor';
            return 'vendor';
          }
        }
      }
    },
    // Увеличиваем лимит предупреждений о размере чанков
    chunkSizeWarningLimit: 1000,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  }
});