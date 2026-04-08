import path from 'node:path';
import { defineConfig } from 'vite';

const phasermsg = () => {
    return {
        name: 'phasermsg',
        buildStart() {
            process.stdout.write(`Building...\n`);
        },
        buildEnd() {
            process.stdout.write(`Done\n`);
        },
    };
};

export default defineConfig({
    base: './',
    logLevel: 'warning',
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
        minify: 'terser',
        terserOptions: {
            compress: {
                passes: 2,
            },
            mangle: true,
            format: {
                comments: false,
            },
        },
    },
    server: {
        port: 8080,
    },
    plugins: [phasermsg()],
});
