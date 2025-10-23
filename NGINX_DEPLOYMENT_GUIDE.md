# Nginx部署指南(方案一)

本指南将帮助您使用Nginx反向代理方案部署Learning Portrait前端应用。

## 📋 前提条件

- 一台Linux服务器(Ubuntu/CentOS/Debian等)
- 服务器已安装Nginx
- 具有sudo权限
- 后端服务已部署并可通过 `http://learningservice.zeabur.internal:8080` 访问
- 域名已指向服务器IP(可选)

## 🚀 部署步骤

### 1. 构建前端项目

在本地开发环境执行:

```bash
# 安装依赖(如果还没安装)
npm install

# 构建生产版本
npm run build
```

构建完成后,会在项目根目录生成 `dist` 文件夹。

### 2. 上传文件到服务器

将 `dist` 文件夹上传到服务器:

```bash
# 使用scp命令(将IP替换为你的服务器IP)
scp -r dist/ user@your-server-ip:/var/www/learningportrait/

# 或使用rsync
rsync -avz dist/ user@your-server-ip:/var/www/learningportrait/
```

### 3. 安装Nginx(如果未安装)

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install nginx
```

**CentOS/RHEL:**
```bash
sudo yum install nginx
```

### 4. 配置Nginx

#### 4.1 上传配置文件

将项目中的 `nginx.conf` 上传到服务器:

```bash
scp nginx.conf user@your-server-ip:/tmp/
```

#### 4.2 修改配置文件

连接到服务器后,编辑配置文件:

```bash
sudo nano /tmp/nginx.conf
```

**必须修改的配置项:**

1. **server_name**: 替换为你的域名或服务器IP
   ```nginx
   server_name your-domain.com;  # 改为: example.com 或 192.168.1.100
   ```

2. **root路径**: 确保指向正确的dist目录
   ```nginx
   root /var/www/learningportrait/dist;  # 改为实际路径
   ```

3. **日志路径**: 确保日志目录存在
   ```nginx
   access_log /var/log/nginx/learningportrait_access.log;
   error_log /var/log/nginx/learningportrait_error.log;
   ```

#### 4.3 复制配置到Nginx目录

```bash
# 复制配置文件
sudo cp /tmp/nginx.conf /etc/nginx/sites-available/learningportrait

# 创建符号链接启用站点
sudo ln -s /etc/nginx/sites-available/learningportrait /etc/nginx/sites-enabled/

# 如果使用CentOS,配置文件路径不同:
# sudo cp /tmp/nginx.conf /etc/nginx/conf.d/learningportrait.conf
```

#### 4.4 测试配置

```bash
# 测试Nginx配置是否正确
sudo nginx -t

# 如果显示 "syntax is ok" 和 "test is successful",则配置正确
```

#### 4.5 重启Nginx

```bash
# 重新加载配置
sudo systemctl reload nginx

# 或重启Nginx服务
sudo systemctl restart nginx

# 设置开机自启
sudo systemctl enable nginx
```

### 5. 配置防火墙

确保防火墙允许HTTP/HTTPS流量:

**Ubuntu(UFW):**
```bash
sudo ufw allow 'Nginx Full'
sudo ufw status
```

**CentOS(firewalld):**
```bash
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

### 6. 设置文件权限

```bash
# 设置正确的所有者和权限
sudo chown -R www-data:www-data /var/www/learningportrait/
sudo chmod -R 755 /var/www/learningportrait/

# CentOS使用nginx用户
# sudo chown -R nginx:nginx /var/www/learningportrait/
```

### 7. 验证部署

#### 7.1 访问网站

在浏览器中访问:
- `http://your-domain.com` (如果配置了域名)
- `http://your-server-ip` (使用IP访问)

#### 7.2 检查API代理

1. 打开浏览器开发者工具(F12)
2. 切换到 Network 标签
3. 在网站上执行操作(如加载课程)
4. 查看 `/api/*` 请求:
   - 状态码应为 200
   - Response应为JSON数据

#### 7.3 查看日志

```bash
# 查看访问日志
sudo tail -f /var/log/nginx/learningportrait_access.log

# 查看错误日志
sudo tail -f /var/log/nginx/learningportrait_error.log

# 查看Nginx主错误日志
sudo tail -f /var/log/nginx/error.log
```

## 🔒 配置HTTPS(推荐)

### 使用Let's Encrypt免费证书

