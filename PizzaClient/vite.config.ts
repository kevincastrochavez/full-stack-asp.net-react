import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Client port
    proxy: {
      '/pizzas': {
        target: 'https://8dvhxqfj-5100.usw3.devtunnels.ms/', // Mock server port
        changeOrigin: true,
        // secure: false,
        ws: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
            proxyReq.setHeader('Access-Control-Allow-Origin', '*');
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log(
              'Received Response from the Target:',
              proxyRes.statusCode,
              (proxyRes.headers['Access-Control-Allow-Origin'] = '*'),
              req.url
            );
          });
        },
      },
    },
  },
});
