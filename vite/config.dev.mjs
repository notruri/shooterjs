import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    resolve: {
        alias: {
            '@': path.resolve(import.meta.dirname, '../src'),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    phaser: ['phaser'],
                },
            },
        },
    },
    server: {
        port: 8080,
    },
});
