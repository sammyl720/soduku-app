/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
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
