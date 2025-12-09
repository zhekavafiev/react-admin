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
                // Админка API
                '/api/admin': {
                    target: env.VITE_ADMIN_API_URL || 'http://localhost:8000',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api\/admin/, '/api'),
                    configure: (proxy, options) => {
                        proxy.on('error', (err, req, res) => {
                            console.log('proxy error', err);
                        });
                        proxy.on('proxyReq', (proxyReq, req, res) => {
                            console.log('Sending Request:', req.method, req.url, '→', options.target);
                        });
                        proxy.on('proxyRes', (proxyRes, req, res) => {
                            console.log('Received Response:', proxyRes.statusCode, req.url);
                        });
                    }
                },

                // Swipe API
                '/pd/frontend': {
                    target: env.VITE_SWIPE_API_URL || 'http://localhost:8001',
                    changeOrigin: true,
                    configure: (proxy, options) => {
                        proxy.on('error', (err, req, res) => {
                            console.log('proxy error', err);
                        });
                        proxy.on('proxyReq', (proxyReq, req, res) => {
                            console.log('Sending Request:', req.method, req.url, '→', options.target);
                        });
                        proxy.on('proxyRes', (proxyRes, req, res) => {
                            console.log('Received Response:', proxyRes.statusCode, req.url);
                        });
                    }
                }
            }
        }
    }
})
