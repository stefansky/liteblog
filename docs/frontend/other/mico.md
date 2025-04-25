
# 微前端技术笔记

## 一、微前端基础原理

微前端（Micro Frontends）是一种将前端单体应用拆分为多个小型、自治、可独立部署和开发的子应用的架构思想，其灵感来自于微服务架构。

### 核心理念
- 将大型前端项目拆解为多个子应用，每个子应用独立开发和部署。
- 子应用之间通过主应用进行统一管理和通信。
- 技术栈可异构，每个子应用可使用不同的前端框架。

### 关键点
- 独立性：每个子应用可单独运行。
- 技术栈无关：支持 React、Vue、Angular 等并存。
- 独立部署：每个子应用打包成静态资源，通过配置集成。
- 路由隔离：主应用与子应用之间的路由独立管理。
- 状态隔离与通信：通过全局事件总线、URL 参数、Shared State 等实现通信。



## 二、微前端实现方案

### 1. iframe（原始方式）
- **原理**：通过 iframe 嵌套多个独立页面。
- **优点**：天然隔离、部署简单。
- **缺点**：性能差、通信困难、SEO 差。

### 2. Web Component
- **原理**：使用浏览器原生 Web Components 技术（如 customElements）。
- **优点**：兼容性逐渐提升、隔离性好。
- **缺点**：浏览器兼容性仍需关注，开发成本较高。

### 3. 前端集成框架（推荐）
如：
- **[qiankun](https://qiankun.umijs.org)**（基于 single-spa 封装，阿里开源）
- **single-spa**
- **Module Federation（Webpack 5）**
- **micro-app**（更适合 Vue 项目）

#### qiankun 特点
- HTML Entry 加载方式，自动化加载子应用资源。
- 支持 JS 沙箱，确保子应用运行互不干扰。
- 支持主应用/子应用的生命周期管理。



## 三、微前端架构搭建（以 qiankun 为例）

### 1. 技术选型
- 主应用：Vue/React + qiankun
- 子应用：Vue3、React、Angular 等均可

### 2. 主应用搭建步骤
```bash
pnpm create vite
# or vue-cli / create-react-app
```

安装 qiankun：
```bash
pnpm add qiankun
```

注册子应用：
```ts
import { registerMicroApps, start } from 'qiankun'

registerMicroApps([
  {
    name: 'vue-app',
    entry: '//localhost:7101',
    container: '#subapp-container',
    activeRule: '/vue'
  },
  {
    name: 'react-app',
    entry: '//localhost:7102',
    container: '#subapp-container',
    activeRule: '/react'
  }
])

start()
```

### 3. 子应用配置
- 需要暴露生命周期钩子（如 `bootstrap`, `mount`, `unmount`）
- 设置 webpack 配置：publicPath、devServer 端口、跨域 headers

```ts
// vue.config.js
module.exports = {
  publicPath: '//localhost:7101/',
  devServer: {
    port: 7101,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack: {
    output: {
      library: 'vueApp',
      libraryTarget: 'umd'
    }
  }
}
```



## 四、微前端使用实践指南

### 1. 路由管理
- 主应用与子应用各自管理自己的路由
- 推荐使用 Hash 路由避免路径冲突
- 使用 activeRule 控制子应用激活

### 2. 全局状态管理
- 可通过主应用下发共享状态或采用全局状态管理器（如 Redux、Pinia）
- 可使用事件总线如 mitt、eventEmitter 等跨应用通信

```ts
// event-bus.ts
import mitt from 'mitt'
export const eventBus = mitt()
```

### 3. 样式隔离方案
- JS 沙箱 + scoped CSS
- CSS Module / Shadow DOM

### 4. 性能优化
- 资源预加载
- 懒加载子应用（在需要时注册）
- 子应用按需加载依赖，避免冗余包体积



## 五、微前端应用场景

- 多团队协作开发大中型项目
- 多产品共用基础平台
- 技术栈更新或混合使用场景
- 需要独立部署、快速迭代的前端模块



## 六、微前端最佳实践

- 约定子应用接口和生命周期钩子
- 建立公共工具库、样式库
- 子应用尽量保持无状态、轻量级
- 避免主子应用强耦合
- 权限、登录等统一由主应用控制



## 七、推荐开源项目与资源

- [qiankun](https://github.com/umijs/qiankun)
- [single-spa](https://single-spa.js.org/)
- [micro-app](https://github.com/micro-zoe/micro-app)
- [Module Federation](https://webpack.js.org/concepts/module-federation/)
```
