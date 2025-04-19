# Vue 2 源码及原理

## 1. 响应式系统

### 1.1 核心原理

```javascript
// 数据劫持
function defineReactive(obj, key, val) {
  const dep = new Dep();

  Object.defineProperty(obj, key, {
    get() {
      if (Dep.target) {
        dep.depend(); // 收集依赖
      }
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      val = newVal;
      dep.notify(); // 通知更新
    },
  });
}

// 依赖收集
class Dep {
  constructor() {
    this.subs = [];
  }

  depend() {
    if (Dep.target) {
      this.subs.push(Dep.target);
    }
  }

  notify() {
    this.subs.forEach((watcher) => watcher.update());
  }
}

// 观察者
class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.getter = parsePath(expOrFn);
    this.cb = cb;
    this.value = this.get();
  }

  get() {
    Dep.target = this;
    const value = this.getter.call(this.vm, this.vm);
    Dep.target = null;
    return value;
  }

  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldValue);
  }
}
```

### 1.2 异步更新队列

```javascript
// nextTick 实现
const callbacks = [];
let pending = false;

function nextTick(cb) {
  callbacks.push(cb);

  if (!pending) {
    pending = true;
    Promise.resolve().then(flushCallbacks);
  }
}

function flushCallbacks() {
  pending = false;
  const copies = callbacks.slice(0);
  callbacks.length = 0;
  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}
```

## 2. 虚拟 DOM

### 2.1 虚拟 DOM 结构

```javascript
// 虚拟节点结构
class VNode {
  constructor(tag, data, children, text, elm) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
  }
}

// 创建虚拟节点
function createElement(tag, data, children) {
  return new VNode(tag, data, children, undefined, undefined);
}
```

### 2.2 Diff 算法

```javascript
// 核心 diff 函数
function patch(oldVnode, vnode) {
  if (sameVnode(oldVnode, vnode)) {
    patchVnode(oldVnode, vnode);
  } else {
    const parent = oldVnode.elm.parentNode;
    createElm(vnode);
    parent.insertBefore(vnode.elm, oldVnode.elm);
    parent.removeChild(oldVnode.elm);
  }
}

// 比较两个节点
function sameVnode(a, b) {
  return (
    a.key === b.key &&
    a.tag === b.tag &&
    a.isComment === b.isComment &&
    isDef(a.data) === isDef(b.data)
  );
}
```

## 3. 组件系统

### 3.1 组件初始化

```javascript
// 组件构造函数
function VueComponent(options) {
  this._init(options);
}

// 组件继承
VueComponent.prototype = Object.create(Vue.prototype);
VueComponent.prototype.constructor = VueComponent;
```

### 3.2 组件通信

```javascript
// 事件总线
class EventBus {
  constructor() {
    this.events = {};
  }

  $on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  $emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(...args));
    }
  }
}
```

## 4. 生命周期

### 4.1 生命周期钩子

```javascript
// 生命周期调用
function callHook(vm, hook) {
  const handlers = vm.$options[hook];
  if (handlers) {
    handlers.forEach((handler) => handler.call(vm));
  }
}

// 初始化生命周期
function initLifecycle(vm) {
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}
```

## 5. 模板编译

### 5.1 编译过程

```javascript
// 模板编译
function compile(template) {
  const ast = parse(template);
  optimize(ast);
  const code = generate(ast);
  return {
    render: new Function(code),
  };
}

// 解析模板
function parse(template) {
  // 解析模板字符串为 AST
  return ast;
}

// 优化 AST
function optimize(ast) {
  // 标记静态节点
  markStatic(ast);
  // 标记静态根节点
  markStaticRoots(ast);
}
```

## 6. 性能优化

### 6.1 优化策略

- 组件懒加载
- 路由懒加载
- 图片懒加载
- 虚拟列表
- 函数防抖/节流

### 6.2 代码优化

- 合理使用 `v-if` / `v-show`
- 使用计算属性缓存值
- 避免不必要的组件更新
- 合理使用 `key`
- 避免频繁操作 DOM

## 7. 最佳实践

### 7.1 源码阅读建议

- 从入口文件开始
- 理解核心概念
- 关注关键流程
- 结合实际应用

### 7.2 调试技巧

- 使用 Vue Devtools
- 设置断点调试
- 打印关键信息
- 分析性能瓶颈
