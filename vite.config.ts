/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Sudoku Master',
        short_name: 'Sudoku',
        description: 'Challenge your mind with Sudoku Master!',
        theme_color: '#4a90e2',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets',
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
              },
            },
          },
        ],
      },
    }),
  ],
  test: {
    globals: true, // Enables global variables like describe, it, expect
    environment: 'jsdom', // Simulates a browser-like environment
    setupFiles: './src/setup-tests.ts', // Path to setup file
    coverage: {
      provider: 'istanbul', // Coverage provider
      reporter: ['text', 'json', 'html'], // Coverage reporters
      exclude: ['node_modules/', 'dist/', 'src/utils/SudokuGenerator.test.ts'], // Files to exclude from coverage
    },
  },
});
