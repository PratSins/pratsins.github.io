import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        /*
         * Split the libraries away from your own code. React barely ever
         * changes, so a visitor who has been here before re-downloads only
         * the small chunk holding your content, not the whole framework.
         */
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-router')) return 'router'
          if (id.includes('react-dom') || id.includes('scheduler')) return 'react'
        },
      },
    },
  },
})
