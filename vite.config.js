import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/unity_webgl_integration/',
  plugins: [react()],
});