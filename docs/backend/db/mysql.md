# MySQL 数据库

## 基础使用

### 安装与配置

```bash
# 安装 MySQL
brew install mysql

# 启动 MySQL 服务
brew services start mysql

# 连接 MySQL
mysql -u root -p
```

### 基本命令

```sql
-- 创建数据库
CREATE DATABASE dbname;

-- 选择数据库
USE dbname;

-- 创建表
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入数据
INSERT INTO users (name, email) VALUES ('John', 'john@example.com');

-- 查询数据
SELECT * FROM users;
SELECT name, email FROM users WHERE id = 1;

-- 更新数据
UPDATE users SET name = 'Jane' WHERE id = 1;

-- 删除数据
DELETE FROM users WHERE id = 1;
```

## 数据类型

### 数值类型

```sql
-- 整数类型
TINYINT      -- 1字节
SMALLINT     -- 2字节
MEDIUMINT    -- 3字节
INT          -- 4字节
BIGINT       -- 8字节

-- 浮点类型
FLOAT        -- 4字节
DOUBLE       -- 8字节
DECIMAL      -- 精确小数
```

### 字符串类型

```sql
-- 定长字符串
CHAR(10)     -- 固定长度

-- 变长字符串
VARCHAR(255) -- 可变长度

-- 文本类型
TEXT         -- 长文本
MEDIUMTEXT   -- 中等长度文本
LONGTEXT     -- 超长文本
```

### 日期时间类型

```sql
DATE         -- 日期
TIME         -- 时间
DATETIME     -- 日期时间
TIMESTAMP    -- 时间戳
YEAR         -- 年份
```

## 索引

### 创建索引

```sql
-- 主键索引
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(50)
);

-- 唯一索引
CREATE UNIQUE INDEX idx_email ON users(email);

-- 普通索引
CREATE INDEX idx_name ON users(name);

-- 复合索引
CREATE INDEX idx_name_age ON users(name, age);
```

### 索引类型

1. B-Tree 索引

   - 适合等值查询和范围查询
   - 支持排序和分组
   - 最常用的索引类型

2. 哈希索引

   - 适合等值查询
   - 不支持范围查询
   - 不支持排序

3. 全文索引
   - 适合文本搜索
   - 支持模糊查询
   - 用于 MyISAM 和 InnoDB 引擎

## 事务

### 基本事务

```sql
-- 开始事务
START TRANSACTION;

-- 执行操作
INSERT INTO users (name) VALUES ('John');
UPDATE accounts SET balance = balance - 100 WHERE user_id = 1;

-- 提交事务
COMMIT;

-- 回滚事务
ROLLBACK;
```

### 事务隔离级别

```sql
-- 设置隔离级别
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

## 存储引擎

### InnoDB

- 支持事务
- 支持外键
- 支持行级锁
- 支持崩溃恢复
- 默认存储引擎

### MyISAM

- 不支持事务
- 不支持外键
- 支持表级锁
- 支持全文索引
- 适合读多写少

## 性能优化

### 查询优化

```sql
-- 使用 EXPLAIN 分析查询
EXPLAIN SELECT * FROM users WHERE name = 'John';

-- 避免 SELECT *
SELECT id, name FROM users;

-- 使用 LIMIT
SELECT * FROM users LIMIT 10;

-- 使用索引
SELECT * FROM users WHERE name = 'John' AND age > 18;
```

### 表优化

```sql
-- 优化表
OPTIMIZE TABLE users;

-- 分析表
ANALYZE TABLE users;

-- 修复表
REPAIR TABLE users;
```

## 备份与恢复

### 备份

```bash
# 备份整个数据库
mysqldump -u root -p dbname > backup.sql

# 备份特定表
mysqldump -u root -p dbname table1 table2 > backup.sql

# 压缩备份
mysqldump -u root -p dbname | gzip > backup.sql.gz
```

### 恢复

```bash
# 恢复数据库
mysql -u root -p dbname < backup.sql

# 从压缩文件恢复
gunzip < backup.sql.gz | mysql -u root -p dbname
```

## 最佳实践

1. 数据库设计

   - 合理设计表结构
   - 选择合适的数据类型
   - 建立适当的索引
   - 规范化数据库

2. 性能优化

   - 优化查询语句
   - 合理使用索引
   - 避免大事务
   - 定期维护

3. 安全措施

   - 设置强密码
   - 限制用户权限
   - 定期备份
   - 监控异常

4. 运维管理
   - 监控系统状态
   - 设置告警
   - 定期维护
   - 版本升级
