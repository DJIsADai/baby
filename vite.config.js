import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // server: {
  //   proxy: {
  //     // 代理配置
  //     '/api': {
  //       target: 'https://api.baby-generator.ai', // 后端服务实际地址
  //       changeOrigin: true, // 是否改变源地址
  //       rewrite: (path) => path.replace(/^\/api/, '') // 重写请求路径，去掉/api前缀
  //     }
  //   }
  // }
})
