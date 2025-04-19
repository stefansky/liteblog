# 项目实战

## 1. 使用 Gin 框架开发一个简单的 Web 应用

### 项目结构

```
simple-web/
├── main.go
├── templates/
│   ├── index.html
│   └── layout.html
├── static/
│   ├── css/
│   └── js/
└── go.mod
```

### 代码实现

```go
// main.go
package main

import (
    "net/http"
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()

    // 加载模板
    r.LoadHTMLGlob("templates/*")

    // 静态文件服务
    r.Static("/static", "./static")

    // 路由
    r.GET("/", func(c *gin.Context) {
        c.HTML(http.StatusOK, "index.html", gin.H{
            "title": "Simple Web App",
        })
    })

    // 启动服务器
    r.Run(":8080")
}
```

```html
<!-- templates/index.html -->
{{ define "content" }}
<div class="container">
  <h1>Welcome to Simple Web App</h1>
  <p>This is a simple web application built with Gin.</p>
</div>
{{ end }}
```

## 2. 使用 Gin 框架开发一个简单的 API 接口

### 项目结构

```
simple-api/
├── main.go
├── handlers/
│   └── user.go
├── models/
│   └── user.go
└── go.mod
```

### 代码实现

```go
// models/user.go
package models

type User struct {
    ID       int    `json:"id"`
    Username string `json:"username"`
    Email    string `json:"email"`
}

// handlers/user.go
package handlers

import (
    "net/http"
    "github.com/gin-gonic/gin"
)

func GetUsers(c *gin.Context) {
    users := []models.User{
        {ID: 1, Username: "user1", Email: "user1@example.com"},
        {ID: 2, Username: "user2", Email: "user2@example.com"},
    }
    c.JSON(http.StatusOK, users)
}

// main.go
package main

import (
    "github.com/gin-gonic/gin"
    "simple-api/handlers"
)

func main() {
    r := gin.Default()

    // API 路由
    api := r.Group("/api")
    {
        api.GET("/users", handlers.GetUsers)
    }

    r.Run(":8080")
}
```

## 3. 使用 Gin 框架开发一个前后端分离的项目

### 项目结构

```
fullstack-app/
├── backend/
│   ├── main.go
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── go.mod
└── frontend/
    ├── src/
    ├── public/
    └── package.json
```

### 后端实现

```go
// backend/main.go
package main

import (
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
)

func main() {
    r := gin.Default()

    // 配置 CORS
    config := cors.DefaultConfig()
    config.AllowOrigins = []string{"http://localhost:3000"}
    r.Use(cors.New(config))

    // 路由配置
    setupRoutes(r)

    r.Run(":8080")
}

// backend/controllers/user.go
package controllers

type UserController struct{}

func (uc *UserController) Register(c *gin.Context) {
    // 处理用户注册
}

func (uc *UserController) Login(c *gin.Context) {
    // 处理用户登录
}
```

### 前端实现

```javascript
// frontend/src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const userService = {
  register: (data) => api.post("/users/register", data),
  login: (data) => api.post("/users/login", data),
};
```

## 4. 使用 Gin 框架开发一个实际企业的项目

### 项目结构

```
enterprise-app/
├── cmd/
│   └── server/
│       └── main.go
├── internal/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── services/
│   ├── repositories/
│   └── middleware/
├── pkg/
│   ├── logger/
│   ├── database/
│   └── utils/
├── api/
│   └── swagger/
└── go.mod
```

### 核心实现

```go
// internal/config/config.go
package config

type Config struct {
    Server   ServerConfig
    Database DatabaseConfig
    JWT      JWTConfig
}

// internal/services/user.go
package services

type UserService struct {
    userRepo repositories.UserRepository
    logger   logger.Logger
}

func (s *UserService) CreateUser(ctx context.Context, user *models.User) error {
    // 业务逻辑处理
}

// cmd/server/main.go
package main

func main() {
    // 初始化配置
    cfg := config.Load()

    // 初始化依赖
    db := database.New(cfg.Database)
    logger := logger.New()

    // 创建服务
    userService := services.NewUserService(db, logger)

    // 启动服务器
    server := gin.Default()
    setupRoutes(server, userService)
    server.Run(":8080")
}
```

## 5. 使用 Gin 框架开发一个微服务项目

### 项目结构

```
microservices/
├── api-gateway/
├── user-service/
├── order-service/
├── product-service/
└── common/
```

### 服务实现

```go
// api-gateway/main.go
package main

func main() {
    r := gin.Default()

    // 服务发现配置
    consulClient := consul.NewClient()

    // 路由配置
    r.GET("/users/*path", createProxy("user-service"))
    r.GET("/orders/*path", createProxy("order-service"))

    r.Run(":8080")
}

// user-service/main.go
package main

func main() {
    r := gin.Default()

    // 注册服务
    consulClient := consul.NewClient()
    consulClient.Register("user-service", "localhost:8081")

    // 用户服务路由
    r.GET("/users", handlers.GetUsers)
    r.POST("/users", handlers.CreateUser)

    r.Run(":8081")
}
```

## 6. 使用 Gin 框架开发一个分布式项目

### 项目结构

```
distributed-app/
├── cmd/
│   ├── api/
│   ├── worker/
│   └── scheduler/
├── internal/
│   ├── queue/
│   ├── cache/
│   └── storage/
└── pkg/
```

### 核心实现

```go
// internal/queue/rabbitmq.go
package queue

type Queue struct {
    conn *amqp.Connection
}

func (q *Queue) Publish(message []byte) error {
    // 发布消息到队列
}

// cmd/worker/main.go
package main

func main() {
    // 初始化队列
    queue := queue.New()

    // 启动工作进程
    worker := worker.New(queue)
    worker.Start()
}
```

## 7. 使用 Gin 框架开发一个高并发项目

### 项目结构

```
high-concurrency/
├── main.go
├── internal/
│   ├── cache/
│   ├── rate/
│   └── pool/
└── pkg/
```

### 核心实现

```go
// internal/cache/redis.go
package cache

type Cache struct {
    client *redis.Client
}

func (c *Cache) Get(key string) (string, error) {
    // 从缓存获取数据
}

// main.go
package main

func main() {
    r := gin.Default()

    // 限流中间件
    r.Use(rate.NewLimiter(1000))

    // 连接池
    db := pool.NewDBPool()

    // 缓存
    cache := cache.New()

    r.Run(":8080")
}
```

## 8. 使用 Gin 框架开发一个高可用项目

### 项目结构

```
high-availability/
├── cmd/
│   ├── primary/
│   └── replica/
├── internal/
│   ├── health/
│   ├── monitor/
│   └── backup/
└── pkg/
```

### 核心实现

```go
// internal/health/check.go
package health

type HealthChecker struct {
    checks []Check
}

func (h *HealthChecker) Check() bool {
    // 健康检查
}

// cmd/primary/main.go
package main

func main() {
    r := gin.Default()

    // 健康检查
    health := health.New()
    r.GET("/health", health.Handler)

    // 监控
    monitor := monitor.New()
    monitor.Start()

    r.Run(":8080")
}
```

## 最佳实践

1. 项目组织

   - 清晰的目录结构
   - 模块化设计
   - 依赖注入

2. 代码质量

   - 单元测试
   - 代码审查
   - 文档注释

3. 性能优化

   - 缓存策略
   - 连接池
   - 限流控制

4. 安全措施

   - 认证授权
   - 数据加密
   - 输入验证

5. 运维支持
   - 日志记录
   - 监控告警
   - 部署脚本
