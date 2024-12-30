// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    server: {
        proxy: {
            '/api': {
                target: 'https://mymarketplace-backend.onrender.com',
                changeOrigin: true,
                secure: false
            }
        }
    }
});