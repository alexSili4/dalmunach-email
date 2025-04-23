import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
  root: 'src',
  build: {
    rollupOptions: {
      input: glob.sync('./src/*.html'),
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'css/[name]-[hash][extname]';
          }
          if (assetInfo.name.endsWith('.js')) {
            return 'js/[name]-[hash][extname]';
          }
          if (assetInfo.name.endsWith('.svg')) {
            return 'icons/[name]-[hash][extname]';
          }
          if (assetInfo.name.endsWith('.ttf')) {
            return 'fonts/[name]-[hash][extname]';
          }
          if (assetInfo.name.endsWith('.png') || assetInfo.name.endsWith('.jpg')) {
            return 'images/[name]-[hash][extname]';
          }

          return '[name]-[hash][extname]';
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
      },
    },
    outDir: '../email',
  },
  plugins: [injectHTML(), FullReload(['./src/**/**.html'])],
  base: 'https://dalmunach.sunagency.space/email/',
});
