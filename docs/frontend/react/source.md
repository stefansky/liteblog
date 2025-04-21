# React 原理与源码解析笔记


## 1. React 架构概览

React 分为三个核心模块：

- **Reconciler（协调器）**：负责计算哪些节点需要更新（diff 算法）
- **Renderer（渲染器）**：负责将 React 元素渲染为对应平台输出，如 DOM、原生组件
- **Scheduler（调度器）**：基于优先级对更新任务进行调度（时间切片）

---

## 2. Virtual DOM

### 2.1 什么是 Virtual DOM

Virtual DOM 是 React 用于描述 UI 状态的一种轻量 JS 对象树。

```js
const vnode = {
  type: 'div',
  props: {
    className: 'box',
    children: [
      { type: 'span', props: { children: 'Hello' } }
    ]
  }
};
```

### 2.2 Virtual DOM 的作用

- 减少直接 DOM 操作带来的性能开销
- 提供统一的跨平台渲染能力
- 支持高效的更新策略（diff 算法）

---

## 3. React Fiber 架构

### 3.1 为什么要有 Fiber

- 原本的 stack reconciler 是递归调用，不能中断
- Fiber 架构支持任务拆分和异步可中断的更新
- 提高响应性能，支持并发模式（Concurrent Mode）

### 3.2 Fiber 节点结构

```ts
interface FiberNode {
  type: any;
  tag: WorkTag;
  key: null | string;
  return: Fiber | null; // 父节点
  child: Fiber | null;
  sibling: Fiber | null;
  stateNode: any;
  pendingProps: any;
  memoizedProps: any;
  updateQueue: UpdateQueue<any> | null;
  alternate: Fiber | null;
}
```

### 3.3 Fiber 的更新阶段

- **Render 阶段（diff、构建 fiber 树，可中断）**
- **Commit 阶段（DOM 更新、生命周期调用，不可中断）**

---

## 4. 更新机制

### 4.1 状态更新的流程

```tsx
setState => scheduleUpdateOnFiber => markUpdate => performUnitOfWork => commitRoot
```

### 4.2 Batched Updates（批量更新）

React 会自动对事件处理函数内的 `setState` 进行批量处理，减少重复渲染。

```tsx
setState1()
setState2()
// 只触发一次 render
```

---

## 5. Hooks 原理

### 5.1 Hooks 本质

Hooks 本质是通过链表记录的函数调用顺序，在每次函数执行时按顺序取值。

### 5.2 useState 实现简要

```js
function useState(initialState) {
  const hook = mountWorkInProgressHook();
  hook.memoizedState = initialState;
  const dispatch = action => {
    hook.memoizedState = action(hook.memoizedState);
    scheduleUpdateOnFiber();
  };
  return [hook.memoizedState, dispatch];
}
```

- `mountWorkInProgressHook` 创建当前 fiber 的 hook
- `memoizedState` 存储当前状态
- 触发更新时会重新调用函数组件，按顺序读取 Hook

---

## 6. React 中的调度器 Scheduler

### 6.1 为什么需要调度器？

- 支持任务优先级（高优先级任务先执行）
- 实现异步渲染与时间切片（时间片切换任务）
- 避免长任务阻塞 UI 响应

### 6.2 优先级模型

React 通过 `Scheduler` 包维护一个任务队列，任务有 5 个优先级：

- Immediate
- User-blocking
- Normal
- Low
- Idle

---

## 7. Diff 算法

### 7.1 设计思想

- 同层对比（不会跨层级比较）
- 根据 key 判断节点是否复用
- 只更新变化的部分，最小化 DOM 操作

### 7.2 核心流程

1. 比较节点类型
2. 判断 key 是否一致
3. 更新属性和 children

```tsx
<ul>
  <li key="a" />
  <li key="b" />
  <li key="c" />
</ul>
```

更新成：

```tsx
<ul>
  <li key="b" />
  <li key="a" />
  <li key="c" />
</ul>
```

不会全部替换，只会进行最小移动。

---

## 8. 生命周期与更新时机

### 8.1 类组件生命周期

- 挂载：constructor → render → componentDidMount
- 更新：shouldComponentUpdate → render → componentDidUpdate
- 卸载：componentWillUnmount

### 8.2 函数组件更新

- 每次 props/state 变化都会重新执行函数体
- 通过 `useEffect` 处理副作用逻辑

---

## 9. 渲染器原理（ReactDOM）

- ReactDOM 是默认的 Renderer（还可有 React Native、Ink 等）
- 将 Fiber 树转化为真实 DOM
- 核心入口为 `ReactDOM.createRoot(container).render(<App />)`

---

## 10. 总结

- React 本质上是基于 Fiber 架构 + 虚拟 DOM + 调度器构建的异步可中断渲染框架
- 熟悉 Fiber 和调度机制有助于性能优化和理解底层行为
- Hooks 是通过链式结构保存状态，非“魔法”，需要严格按顺序调用
- 熟悉更新流程与生命周期可以更有效定位性能瓶颈

---

> 深入理解 React 源码是前端架构师的重要能力，有助于你在复杂项目中做出更高效的技术选型和性能调优。