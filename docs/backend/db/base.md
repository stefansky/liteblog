# 数据库基础

## 数据库概述

数据库是存储、管理和检索数据的系统。现代应用开发中，数据库扮演着至关重要的角色。

### 数据库类型

1. 关系型数据库 (RDBMS)

   - MySQL
   - PostgreSQL
   - Oracle
   - SQL Server

2. 非关系型数据库 (NoSQL)
   - MongoDB (文档型)
   - Redis (键值型)
   - Cassandra (列存储)
   - Neo4j (图数据库)

## SQL 基础

### 数据定义语言 (DDL)

```sql
-- 创建数据库
CREATE DATABASE mydb;

-- 创建表
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 修改表结构
ALTER TABLE users ADD COLUMN age INT;

-- 删除表
DROP TABLE users;
```

### 数据操作语言 (DML)

```sql
-- 插入数据
INSERT INTO users (username, email) VALUES ('john', 'john@example.com');

-- 查询数据
SELECT * FROM users WHERE age > 18;

-- 更新数据
UPDATE users SET age = 25 WHERE username = 'john';

-- 删除数据
DELETE FROM users WHERE id = 1;
```

### 数据查询语言 (DQL)

```sql
-- 基本查询
SELECT username, email FROM users;

-- 条件查询
SELECT * FROM users WHERE age BETWEEN 18 AND 30;

-- 排序
SELECT * FROM users ORDER BY created_at DESC;

-- 分组
SELECT age, COUNT(*) FROM users GROUP BY age;

-- 连接查询
SELECT u.username, p.title
FROM users u
JOIN posts p ON u.id = p.user_id;
```

## 数据库设计

### 范式化

1. 第一范式 (1NF)

   - 每个列都是原子的
   - 没有重复的列组

2. 第二范式 (2NF)

   - 满足 1NF
   - 非主键列完全依赖于主键

3. 第三范式 (3NF)
   - 满足 2NF
   - 非主键列不传递依赖于主键

### 索引设计

```sql
-- 创建索引
CREATE INDEX idx_username ON users(username);

-- 复合索引
CREATE INDEX idx_name_age ON users(username, age);

-- 唯一索引
CREATE UNIQUE INDEX idx_email ON users(email);
```

### 关系设计

```sql
-- 一对一关系
CREATE TABLE user_profiles (
    user_id INT PRIMARY KEY,
    bio TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 一对多关系
CREATE TABLE posts (
    id INT PRIMARY KEY,
    user_id INT,
    title VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 多对多关系
CREATE TABLE user_roles (
    user_id INT,
    role_id INT,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);
```

## 性能优化

### 查询优化

1. 使用 EXPLAIN 分析查询

```sql
EXPLAIN SELECT * FROM users WHERE username = 'john';
```

2. 避免全表扫描

```sql
-- 使用索引
SELECT * FROM users WHERE username = 'john';

-- 避免使用函数
SELECT * FROM users WHERE YEAR(created_at) = 2023; -- 不好
SELECT * FROM users WHERE created_at >= '2023-01-01'; -- 好
```

3. 优化 JOIN 操作

```sql
-- 使用适当的索引
CREATE INDEX idx_user_id ON posts(user_id);

-- 限制返回的列
SELECT u.username, p.title
FROM users u
JOIN posts p ON u.id = p.user_id;
```

### 索引优化

1. 选择合适的索引类型

   - B-tree 索引：适合等值查询和范围查询
   - Hash 索引：适合等值查询
   - 全文索引：适合文本搜索

2. 避免过度索引

   - 只为频繁查询的列创建索引
   - 考虑索引的维护成本

3. 定期维护索引

```sql
-- 分析表
ANALYZE TABLE users;

-- 优化表
OPTIMIZE TABLE users;
```

## 事务管理

### ACID 特性

1. 原子性 (Atomicity)
2. 一致性 (Consistency)
3. 隔离性 (Isolation)
4. 持久性 (Durability)

### 事务控制

```sql
-- 开始事务
START TRANSACTION;

-- 执行操作
INSERT INTO users (username) VALUES ('john');
UPDATE accounts SET balance = balance - 100 WHERE user_id = 1;

-- 提交事务
COMMIT;

-- 回滚事务
ROLLBACK;
```

### 隔离级别

```sql
-- 设置隔离级别
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- 查看当前隔离级别
SELECT @@transaction_isolation;
```

## 安全实践

1. 防止 SQL 注入

   - 使用参数化查询
   - 使用 ORM 框架
   - 输入验证

2. 访问控制

   - 最小权限原则
   - 角色基础访问控制
   - 定期审计

3. 数据加密
   - 传输层加密 (SSL/TLS)
   - 存储加密
   - 敏感数据加密

## 备份与恢复

### 备份策略

```sql
-- 全量备份
mysqldump -u root -p mydb > backup.sql

-- 增量备份
mysqlbinlog /var/log/mysql/mysql-bin.000001 > incremental.sql
```

### 恢复操作

```sql
-- 恢复全量备份
mysql -u root -p mydb < backup.sql

-- 恢复增量备份
mysql -u root -p mydb < incremental.sql
```

## 最佳实践

1. 数据库设计

   - 遵循范式化原则
   - 合理使用索引
   - 考虑扩展性

2. 性能优化

   - 监控查询性能
   - 定期维护索引
   - 优化表结构

3. 安全管理

   - 实施访问控制
   - 定期备份数据
   - 监控异常活动

4. 运维管理
   - 制定备份策略
   - 建立监控系统
   - 文档化操作流程
