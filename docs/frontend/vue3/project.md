# Vue 3 项目实践

## 项目结构

### 目录组织

```
src/
├── assets/          # 静态资源
├── components/      # 公共组件
├── composables/     # 组合式函数
├── layouts/         # 布局组件
├── router/          # 路由配置
├── stores/          # 状态管理
├── styles/          # 全局样式
├── types/           # 类型定义
├── utils/           # 工具函数
├── views/           # 页面组件
├── App.vue          # 根组件
└── main.ts          # 入口文件
```

### 环境配置

```javascript
// .env
VITE_APP_TITLE=My App
VITE_API_BASE_URL=/api

// .env.development
VITE_API_BASE_URL=http://localhost:3000/api

// .env.production
VITE_API_BASE_URL=https://api.example.com
```

## 开发规范

### 命名规范

1. 文件命名

   - 组件文件：PascalCase，如 `UserProfile.vue`
   - 工具文件：camelCase，如 `formatDate.ts`
   - 样式文件：kebab-case，如 `main-style.scss`

2. 变量命名
   - 组件名：PascalCase
   - 变量名：camelCase
   - 常量名：UPPER_SNAKE_CASE
   - 私有属性：\_camelCase

### 代码风格

1. 组件结构

```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup lang="ts">
// 导入语句
import { ref } from "vue";

// 类型定义
interface Props {
  // ...
}

// Props 和 Emits
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 响应式数据
const count = ref(0);

// 计算属性
const doubleCount = computed(() => count.value * 2);

// 方法
function increment() {
  count.value++;
}

// 生命周期钩子
onMounted(() => {
  // ...
});
</script>

<style scoped lang="scss">
// 样式
</style>
```

2. 注释规范

```typescript
/**
 * 函数描述
 * @param {string} name - 参数描述
 * @returns {number} 返回值描述
 */
function example(name: string): number {
  // ...
}
```

## 性能优化

### 代码分割

```javascript
// 路由懒加载
const routes = [
  {
    path: "/about",
    component: () => import("./views/About.vue"),
  },
];

// 组件懒加载
const LazyComponent = defineAsyncComponent(() =>
  import("./components/LazyComponent.vue")
);
```

### 缓存策略

```vue
<!-- 组件缓存 -->
<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<!-- 列表缓存 -->
<template>
  <div v-for="item in items" :key="item.id">
    <component :is="item.component" />
  </div>
</template>
```

### 性能监控

```javascript
// 性能监控
import { performance } from "perf_hooks";

const start = performance.now();
// 执行操作
const end = performance.now();
console.log(`耗时: ${end - start}ms`);

// 错误监控
window.addEventListener("error", (event) => {
  console.error("错误:", event.error);
});
```

## 测试实践

### 单元测试

```typescript
// Counter.spec.ts
import { mount } from "@vue/test-utils";
import Counter from "./Counter.vue";

describe("Counter", () => {
  it("increments count when button is clicked", async () => {
    const wrapper = mount(Counter);
    await wrapper.find("button").trigger("click");
    expect(wrapper.text()).toContain("Count: 1");
  });
});
```

### E2E 测试

```typescript
// login.spec.ts
describe("Login", () => {
  it("successfully logs in", () => {
    cy.visit("/login");
    cy.get('[data-test="username"]').type("user");
    cy.get('[data-test="password"]').type("password");
    cy.get('[data-test="submit"]').click();
    cy.url().should("include", "/dashboard");
  });
});
```

## 部署实践

### 构建配置

```javascript
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    minify: "terser",
    sourcemap: false,
  },
});
```

### CI/CD 配置

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 最佳实践

1. 项目初始化

   - 使用 Vite 创建项目
   - 配置 TypeScript
   - 设置 ESLint 和 Prettier
   - 配置 Git Hooks

2. 开发流程

   - 使用 Git Flow
   - 代码审查
   - 自动化测试
   - 持续集成

3. 性能优化

   - 代码分割
   - 组件缓存
   - 图片优化
   - 资源预加载

4. 安全实践
   - XSS 防护
   - CSRF 防护
   - 输入验证
   - 权限控制
