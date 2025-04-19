# Pinia 在 vue3 中的应用

# Pinia 状态管理

## 基础使用

### 安装和配置

```javascript
// main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.mount("#app");
```

### Store 定义

```javascript
// stores/counter.js
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
    name: "Counter",
  }),

  getters: {
    doubleCount: (state) => state.count * 2,
    doubleCountPlusOne() {
      return this.doubleCount + 1;
    },
  },

  actions: {
    increment() {
      this.count++;
    },
    async fetchData() {
      const response = await fetch("/api/data");
      const data = await response.json();
      this.count = data.count;
    },
  },
});
```

## Store 使用

### 组件中使用

```vue
<template>
  <div>
    <p>Count: {{ counter.count }}</p>
    <p>Double: {{ counter.doubleCount }}</p>
    <button @click="counter.increment()">Increment</button>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";

const counter = useCounterStore();
</script>
```

### 组合式 API

```javascript
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";

const counter = useCounterStore();
const { count, name } = storeToRefs(counter); // 保持响应式
const { increment } = counter; // 解构 actions
```

## 状态管理

### 状态修改

```javascript
// 直接修改
counter.count++;

// 使用 $patch
counter.$patch({
  count: counter.count + 1,
  name: "New Name",
});

// 使用 $patch 函数
counter.$patch((state) => {
  state.count++;
  state.name = "New Name";
});

// 替换整个 state
counter.$state = { count: 0, name: "New Name" };
```

### 状态重置

```javascript
// 重置到初始状态
counter.$reset();
```

### 状态订阅

```javascript
// 监听状态变化
counter.$subscribe((mutation, state) => {
  console.log("State changed:", mutation, state);
});

// 监听 actions
counter.$onAction(({ name, args, after, onError }) => {
  console.log("Action started:", name, args);

  after((result) => {
    console.log("Action finished:", result);
  });

  onError((error) => {
    console.error("Action failed:", error);
  });
});
```

## 模块化

### 模块定义

```javascript
// stores/user.js
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: null,
  }),

  actions: {
    async login(credentials) {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      this.user = data.user;
      this.token = data.token;
    },

    logout() {
      this.user = null;
      this.token = null;
    },
  },
});

// stores/cart.js
export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    total: 0,
  }),

  actions: {
    addItem(item) {
      this.items.push(item);
      this.calculateTotal();
    },

    calculateTotal() {
      this.total = this.items.reduce((sum, item) => sum + item.price, 0);
    },
  },
});
```

### 模块组合

```javascript
// stores/index.js
import { useUserStore } from "./user";
import { useCartStore } from "./cart";

export const useStore = () => {
  const user = useUserStore();
  const cart = useCartStore();

  return {
    user,
    cart,
  };
};
```

## 持久化

### 使用插件

```javascript
// main.js
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
```

### 配置持久化

```javascript
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: null,
  }),

  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
        paths: ["token"],
      },
    ],
  },
});
```

## 最佳实践

1. Store 组织

   - 按功能模块划分 Store
   - 保持 Store 的单一职责
   - 合理使用命名空间

2. 状态设计

   - 最小化状态
   - 避免重复状态
   - 使用合适的类型

3. 性能优化

   - 合理使用 getters
   - 避免不必要的订阅
   - 使用 storeToRefs

4. 错误处理
   - 统一的错误处理
   - 状态回滚机制
   - 错误日志记录
