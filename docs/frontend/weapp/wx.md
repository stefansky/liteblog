# 原生微信小程序开发笔记


## 一、基础知识

### ✅ 项目结构
- `app.js`：小程序逻辑入口
- `app.json`：全局配置
- `app.wxss`：全局样式
- `pages/`：页面目录（每个页面包含 `.js`、`.json`、`.wxml`、`.wxss` 四个文件）

### ✅ 核心概念
- 页面生命周期：`onLoad`、`onShow`、`onHide`、`onUnload`
- 组件生命周期：`created`、`attached`、`ready`、`moved`、`detached`
- 数据绑定：使用 `{{ }}` 实现模板数据绑定
- 条件渲染：`wx:if`、`wx:elif`、`wx:else`
- 列表渲染：`wx:for`
- 事件处理：`bindtap`、`catchtap`

### ✅ 小程序 API 示例
```js
wx.request({
  url: 'https://api.example.com/data',
  method: 'GET',
  success(res) {
    console.log(res.data);
  }
});
```

---

## 二、项目难点

### 📌 状态管理
- 原生不提供全局状态管理方案，可通过 `globalData` 或第三方库（如 `mobx-miniprogram`）

### 📌 页面通信
- 页面间传参：`navigateTo({ url: '/pages/detail?id=123' })`
- 使用 `eventChannel` 或本地缓存做复杂通信

### 📌 组件封装
- 自定义组件使用 `.wxml`、`.js`、`.json`、`.wxss`
- 父子组件通信：使用 `properties` 和 `triggerEvent`

### 📌 网络请求
- `wx.request` 不支持 Promise，需封装（如封装为 `Promise` 封装请求拦截器）

### 📌 兼容性处理
- 针对不同基础库版本，使用 `wx.canIUse()` 检查 API 是否可用

---

## 三、项目实战

### ✅ 页面开发示例
```html
<!-- index.wxml -->
<view class="user-info" bindtap="onTap">
  {{ userInfo.nickName }}
</view>
```
```js
// index.js
Page({
  data: {
    userInfo: {}
  },
  onLoad() {
    this.setData({
      userInfo: wx.getStorageSync('userInfo') || {}
    });
  },
  onTap() {
    wx.navigateTo({ url: '/pages/profile/index' });
  }
});
```

### ✅ 项目目录结构建议
```
├── app.js
├── app.json
├── app.wxss
├── pages/
│   ├── index/
│   │   ├── index.wxml
│   │   ├── index.wxss
│   │   ├── index.js
│   │   └── index.json
├── components/
│   └── custom-button/
├── utils/
│   └── request.js
```

### ✅ 小程序登录流程
1. 调用 `wx.login` 获取临时 code
2. 后端使用 code 获取 session_key + openid
3. 本地结合 token 存储用户登录态

---

## 四、常见扩展功能

### ✅ 登录鉴权
- 登录接口封装，配合后端校验并生成用户 token
- 本地存储 token，使用请求拦截器统一带上 headers

### ✅ 微信支付流程
1. 前端调用后端生成预支付订单（统一下单）
2. 后端返回 `prepay_id` 和支付签名信息
3. 前端使用 `wx.requestPayment` 发起支付
```js
wx.requestPayment({
  timeStamp: '',
  nonceStr: '',
  package: '',
  signType: 'MD5',
  paySign: '',
  success: res => {},
  fail: err => {}
});
```

### ✅ 分包加载（优化启动性能）
- 在 `app.json` 中配置：
```json
"subpackages": [
  {
    "root": "pages/packageA",
    "pages": ["home/index", "list/index"]
  }
]
```
- 主包和分包互不依赖，适合大型应用

### ✅ 发布流程
1. 使用微信开发者工具上传代码
2. 在小程序后台配置体验版、提交审核
3. 审核通过后发布正式版

### ✅ 调试与测试
- 使用开发者工具提供的调试面板
- 模拟器测试多端样式
- 通过条件编译 `#ifdef` 处理多平台逻辑
- 使用 `miniprogram-simulate` 工具进行单元测试（适用于组件）

---

## 五、总结

- 微信小程序原生开发适合对性能、兼容性要求高的项目
- 框架简单但对开发者编码习惯要求高，建议配合 ESLint、代码规范插件统一团队代码风格
- 常用工具如 `miniprogram-api-typings` 可以提升 TypeScript 开发体验
- 对于复杂项目推荐使用跨端方案（如 uni-app / Taro）或引入状态管理方案提高开发效率
- 开发大型项目建议结合分包加载、登录鉴权、支付流程、调试工具等能力提升质量与用户体验

---

## 六、性能优化建议

> 微信小程序运行环境对资源与性能有一定限制，良好的性能优化能显著提升用户体验和加载速度。

### ✅ 启动性能优化
- 使用分包加载，仅主包加载首页资源
- 减少主包体积在 2MB 内，合并资源、减少依赖
- 延迟加载大图、大数据等非必要资源

### ✅ 页面渲染优化
- 减少 `setData` 调用频率与数据量
- 精确更新变化字段，避免全量更新
- 使用 `hidden` 替代 `wx:if`，防止频繁 DOM 重建
- 避免嵌套 `wx:for` 渲染，优化列表结构

### ✅ 图片与资源优化
- 使用 WebP 格式（基础库 >= 2.9.0）
- 图片压缩后上传
- 静态资源使用本地缓存，或托管到 CDN

### ✅ 网络请求优化
- 请求合并，减少并发数
- 资源使用 CDN 缓存，提高加载速度
- 使用本地缓存策略缓存接口响应

### ✅ 滚动性能优化
- 使用 `scroll-view` 替代整页滚动，减少重绘
- 分页加载长列表，避免卡顿
- 控件总数建议不超过 1000

### ✅ JavaScript 执行优化
- 防抖节流优化事件处理，如 scroll、input
- 复杂计算放到 Web Worker 或拆分异步处理

### ✅ 组件化与复用
- 拆分复用组件，减少页面代码复杂度
- 控制组件嵌套层级，避免过深影响性能

### ✅ 小程序特有优化工具
- 使用开发者工具性能面板分析耗时
- 使用 `performance` 接口分析阶段耗时
- 基础库版本提示更新，享受新特性支持

###. 用户体验
   - 加载状态提示
   - 错误提示
   - 页面切换动画
   - 下拉刷新和上拉加载

