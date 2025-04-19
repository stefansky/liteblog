# 响应式布局基础知识

## 响应式设计概念

- 定义：使网站能够适应不同设备和屏幕尺寸的设计方法
- 核心原则：
  - 流体网格（Fluid Grid）
  - 弹性图片（Flexible Images）
  - 媒体查询（Media Queries）
- 断点（Breakpoints）：
  - 移动设备：< 576px
  - 平板：≥ 576px
  - 桌面：≥ 768px
  - 大桌面：≥ 992px
  - 超大桌面：≥ 1200px

## 响应式布局技术

### 视口设置

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### 媒体查询

```css
/* 移动设备 */
@media (max-width: 575.98px) {
}

/* 平板 */
@media (min-width: 576px) and (max-width: 767.98px) {
}

/* 桌面 */
@media (min-width: 768px) and (max-width: 991.98px) {
}

/* 大桌面 */
@media (min-width: 992px) and (max-width: 1199.98px) {
}

/* 超大桌面 */
@media (min-width: 1200px) {
}
```

### 响应式单位

- 相对单位：
  - `%`: 相对于父元素
  - `em`: 相对于当前元素的字体大小
  - `rem`: 相对于根元素的字体大小
  - `vw`: 视口宽度的 1%
  - `vh`: 视口高度的 1%
  - `vmin`: 视口较小尺寸的 1%
  - `vmax`: 视口较大尺寸的 1%

### 响应式图片

```html
<img
  src="small.jpg"
  srcset="medium.jpg 1000w, large.jpg 2000w"
  sizes="(max-width: 600px) 100vw, 50vw"
/>
```

# 项目响应式布局实战

## Bootstrap 栅格系统

### 容器

```html
<div class="container">固定宽度容器</div>
<div class="container-fluid">全宽容器</div>
```

### 栅格类

- 行：`.row`
- 列：
  - `.col`: 自动宽度
  - `.col-{breakpoint}-{size}`: 指定宽度
  - `.col-{breakpoint}-auto`: 自动宽度
- 断点：
  - `xs`: < 576px
  - `sm`: ≥ 576px
  - `md`: ≥ 768px
  - `lg`: ≥ 992px
  - `xl`: ≥ 1200px

### 栅格示例

```html
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4">内容1</div>
    <div class="col-12 col-md-6 col-lg-4">内容2</div>
    <div class="col-12 col-md-6 col-lg-4">内容3</div>
  </div>
</div>
```

## 响应式组件

### 导航栏

```html
<nav class="navbar navbar-expand-lg navbar-light">
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarNav"
  >
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item"><a class="nav-link" href="#">链接1</a></li>
      <li class="nav-item"><a class="nav-link" href="#">链接2</a></li>
    </ul>
  </div>
</nav>
```

### 卡片

```html
<div class="card-deck">
  <div class="card">
    <img class="card-img-top" src="..." />
    <div class="card-body">
      <h5 class="card-title">标题</h5>
      <p class="card-text">内容</p>
    </div>
  </div>
</div>
```

### 轮播图

```html
<div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="..." />
    </div>
  </div>
</div>
```

## 响应式工具类

### 显示/隐藏

- `.d-none`: 隐藏
- `.d-{breakpoint}-none`: 在指定断点隐藏
- `.d-{breakpoint}-block`: 在指定断点显示为块级
- `.d-{breakpoint}-inline`: 在指定断点显示为行内
- `.d-{breakpoint}-inline-block`: 在指定断点显示为行内块

### 间距

- 边距：
  - `.m-{size}`: 所有边距
  - `.mt-{size}`: 上边距
  - `.mb-{size}`: 下边距
  - `.ml-{size}`: 左边距
  - `.mr-{size}`: 右边距
- 内边距：
  - `.p-{size}`: 所有内边距
  - `.pt-{size}`: 上内边距
  - `.pb-{size}`: 下内边距
  - `.pl-{size}`: 左内边距
  - `.pr-{size}`: 右内边距

### 文本对齐

- `.text-left`: 左对齐
- `.text-center`: 居中对齐
- `.text-right`: 右对齐
- `.text-{breakpoint}-left`: 在指定断点左对齐
- `.text-{breakpoint}-center`: 在指定断点居中对齐
- `.text-{breakpoint}-right`: 在指定断点右对齐

# 响应式布局总结

## 最佳实践

1. 移动优先设计

   - 先设计移动端布局
   - 逐步添加更大屏幕的样式
   - 使用媒体查询向上扩展

2. 内容优先

   - 确保核心内容在所有设备上可访问
   - 根据屏幕尺寸调整内容展示方式
   - 避免在小屏幕上隐藏重要内容

3. 性能优化

   - 使用响应式图片
   - 延迟加载非关键资源
   - 优化 CSS 和 JavaScript
   - 使用适当的图片格式和大小

4. 测试策略
   - 使用浏览器开发者工具
   - 测试真实设备
   - 考虑不同网络条件
   - 测试不同屏幕方向

## 常见问题解决方案

1. 图片响应式

   - 使用 `max-width: 100%`
   - 使用 `srcset` 和 `sizes`
   - 使用 `picture` 元素

2. 表格响应式

   - 使用 `.table-responsive`
   - 水平滚动
   - 重新组织数据展示

3. 导航响应式

   - 使用折叠菜单
   - 考虑移动端手势
   - 优化触摸目标大小

4. 表单响应式
   - 调整输入框大小
   - 优化按钮布局
   - 考虑移动端输入方式

## 性能优化

1. CSS 优化

   - 使用媒体查询合并
   - 避免不必要的样式
   - 使用 CSS 预处理器

2. JavaScript 优化

   - 延迟加载脚本
   - 使用事件委托
   - 优化 DOM 操作

3. 图片优化

   - 使用适当的图片格式
   - 实现懒加载
   - 使用 CDN

4. 缓存策略
   - 使用浏览器缓存
   - 实现服务端缓存
   - 使用 CDN 缓存
