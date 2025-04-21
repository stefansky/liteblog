# 跨端小程序开发技术笔记


## 一、跨端小程序开发简介

### ✅ 定义
跨端小程序开发是指通过一套代码同时生成微信小程序、支付宝小程序、H5、App 等多个平台应用的开发方式。

### 📌 优势
- 降低研发成本（统一技术栈）
- 提升维护效率
- 快速上线多端产品

---

## 二、uni-app

### ✅ 简介
由 DCloud 推出的跨端框架，基于 Vue.js 语法开发，可发布到微信/支付宝/抖音/H5/APP 等多个平台。

### 📌 特点
- 使用 Vue 语法（支持 Vue2 / Vue3）
- 支持编译到 20+ 平台
- 内置 UI 组件库（如 uView、uni-ui）
- 支持 nvue 渲染提升原生性能

### 🚀 使用方式
```bash
npm install -g @vue/cli
vue create -p dcloudio/uni-preset-vue my-project
npm run dev:%PLATFORM%  # 如 dev:h5、dev:mp-weixin
```

### 📦 支持平台
- 微信/支付宝/百度/字节/QQ 小程序
- H5 页面
- Android/iOS App (通过 uni-app+原生打包)

### 🔧 常用插件
- uView UI
- uni-id（用户认证）
- uniCloud（后端一体化）

---

## 三、Weex

### ✅ 简介
由阿里巴巴推出，原生渲染的跨端框架，适合高性能移动应用开发。

### 📌 特点
- 原生渲染，性能接近原生 App
- 支持 Vue.js 编写组件
- 输出为原生组件（非 WebView）
- 用于阿里集团 App（如淘宝、闲鱼）

### 🤔 注意事项
- 目前社区活跃度较低
- 适用于需要高性能和深度原生能力的项目

### 🚀 使用方式
```bash
npm install -g weex-toolkit
weex create my-app
cd my-app
npm run serve
```

---

## 四、Taro

### ✅ 简介
由京东·凹凸实验室推出的多端开发框架，使用 React 语法开发。

### 📌 特点
- 支持 React 语法（也支持 Vue）
- 支持小程序、H5、React Native、快应用
- 丰富的插件体系
- 社区活跃、文档完善

### 🚀 使用方式
```bash
npm install -g @tarojs/cli
taro init my-project
cd my-project
taro build --type weapp  # 构建为微信小程序
```

### 🔧 支持平台
- 微信/支付宝/百度/QQ/字节跳动小程序
- H5
- React Native

### 🔌 推荐插件
- @tarojs/plugin-html
- @tarojs/taro-router-next

---

## 五、选型建议

| 项目类型             | 推荐框架 | 理由                                       |
|----------------------|-----------|--------------------------------------------|
| 需要快速上多个小程序平台 | uni-app   | 上手简单，平台覆盖广，文档丰富              |
| React 技术栈项目      | Taro      | 兼容 React 语法，适合 React 团队            |
| 对性能要求极高的 App  | Weex      | 原生渲染，性能优越（适合电商类高频页面）      |

---

## 六、跨端开发常见问题

### 1. 多平台兼容问题
- 不同平台 API 支持度不同
- 需通过条件编译 `#ifdef` 或封装平台适配逻辑

### 2. 样式兼容
- 尽量避免使用复杂 CSS 属性
- 使用内置组件库提高兼容性

### 3. 性能问题
- 小程序端避免频繁 setData
- 页面数据下沉（在页面中解耦复杂逻辑）
- 合理使用懒加载

---

## 七、总结
跨端小程序开发大大简化了多平台开发的复杂度，uni-app 和 Taro 是当前生态最成熟的两种方案。实际项目中可根据团队技术背景、业务需求和目标平台选择合适方案。

