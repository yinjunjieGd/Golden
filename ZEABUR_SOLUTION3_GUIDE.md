# Zeabur 部署方案三改进版：使用环境变量配置

## 📋 方案概述

这是改进后的方案三，使用环境变量来配置API地址：
- ✅ **本地开发**：使用空字符串，通过Vite代理转发到后端
- ✅ **生产部署**：使用环境变量配置后端公网域名
- ✅ **一次配置**：只需在Zeabur控制台设置环境变量
- ✅ **灵活切换**：无需修改代码即可在不同环境间切换

## 🚀 部署步骤

### 第一步：为后端服务生成公网域名

1. **在Zeabur控制台部署后端服务**
   - 项目：`Learningportrait`
   - 服务名：`learningservice`

2. **生成公开域名**
   - 进入后端服务设置
   - 找到「网络」或「Networking」选项
   - 点击「生成域名」或「Generate Domain」
   - 记录生成的域名，例如：`https://learningservice-xxx.zeabur.app`

### 第二步：配置后端CORS

在后端服务中配置CORS，允许前端域名跨域访问：

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                    "https://your-frontend.zeabur.app",  // 前端域名
                    "http://localhost:5173"              // 本地开发
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

### 第三步：在Zeabur设置环境变量

1. **进入前端服务设置**
   - 在Zeabur控制台找到前端服务
   - 进入「环境变量」或「Environment Variables」设置

2. **添加环境变量**
   - 变量名：`VITE_API_BASE_URL`
   - 变量值：后端公开域名（例如：`https://learningservice-xxx.zeabur.app`）
   - 保存并重新部署

### 第四步：提交代码并部署

1. **提交代码到Git仓库**
   ```bash
   git add .
   git commit -m "配置方案三改进版：使用环境变量"
   git push
   ```

2. **在Zeabur创建前端服务**（如果还未创建）
   - 选择「Static Site」模板
   - 连接你的Git仓库
   - 配置构建命令：`npm run build`
   - 配置输出目录：`dist`

3. **等待部署完成**
   - Zeabur会自动检测到Vite项目
   - 自动执行构建和部署
   - 构建时会将环境变量注入到代码中

## ⚙️ 环境配置说明

### 开发环境（.env.development）

```env
# 开发环境配置
# 本地开发使用相对路径，通过Vite代理转发到后端
VITE_API_BASE_URL=
```

**本地开发时**：
- `VITE_API_BASE_URL` 为空字符串
- API请求使用相对路径（如 `/api/course/getDefaultCourses`）
- Vite开发服务器的代理配置会将请求转发到后端

### 生产环境（.env.production）

```env
# 生产环境配置
# 部署到Zeabur时,需要在控制台设置此环境变量为后端公开域名
# 例如: https://learningservice-xxx.zeabur.app
VITE_API_BASE_URL=https://your-backend-service.zeabur.app
```

**生产部署时**：
- Zeabur控制台设置的 `VITE_API_BASE_URL` 会覆盖此文件的值
- 构建时会将环境变量注入到 `public/config.js` 中
- 前端代码从 `window.__APP_CONFIG__.API_BASE_URL` 读取配置

## 🔧 技术实现

### 1. 配置文件（public/config.js）

```javascript
// 全局配置 - 由构建工具在打包时替换
window.__APP_CONFIG__ = {
  API_BASE_URL: '__VITE_API_BASE_URL__'
};
```

### 2. Vite配置（vite.config.js）

添加了自定义插件来替换占位符：

```javascript
{
  name: 'replace-env-in-config',
  transform(code, id) {
    if (id.endsWith('config.js')) {
      return code.replace(
        '__VITE_API_BASE_URL__',
        env.VITE_API_BASE_URL || ''
      )
    }
  }
}
```

### 3. 前端代码读取配置

在HTML文件中：

```javascript
// 接口地址配置 - 从全局配置读取
const API_BASE_URL = window.__APP_CONFIG__?.API_BASE_URL || '';
```

## 🧪 测试验证

### 本地开发测试

1. **启动开发服务器**
   ```bash
   npm run dev
   ```

