import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
        additionalData: '@import "@/assets/scss/globalVar.scss";@import "@/assets/scss/globalMixin.scss";'
    },
    resolve: {
      alias: {
        '@': join(__dirname, "src"),
      }
    }
}
})
