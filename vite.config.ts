import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [react()],
        server: {
            host: '0.0.0.0',
            port: 4000,
            watch: {
                usePolling: true, // Необходимо для Docker
            },
            hmr: {
                host: 'localhost',
                port: 4000, // Порт, который видит браузер
            },
            proxy: {
                '/api': env.VITE_API_BASE_URL || 'http://localhost:8000'
            }
        }
    }
})
