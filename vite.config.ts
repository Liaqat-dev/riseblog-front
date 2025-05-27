import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import * as path from "node:path";


export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {

            '@src': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@screens': path.resolve(__dirname, 'src/screens'),
            '@cards': path.resolve(__dirname, 'src/cards'),
            '@api': path.resolve(__dirname, 'src/api'),
            '@context': path.resolve(__dirname, 'context'),
            '@constants': path.resolve(__dirname, 'constants'),
        },
    },
})
