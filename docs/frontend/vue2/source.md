
## 7. 响应式原理

### 7.1 核心原理
- 数据劫持
- 依赖收集
- 派发更新
- 异步更新队列

### 7.2 虚拟 DOM
- 虚拟 DOM 原理
- diff 算法
- key 的作用
- 性能优化
### 动态组件
```html
<component :is="currentComponent"></component>
```

### 函数式组件
- 无状态、无响应式、性能高

---

# 6. 性能优化

## 6.1 优化策略
- 组件懒加载、路由懒加载
- 图片懒加载（如 vue-lazyload）
- 虚拟列表（如 vue-virtual-scroller）
- 函数防抖/节流

## 6.2 代码优化
- 拆分大组件
- 使用计算属性缓存值
- 减少不必要更新
- 合理使用 `v-if` / `v-show`

---

# 7. 响应式原理

## 7.1 核心机制
- 数据劫持（`Object.defineProperty`）
- 依赖收集（Dep）
- 派发更新（Watcher）
- 异步更新队列（nextTick）

## 7.2 虚拟 DOM
- 描述 DOM 的 JS 对象
- diff 算法优化渲染
- key 提高效率，减少重排

---