2. **验证代理转发**
   - 打开浏览器访问 `http://localhost:5173`
   - 打开开发者工具（F12）
   - 查看Network标签，API请求应该是相对路径
   - 确认请求被代理到后端服务

### 生产构建测试

1. **本地构建**
   ```bash
   npm run build
   ```

2. **检查构建产物**
   ```bash
   # 查看config.js是否正确替换
   cat dist/config.js
   ```

3. **预览生产构建**
   ```bash
   npm run preview
   ```

### Zeabur部署测试

1. **检查环境变量**
   - 确认Zeabur控制台已设置 `VITE_API_BASE_URL`
   - 值应为后端公开域名

2. **测试前端访问**
   - 访问前端域名
   - 打开开发者工具（F12）
   - 查看Network标签，API请求应该使用完整的后端域名
   - 确认请求返回正常数据

## 🔍 故障排查

### 问题1：本地开发时API请求404

**现象**：本地开发时API请求失败

**排查步骤**：
1. 检查 `.env.development` 中 `VITE_API_BASE_URL` 是否为空
2. 检查 `vite.config.js` 中代理配置是否正确
3. 确认后端服务是否正在运行
4. 查看浏览器控制台的请求URL是否为相对路径

### 问题2：生产环境API请求失败

**现象**：部署到Zeabur后API请求失败

**排查步骤**：
1. 检查Zeabur控制台是否设置了 `VITE_API_BASE_URL` 环境变量
2. 确认环境变量的值是否为正确的后端域名（包含https://）
3. 在浏览器中访问 `/config.js`，查看 `API_BASE_URL` 的值
4. 检查后端CORS配置是否包含前端域名

### 问题3：环境变量未生效

**现象**：修改环境变量后没有效果

**解决方案**：
1. 修改环境变量后必须重新部署
2. 在Zeabur控制台手动触发重新部署
3. 清除浏览器缓存后重新访问

### 问题4：CORS错误

**现象**：浏览器控制台显示CORS相关错误

**解决方案**：
- 检查后端CORS配置是否包含前端域名
- 确认 `allowedOrigins` 中的域名与实际前端域名一致
- 注意协议（http/https）必须匹配

## 📝 配置清单

- [x] 后端服务已部署到Zeabur
- [x] 后端已生成公开域名
- [x] 后端CORS已正确配置
- [x] `.env.development` 已创建（本地开发用）
- [x] `.env.production` 已创建（生产部署用）
- [x] `public/config.js` 已创建
- [x] `vite.config.js` 已添加环境变量替换插件
- [x] `quiz-app.html` 已引入config.js并修改API_BASE_URL读取方式
- [x] `my-courses.html` 已引入config.js并修改API_BASE_URL读取方式
- [x] Zeabur前端服务已设置 `VITE_API_BASE_URL` 环境变量
- [x] 代码已提交到Git仓库
- [x] 前端服务已部署到Zeabur
- [x] 前端可以正常访问
- [x] API请求返回正常数据

## 🎯 方案优势

1. **环境分离**：开发和生产环境配置分离，互不影响
2. **易于切换**：只需修改环境变量，无需改动代码
3. **统一管理**：在Zeabur控制台统一管理环境变量
4. **本地友好**：本地开发使用代理，避免CORS问题
5. **灵活部署**：可以轻松部署到不同的环境（测试、预发布、生产）

## ⚠️ 注意事项

1. **环境变量命名**：Vite要求环境变量必须以 `VITE_` 开头才能在客户端访问
2. **重新部署**：修改Zeabur环境变量后必须重新部署才能生效
3. **缓存清除**：部署后建议清除浏览器缓存
4. **安全性**：不要在环境变量中存储敏感信息（如API密钥）
5. **CORS配置**：确保后端CORS配置包含前端域名

## 📚 相关文档

- [Vite环境变量文档](https://vitejs.dev/guide/env-and-mode.html)
- [Zeabur环境变量文档](https://zeabur.com/docs/environment/variables)
- [Spring Boot CORS配置](https://spring.io/guides/gs/rest-service-cors/)