import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Dev-only middleware that mirrors the Vercel /api/medium function, so the
// Blogs page fetches fresh Medium data identically in `vite dev` and prod.
const mediumDevApi = () => ({
  name: 'medium-dev-api',
  configureServer(server) {
    server.middlewares.use('/api/medium', async (req, res) => {
      try {
        const url = new URL(req.url, 'http://localhost')
        const raw = (url.searchParams.get('u') || process.env.VITE_MEDIUM_USERNAME || '').trim()
        const handle = raw.startsWith('@') ? raw : `@${raw}`
        if (!raw) {
          res.statusCode = 400
          res.end('Missing handle')
          return
        }
        const upstream = await fetch(`https://medium.com/feed/${handle}`, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36',
            Accept: 'application/rss+xml, application/xml, text/xml; q=0.9, */*; q=0.8',
          },
        })
        const xml = await upstream.text()
        res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
        res.statusCode = upstream.ok ? 200 : 502
        res.end(xml)
      } catch (err) {
        res.statusCode = 500
        res.end(String(err?.message || err))
      }
    })
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mediumDevApi()],
  assetsInclude: ['**/*.glb'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion', '@headlessui/react'],
          forms: ['react-hook-form', '@hookform/resolvers', 'yup'],
          icons: ['react-icons'],
          toast: ['react-hot-toast'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      '@headlessui/react',
      'react-hook-form',
      '@hookform/resolvers',
      'yup',
      'react-icons',
      'react-hot-toast',
    ],
  },
})