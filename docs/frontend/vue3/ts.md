# ts 的基于语法

# ts 在 vue3 中的应用

# TypeScript in Vue 3

## 基础配置

### 安装依赖

```bash
npm install -D typescript @types/node
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "node",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "useDefineForClassFields": true,
    "sourceMap": true,
    "baseUrl": ".",
    "types": ["webpack-env"],
    "paths": {
      "@/*": ["src/*"]
    },
    "lib": ["esnext", "dom", "dom.iterable", "scripthost"]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": ["node_modules"]
}
```

## 组件类型

### 组件 Props

```typescript
// 使用 interface 定义 Props
interface Props {
  title: string;
  count?: number;
  items: string[];
  onClick: (id: number) => void;
}

// 使用 defineProps 声明 Props
const props = defineProps<Props>();

// 使用 withDefaults 设置默认值
const props = withDefaults(defineProps<Props>(), {
  count: 0,
  items: () => [],
});
```

### 组件 Emits

```typescript
// 使用 interface 定义 Emits
interface Emits {
  (e: "update", value: number): void;
  (e: "delete", id: number): void;
}

// 使用 defineEmits 声明 Emits
const emit = defineEmits<Emits>();

// 使用 emit
emit("update", 1);
emit("delete", 123);
```

### 组件 Refs

```typescript
// 模板引用
const inputRef = ref<HTMLInputElement | null>(null);

// 组件引用
const childRef = ref<InstanceType<typeof ChildComponent> | null>(null);
```

## 组合式 API 类型

### ref 和 reactive

```typescript
// 使用 interface 定义类型
interface User {
  id: number;
  name: string;
  age: number;
}

// ref 类型
const count = ref<number>(0);
const user = ref<User>({
  id: 1,
  name: "John",
  age: 30,
});

// reactive 类型
const state = reactive<User>({
  id: 1,
  name: "John",
  age: 30,
});
```

### computed 类型

```typescript
// 自动推断类型
const doubleCount = computed(() => count.value * 2);

// 显式指定类型
const fullName = computed<string>(() => `${firstName.value} ${lastName.value}`);
```

### watch 类型

```typescript
// 监听 ref
watch(count, (newValue, oldValue) => {
  console.log(`count changed from ${oldValue} to ${newValue}`);
});

// 监听 reactive
watch(
  () => state.name,
  (newValue, oldValue) => {
    console.log(`name changed from ${oldValue} to ${newValue}`);
  }
);

// 监听多个源
watch([count, () => state.name], ([newCount, newName], [oldCount, oldName]) => {
  console.log(`count: ${oldCount} -> ${newCount}`);
  console.log(`name: ${oldName} -> ${newName}`);
});
```

## 类型工具

### 类型断言

```typescript
// 使用 as 进行类型断言
const element = document.getElementById("app") as HTMLDivElement;

// 使用非空断言
const value = ref<string | null>(null);
const length = value.value!.length;
```

### 类型守卫

```typescript
// 使用类型谓词
function isUser(value: unknown): value is User {
  return typeof value === "object" && value !== null && "id" in value;
}

// 使用类型守卫
if (isUser(data)) {
  console.log(data.id); // data 被推断为 User 类型
}
```

### 泛型组件

```typescript
// 定义泛型组件
interface Props<T> {
  items: T[]
  renderItem: (item: T) => string
}

const GenericComponent = <T,>(props: Props<T>) => {
  return props.items.map(props.renderItem)
}

// 使用泛型组件
<GenericComponent<number>
  :items="[1, 2, 3]"
  :renderItem="(item) => item.toString()"
/>
```

## Pinia 类型

### Store 类型

```typescript
// 定义 Store 状态类型
interface CounterState {
  count: number;
  name: string;
}

// 定义 Store
export const useCounterStore = defineStore("counter", {
  state: (): CounterState => ({
    count: 0,
    name: "Counter",
  }),

  getters: {
    doubleCount: (state) => state.count * 2,
  },

  actions: {
    increment() {
      this.count++;
    },
  },
});
```

### 使用 Store 类型

```typescript
// 在组件中使用
const counter = useCounterStore();
const count = computed(() => counter.count);
```

## 最佳实践

1. 类型定义

   - 使用 interface 定义复杂类型
   - 合理使用类型别名
   - 避免使用 any

2. 组件类型

   - 为 Props 和 Emits 定义类型
   - 使用泛型组件
   - 正确处理模板引用类型

3. 组合式 API

   - 为 ref 和 reactive 指定类型
   - 使用类型守卫
   - 合理使用类型断言

4. 工具类型
   - 使用 Partial、Pick、Omit 等工具类型
   - 使用 Record 定义对象类型
   - 使用 ReturnType 获取函数返回类型
