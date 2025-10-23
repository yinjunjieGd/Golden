# 生产环境部署说明

## 问题说明

在远程部署后,前端页面可能无法访问后端API接口,这是因为:

1. **Vite代理仅在开发环境有效**: `vite.config.js`中配置的`server.proxy`只在执行`npm run dev`时生效
2. **生产环境需要服务器配置**: 打包后的静态文件需要通过Web服务器(如Nginx)提供反向代理

## 解决方案

### 方案一: 配置Nginx反向代理 (推荐)

在您的Nginx配置文件中添加以下配置:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # 前端静态文件
    root /path/to/dist;
    index index.html;
    
    # SPA路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API代理转发
    location /api/ {
        proxy_pass http://learningservice.zeabur.internal:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 方案二: 使用环境变量配置API地址

如果后端API可以公网访问,可以在构建时指定API地址:

1. 修改代码中的API调用,使用环境变量:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
fetch(`${API_BASE_URL}/api/xxx`)
```

2. 创建`.env.production`文件:

```
VITE_API_BASE_URL=http://your-backend-domain.com
```

3. 重新构建:

```bash
npm run build
```

### 方案三: Zeabur平台部署配置

如果使用Zeabur部署,需要:

1. **确保前后端服务在同一项目下**: 这样内部域名`learningservice.zeabur.internal:8080`才能访问
2. **配置环境变量**: 在Zeabur控制台为前端服务添加环境变量
3. **使用服务间通信**: Zeabur会自动处理内部服务的DNS解析

## 当前项目配置

已完成的修改:

1. ✅ `quiz-app.html`: API_BASE_URL改为空字符串,使用相对路径
2. ✅ `HomePage.vue`: 使用相对路径调用API
3. ✅ `my-courses.html`: 使用相对路径调用API
4. ✅ `vite.config.js`: 添加了base、build和preview配置

## 部署步骤

1. **构建生产版本**:
```bash
npm run build
```

2. **部署dist目录**: 将`dist`目录中的文件上传到服务器

3. **配置Web服务器**: 按照上述方案一配置Nginx反向代理

4. **验证**: 访问部署地址,检查浏览器控制台是否有错误

## 调试技巧

1. **检查网络请求**: 打开浏览器开发者工具的Network标签,查看API请求状态
2. **查看服务器日志**: 检查Nginx和后端服务的日志
3. **本地预览**: 使用`npm run preview`测试生产构建

## 常见问题

Q: 为什么本地开发正常,部署后API无法访问?
A: 因为Vite的proxy配置只在开发环境生效,生产环境需要服务器配置反向代理。

Q: 内部域名`learningservice.zeabur.internal`无法访问?
A: 这个域名只能在Zeabur平台的服务间访问,浏览器无法直接访问。需要通过反向代理转发。

Q: CORS跨域错误?
A: 配置Nginx代理后可以避免跨域问题,或者在后端添加CORS响应头。
