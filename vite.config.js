import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    headers: {
      'Content-Encoding': 'gz',
    },
  },
});