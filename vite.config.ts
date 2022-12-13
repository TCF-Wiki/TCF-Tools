import {fileURLToPath, URL} from 'node:url';

import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';

//Define config
export default defineConfig({
    base: '',
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    build: {
        target: 'esnext',
        rollupOptions: {
            input : {
                main: resolve(__dirname, 'index.html'),
                map: resolve(__dirname, 'map.html'),
                forge: resolve(__dirname, 'forge.html'),
                progress: resolve(__dirname, 'progress.html'),
                loadout: resolve(__dirname, 'loadout.html'),
                calculator: resolve(__dirname, 'calculator.html'),
            }
        }
    },

});
