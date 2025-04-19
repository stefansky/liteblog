# 数据结构

## 1. 什么是数据结构

数据结构是计算机存储、组织数据的方式，它描述了数据元素之间的逻辑关系，以及数据在计算机中的存储方式。

### 1.1 基本概念

- **数据**：描述客观事物的符号，是计算机程序加工的"原料"
- **数据元素**：数据的基本单位，通常作为一个整体进行考虑和处理
- **数据项**：构成数据元素的不可分割的最小单位
- **数据对象**：性质相同的数据元素的集合

### 1.2 数据结构三要素

1. **逻辑结构**：数据元素之间的逻辑关系
2. **物理结构**：数据在计算机中的存储方式
3. **数据运算**：施加在数据上的操作

## 2. 数据结构的作用

1. **提高程序效率**

   - 优化数据存储方式
   - 减少时间和空间复杂度
   - 提高算法执行效率

2. **解决实际问题**

   - 处理复杂数据关系
   - 实现特定功能需求
   - 优化系统性能

3. **促进代码复用**
   - 提供标准数据结构
   - 简化开发过程
   - 提高代码可维护性

## 3. 数据结构的分类

### 3.1 线性结构

1. **数组(Array)**

   ```javascript
   // 创建数组
   const arr = [1, 2, 3, 4, 5];

   // 访问元素
   console.log(arr[0]); // 1

   // 修改元素
   arr[0] = 10;

   // 添加元素
   arr.push(6);
   ```

2. **链表(Linked List)**

   ```javascript
   class Node {
     constructor(value) {
       this.value = value;
       this.next = null;
     }
   }

   class LinkedList {
     constructor() {
       this.head = null;
     }

     append(value) {
       const newNode = new Node(value);
       if (!this.head) {
         this.head = newNode;
         return;
       }
       let current = this.head;
       while (current.next) {
         current = current.next;
       }
       current.next = newNode;
     }
   }
   ```

3. **栈(Stack)**

   ```javascript
   class Stack {
     constructor() {
       this.items = [];
     }

     push(element) {
       this.items.push(element);
     }

     pop() {
       return this.items.pop();
     }

     peek() {
       return this.items[this.items.length - 1];
     }
   }
   ```

4. **队列(Queue)**

   ```javascript
   class Queue {
     constructor() {
       this.items = [];
     }

     enqueue(element) {
       this.items.push(element);
     }

     dequeue() {
       return this.items.shift();
     }

     front() {
       return this.items[0];
     }
   }
   ```

### 3.2 非线性结构

1. **树(Tree)**

   ```javascript
   class TreeNode {
     constructor(value) {
       this.value = value;
       this.left = null;
       this.right = null;
     }
   }

   class BinaryTree {
     constructor() {
       this.root = null;
     }

     insert(value) {
       const newNode = new TreeNode(value);
       if (!this.root) {
         this.root = newNode;
         return;
       }
       this.insertNode(this.root, newNode);
     }

     insertNode(node, newNode) {
       if (newNode.value < node.value) {
         if (!node.left) {
           node.left = newNode;
         } else {
           this.insertNode(node.left, newNode);
         }
       } else {
         if (!node.right) {
           node.right = newNode;
         } else {
           this.insertNode(node.right, newNode);
         }
       }
     }
   }
   ```

2. **图(Graph)**

   ```javascript
   class Graph {
     constructor() {
       this.vertices = [];
       this.adjList = new Map();
     }

     addVertex(v) {
       this.vertices.push(v);
       this.adjList.set(v, []);
     }

     addEdge(v, w) {
       this.adjList.get(v).push(w);
       this.adjList.get(w).push(v);
     }
   }
   ```

### 3.3 散列结构

1. **哈希表(Hash Table)**

   ```javascript
   class HashTable {
     constructor(size = 10) {
       this.size = size;
       this.table = new Array(size);
     }

     hash(key) {
       let hash = 0;
       for (let i = 0; i < key.length; i++) {
         hash += key.charCodeAt(i);
       }
       return hash % this.size;
     }

     set(key, value) {
       const index = this.hash(key);
       if (!this.table[index]) {
         this.table[index] = [];
       }
       this.table[index].push([key, value]);
     }

     get(key) {
       const index = this.hash(key);
       if (!this.table[index]) return undefined;
       for (const [k, v] of this.table[index]) {
         if (k === key) return v;
       }
       return undefined;
     }
   }
   ```

## 4. 数据结构的应用

### 4.1 前端开发

1. **DOM 树操作**

   - 使用树结构表示 DOM
   - 实现 DOM 遍历和操作
   - 优化 DOM 更新性能

2. **状态管理**
   - 使用哈希表存储状态
   - 实现状态快速查找
   - 优化状态更新效率

### 4.2 后端开发

1. **数据库索引**

   - 使用 B+ 树实现索引
   - 优化查询性能
   - 提高数据检索效率

2. **缓存系统**
   - 使用哈希表实现缓存
   - 实现 LRU 缓存策略
   - 优化系统响应速度

### 4.3 算法应用

1. **排序算法**

   - 快速排序
   - 归并排序
   - 堆排序

2. **搜索算法**
   - 二分查找
   - 广度优先搜索
   - 深度优先搜索

## 5. 数据结构的选择

### 5.1 选择原则

1. **考虑数据规模**

   - 小规模数据：简单结构
   - 大规模数据：复杂结构

2. **考虑操作类型**

   - 频繁查找：哈希表
   - 频繁插入删除：链表
   - 需要排序：树结构

3. **考虑性能要求**
   - 时间优先：选择时间复杂度低的结构
   - 空间优先：选择空间复杂度低的结构

### 5.2 常见场景

1. **数据缓存**

   - 使用哈希表
   - 实现快速查找
   - 优化访问速度

2. **数据排序**

   - 使用堆结构
   - 实现高效排序
   - 优化排序性能

3. **数据过滤**
   - 使用布隆过滤器
   - 实现快速过滤
   - 优化过滤效率
