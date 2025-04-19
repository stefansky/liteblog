# 算法

## 1. 算法种类

### 1.1 排序算法

1. **冒泡排序**

   ```javascript
   function bubbleSort(arr) {
     for (let i = 0; i < arr.length - 1; i++) {
       for (let j = 0; j < arr.length - 1 - i; j++) {
         if (arr[j] > arr[j + 1]) {
           [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
         }
       }
     }
     return arr;
   }
   ```

2. **快速排序**

   ```javascript
   function quickSort(arr) {
     if (arr.length <= 1) return arr;
     const pivot = arr[0];
     const left = [];
     const right = [];
     for (let i = 1; i < arr.length; i++) {
       if (arr[i] < pivot) {
         left.push(arr[i]);
       } else {
         right.push(arr[i]);
       }
     }
     return [...quickSort(left), pivot, ...quickSort(right)];
   }
   ```

3. **归并排序**

   ```javascript
   function mergeSort(arr) {
     if (arr.length <= 1) return arr;
     const mid = Math.floor(arr.length / 2);
     const left = mergeSort(arr.slice(0, mid));
     const right = mergeSort(arr.slice(mid));
     return merge(left, right);
   }

   function merge(left, right) {
     const result = [];
     while (left.length && right.length) {
       result.push(left[0] < right[0] ? left.shift() : right.shift());
     }
     return [...result, ...left, ...right];
   }
   ```

### 1.2 查找算法

1. **二分查找**

   ```javascript
   function binarySearch(arr, target) {
     let left = 0;
     let right = arr.length - 1;
     while (left <= right) {
       const mid = Math.floor((left + right) / 2);
       if (arr[mid] === target) return mid;
       if (arr[mid] < target) {
         left = mid + 1;
       } else {
         right = mid - 1;
       }
     }
     return -1;
   }
   ```

2. **深度优先搜索**

   ```javascript
   function dfs(node, target) {
     if (!node) return false;
     if (node.value === target) return true;
     return dfs(node.left, target) || dfs(node.right, target);
   }
   ```

3. **广度优先搜索**
   ```javascript
   function bfs(root, target) {
     const queue = [root];
     while (queue.length) {
       const node = queue.shift();
       if (node.value === target) return true;
       if (node.left) queue.push(node.left);
       if (node.right) queue.push(node.right);
     }
     return false;
   }
   ```

### 1.3 动态规划

1. **斐波那契数列**

   ```javascript
   function fibonacci(n) {
     const dp = [0, 1];
     for (let i = 2; i <= n; i++) {
       dp[i] = dp[i - 1] + dp[i - 2];
     }
     return dp[n];
   }
   ```

2. **背包问题**
   ```javascript
   function knapsack(weights, values, capacity) {
     const n = weights.length;
     const dp = Array(n + 1)
       .fill()
       .map(() => Array(capacity + 1).fill(0));
     for (let i = 1; i <= n; i++) {
       for (let j = 1; j <= capacity; j++) {
         if (weights[i - 1] <= j) {
           dp[i][j] = Math.max(
             dp[i - 1][j],
             dp[i - 1][j - weights[i - 1]] + values[i - 1]
           );
         } else {
           dp[i][j] = dp[i - 1][j];
         }
       }
     }
     return dp[n][capacity];
   }
   ```

## 2. 算法思想

### 2.1 分治思想

- 将问题分解为更小的子问题
- 递归解决子问题
- 合并子问题的解

### 2.2 贪心思想

- 每一步选择当前最优解
- 不考虑整体最优
- 适用于局部最优能导致全局最优的问题

### 2.3 回溯思想

- 尝试所有可能的解
- 遇到不满足条件的情况回退
- 适用于需要穷举所有可能解的问题

### 2.4 动态规划思想

- 将问题分解为重叠子问题
- 存储子问题的解
- 避免重复计算

## 3. 算法示例

### 3.1 字符串处理

