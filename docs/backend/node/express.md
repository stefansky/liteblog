# Express 框架

## 基础使用

### 安装与配置

```javascript
// 安装 Express
npm install express

// 创建 Express 应用
const express = require('express');
const app = express();

// 基本配置
app.use(express.json()); // 解析 JSON 请求体
app.use(express.urlencoded({ extended: true })); // 解析 URL 编码的请求体

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### 路由处理

```javascript
// 基本路由
app.get("/", (req, res) => {
  res.send("Hello World");
});

// 路由参数
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});

// 查询参数
app.get("/search", (req, res) => {
  const query = req.query.q;
  res.send(`Search query: ${query}`);
});

// 请求体
app.post("/users", (req, res) => {
  const userData = req.body;
  res.json(userData);
});
```

## 中间件

### 内置中间件

```javascript
// 静态文件服务
app.use(express.static("public"));

// JSON 解析
app.use(express.json());

// URL 编码解析
app.use(express.urlencoded({ extended: true }));
```

### 自定义中间件

```javascript
// 日志中间件
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// 认证中间件
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

// 使用中间件
app.use(logger);
app.use("/api", auth);
```

### 错误处理中间件

```javascript
// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});
```

## 路由组织

### 路由模块化

```javascript
// routes/users.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Get all users" });
});

router.post("/", (req, res) => {
  res.json({ message: "Create user" });
});

module.exports = router;

// app.js
const userRoutes = require("./routes/users");
app.use("/users", userRoutes);
```

### 路由参数验证

```javascript
// 使用 express-validator
const { body, validationResult } = require("express-validator");

app.post(
  "/users",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // 处理请求
  }
);
```

## 模板引擎

### 配置模板引擎

```javascript
// 设置模板引擎
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 渲染模板
app.get("/", (req, res) => {
  res.render("index", { title: "Home Page" });
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
</body>
</html>
```

## 文件上传

### 配置文件上传

```javascript
// 使用 multer 中间件
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// 处理文件上传
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ filename: req.file.filename });
});

// 多文件上传
app.post("/upload-multiple", upload.array("files", 5), (req, res) => {
  res.json({ files: req.files });
});
```

## 会话管理

### 配置会话

```javascript
// 使用 express-session
const session = require("express-session");

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

// 使用会话
app.get("/login", (req, res) => {
  req.session.user = { id: 1, name: "John" };
  res.send("Logged in");
});

app.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Unauthorized");
  }
  res.json(req.session.user);
});
```

## 安全实践

### CORS 配置

```javascript
// 使用 cors 中间件
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
```

### 安全头部

```javascript
// 使用 helmet 中间件
const helmet = require("helmet");

app.use(helmet());
```

### 速率限制

```javascript
// 使用 express-rate-limit
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 100, // 限制每个 IP 100 次请求
});

app.use(limiter);
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
