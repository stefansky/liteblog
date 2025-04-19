# Vue Router 在 Vue3 中的应用

## 基础配置

### 安装和配置

```javascript
// main.js
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

// 定义路由
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./views/Home.vue"),
    meta: {
      title: "首页",
      requiresAuth: true,
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("./views/About.vue"),
    meta: {
      title: "关于",
    },
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title || "默认标题";

  // 检查是否需要登录
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: "Login" });
  } else {
    next();
  }
});

// 全局后置守卫
router.afterEach((to, from) => {
  // 可以在这里添加页面访问统计等
  console.log(`Navigated from ${from.path} to ${to.path}`);
});

const app = createApp(App);
app.use(router);
app.mount("#app");
```

## 路由导航

### 声明式导航

```vue
<template>
  <nav>
    <!-- 基本导航 -->
    <router-link to="/">首页</router-link>

    <!-- 命名路由 -->
    <router-link :to="{ name: 'About' }">关于</router-link>

    <!-- 带参数的路由 -->
    <router-link :to="{ name: 'User', params: { id: 123 } }">用户</router-link>

    <!-- 带查询参数的路由 -->
    <router-link :to="{ path: '/search', query: { q: 'vue' } }"
      >搜索</router-link
    >

    <!-- 自定义激活类名 -->
    <router-link to="/" active-class="active-link">首页</router-link>

    <!-- 精确匹配 -->
    <router-link to="/" exact>首页</router-link>
  </nav>
</template>
```

### 编程式导航

```javascript
// 在组件中使用
import { useRouter } from "vue-router";

const router = useRouter();

// 基本导航
router.push("/");
router.push({ path: "/about" });

// 命名路由
router.push({ name: "About" });

// 带参数的路由
router.push({ name: "User", params: { id: 123 } });

// 带查询参数的路由
router.push({ path: "/search", query: { q: "vue" } });

// 替换当前路由
router.replace("/about");

// 前进/后退
router.go(1); // 前进
router.go(-1); // 后退
router.back(); // 后退
router.forward(); // 前进
```

## 路由参数

### 动态路由参数

```javascript
// 路由配置
const routes = [
  {
    path: "/user/:id",
    name: "User",
    component: () => import("./views/User.vue"),
    props: true // 将路由参数作为 props 传递
  }
];

// 组件中使用
<template>
  <div>
    <h1>用户详情</h1>
    <p>用户ID: {{ id }}</p>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true
  }
});
</script>
```

### 查询参数

```javascript
// 路由配置
const routes = [
  {
    path: "/search",
    name: "Search",
    component: () => import("./views/Search.vue")
  }
];

// 组件中使用
<template>
  <div>
    <h1>搜索结果</h1>
    <p>搜索关键词: {{ $route.query.q }}</p>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const searchQuery = route.query.q;
</script>
```

## 路由守卫

### 全局守卫

```javascript
// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 检查是否需要登录
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: "Login" });
  } else {
    next();
  }
});

// 全局解析守卫
router.beforeResolve((to, from, next) => {
  // 在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后调用
  next();
});

// 全局后置守卫
router.afterEach((to, from) => {
  // 可以在这里添加页面访问统计等
  console.log(`Navigated from ${from.path} to ${to.path}`);
});
```

### 路由独享守卫

```javascript
const routes = [
  {
    path: "/admin",
    component: Admin,
    beforeEnter: (to, from, next) => {
      if (!isAdmin()) {
        next({ name: "Login" });
      } else {
        next();
      }
    },
  },
];
```

### 组件内守卫

```javascript
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";

export default {
  setup() {
    // 在离开当前路由前调用
    onBeforeRouteLeave((to, from, next) => {
      if (hasUnsavedChanges) {
        if (confirm("确定要离开吗？")) {
          next();
        } else {
          next(false);
        }
      } else {
        next();
      }
    });

    // 在当前路由改变，但是该组件被复用时调用
    onBeforeRouteUpdate((to, from, next) => {
      // 处理路由参数变化
      next();
    });
  },
};
```

## 路由元信息

```javascript
const routes = [
  {
    path: "/admin",
    component: Admin,
    meta: {
      requiresAuth: true,
      title: "管理后台",
      roles: ["admin"],
      keepAlive: true,
    },
  },
];

// 在导航守卫中访问
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !isAuthenticated()) {
    next("/login");
  } else {
    next();
  }
});
```

## 动态路由

### 添加路由

```javascript
// 添加单个路由
router.addRoute({
  path: "/new-route",
  component: NewComponent,
});

// 添加嵌套路由
router.addRoute("parent", {
  path: "child",
  component: ChildComponent,
});

// 添加多个路由
const newRoutes = [
  {
    path: "/route1",
    component: Component1,
  },
  {
    path: "/route2",
    component: Component2,
  },
];
newRoutes.forEach((route) => router.addRoute(route));
```

### 删除路由

```javascript
// 通过名称删除路由
router.removeRoute("route-name");

// 添加和删除路由
const removeRoute = router.addRoute(routeRecord);
removeRoute(); // 删除路由
```

## 路由组件传参

```javascript
const routes = [
  {
    path: "/user/:id",
    component: User,
    props: true // 将路由参数作为 props 传递
  },
  {
    path: "/about",
    component: About,
    props: { staticProp: "value" } // 静态 props
  },
  {
    path: "/search",
    component: Search,
    props: route => ({ query: route.query.q }) // 函数形式
  }
];

// 组件中使用
<template>
  <div>
    <h1>用户详情</h1>
    <p>用户ID: {{ id }}</p>
    <p>静态属性: {{ staticProp }}</p>
    <p>搜索关键词: {{ query }}</p>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  staticProp: String,
  query: String
});
</script>
```

## 最佳实践

1. 路由组织

   - 按功能模块组织路由
   - 使用路由懒加载
   - 合理使用嵌套路由
   - 使用命名路由

2. 导航守卫

   - 权限控制
   - 数据预加载
   - 页面切换动画
   - 错误处理

3. 性能优化

   - 路由懒加载
   - 组件缓存
   - 避免不必要的重渲染
   - 合理使用路由参数

4. 错误处理
   - 404 页面
   - 错误边界
   - 加载状态
   - 错误重定向
