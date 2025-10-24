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
      // 开发环境:通过中间件动态生成config.js
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
      // 生产环境:在构建完成后替换config.js中的占位符
      async closeBundle() {
        const fs = await import('fs')
        const path = await import('path')
        const configPath = path.resolve(__dirname, 'dist/config.js')
        
        // 检查文件是否存在
        if (fs.existsSync(configPath)) {
          // 读取文件内容
          let content = fs.readFileSync(configPath, 'utf-8')
          // 替换占位符
          content = content.replace(
            '__VITE_API_BASE_URL__',
            env.VITE_API_BASE_URL || ''
          )
          // 写回文件
          fs.writeFileSync(configPath, content, 'utf-8')
          console.log('✅ config.js 环境变量替换成功:', env.VITE_API_BASE_URL || '(空字符串)')
        } else {
          console.warn('⚠️  未找到 dist/config.js 文件')
        }
      }
    }
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://pm-feel666service.gaodun.com',
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
        target: 'https://pm-feel666service.gaodun.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
  }
})
