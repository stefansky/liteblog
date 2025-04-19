# Docker Compose

## 什么是 Docker Compose

Docker Compose 是一个用于定义和运行多容器 Docker 应用程序的工具。通过 Compose，您可以使用 YAML 文件来配置应用程序的服务，然后使用一个命令就可以创建并启动所有服务。

## 安装 Docker Compose

### macOS 安装

```bash
# Docker Desktop for Mac 已包含 Docker Compose
docker-compose --version
```

## Compose 文件结构

### 基本结构

```yaml
version: "3.8" # Compose 文件版本
services: # 服务定义
  web: # 服务名称
    build: . # 构建配置
    ports: # 端口映射
      - "5000:5000"
    volumes: # 数据卷
      - .:/code
    environment: # 环境变量
      - FLASK_ENV=development
    depends_on: # 依赖关系
      - redis
  redis: # 另一个服务
    image: redis:alpine
```

## 常用配置项

### 构建配置

```yaml
services:
  webapp:
    build:
      context: ./dir
      dockerfile: Dockerfile-alternate
      args:
        buildno: 1
```

### 网络配置

```yaml
services:
  web:
    networks:
      - front-tier
      - back-tier

networks:
  front-tier:
    driver: bridge
  back-tier:
    driver: bridge
```

### 数据卷配置

```yaml
services:
  db:
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
    driver: local
```

## 常用命令

```bash
# 启动服务
docker-compose up

# 在后台启动服务
docker-compose up -d

# 停止服务
docker-compose down

# 查看服务状态
docker-compose ps

# 查看服务日志
docker-compose logs

# 构建服务
docker-compose build

# 执行命令
docker-compose exec service_name command
```

## 实际应用示例

### Web 应用 + 数据库

```yaml
version: "3.8"

services:
  web:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - .:/code
    environment:
      - DATABASE_URL=postgres://postgres:postgres@db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:13
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_USER=postgres
      - POSTGRES_DB=mydb

volumes:
  postgres_data:
```

### 多服务应用

```yaml
version: "3.8"

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development

  backend:
    build: ./backend
    ports:
      - "4000:4000"
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - DATABASE_URL=mongodb://mongo:27017/mydb
    depends_on:
      - mongo

  mongo:
    image: mongo:4.4
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

## 环境变量配置

### 使用 .env 文件

```bash
# .env
DB_USER=admin
DB_PASS=password
DB_NAME=mydb
```

```yaml
# docker-compose.yml
services:
  db:
    image: postgres
    environment:
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASS}
      - POSTGRES_DB=${DB_NAME}
```

## 最佳实践

1. 服务配置

   - 使用版本控制
   - 合理设置资源限制
   - 配置健康检查

2. 网络配置

   - 使用自定义网络
   - 合理设置网络别名
   - 配置网络驱动

3. 数据管理

   - 使用命名卷
   - 配置卷驱动
   - 设置访问权限

4. 部署策略
   - 使用环境变量
   - 配置重启策略
   - 设置日志驱动
