## Vue3 与 Vue2 的区别

### 1. 性能提升
- 更快的渲染速度
- 更小的打包体积
- 更好的内存使用
- 更优的 Tree-shaking

### 2. 组合式 API

- 更好的代码组织
- 更好的类型推导
- 更好的代码复用
- 更好的逻辑复用

### 3. 响应式系统

- 基于 Proxy 的响应式
- 更精确的依赖追踪
- 更好的性能
- 更少的限制

## 核心概念

### 响应式系统

```javascript
// 使用 ref 创建响应式数据
import { ref } from "vue";

const count = ref(0);
console.log(count.value); // 0
count.value++; // 修改值

// 使用 reactive 创建响应式对象
import { reactive } from "vue";

const state = reactive({
  count: 0,
  name: "Vue",
});
console.log(state.count); // 0
state.count++; // 修改值

// 使用 toRefs 解构响应式对象
import { toRefs } from "vue";

const { count, name } = toRefs(state);
console.log(count.value); // 0
```

### 计算属性

```javascript
import { ref, computed } from "vue";

const firstName = ref("John");
const lastName = ref("Doe");

// 只读计算属性
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`;
});

// 可写计算属性
const fullName = computed({
  get() {
    return `${firstName.value} ${lastName.value}`;
  },
  set(newValue) {
    [firstName.value, lastName.value] = newValue.split(" ");
  },
});
```

### 监听器

```javascript
import { ref, watch, watchEffect } from "vue";

const count = ref(0);
const name = ref("Vue");

// 监听单个响应式数据
watch(count, (newValue, oldValue) => {
  console.log(`count changed from ${oldValue} to ${newValue}`);
});

// 监听多个响应式数据
watch([count, name], ([newCount, newName], [oldCount, oldName]) => {
  console.log(`count: ${oldCount} -> ${newCount}`);
  console.log(`name: ${oldName} -> ${newName}`);
});

// 立即执行的监听器
watchEffect(() => {
  console.log(`count: ${count.value}, name: ${name.value}`);
});
```

## 组件基础

### 组件定义

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="increment">Count: {{ count }}</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const title = "Vue 3 Component";
const count = ref(0);

const increment = () => {
  count.value++;
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
```

### Props 和 Events

```vue
<!-- ChildComponent.vue -->
<template>
  <div>
    <h2>{{ title }}</h2>
    <button @click="$emit('update', count + 1)">Increment</button>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  count: Number,
});

defineEmits(["update"]);
</script>

<!-- ParentComponent.vue -->
<template>
  <ChildComponent :title="title" :count="count" @update="count = $event" />
</template>

<script setup>
import { ref } from "vue";
import ChildComponent from "./ChildComponent.vue";

const title = "Child Component";
const count = ref(0);
</script>
```

### 插槽

```vue
<!-- BaseLayout.vue -->
<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<!-- Usage -->
<BaseLayout>
  <template #header>
    <h1>Header</h1>
  </template>
  
  <p>Main content</p>
  
  <template #footer>
    <p>Footer</p>
  </template>
</BaseLayout>
```

## 生命周期钩子

```javascript
import {
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount,
} from "vue";

// 组件挂载前
onBeforeMount(() => {
  console.log("Component will mount");
});

// 组件挂载后
onMounted(() => {
  console.log("Component mounted");
});

// 组件更新前
onBeforeUpdate(() => {
  console.log("Component will update");
});

// 组件更新后
onUpdated(() => {
  console.log("Component updated");
});

// 组件卸载前
onBeforeUnmount(() => {
  console.log("Component will unmount");
});

// 组件卸载后
onUnmounted(() => {
  console.log("Component unmounted");
});
```

## 组合式 API

### 组合式函数

```javascript
// useCounter.js
import { ref } from "vue";

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);

  const increment = () => {
    count.value++;
  };

  const decrement = () => {
    count.value--;
  };

  return {
    count,
    increment,
    decrement,
  };
}

// Component.vue
<script setup>
  import {useCounter} from './useCounter'; const {(count, increment, decrement)}{" "}
  = useCounter();
</script>;
```

### 依赖注入

```javascript
// 提供依赖
import { provide } from "vue";

provide("theme", "dark");

// 注入依赖
import { inject } from "vue";

const theme = inject("theme", "light"); // 第二个参数是默认值
```

## 模板语法

### 指令

```vue
<template>
  <!-- v-if -->
  <div v-if="show">显示内容</div>
  <div v-else>其他内容</div>

  <!-- v-for -->
  <ul>
    <li v-for="(item, index) in items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>

  <!-- v-bind -->
  <div :class="{ active: isActive }"></div>

  <!-- v-on -->
  <button @click="handleClick">点击</button>

  <!-- v-model -->
  <input v-model="message" />
</template>
```

### 动态组件

```vue
<template>
  <component :is="currentComponent" />
</template>

<script setup>
import { ref } from "vue";
import ComponentA from "./ComponentA.vue";
import ComponentB from "./ComponentB.vue";

const currentComponent = ref("ComponentA");
</script>
```

## 过渡和动画

```vue
<template>
  <Transition name="fade">
    <div v-if="show">内容</div>
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```

## 最佳实践

1. 组件设计

   - 单一职责原则
   - 组件拆分粒度
   - Props 设计
   - 事件命名规范

2. 性能优化

   - 合理使用 v-if 和 v-show
   - 列表渲染使用 key
   - 避免不必要的计算属性
   - 组件懒加载

3. 代码组织
   - 组合式函数复用
   - 状态管理
   - 目录结构
   - 命名规范
