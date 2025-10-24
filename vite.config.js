import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd())
  
  return {
  plugins: [
    vue(),
    // 自定义插件:替换config.js中的环境变量占位符
    {
      name: 'replace-env-in-config',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/config.js') {
            res.setHeader('Content-Type', 'application/javascript')
            res.end(`// 全局配置\nwindow.__APP_CONFIG__ = {\n  API_BASE_URL: '${env.VITE_API_BASE_URL || ''}'\n};`)
            return
          }
          next()
        })
      },
      transform(code, id) {
        if (id.endsWith('config.js')) {
          return code.replace(
            '__VITE_API_BASE_URL__',
            env.VITE_API_BASE_URL || ''
          )
        }
      }
    }
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  },
  // 生产环境配置
  build: {
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
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  }
  }
})
