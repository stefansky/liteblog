
## 3. Vuex

### 3.1 核心概念
- State
- Getters
- Mutations
- Actions
- Modules

### state
```js
state: {
  count: 0
}
```

### getters
```js
getters: {
  doubleCount: state => state.count * 2
}
```

### mutations
```js
mutations: {
  increment(state) {
    state.count++;
  }
}
```

### actions
```js
actions: {
  incrementAsync({ commit }) {
    setTimeout(() => commit('increment'), 1000);
  }
}
```

### modules
```js
modules: {
  user: {
    state: { name: 'Tom' },
    mutations: { ... }
  }
}
```

### 3.2 高级用法
- 模块化
- 命名空间
- 插件
- 严格模式
### 命名空间
```js
modules: {
  cart: {
    namespaced: true,
    state: { ... }
  }
}
```

### 插件
```js
const myPlugin = store => {
  store.subscribe((mutation, state) => {
    console.log(mutation.type);
  });
};
```

### 严格模式
```js
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production'
});
```