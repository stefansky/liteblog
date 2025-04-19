# Docker 实战

## 1. 使用 Docker 部署一个简单的 Web 应用

### 1.1 创建简单的 HTML 应用

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>Simple Web App</title>
  </head>
  <body>
    <h1>Welcome to Docker!</h1>
    <p>This is a simple web application running in a Docker container.</p>
  </body>
</html>
```

### 1.2 创建 Dockerfile

```dockerfile
# 使用 Nginx 作为基础镜像
FROM nginx:alpine

# 复制静态文件到 Nginx 默认目录
COPY index.html /usr/share/nginx/html/

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
```

### 1.3 构建和运行

```bash
# 构建镜像
docker build -t simple-web-app .

# 运行容器
docker run -d -p 8080:80 simple-web-app
```

## 2. 使用 Docker 部署一个简单的 Node.js 应用

### 2.1 创建 Node.js 应用

```javascript
// app.js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Node.js in Docker!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 2.2 创建 package.json

```json
{
  "name": "node-docker-app",
  "version": "1.0.0",
  "main": "app.js",
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

### 2.3 创建 Dockerfile

```dockerfile
# 使用 Node.js 作为基础镜像
FROM node:14-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制源代码
COPY . .

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["node", "app.js"]
```

### 2.4 构建和运行

```bash
# 构建镜像
docker build -t node-app .

# 运行容器
docker run -d -p 3000:3000 node-app
```

## 3. 使用 Docker 部署一个前后端分离的项目

### 3.1 项目结构

```
project/
├── frontend/
│   ├── Dockerfile
│   └── ... (React/Vue 前端代码)
├── backend/
│   ├── Dockerfile
│   └── ... (Node.js/Python 后端代码)
└── docker-compose.yml
```

### 3.2 前端 Dockerfile

```dockerfile
# 构建阶段
FROM node:14-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 生产阶段
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 3.3 后端 Dockerfile

```dockerfile
FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### 3.4 docker-compose.yml

```yaml
version: "3.8"

services:
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=mongodb://mongo:27017/mydb
    depends_on:
      - mongo

  mongo:
    image: mongo:4.4
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

### 3.5 部署命令

```bash
# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

## 4. 使用 Docker 部署一个实际企业的项目

### 4.1 项目架构

```
enterprise-app/
├── frontend/
│   ├── Dockerfile
│   └── ... (前端代码)
├── backend/
│   ├── Dockerfile
│   └── ... (后端代码)
├── nginx/
│   └── nginx.conf
├── .env
└── docker-compose.yml
```

### 4.2 环境配置

```bash
# .env
NODE_ENV=production
DB_HOST=mongodb
DB_PORT=27017
DB_NAME=enterprise
REDIS_HOST=redis
REDIS_PORT=6379
```

### 4.3 Nginx 配置

```nginx
# nginx/nginx.conf
upstream backend {
    server backend:3000;
}

server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 4.4 docker-compose.yml

```yaml
version: "3.8"

services:
  frontend:
    build: ./frontend
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=production
    depends_on:
      - backend

  backend:
    build: ./backend
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=production
      - DB_HOST=${DB_HOST}
      - DB_PORT=${DB_PORT}
      - DB_NAME=${DB_NAME}
      - REDIS_HOST=${REDIS_HOST}
      - REDIS_PORT=${REDIS_PORT}
    depends_on:
      - mongodb
      - redis

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf
      - ./frontend/dist:/usr/share/nginx/html
    depends_on:
      - frontend
      - backend

  mongodb:
    image: mongo:4.4
    volumes:
      - mongodb_data:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password

  redis:
    image: redis:6-alpine
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes

volumes:
  mongodb_data:
  redis_data:
```

### 4.5 部署流程

```bash
# 1. 构建镜像
docker-compose build

# 2. 启动服务
docker-compose up -d

# 3. 查看服务状态
docker-compose ps

# 4. 查看日志
docker-compose logs -f

# 5. 停止服务
docker-compose down

# 6. 清理数据
docker-compose down -v
```

### 4.6 监控和维护

```bash
# 查看容器资源使用情况
docker stats

# 查看容器日志
docker-compose logs -f service_name

# 进入容器
docker-compose exec service_name sh

# 备份数据
docker-compose exec mongodb mongodump --out /data/backup
```

## 5. 最佳实践

1. 镜像优化

   - 使用多阶段构建
   - 最小化镜像层数
   - 使用 .dockerignore 文件
   - 选择合适的基础镜像

2. 容器管理

   - 使用有意义的容器名称
   - 设置资源限制
   - 实现健康检查
   - 配置重启策略

3. 数据管理

   - 使用命名卷持久化数据
   - 定期备份重要数据
   - 实现数据迁移策略
   - 监控存储使用情况

4. 安全实践

   - 使用非 root 用户运行容器
   - 定期更新基础镜像
   - 扫描镜像中的漏洞
   - 限制容器权限

5. 监控和日志
   - 配置日志驱动
   - 实现集中式日志
   - 设置监控告警
   - 定期性能分析
