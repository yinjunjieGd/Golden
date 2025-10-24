# Zeabur部署问题诊断与解决方案

## 🔍 问题分析

经过全面检查，发现以下配置问题导致无法访问后端接口：

### 当前配置状态

✅ **前端代码正确**:
- `quiz-app.html`: 使用相对路径 `API_BASE_URL = ''`
- `HomePage.vue`: 使用相对路径 `/api/course/getDefaultCourses`
- `my-courses.html`: 使用相对路径 `/api/course/getDefaultCourses`

✅ **开发环境配置正确**:
- `vite.config.js`: 配置了 dev server 代理
- 本地开发可以正常工作

❌ **生产环境配置问题**:
- `zeabur.json` 的 `routes` 配置**对静态站点构建无效**
- Vite构建后生成的是**纯静态文件**（HTML/CSS/JS）
- 静态文件**无法处理运行时代理**

### 核心问题

**Zeabur上的静态站点(Static Site)不支持运行时API代理！**

当Zeabur识别到这是一个Vue/Vite项目时，会执行 `npm run build` 生成静态文件部署到CDN，此时：

1. **静态文件无法执行代理逻辑** - zeabur.json的routes配置被忽略
2. **浏览器直接请求 `/api/*`** - 请求发送到静态站点域名，而不是后端服务
3. **404错误或CORS错误** - 因为静态站点上不存在 `/api` 路由

## ✅ 解决方案

### 方案一：使用Zeabur的预渲染服务(推荐)

Zeabur提供了一个特殊的服务类型来处理这种情况。

#### 步骤1: 修改zeabur.json

删除现有的 `zeabur.json`，创建新的配置：

```json
{
  "$schema": "https://zeabur.com/schema.json",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

#### 步骤2: 在Zeabur控制台配置重写规则

1. 进入项目的服务设置
2. 找到 "Networking" 或 "Rewrites" 选项
3. 添加重写规则：
   - Source: `/api/(.*)`
   - Destination: `http://learningservice.zeabur.internal:8080/api/$1`

### 方案二：修改前端代码使用环境变量

动态设置API地址，部署时通过环境变量注入。

#### 步骤1: 创建 `.env.production` 文件

```env
VITE_API_BASE_URL=https://your-backend-domain.zeabur.app
```

#### 步骤2: 修改 `quiz-app.html`

```javascript
// 从环境变量读取API地址，如果没有则使用相对路径
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
```

#### 步骤3: 修改 `HomePage.vue`

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const fetchCourses = async () => {
  const response = await fetch(`${API_BASE_URL}/api/course/getDefaultCourses`, {
    // ...
  });
};
```

#### 步骤4: 在Zeabur设置环境变量

1. 进入服务设置
2. 添加环境变量：`VITE_API_BASE_URL` = 后端服务的公开URL

### 方案三：后端服务暴露公网域名(最简单)

**这是最简单直接的方案**。

#### 步骤1: 为后端服务生成域名

1. 进入后端服务(`learningservice`)设置
2. 在 "Networking" → "Domains" 中生成一个公开域名
3. 例如：`learningservice-xxx.zeabur.app`

#### 步骤2: 配置CORS

确保后端服务允许前端域名的跨域请求。在后端添加CORS配置：

```java
// Spring Boot示例
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins(
                        "https://your-frontend.zeabur.app",
                        "http://localhost:5173",
                        "http://localhost:5174"
                    )
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowCredentials(true);
            }
        };
    }
}
```

#### 步骤3: 创建 `.env.production`

```env
VITE_API_BASE_URL=https://learningservice-xxx.zeabur.app
```

#### 步骤4: 修改前端代码读取环境变量

（参考方案二的代码修改）

### 方案四：使用Serverless Functions作为代理层

创建简单的Serverless函数作为API代理。

#### 步骤1: 创建 `api/proxy.js`

```javascript
export default async function handler(req, res) {
  const { path } = req.query;
  const backendUrl = `http://learningservice.zeabur.internal:8080/${path}`;
  
  try {
    const response = await fetch(backendUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });
    
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

#### 步骤2: 修改 `zeabur.json`

```json
{
  "functions": {
    "api/proxy": {
      "memory": 128,
      "maxDuration": 10
    }
  }
}
```

#### 步骤3: 前端调用代理函数

```javascript
const response = await fetch('/api/proxy?path=api/course/getDefaultCourses');
```

## 🎯 推荐方案

**强烈推荐使用方案三（后端暴露公网域名）**，原因：

1. ✅ **最简单** - 只需配置域名和环境变量
2. ✅ **最可靠** - 不依赖复杂的代理配置
3. ✅ **易调试** - 可以直接访问后端API测试
4. ✅ **性能好** - 浏览器直连后端，无额外代理层
5. ✅ **易维护** - 配置清晰明了

## 📋 实施检查清单

### 选择方案三后的检查项：

- [ ] 后端服务已生成公开域名
- [ ] 后端CORS配置已添加前端域名
- [ ] 创建了 `.env.production` 文件
- [ ] 修改了所有前端文件使用环境变量
- [ ] 在Zeabur设置了 `VITE_API_BASE_URL` 环境变量
- [ ] 重新部署前端服务
- [ ] 测试所有API接口是否正常

## 🐛 常见问题排查

### 1. 部署后仍然404

**检查**:
```bash
# 在浏览器控制台查看实际请求的URL
console.log('API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
```

**可能原因**:
- 环境变量未设置或未生效
- 需要重新构建部署

### 2. CORS错误

**检查**:
- 后端CORS配置是否包含前端域名
- 是否允许了正确的HTTP方法
- 是否设置了 `allowCredentials: true`

### 3. 环境变量不生效

**注意**:
- Vite环境变量必须以 `VITE_` 开头
- 修改环境变量后必须重新构建（`npm run build`）
- 检查Zeabur控制台中环境变量是否正确设置

### 4. 内部域名无法访问

**说明**:
- `*.zeabur.internal` 域名只能在Zeabur内部服务间通信
- 浏览器无法访问内部域名
- 必须使用公开域名或配置代理

## 🔗 相关文档

- Zeabur官方文档: https://zeabur.com/docs
- Vite环境变量: https://vitejs.dev/guide/env-and-mode.html
- CORS配置指南: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS
