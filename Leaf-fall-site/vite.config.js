import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/foundation/mixins";
          
          // Global variables
          $color-text: #333;
          $easeOutCirc: cubic-bezier(0.075, 0.82, 0.165, 1);
          $easeInOutQuart: cubic-bezier(0.77, 0, 0.175, 1);
        `
      }
    }
  }
})
