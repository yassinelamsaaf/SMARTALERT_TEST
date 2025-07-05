import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/smartalert', // Set this to the subfolder path
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './public'),
    },
  },
})
