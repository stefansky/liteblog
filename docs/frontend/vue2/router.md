# Vue Router

## 2. Vue Router

### 2.1 基本使用
- 路由配置
- 路由模式
- 路由参数
- 路由守卫
### 配置
```js
const router = new VueRouter({
  routes: [
    { path: '/home', component: Home }
  ]
});
```

### 模式
- `hash`、`history`

### 参数
```js
{ path: '/user/:id', component: User }
```

### 守卫
```js
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    next('/login');
  } else {
    next();
  }
});
```

### 2.2 高级特性
- 路由元信息
- 路由懒加载
- 路由组件传参
- 滚动行为
### 路由元信息
```js
{ path: '/admin', component: Admin, meta: { requiresAuth: true } }
```

### 懒加载
```js
const Foo = () => import('./Foo.vue');
```

### props 传参
```js
{ path: '/user/:id', component: User, props: true }
```

### 滚动行为
```js
scrollBehavior(to, from, savedPosition) {
  return savedPosition || { x: 0, y: 0 };
}
```