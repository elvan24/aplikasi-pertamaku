import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,  // To expose the server on the network
    port: 80,  // Keep the port
  }
});

