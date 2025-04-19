# Node.js 基础

## 什么是 Node.js

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时环境，它允许我们在服务器端运行 JavaScript 代码。Node.js 使用事件驱动、非阻塞 I/O 模型，使其轻量且高效。

### 核心特性

- 异步非阻塞 I/O
- 事件驱动架构
- 单线程但支持高并发
- 跨平台支持
- 丰富的包生态系统 (npm)

## 快速入门

### 安装 Node.js

```bash
# 使用 nvm 安装 Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 16
nvm use 16

# 验证安装
node -v
npm -v
```

### 第一个 Node.js 程序

```javascript
// hello.js
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, Node.js!\n");
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
```

运行程序：

```bash
node hello.js
```

### 常用内置模块

```javascript
// 文件系统
const fs = require("fs");

// 路径处理
const path = require("path");

// 事件处理
const EventEmitter = require("events");

// 流处理
const stream = require("stream");

// 进程管理
const process = require("process");
```

## 核心概念

### 事件循环

Node.js 的事件循环是其异步编程的核心：

```javascript
// 事件循环示例
console.log("Start");

setTimeout(() => {
  console.log("Timeout 1");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 1");
});

process.nextTick(() => {
  console.log("Next Tick");
});

console.log("End");
```

### 模块系统

Node.js 使用 CommonJS 模块系统：

```javascript
// math.js
function add(a, b) {
  return a + b;
}

module.exports = {
  add,
};

// app.js
const math = require("./math");
console.log(math.add(1, 2));
```

### 异步编程

Node.js 提供了多种处理异步操作的方式：

```javascript
// 回调函数
fs.readFile("file.txt", (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Promise
fs.promises
  .readFile("file.txt")
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

// async/await
async function readFile() {
  try {
    const data = await fs.promises.readFile("file.txt");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

## 高级特性

### 流处理

Node.js 的流处理是其高效处理大文件的关键：

```javascript
const fs = require("fs");
const { Transform } = require("stream");

// 创建转换流
const uppercase = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  },
});

// 使用管道处理文件
fs.createReadStream("input.txt")
  .pipe(uppercase)
  .pipe(fs.createWriteStream("output.txt"));
```

### 进程管理

Node.js 提供了强大的进程管理能力：

```javascript
const { spawn } = require("child_process");

// 创建子进程
const child = spawn("ls", ["-lh", "/usr"]);

child.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

child.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

child.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
```

### 性能优化

1. 使用集群模式提高性能：

```javascript
const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end("Hello World\n");
    })
    .listen(8000);
}
```

2. 内存管理：

```javascript
// 监控内存使用
const used = process.memoryUsage();
console.log(used);

// 手动触发垃圾回收
if (global.gc) {
  global.gc();
}
```

## 最佳实践

1. 错误处理

   - 使用 try-catch 处理同步错误
   - 使用错误优先回调
   - 实现全局错误处理

2. 代码组织

   - 遵循模块化原则
   - 使用适当的目录结构
   - 实现配置管理

3. 性能优化

   - 使用流处理大文件
   - 实现缓存机制
   - 优化数据库查询

4. 安全实践
   - 输入验证
   - 防止注入攻击
   - 实现适当的认证和授权

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
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World\n");
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
```