1. **最长公共子序列**

   ```javascript
   function longestCommonSubsequence(text1, text2) {
     const m = text1.length;
     const n = text2.length;
     const dp = Array(m + 1)
       .fill()
       .map(() => Array(n + 1).fill(0));
     for (let i = 1; i <= m; i++) {
       for (let j = 1; j <= n; j++) {
         if (text1[i - 1] === text2[j - 1]) {
           dp[i][j] = dp[i - 1][j - 1] + 1;
         } else {
           dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
         }
       }
     }
     return dp[m][n];
   }
   ```

2. **字符串匹配**
   ```javascript
   function kmp(text, pattern) {
     const lps = computeLPS(pattern);
     let i = 0;
     let j = 0;
     while (i < text.length) {
       if (text[i] === pattern[j]) {
         i++;
         j++;
         if (j === pattern.length) {
           return i - j;
         }
       } else {
         if (j !== 0) {
           j = lps[j - 1];
         } else {
           i++;
         }
       }
     }
     return -1;
   }
   ```

### 3.2 图算法

1. **最短路径**

   ```javascript
   function dijkstra(graph, start) {
     const distances = {};
     const visited = new Set();
     const queue = new PriorityQueue();

     for (const vertex in graph) {
       distances[vertex] = Infinity;
     }
     distances[start] = 0;
     queue.enqueue(start, 0);

     while (!queue.isEmpty()) {
       const current = queue.dequeue().element;
       if (visited.has(current)) continue;
       visited.add(current);

       for (const neighbor in graph[current]) {
         const distance = distances[current] + graph[current][neighbor];
         if (distance < distances[neighbor]) {
           distances[neighbor] = distance;
           queue.enqueue(neighbor, distance);
         }
       }
     }
     return distances;
   }
   ```

2. **最小生成树**

   ```javascript
   function prim(graph) {
     const mst = {};
     const visited = new Set();
     const edges = new PriorityQueue();

     const start = Object.keys(graph)[0];
     visited.add(start);

     for (const neighbor in graph[start]) {
       edges.enqueue([start, neighbor], graph[start][neighbor]);
     }

     while (!edges.isEmpty()) {
       const {
         element: [u, v],
         priority: weight,
       } = edges.dequeue();
       if (visited.has(v)) continue;

       visited.add(v);
       mst[u] = mst[u] || {};
       mst[u][v] = weight;

       for (const neighbor in graph[v]) {
         if (!visited.has(neighbor)) {
           edges.enqueue([v, neighbor], graph[v][neighbor]);
         }
       }
     }
     return mst;
   }
   ```

## 4. 算法练习技巧

### 4.1 解题步骤

1. **理解问题**

   - 仔细阅读题目
   - 明确输入输出
   - 考虑边界情况

2. **设计算法**

   - 选择合适的算法思想
   - 设计数据结构
   - 考虑时间空间复杂度

3. **编写代码**

   - 实现算法逻辑
   - 添加必要注释
   - 处理边界情况

4. **测试验证**
   - 编写测试用例
   - 验证正确性
   - 优化性能

### 4.2 优化技巧

1. **时间复杂度优化**

   - 使用合适的数据结构
   - 减少循环嵌套
   - 利用空间换时间

2. **空间复杂度优化**

   - 原地修改
   - 复用已有空间
   - 及时释放内存

3. **代码优化**
   - 简化逻辑
   - 减少重复计算
   - 使用位运算

## 5. 算法练习推荐网站

### 5.1 在线练习平台

1. **LeetCode**

   - 网址：https://leetcode.com
   - 特点：题目丰富，难度分级
   - 适合：面试准备，算法学习

2. **牛客网**

   - 网址：https://www.nowcoder.com
   - 特点：国内平台，企业真题
   - 适合：国内求职，笔试准备

3. **Codeforces**
   - 网址：https://codeforces.com
   - 特点：竞赛平台，实时排名
   - 适合：算法竞赛，提升能力

### 5.2 学习资源

1. **书籍推荐**

   - 《算法导论》
   - 《算法图解》
   - 《剑指 Offer》

2. **视频教程**

   - 慕课网算法课程
   - B 站算法教程
   - Coursera 算法课程

3. **博客推荐**
   - 算法爱好者博客
   - 技术社区算法专栏
   - 个人技术博客
