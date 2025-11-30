import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                // Admin assets
                'resources/sass/admin/app.scss',
                'resources/js/admin/app.js',
                
                // Game assets
                'resources/sass/game/app.scss',
                'resources/js/game/app.js',
                
                // Auth assets (from Breeze)
                'resources/css/app.css',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
});
