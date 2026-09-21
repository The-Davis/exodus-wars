import { defineConfig } from 'vite';

export default defineConfig({
  base: '/exodus-wars/',
  // Vite auto-detects index.html at the project root
  // and handles TypeScript natively — no extra plugins needed.
  test: {
    environment: 'jsdom',  // gives AudioPlayer access to window / HTMLAudioElement
    globals: true,         // describe / it / expect without imports
  },
});
