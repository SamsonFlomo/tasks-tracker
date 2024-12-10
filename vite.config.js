import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const config = {
    plugins: [react()],
    base: '',
  };

  if (mode === 'development' || mode === 'github') {
    config.base = '/air-bnb-experience/';
  }

  return config;
});
