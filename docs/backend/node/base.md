# Node.js 基础

## 简介
Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。

## 核心概念
- 事件驱动
- 非阻塞 I/O
- 单线程
- 异步编程

## 常用模块
- fs: 文件系统
- http: HTTP 服务器
- path: 路径处理
- os: 操作系统信息
- events: 事件处理

## 安装与使用
```bash
# 安装 Node.js
npm install -g node

# 查看版本
node -v
npm -v
```

## 第一个 Node.js 程序
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
``` 