#### 1. 安装Certbot

**Ubuntu:**
```bash
sudo apt install certbot python3-certbot-nginx
```

**CentOS:**
```bash
sudo yum install certbot python3-certbot-nginx
```

#### 2. 获取证书

```bash
# 自动配置Nginx
sudo certbot --nginx -d your-domain.com

# 或手动获取证书
# sudo certbot certonly --nginx -d your-domain.com
```

#### 3. 自动续期

```bash
# 测试自动续期
sudo certbot renew --dry-run

# Certbot会自动添加cron任务进行续期
```

#### 4. 更新Nginx配置

Certbot会自动修改Nginx配置添加SSL支持,或者你可以取消 `nginx.conf` 中HTTPS部分的注释。

## 🔧 故障排查

### 问题1: 502 Bad Gateway

**可能原因:**
- 后端服务未启动
- 后端地址配置错误
- Nginx无法访问后端服务

**解决方法:**
```bash
# 检查后端服务状态
curl http://learningservice.zeabur.internal:8080/api/course/getDefaultCourses

# 查看Nginx错误日志
sudo tail -f /var/log/nginx/error.log

# 检查SELinux(CentOS)
sudo setsebool -P httpd_can_network_connect 1
```

### 问题2: 404 Not Found

**可能原因:**
- dist目录路径配置错误
- 文件权限问题
- SPA路由配置问题

**解决方法:**
```bash
# 检查文件是否存在
ls -la /var/www/learningportrait/dist/

# 检查Nginx配置中的root路径
sudo nginx -T | grep root

# 确保try_files配置正确
```

### 问题3: 静态资源加载失败

**可能原因:**
- 资源路径配置错误
- CORS问题
- 权限问题

**解决方法:**
```bash
# 检查资源文件权限
ls -la /var/www/learningportrait/dist/assets/

# 检查Nginx配置
sudo nginx -t
```

### 问题4: API请求失败

**可能原因:**
- 代理配置错误
- 后端服务不可达
- 超时设置太短

**解决方法:**
```bash
# 在服务器上测试后端连接
curl -v http://learningservice.zeabur.internal:8080/api/course/getDefaultCourses

# 检查代理配置
sudo nginx -T | grep proxy_pass

# 增加超时时间(在nginx.conf中)
proxy_read_timeout 120s;
```

## 📊 性能优化建议

### 1. 启用HTTP/2

```nginx
listen 443 ssl http2;
```

### 2. 配置缓存

```nginx
# 在http块中添加
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m max_size=100m;

location /api/ {
    proxy_cache api_cache;
    proxy_cache_valid 200 5m;
    proxy_cache_key $request_uri;
}
```

### 3. 压缩优化

已在配置文件中启用gzip压缩,可进一步优化压缩级别:

```nginx
gzip_comp_level 6;
```

## 🔄 更新部署

当需要更新前端代码时:

```bash
# 1. 本地构建新版本
npm run build

# 2. 备份当前版本(可选)
ssh user@your-server-ip "cp -r /var/www/learningportrait/dist /var/www/learningportrait/dist.backup"

# 3. 上传新版本
scp -r dist/* user@your-server-ip:/var/www/learningportrait/dist/

# 4. 清除浏览器缓存或等待缓存过期
```

## 📝 维护清单

### 每日检查
- [ ] 查看访问日志,监控流量
- [ ] 检查错误日志,及时发现问题

### 每周检查
- [ ] 检查磁盘空间
- [ ] 清理旧的日志文件
- [ ] 检查SSL证书有效期

### 每月检查
- [ ] 更新系统和Nginx
- [ ] 备份配置文件
- [ ] 性能优化评估

## 💡 小贴士

1. **使用域名**: 配置域名比使用IP更专业,也便于SSL证书配置
2. **启用HTTPS**: 现代浏览器对HTTP网站有安全警告
3. **监控日志**: 定期查看日志可以及早发现问题
4. **备份配置**: 修改配置前先备份
5. **测试再部署**: 使用 `nginx -t` 测试配置后再重启服务

## 📞 获取帮助

如果遇到问题:
1. 查看本文档的故障排查部分
2. 检查Nginx错误日志
3. 搜索具体错误信息
4. 查阅Nginx官方文档: http://nginx.org/en/docs/

---

✅ 按照本指南操作后,您的Learning Portrait应用应该已经成功部署!
