import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8089',
        changeOrigin: true,
        secure: false
      }
    }
  },
  // 生产环境配置
  build: {
    // 多页面配置
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        quiz: resolve(__dirname, 'quiz-app.html'),
        courses: resolve(__dirname, 'my-courses.html'),
        home: resolve(__dirname, 'home-app.html')
      }
    },
    // 确保打包后的资源路径正确
    assetsDir: 'assets',
    // 生成source map方便调试
    sourcemap: false
  },
  // 基础路径配置
  base: './',
  // 预览服务器配置(用于测试生产构建)
  preview: {
    proxy: {
      '/api': {
        target: 'http://localhost:8089',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
