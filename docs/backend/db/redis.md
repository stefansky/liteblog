# Redis 数据库

## 基础使用

### 安装与配置

```bash
# 安装 Redis
brew install redis

# 启动 Redis 服务
brew services start redis

# 连接 Redis
redis-cli
```

### 基本命令

```bash
# 设置键值对
SET key value

# 获取值
GET key

# 删除键
DEL key

# 检查键是否存在
EXISTS key

# 设置过期时间
EXPIRE key seconds

# 查看剩余过期时间
TTL key
```

## 数据类型

### 字符串 (String)

```bash
# 设置字符串
SET name "John"

# 追加字符串
APPEND name " Doe"

# 获取字符串长度
STRLEN name

# 自增/自减
INCR counter
DECR counter

# 批量设置/获取
MSET key1 "value1" key2 "value2"
MGET key1 key2
```

### 哈希 (Hash)

```bash
# 设置哈希字段
HSET user:1 name "John" age 30

# 获取哈希字段
HGET user:1 name

# 获取所有字段
HGETALL user:1

# 删除字段
HDEL user:1 age

# 检查字段是否存在
HEXISTS user:1 name
```

### 列表 (List)

```bash
# 从左侧插入
LPUSH list "item1"

# 从右侧插入
RPUSH list "item2"

# 从左侧弹出
LPOP list

# 从右侧弹出
RPOP list

# 获取列表范围
LRANGE list 0 -1

# 获取列表长度
LLEN list
```

### 集合 (Set)

```bash
# 添加成员
SADD set "member1"

# 移除成员
SREM set "member1"

# 获取所有成员
SMEMBERS set

# 检查成员是否存在
SISMEMBER set "member1"

# 集合运算
SINTER set1 set2  # 交集
SUNION set1 set2  # 并集
SDIFF set1 set2   # 差集
```

### 有序集合 (Sorted Set)

```bash
# 添加成员
ZADD zset 1 "member1"

# 获取分数
ZSCORE zset "member1"

# 获取排名
ZRANK zset "member1"

# 获取范围
ZRANGE zset 0 -1 WITHSCORES

# 按分数范围获取
ZRANGEBYSCORE zset 0 100
```

## 持久化

### RDB 持久化

```bash
# 配置文件设置
save 900 1      # 900秒内有1个修改
save 300 10     # 300秒内有10个修改
save 60 10000   # 60秒内有10000个修改

# 手动保存
SAVE            # 阻塞式保存
BGSAVE          # 后台保存
```

### AOF 持久化

```bash
# 配置文件设置
appendonly yes
appendfilename "appendonly.aof"

# 同步策略
appendfsync always    # 每次写入都同步
appendfsync everysec  # 每秒同步一次
appendfsync no       # 操作系统决定同步时机
```

## 事务

```bash
# 开始事务
MULTI

# 执行命令
SET key1 "value1"
SET key2 "value2"

# 提交事务
EXEC

# 取消事务
DISCARD
```

## 发布订阅

```bash
# 订阅频道
SUBSCRIBE channel1

# 发布消息
PUBLISH channel1 "message"

# 模式订阅
PSUBSCRIBE channel*

# 取消订阅
UNSUBSCRIBE channel1
```

## 集群

### 主从复制

```bash
# 从服务器配置
slaveof master_ip master_port

# 查看复制信息
INFO replication
```

### 哨兵模式

```bash
# 哨兵配置
sentinel monitor mymaster 127.0.0.1 6379 2
sentinel down-after-milliseconds mymaster 5000
sentinel failover-timeout mymaster 60000
```

### Redis Cluster

```bash
# 创建集群
redis-cli --cluster create node1:port1 node2:port2 node3:port3

# 添加节点
redis-cli --cluster add-node new_node:port existing_node:port

# 重新分片
redis-cli --cluster reshard existing_node:port
```

## 性能优化

### 内存优化

```bash
# 设置最大内存
maxmemory 1gb

# 内存淘汰策略
maxmemory-policy allkeys-lru
```

### 连接池配置

```javascript
// Node.js 连接池配置
const redis = require("redis");
const client = redis.createClient({
  host: "localhost",
  port: 6379,
  max_connections: 10,
  idle_timeout: 30000,
});
```

## 监控与维护

### 监控命令

```bash
# 查看服务器信息
INFO

# 查看内存使用
INFO memory

# 查看客户端连接
CLIENT LIST

# 查看慢查询
SLOWLOG GET
```

### 维护命令

```bash
# 清理过期键
redis-cli --scan --pattern "*" | xargs redis-cli DEL

# 碎片整理
redis-cli BGREWRITEAOF

# 数据迁移
redis-cli --rdb dump.rdb
```

## 最佳实践

1. 数据设计

   - 合理使用数据类型
   - 控制键的大小
   - 使用命名空间
   - 设置过期时间

2. 性能优化

   - 使用连接池
   - 批量操作
   - 避免大键
   - 合理配置内存

3. 高可用

   - 主从复制
   - 哨兵监控
   - 集群部署
   - 定期备份

4. 安全措施
   - 设置密码
   - 限制访问
   - 监控异常
   - 定期维护
