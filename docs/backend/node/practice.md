# Node.js 实战

## 项目结构
```
project/
├── src/
│   ├── controllers/    # 控制器
│   ├── models/         # 数据模型
│   ├── routes/         # 路由
│   ├── services/       # 业务逻辑
│   └── utils/          # 工具函数
├── config/             # 配置文件
├── tests/              # 测试文件
└── package.json
```

## 常用中间件
- body-parser: 解析请求体
- cors: 处理跨域
- helmet: 安全相关
- morgan: 日志
- winston: 日志管理

## 错误处理
```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

## 性能优化
1. 使用缓存
2. 代码压缩
3. 静态资源 CDN
4. 数据库优化
5. 负载均衡

## 部署
1. PM2 进程管理
2. Nginx 反向代理
3. Docker 容器化
4. CI/CD 自动化部署

## 监控
1. 日志收集
2. 性能监控
3. 错误追踪
4. 健康检查 