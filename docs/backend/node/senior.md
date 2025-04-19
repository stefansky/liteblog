# Node.js 高级特性

## 事件循环

### 事件循环阶段

```javascript
// 事件循环示例
const fs = require("fs");

// 阶段1: 定时器
setTimeout(() => {
  console.log("setTimeout");
}, 0);

// 阶段2: I/O 回调
fs.readFile("file.txt", () => {
  console.log("readFile");
});

// 阶段3: 空闲/准备
setImmediate(() => {
  console.log("setImmediate");
});

// 阶段4: 轮询
process.nextTick(() => {
  console.log("nextTick");
});

// 阶段5: 检查
Promise.resolve().then(() => {
  console.log("Promise");
});
```

### 微任务和宏任务

```javascript
// 微任务队列
Promise.resolve()
  .then(() => {
    console.log("Promise 1");
  })
  .then(() => {
    console.log("Promise 2");
  });

// 宏任务队列
setTimeout(() => {
  console.log("setTimeout 1");
  Promise.resolve().then(() => {
    console.log("Promise in setTimeout");
  });
}, 0);

setTimeout(() => {
  console.log("setTimeout 2");
}, 0);
```

## 流处理

### 可读流

```javascript
const fs = require("fs");
const { Readable } = require("stream");

// 文件流
const fileStream = fs.createReadStream("input.txt");

// 自定义可读流
class MyReadable extends Readable {
  constructor(options) {
    super(options);
    this.data = ["a", "b", "c"];
    this.index = 0;
  }

  _read() {
    if (this.index < this.data.length) {
      this.push(this.data[this.index++]);
    } else {
      this.push(null);
    }
  }
}

const myStream = new MyReadable();
```

### 可写流

```javascript
const fs = require("fs");
const { Writable } = require("stream");

// 文件流
const fileStream = fs.createWriteStream("output.txt");

// 自定义可写流
class MyWritable extends Writable {
  constructor(options) {
    super(options);
  }

  _write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  }
}

const myStream = new MyWritable();
```

### 转换流

```javascript
const { Transform } = require("stream");

// 自定义转换流
class MyTransform extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
}

const transform = new MyTransform();
```

## 进程管理

### 子进程

```javascript
const { spawn, exec, fork } = require("child_process");

// spawn 创建子进程
const ls = spawn("ls", ["-lh", "/usr"]);

ls.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

ls.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});

// exec 执行命令
exec("ls -lh /usr", (error, stdout, stderr) => {
  if (error) {
    console.error(`error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});

// fork 创建 Node.js 子进程
const child = fork("child.js");

child.on("message", (msg) => {
  console.log("Message from child:", msg);
});

child.send({ hello: "world" });
```

### 进程间通信

```javascript
// parent.js
const { fork } = require("child_process");
const child = fork("child.js");

child.on("message", (msg) => {
  console.log("Parent received:", msg);
});

child.send({ parent: "message" });

// child.js
process.on("message", (msg) => {
  console.log("Child received:", msg);
  process.send({ child: "message" });
});
```

## 性能优化

### 内存管理

```javascript
// 监控内存使用
const used = process.memoryUsage();
console.log(used);

// 手动触发垃圾回收
if (global.gc) {
  global.gc();
}

// 内存泄漏检测
const heapUsed = process.memoryUsage().heapUsed;
console.log(`Heap used: ${heapUsed} bytes`);
```

### 集群模式

```javascript
const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end("hello world\n");
    })
    .listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```

## 错误处理

### 全局错误处理

```javascript
// 未捕获的异常
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

// 未处理的 Promise 拒绝
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// 领域错误
const domain = require("domain");
const d = domain.create();

d.on("error", (err) => {
  console.error("Domain caught error:", err);
});

d.run(() => {
  // 在领域内运行的代码
  throw new Error("Domain error");
});
```

## 调试技巧

### 调试工具

```javascript
// 使用 debugger 语句
function complexOperation() {
  debugger;
  // 复杂操作
}

// 使用 console 调试
console.time("operation");
// 操作
console.timeEnd("operation");

// 使用 util.inspect
const util = require("util");
console.log(util.inspect(complexObject, { depth: null }));
```

### 性能分析

```javascript
// 使用 performance hooks
const { PerformanceObserver, performance } = require("perf_hooks");

const obs = new PerformanceObserver((items) => {
  console.log(items.getEntries()[0].duration);
  performance.clearMarks();
});

obs.observe({ entryTypes: ["measure"] });

performance.mark("A");
// 操作
performance.mark("B");
performance.measure("A to B", "A", "B");
```

## 最佳实践

1. 代码组织

   - 使用模块化
   - 遵循单一职责原则
   - 实现错误处理
   - 编写单元测试

2. 性能优化

   - 使用流处理大文件
   - 实现缓存机制
   - 优化数据库查询
   - 使用集群模式

3. 安全实践

   - 输入验证
   - 防止注入攻击
   - 实现认证和授权
   - 使用 HTTPS

4. 运维管理
   - 日志记录
   - 监控系统
   - 备份策略
   - 灾难恢复
