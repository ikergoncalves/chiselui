/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/**/*.stories.tsx'],
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'chiselui',
      fileName: 'chiselui',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // Externalize React and any declared runtime dependency (@floating-ui/*) so
      // they are resolved from the consumer's node_modules instead of bundled in.
      external: (id) =>
        ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'].includes(
          id,
        ) || id.startsWith('@floating-ui/'),
      output: {
        assetFileNames: 'chiselui.[ext]',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
