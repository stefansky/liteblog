# Docker 基础

## 什么是 Docker

Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。

### Docker 核心概念

- **镜像(Image)**：一个只读的模板，用于创建 Docker 容器
- **容器(Container)**：镜像的运行实例，包含运行应用所需的所有内容
- **仓库(Repository)**：集中存放镜像文件的场所
- **Dockerfile**：用于构建镜像的文本文件

## 安装 Docker

### macOS 安装

```bash
# 使用 Homebrew 安装
brew install --cask docker

# 启动 Docker Desktop
open /Applications/Docker.app
```

### 验证安装

```bash
# 检查 Docker 版本
docker --version

# 运行测试容器
docker run hello-world
```

## 基本命令

### 镜像操作

```bash
# 搜索镜像
docker search nginx

# 拉取镜像
docker pull nginx:latest

# 列出本地镜像
docker images

# 删除镜像
docker rmi nginx:latest

# 构建镜像
docker build -t myapp:1.0 .
```

### 容器操作

```bash
# 运行容器
docker run -d -p 80:80 nginx

# 列出运行中的容器
docker ps

# 列出所有容器
docker ps -a

# 停止容器
docker stop container_id

# 启动容器
docker start container_id

# 删除容器
docker rm container_id

# 进入容器
docker exec -it container_id /bin/bash
```

### 数据卷操作

```bash
# 创建数据卷
docker volume create my-vol

# 列出数据卷
docker volume ls

# 挂载数据卷
docker run -d -v my-vol:/app nginx

# 删除数据卷
docker volume rm my-vol
```

## Dockerfile 示例

```dockerfile
# 使用官方 Node.js 镜像作为基础镜像
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

# 启动命令
CMD ["npm", "start"]
```

## 网络管理

```bash
# 列出网络
docker network ls

# 创建网络
docker network create my-network

# 连接容器到网络
docker network connect my-network container_id

# 断开网络连接
docker network disconnect my-network container_id
```

## 日志管理

```bash
# 查看容器日志
docker logs container_id

# 实时查看日志
docker logs -f container_id

# 查看最后 N 行日志
docker logs --tail 100 container_id
```

## 最佳实践

1. 镜像优化

   - 使用多阶段构建
   - 最小化镜像层数
   - 使用 .dockerignore 文件

2. 容器管理

   - 使用有意义的容器名称
   - 设置资源限制
   - 实现健康检查

3. 数据管理

   - 使用数据卷持久化数据
   - 避免在容器中存储数据
   - 定期备份重要数据

4. 安全实践
   - 使用非 root 用户运行容器
   - 定期更新基础镜像
   - 扫描镜像中的漏洞
