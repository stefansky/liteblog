# 移动端布局

## 移动端布局基础知识

### 移动端特点

- 屏幕尺寸小
- 触摸操作
- 网络环境复杂
- 设备性能差异大
- 系统平台多样

### 移动端适配方案

1. 视口设置

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
/>
```

2. 单位选择

- `rem`: 相对于根元素字体大小
- `vw/vh`: 相对于视口尺寸
- `%`: 相对于父元素
- `px`: 固定像素（谨慎使用）

3. 媒体查询

```css
/* 移动设备 */
@media screen and (max-width: 767px) {
  /* 移动端样式 */
}

/* 平板设备 */
@media screen and (min-width: 768px) and (max-width: 1023px) {
  /* 平板样式 */
}
```

### 移动端布局技术

1. Flex 布局

```css
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
```

2. Grid 布局

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}
```

3. 流式布局

```css
.container {
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
}
```

## 移动端布局实战

### 1. 移动端导航

```html
<!-- 底部固定导航 -->
<nav class="mobile-nav">
  <div class="nav-item">
    <i class="icon-home"></i>
    <span>首页</span>
  </div>
  <div class="nav-item">
    <i class="icon-category"></i>
    <span>分类</span>
  </div>
  <div class="nav-item">
    <i class="icon-cart"></i>
    <span>购物车</span>
  </div>
  <div class="nav-item">
    <i class="icon-user"></i>
    <span>我的</span>
  </div>
</nav>

<style>
  .mobile-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    background: #fff;
    padding: 8px 0;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  }
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
  }
</style>
```

### 2. 移动端列表

```html
<!-- 商品列表 -->
<div class="product-list">
  <div class="product-item">
    <img src="product.jpg" alt="商品图片" />
    <div class="product-info">
      <h3>商品标题</h3>
      <p class="price">¥99.00</p>
      <button class="buy-btn">立即购买</button>
    </div>
  </div>
</div>

<style>
  .product-list {
    padding: 10px;
  }
  .product-item {
    display: flex;
    margin-bottom: 15px;
    padding: 10px;
    background: #fff;
    border-radius: 8px;
  }
  .product-item img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
  }
  .product-info {
    flex: 1;
    margin-left: 10px;
  }
  .buy-btn {
    padding: 5px 15px;
    background: #ff6700;
    color: #fff;
    border: none;
    border-radius: 4px;
  }
</style>
```

### 3. 移动端表单

```html
<!-- 登录表单 -->
<form class="login-form">
  <div class="form-group">
    <input type="text" placeholder="请输入手机号" />
  </div>
  <div class="form-group">
    <input type="password" placeholder="请输入密码" />
  </div>
  <button type="submit" class="submit-btn">登录</button>
</form>

<style>
  .login-form {
    padding: 20px;
  }
  .form-group {
    margin-bottom: 15px;
  }
  .form-group input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }
  .submit-btn {
    width: 100%;
    padding: 12px;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
  }
</style>
```

### 4. 移动端轮播图

```html
<!-- 轮播图 -->
<div class="swiper-container">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <img src="banner1.jpg" alt="轮播图1" />
    </div>
    <div class="swiper-slide">
      <img src="banner2.jpg" alt="轮播图2" />
    </div>
  </div>
  <div class="swiper-pagination"></div>
</div>

<style>
  .swiper-container {
    width: 100%;
    height: 200px;
  }
  .swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
```

## 移动端布局总结

### 最佳实践

1. 设计原则

   - 简洁明了
   - 重点突出
   - 操作便捷
   - 反馈及时

2. 性能优化

   - 减少 HTTP 请求
   - 压缩资源文件
   - 使用 CSS Sprites
   - 延迟加载图片
   - 避免重绘重排

3. 交互优化
   - 增大点击区域
   - 添加过渡动画
   - 优化表单输入
   - 提供操作反馈

### 常见问题解决方案

1. 1px 边框问题

```css
.border-1px {
  position: relative;
}
.border-1px:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: #ddd;
  transform: scaleY(0.5);
}
```

2. 点击延迟问题

```javascript
// 使用 FastClick 库
FastClick.attach(document.body);
```

3. 图片模糊问题

```css
.img {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}
```

4. 键盘遮挡问题

```javascript
// 输入框获取焦点时滚动到可视区域
input.onfocus = function () {
  setTimeout(function () {
    input.scrollIntoView(true);
  }, 100);
};
```

### 调试技巧

1. 浏览器调试

   - Chrome 移动端模拟器
   - 响应式设计模式
   - 网络限速测试

2. 真机调试

   - iOS Safari 远程调试
   - Android Chrome 远程调试
   - Weinre 调试工具

3. 性能分析
   - Chrome Performance 面板
   - Lighthouse 性能检测
   - WebPageTest 性能测试
