import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import fs from 'fs'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/SMARTALERT_TEST/', // Set this to the subfolder path
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './public'),
    },
  },
  // server: {
  //   https: {
  //     key: fs.readFileSync('./certs/localhost-key.pem'),
  //     cert: fs.readFileSync('./certs/localhost.pem'),
  //   },
  //   host: 'localhost',
  //   port: 5173,
  // },
})
