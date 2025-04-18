# Go 基础

## 简介
Go 是一种开源的编程语言，由 Google 开发。

## 特点
- 静态类型
- 编译型
- 并发支持
- 垃圾回收
- 快速编译

## 安装
```bash
# 下载安装包
https://golang.org/dl/

# 验证安装
go version
```

## 第一个 Go 程序
```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

## 基本语法
1. 变量声明
```go
var name string = "Go"
// 或
name := "Go"
```

2. 函数定义
```go
func add(a, b int) int {
    return a + b
}
```

3. 控制结构
```go
// if
if x > 0 {
    // do something
}

// for
for i := 0; i < 10; i++ {
    // do something
}

// switch
switch x {
case 1:
    // do something
case 2:
    // do something
default:
    // do something
}
```

## 并发编程
```go
go func() {
    // 并发执行
}()
``` 