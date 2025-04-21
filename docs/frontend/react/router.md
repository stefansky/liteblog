# React Router 笔记


## 1. 基础概念

React Router 是 React 官方推荐的路由库，用于在 SPA（单页应用）中实现前端路由管理。通过组件化的声明式 API，帮助开发者控制不同 URL 显示不同组件。

### v6 相较 v5 的主要变化

- 使用 `<Routes>` 替代 `<Switch>`
- Route 的 children 默认是 element，而非 component
- 支持嵌套路由（嵌套 + `Outlet`）
- 更简单的动态参数获取方式

---

## 2. 核心 API

### 2.1 路由容器组件

```tsx
import { BrowserRouter } from 'react-router-dom';

<BrowserRouter>
  <App />
</BrowserRouter>
```

- `<BrowserRouter>`：基于 HTML5 history API
- `<HashRouter>`：URL 中使用 hash (`#/home`)，兼容性更强

### 2.2 路由映射组件

```tsx
import { Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

### 2.3 路由跳转组件

```tsx
import { Link, NavLink } from 'react-router-dom';

<Link to="/home">首页</Link>
<NavLink to="/about" activeClassName="active">关于</NavLink>
```

### 2.4 编程式跳转

```tsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/login');
navigate('/user', { state: { id: 123 } });
```

### 2.5 获取路由信息

```tsx
import { useParams, useLocation, useSearchParams } from 'react-router-dom';

const { id } = useParams();
const location = useLocation();
const [searchParams] = useSearchParams();
```

---

## 3. 路由配置

### 3.1 静态路由

```tsx
<Route path="/about" element={<About />} />
```

### 3.2 动态参数路由

```tsx
<Route path="/user/:id" element={<User />} />

// 获取参数：
const { id } = useParams();
```

### 3.3 通配符路由

```tsx
<Route path="*" element={<NotFound />} />
```

### 3.4 索引路由（默认子路由）

```tsx
<Route path="/home" element={<Home />}>
  <Route index element={<HomeIndex />} />
</Route>
```

---

## 4. 嵌套路由与布局

### 4.1 嵌套路由结构

```tsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route path="overview" element={<Overview />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

### 4.2 使用 `<Outlet />` 作为子路由占位符

```tsx
const DashboardLayout = () => (
  <div>
    <Sidebar />
    <Outlet />
  </div>
);
```

---

## 5. 路由懒加载

### 使用 React.lazy + Suspense

```tsx
const Home = React.lazy(() => import('./pages/Home'));

<Routes>
  <Route path="/" element={
    <Suspense fallback={<Loading />}>
      <Home />
    </Suspense>
  } />
</Routes>
```

---

## 6. 编程式导航

```tsx
const navigate = useNavigate();

// 跳转
navigate('/login');

// 带参数跳转
navigate('/user', { state: { id: 1 } });

// 替换（不保留历史）
navigate('/login', { replace: true });
```

---

## 7. 权限控制与路由守卫

### 方式一：封装 ProtectedRoute 组件

```tsx
const ProtectedRoute = ({ children }) => {
  const isLogin = useAuth();
  return isLogin ? children : <Navigate to="/login" replace />;
};
```

### 方式二：在路由表中统一配置

```tsx
<Route path="/admin" element={
  <ProtectedRoute>
    <Admin />
  </ProtectedRoute>
} />
```

---

## 8. 404 页面处理

### 使用通配符 `*`

```tsx
<Route path="*" element={<NotFound />} />
```

---

## 9. URL 查询参数处理

### 获取 query 参数

```tsx
const [searchParams] = useSearchParams();
const keyword = searchParams.get('q');
```

### 设置 query 参数

```tsx
const [searchParams, setSearchParams] = useSearchParams();
setSearchParams({ q: 'react', page: 2 });
```

---

## 10. 性能优化

- 利用 `React.lazy` 进行路由懒加载
- 使用 `React.memo`、`useMemo` 优化组件渲染
- 减少路由组件中依赖全局状态的操作
- 拆分大型路由配置表

---

## 11. SSR & MPA 场景说明

### 与 Next.js 区别

- React Router 专注于 CSR（客户端渲染）
- Next.js 提供更完善的 SSR、SSG 支持

### React Router SSR 用法

配合 `ReactDOM.hydrate` 和静态生成器使用（如 Remix 框架）

---

## 12. 常见问题与实践建议

- **为什么组件不刷新？**：确认组件依赖了路由参数或 location，必要时使用 key 强制刷新
- **如何跳转后清空状态？**：使用 `replace` 或重置本地状态
- **如何嵌套路由动态加载？**：搭配 `React.lazy` 与 `Outlet`

---

> React Router 是构建大型 React 应用的基础设施之一，配合状态管理和懒加载方案可以实现更高性能和更清晰结构的前端架构。

