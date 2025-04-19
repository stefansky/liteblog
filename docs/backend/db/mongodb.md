# MongoDB 数据库

## 基础概念

### 数据库操作

```javascript
// 创建/切换数据库
use mydb;

// 查看所有数据库
show dbs;

// 删除数据库
db.dropDatabase();
```

### 集合操作

```javascript
// 创建集合
db.createCollection("users");

// 查看所有集合
show collections;

// 删除集合
db.users.drop();
```

## 文档操作

### 插入文档

```javascript
// 插入单个文档
db.users.insertOne({
  username: "john",
  email: "john@example.com",
  age: 25,
  created_at: new Date(),
});

// 插入多个文档
db.users.insertMany([
  {
    username: "alice",
    email: "alice@example.com",
    age: 30,
  },
  {
    username: "bob",
    email: "bob@example.com",
    age: 28,
  },
]);
```

### 查询文档

```javascript
// 查询所有文档
db.users.find();

// 条件查询
db.users.find({ age: { $gt: 25 } });

// 查询特定字段
db.users.find({}, { username: 1, email: 1 });

// 排序
db.users.find().sort({ age: -1 });

// 分页
db.users.find().skip(10).limit(5);

// 复杂查询
db.users.find({
  age: { $gt: 25 },
  $or: [{ username: "john" }, { email: /@example.com$/ }],
});
```

### 更新文档

```javascript
// 更新单个文档
db.users.updateOne({ username: "john" }, { $set: { age: 26 } });

// 更新多个文档
db.users.updateMany({ age: { $lt: 30 } }, { $set: { status: "active" } });

// 替换文档
db.users.replaceOne(
  { username: "john" },
  {
    username: "john",
    email: "new@example.com",
    age: 26,
  }
);
```

### 删除文档

```javascript
// 删除单个文档
db.users.deleteOne({ username: "john" });

// 删除多个文档
db.users.deleteMany({ age: { $lt: 30 } });
```

## 索引

### 创建索引

```javascript
// 创建单字段索引
db.users.createIndex({ username: 1 });

// 创建复合索引
db.users.createIndex({ username: 1, age: -1 });

// 创建唯一索引
db.users.createIndex({ email: 1 }, { unique: true });

// 创建文本索引
db.posts.createIndex({ content: "text" });
```

### 索引管理

```javascript
// 查看索引
db.users.getIndexes();

// 删除索引
db.users.dropIndex("username_1");

// 重建索引
db.users.reIndex();
```

## 聚合操作

### 基本聚合

```javascript
// 分组统计
db.users.aggregate([{ $group: { _id: "$age", count: { $sum: 1 } } }]);

// 多阶段聚合
db.users.aggregate([
  { $match: { age: { $gt: 25 } } },
  { $group: { _id: "$status", total: { $sum: 1 } } },
  { $sort: { total: -1 } },
]);
```

### 聚合管道操作符

```javascript
// $match 过滤
db.users.aggregate([{ $match: { age: { $gt: 25 } } }]);

// $project 投影
db.users.aggregate([{ $project: { username: 1, age: 1 } }]);

// $group 分组
db.users.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]);

// $sort 排序
db.users.aggregate([{ $sort: { age: -1 } }]);

// $limit 限制
db.users.aggregate([{ $limit: 5 }]);
```

## 数据模型

### 文档关系

```javascript
// 嵌入式文档
db.users.insertOne({
  username: "john",
  address: {
    street: "123 Main St",
    city: "New York",
    zip: "10001",
  },
});

// 引用式文档
db.users.insertOne({
  username: "john",
  posts: [
    ObjectId("507f1f77bcf86cd799439011"),
    ObjectId("507f1f77bcf86cd799439012"),
  ],
});
```

### 数据验证

```javascript
// 创建带验证的集合
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["username", "email"],
      properties: {
        username: {
          bsonType: "string",
          description: "must be a string",
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        },
        age: {
          bsonType: "int",
          minimum: 0,
        },
      },
    },
  },
});
```

## 性能优化

### 查询优化

```javascript
// 使用 explain 分析查询
db.users.find({ age: { $gt: 25 } }).explain("executionStats");

// 使用 hint 强制使用索引
db.users.find({ age: { $gt: 25 } }).hint({ age: 1 });

// 使用 covered query
db.users.find({ age: { $gt: 25 } }, { _id: 0, age: 1 });
```

### 索引优化

```javascript
// 创建复合索引
db.users.createIndex({ status: 1, age: -1 });

// 创建部分索引
db.users.createIndex(
  { username: 1 },
  { partialFilterExpression: { age: { $gt: 25 } } }
);

// 创建稀疏索引
db.users.createIndex({ email: 1 }, { sparse: true });
```

## 备份与恢复

### 备份

```bash
# 备份数据库
mongodump --db mydb --out /backup/

# 备份特定集合
mongodump --db mydb --collection users --out /backup/
```

### 恢复

```bash
# 恢复数据库
mongorestore --db mydb /backup/mydb/

# 恢复特定集合
mongorestore --db mydb --collection users /backup/mydb/users.bson
```

## 最佳实践

1. 数据建模

   - 合理使用嵌入式文档
   - 考虑查询模式
   - 避免过度规范化
   - 考虑数据增长

2. 性能优化

   - 创建合适的索引
   - 使用投影减少数据传输
   - 优化查询模式
   - 监控性能指标

3. 安全管理

   - 实施访问控制
   - 加密敏感数据
   - 定期备份
   - 监控异常活动

4. 运维管理
   - 制定备份策略
   - 建立监控系统
   - 文档化操作流程
   - 定期维护计划
