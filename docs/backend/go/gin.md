# Gin 框架

## 简介
Gin 是一个用 Go 编写的 web 框架，具有高性能和易用性。

## 安装
```bash
go get -u github.com/gin-gonic/gin
```

## 基本使用
```go
package main

import (
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    
    r.GET("/ping", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "message": "pong",
        })
    })
    
    r.Run() // 默认监听 :8080
}
```

## 路由
```go
// 基本路由
r.GET("/someGet", getting)
r.POST("/somePost", posting)
r.PUT("/somePut", putting)
r.DELETE("/someDelete", deleting)
r.PATCH("/somePatch", patching)
r.HEAD("/someHead", head)
r.OPTIONS("/someOptions", options)

// 路由组
v1 := r.Group("/v1")
{
    v1.POST("/login", loginEndpoint)
    v1.POST("/submit", submitEndpoint)
}
```

## 中间件
```go
// 全局中间件
r.Use(gin.Logger())
r.Use(gin.Recovery())

// 路由组中间件
authorized := r.Group("/")
authorized.Use(AuthRequired())
```

## 参数绑定
```go
// JSON 绑定
type Login struct {
    User     string `json:"user" binding:"required"`
    Password string `json:"password" binding:"required"`
}

func login(c *gin.Context) {
    var json Login
    if err := c.ShouldBindJSON(&json); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
}
```

## 文件上传
```go
func upload(c *gin.Context) {
    file, _ := c.FormFile("file")
    c.SaveUploadedFile(file, dst)
}
``` 