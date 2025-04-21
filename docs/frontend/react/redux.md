# React 状态管理

> 本文整理常用的 React 状态管理方案，包括 Redux、MobX、Context API 与 Zustand，涵盖原理解析、使用方法、应用场景及性能优化建议。

---

## 1. Redux

### 1.1 核心概念

Redux 是一个预测性状态容器，核心概念包括：

- **Store**：保存整个应用的状态树，使用 `createStore` 创建。
- **Action**：描述发生了什么，用普通对象表示，必须包含 `type` 字段。
- **Reducer**：纯函数，根据当前 state 和 action 返回新的 state。
- **单向数据流**：所有状态更新都通过 dispatch action 触发 reducer。

```js
const initialState = { count: 0 };
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    default:
      return state;
  }
}
```

### 1.2 使用方式

```js
import { createStore } from 'redux';
const store = createStore(counterReducer);

// 在组件中使用
import { useSelector, useDispatch } from 'react-redux';
const count = useSelector(state => state.count);
const dispatch = useDispatch();
dispatch({ type: 'INCREMENT' });
```

### 1.3 中间件

中间件用于扩展 dispatch 的功能。

- redux-thunk：用于异步 action
- redux-saga：基于生成器函数处理复杂副作用
- redux-logger：打印 action 和状态变化

```js
import thunk from 'redux-thunk';
const store = createStore(reducer, applyMiddleware(thunk));
```

### 1.4 异步处理

**redux-thunk 示例：**
```js
const fetchData = () => (dispatch) => {
  fetch('/api/data')
    .then(res => res.json())
    .then(data => dispatch({ type: 'SET_DATA', payload: data }));
};
```

### 1.5 性能优化

- 使用 `reselect` 创建 memoized selector
- 拆分 reducer 管理局部状态
- 使用 `React.memo`、`useMemo`、`useCallback` 避免不必要重渲染

### 1.6 工具推荐

- [Redux DevTools](https://github.com/reduxjs/redux-devtools)
- Redux Toolkit：官方推荐的 Redux 工具库，封装了繁琐配置

---

## 2. MobX

### 2.1 响应式原理

MobX 使用响应式系统跟踪状态的读写：

- `observable`：定义可观察的状态
- `computed`：派生状态，自动缓存
- `reaction` / `autorun`：响应状态变化执行副作用

MobX6 使用 `Proxy`，MobX5 使用 `Object.defineProperty` 实现。

### 2.2 使用方式

```js
import { makeAutoObservable } from 'mobx';
class CounterStore {
  count = 0;
  constructor() {
    makeAutoObservable(this);
  }
  increment() {
    this.count++;
  }
}
export const counterStore = new CounterStore();
```

```jsx
import { observer } from 'mobx-react-lite';
const Counter = observer(() => (
  <button onClick={() => counterStore.increment()}>
    Count: {counterStore.count}
  </button>
));
```

### 2.3 装饰器

使用装饰器需配置 Babel：
```ts
class Store {
  @observable value = 0;
  @computed get double() {
    return this.value * 2;
  }
  @action increase() {
    this.value++;
  }
}
```

### 2.4 异步处理

```ts
async fetchData() {
  const res = await fetch('/api');
  this.data = await res.json();
}
```

### 2.5 性能优化

- 使用 computed 缓存结果
- 使用 `observer` 精细包装组件，避免全局 re-render
- 拆分 store，避免状态冗余

---

## 3. Context API

### 3.1 适用场景

适合少量全局状态，如：主题切换、用户信息、语言配置。

### 3.2 创建 Context

```js
const ThemeContext = React.createContext('light');
```

### 3.3 Provider 使用

```js
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>
```

### 3.4 Consumer 使用

```js
<ThemeContext.Consumer>
  {value => <div>{value}</div>}
</ThemeContext.Consumer>
```

### 3.5 useContext Hook

```js
const theme = useContext(ThemeContext);
```

### 3.6 性能优化建议

- 使用多个 context 拆分状态域
- 使用 `memo`、`useMemo` 包裹 Provider value

---

## 4. Zustand

### 4.1 简介

Zustand 是一个轻量级、无 Provider、支持 Hook 的状态管理库。

### 4.2 创建 Store

```js
import { create } from 'zustand';
const useStore = create(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 }))
}));
```

### 4.3 使用状态

```js
const count = useStore(state => state.count);
```

### 4.4 状态更新

```js
const increment = useStore(state => state.increment);
increment();
```

### 4.5 异步操作

```js
const useStore = create(set => ({
  data: [],
  fetchData: async () => {
    const res = await fetch('/api');
    const data = await res.json();
    set({ data });
  }
}));
```

### 4.6 中间件支持

```js
import { devtools, persist } from 'zustand/middleware';
const useStore = create(devtools(persist(...)));
```

### 4.7 性能优势

- 精确订阅，组件只会在依赖的 state 更新时重渲染
- 支持 React 18 并发渲染

---

## 5. 状态管理对比

| 技术 | 适用场景 | 学习曲线 | 生态支持 | 性能表现 |
|------|-----------|-----------|----------|-----------|
| Redux | 大型应用，全局状态复杂 | 高 | 极好 | 中 |
| MobX | 响应式需求强，逻辑复杂 | 中 | 较好 | 高 |
| Context API | 状态简单，组件少 | 低 | 内建 | 中 |
| Zustand | 轻量需求，函数式开发 | 低 | 较好 | 高 |


