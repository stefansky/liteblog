# vue-router 在 vue3 中的应用

# Vue Router

## 基础配置

### 安装和配置

```javascript
// main.js
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("./views/Home.vue"),
    },
    {
      path: "/about",
      component: () => import("./views/About.vue"),
    },
  ],
});

const app = createApp(App);
app.use(router);
app.mount("#app");
```

### 路由配置

```javascript
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/user/:id",
    name: "User",
    component: User,
    props: true,
  },
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      {
        path: "",
        component: AdminDashboard,
      },
      {
        path: "users",
        component: AdminUsers,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];
```

## 路由导航

### 声明式导航

```vue
<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link :to="{ name: 'User', params: { id: 123 } }">User</router-link>
    <router-link :to="{ path: '/about', query: { id: 123 } }"
      >About</router-link
    >
  </nav>
</template>
```

### 编程式导航

```javascript
// 组件内
import { useRouter } from "vue-router";

const router = useRouter();

// 导航到指定路径
router.push("/");
router.push({ name: "User", params: { id: 123 } });
router.push({ path: "/about", query: { id: 123 } });

// 替换当前路由
router.replace("/about");

// 前进/后退
router.go(1);
router.go(-1);
```

## 路由守卫

### 全局守卫

```javascript
const router = createRouter({
  /* ... */
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

// 全局后置守卫
router.afterEach((to, from) => {
  document.title = to.meta.title || "Default Title";
});
```

### 路由独享守卫

```javascript
const routes = [
  {
    path: "/admin",
    component: Admin,
    beforeEnter: (to, from, next) => {
      if (!isAdmin) {
        next("/login");
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
      title: "Admin Dashboard",
      roles: ["admin"],
    },
  },
];

// 在导航守卫中访问
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});
```

## 动态路由

### 添加路由

```javascript
const router = createRouter({
  /* ... */
});

// 动态添加路由
router.addRoute({
  path: "/new-route",
  component: NewComponent,
});

// 添加嵌套路由
router.addRoute("parent", {
  path: "child",
  component: ChildComponent,
});
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

### Props 传参

```javascript
const routes = [
  {
    path: "/user/:id",
    component: User,
    props: true, // 将路由参数作为 props 传递
  },
  {
    path: "/about",
    component: About,
    props: { staticProp: "value" }, // 静态 props
  },
  {
    path: "/search",
    component: Search,
    props: (route) => ({ query: route.query.q }), // 函数形式
  },
];
```

## 滚动行为

```javascript
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else {
      return { top: 0 };
    }
  },
});
```

## 路由懒加载

```javascript
const routes = [
  {
    path: "/",
    component: () => import("./views/Home.vue"),
  },
  {
    path: "/about",
    component: () => import("./views/About.vue"),
  },
];
```

## 最佳实践

1. 路由组织

   - 按功能模块组织路由
   - 使用路由懒加载
   - 合理使用嵌套路由

2. 导航守卫

   - 权限控制
   - 数据预加载
   - 页面切换动画

3. 性能优化

   - 路由懒加载
   - 组件缓存
   - 避免不必要的重渲染

4. 错误处理
   - 404 页面
   - 错误边界
   - 加载状态
