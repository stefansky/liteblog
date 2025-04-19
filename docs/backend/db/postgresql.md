# PostgreSQL 数据库

## 基础使用

### 安装与配置

```bash
# 安装 PostgreSQL
brew install postgresql

# 启动 PostgreSQL 服务
brew services start postgresql

# 连接 PostgreSQL
psql -U postgres
```

### 基本命令

```sql
-- 创建数据库
CREATE DATABASE dbname;

-- 连接数据库
\c dbname

-- 创建表
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
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
SMALLINT     -- 2字节
INTEGER      -- 4字节
BIGINT       -- 8字节

-- 浮点类型
REAL         -- 4字节
DOUBLE PRECISION  -- 8字节
NUMERIC      -- 精确小数
```

### 字符串类型

```sql
-- 定长字符串
CHAR(10)     -- 固定长度

-- 变长字符串
VARCHAR(255) -- 可变长度
TEXT         -- 无限长度

-- 特殊类型
UUID         -- UUID类型
JSON         -- JSON类型
JSONB        -- 二进制JSON
```

### 日期时间类型

```sql
DATE         -- 日期
TIME         -- 时间
TIMESTAMP    -- 时间戳
TIMESTAMPTZ  -- 带时区时间戳
INTERVAL     -- 时间间隔
```

## 索引

### 创建索引

```sql
-- 主键索引
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

-- 唯一索引
CREATE UNIQUE INDEX idx_email ON users(email);

-- 普通索引
CREATE INDEX idx_name ON users(name);

-- 复合索引
CREATE INDEX idx_name_age ON users(name, age);

-- 部分索引
CREATE INDEX idx_active_users ON users(name) WHERE status = 'active';

-- 表达式索引
CREATE INDEX idx_lower_name ON users(lower(name));
```

### 索引类型

1. B-Tree 索引

   - 默认索引类型
   - 适合等值查询和范围查询
   - 支持排序

2. Hash 索引

   - 适合等值查询
   - 不支持范围查询
   - 不支持排序

3. GiST 索引

   - 通用搜索树
   - 支持几何数据类型
   - 支持全文搜索

4. GIN 索引
   - 通用倒排索引
   - 适合数组和全文搜索
   - 支持多值类型

## 事务

### 基本事务

```sql
-- 开始事务
BEGIN;

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

## 高级特性

### 表继承

```sql
-- 创建父表
CREATE TABLE persons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    age INTEGER
);

-- 创建子表
CREATE TABLE employees (
    salary DECIMAL(10,2)
) INHERITS (persons);
```

### 窗口函数

```sql
-- 排名
SELECT
    name,
    salary,
    RANK() OVER (ORDER BY salary DESC) as rank
FROM employees;

-- 分组统计
SELECT
    department,
    name,
    salary,
    AVG(salary) OVER (PARTITION BY department) as avg_salary
FROM employees;
```

### 物化视图

```sql
-- 创建物化视图
CREATE MATERIALIZED VIEW mv_employee_stats AS
SELECT
    department,
    COUNT(*) as count,
    AVG(salary) as avg_salary
FROM employees
GROUP BY department;

-- 刷新物化视图
REFRESH MATERIALIZED VIEW mv_employee_stats;
```

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
-- 分析表
ANALYZE users;

-- 清理表
VACUUM users;

-- 完全清理
VACUUM FULL users;
```

## 备份与恢复

### 备份

```bash
# 备份整个数据库
pg_dump -U postgres dbname > backup.sql

# 备份特定表
pg_dump -U postgres -t users -t posts dbname > tables.sql

# 压缩备份
pg_dump -U postgres dbname | gzip > backup.sql.gz
```

### 恢复

```bash
# 恢复数据库
psql -U postgres dbname < backup.sql

# 从压缩文件恢复
gunzip < backup.sql.gz | psql -U postgres dbname
```

## 最佳实践

1. 数据库设计

   - 合理设计表结构
   - 选择合适的数据类型
   - 建立适当的索引
   - 使用约束

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
