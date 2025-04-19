# Koa 框架

## 基础使用

### 安装与配置

```javascript
// 安装 Koa
npm install koa

// 创建 Koa 应用
const Koa = require('koa');
const app = new Koa();

// 基本配置
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { error: err.message };
  }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### 上下文对象

```javascript
app.use(async (ctx) => {
  // 请求对象
  const { request } = ctx;
  console.log(request.method); // 请求方法
  console.log(request.url); // 请求 URL
  console.log(request.query); // 查询参数
  console.log(request.body); // 请求体

  // 响应对象
  const { response } = ctx;
  response.status = 200;
  response.type = "application/json";
  response.body = { message: "Hello Koa" };
});
```

## 中间件

### 内置中间件

```javascript
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const static = require("koa-static");
const cors = require("@koa/cors");

const app = new Koa();

// 解析请求体
app.use(bodyParser());

// 静态文件服务
app.use(static("public"));

// CORS 配置
app.use(
  cors({
    origin: "http://localhost:3000",
    allowMethods: ["GET", "POST"],
    allowHeaders: ["Content-Type"],
  })
);
```

### 自定义中间件

```javascript
// 日志中间件
const logger = async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
};

// 认证中间件
const auth = async (ctx, next) => {
  const token = ctx.headers.authorization;
  if (!token) {
    ctx.throw(401, "Unauthorized");
  }
  await next();
};

// 使用中间件
app.use(logger);
app.use(auth);
```

### 中间件组合

```javascript
const compose = require("koa-compose");

const middleware1 = async (ctx, next) => {
  console.log("middleware1 start");
  await next();
  console.log("middleware1 end");
};

const middleware2 = async (ctx, next) => {
  console.log("middleware2 start");
  await next();
  console.log("middleware2 end");
};

const all = compose([middleware1, middleware2]);
app.use(all);
```

## 路由

### 基本路由

```javascript
const Router = require("@koa/router");
const router = new Router();

// GET 请求
router.get("/", async (ctx) => {
  ctx.body = "Hello World";
});

// POST 请求
router.post("/users", async (ctx) => {
  const user = ctx.request.body;
  ctx.body = { message: "User created", user };
});

// 路由参数
router.get("/users/:id", async (ctx) => {
  const userId = ctx.params.id;
  ctx.body = { userId };
});

// 使用路由
app.use(router.routes());
app.use(router.allowedMethods());
```

### 路由模块化

```javascript
// routes/users.js
const Router = require("@koa/router");
const router = new Router({ prefix: "/users" });

router.get("/", async (ctx) => {
  ctx.body = "Get all users";
});

router.post("/", async (ctx) => {
  ctx.body = "Create user";
});

module.exports = router;

// app.js
const userRoutes = require("./routes/users");
app.use(userRoutes.routes());
```

## 错误处理

### 全局错误处理

```javascript
// 错误处理中间件
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      error: {
        message: err.message,
        status: ctx.status,
      },
    };
    ctx.app.emit("error", err, ctx);
  }
});

// 错误事件监听
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});
```

### 自定义错误

```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.status = 400;
  }
}

app.use(async (ctx, next) => {
  if (!ctx.request.body.username) {
    throw new ValidationError("Username is required");
  }
  await next();
});
```

## 模板引擎

### 配置模板引擎

```javascript
const views = require("koa-views");
const path = require("path");

// 配置模板引擎
app.use(
  views(path.join(__dirname, "views"), {
    extension: "ejs",
  })
);

// 渲染模板
app.use(async (ctx) => {
  await ctx.render("index", {
    title: "Koa App",
    user: { name: "John" },
  });
});
```

### 使用模板

```ejs
<!-- views/index.ejs -->
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
</head>
<body>
  <h1>Welcome to <%= title %></h1>
  <p>User: <%= user.name %></p>
</body>
</html>
```

## 文件上传

### 配置文件上传

```javascript
const koaBody = require("koa-body");
const path = require("path");

app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, "uploads"),
      keepExtensions: true,
    },
  })
);

// 处理文件上传
app.use(async (ctx) => {
  const file = ctx.request.files.file;
  ctx.body = {
    filename: file.name,
    size: file.size,
  };
});
```

## 会话管理

### 配置会话

```javascript
const session = require("koa-session");

// 配置会话
app.keys = ["your-secret-key"];
app.use(
  session(
    {
      key: "koa:sess",
      maxAge: 86400000,
      httpOnly: true,
    },
    app
  )
);

// 使用会话
app.use(async (ctx) => {
  if (ctx.path === "/login") {
    ctx.session.user = { id: 1, name: "John" };
    ctx.body = "Logged in";
  } else if (ctx.path === "/profile") {
    if (!ctx.session.user) {
      ctx.throw(401, "Unauthorized");
    }
    ctx.body = ctx.session.user;
  }
});
```

## 最佳实践

1. 项目结构

   ```
   project/
   ├── config/         # 配置文件
   ├── controllers/    # 控制器
   ├── models/         # 数据模型
   ├── routes/         # 路由
   ├── middleware/     # 中间件
   ├── public/         # 静态文件
   ├── views/          # 模板
   ├── utils/          # 工具函数
   └── app.js          # 入口文件
   ```

2. 错误处理

   - 使用统一的错误处理中间件
   - 实现错误日志记录
   - 返回适当的 HTTP 状态码

3. 性能优化

   - 使用缓存
   - 压缩响应
   - 优化数据库查询
   - 使用集群模式

4. 安全措施
   - 实施输入验证
   - 使用 HTTPS
   - 防止 XSS 和 CSRF 攻击
   - 定期更新依赖
