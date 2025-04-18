# Express/Koa 框架

## Express 框架

### 简介
Express 是一个基于 Node.js 平台的 web 应用开发框架。

### 安装
```bash
npm install express
```

### 基本使用
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
```

## Koa 框架

### 简介
Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造。

### 安装
```bash
npm install koa
```

### 基本使用
```javascript
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```

## 对比
- Express 更成熟，生态更丰富
- Koa 更轻量，使用 async/await 处理异步
- Koa 中间件采用洋葱模型
- Express 中间件采用线性模型 