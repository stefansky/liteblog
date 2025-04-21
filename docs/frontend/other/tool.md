# 前端构建工具与工程化指南



## 1. 工程化

### 1.1 构建工具概览

| 工具         | 描述                                        | 适用场景                     |
|--------------|---------------------------------------------|------------------------------|
| Create React App | React 官方脚手架，零配置启动               | 快速创建 React 项目          |
| Next.js      | 基于 React 的 SSR/SSG 框架，支持全栈开发     | SEO 优化、服务器渲染项目      |
| Umi          | 阿里系 React 框架，内置路由和权限管理         | 企业级中后台 React 应用      |
| vue-cli      | Vue 官方脚手架，快速搭建项目                 | Vue2 项目开发                |
| Vite         | 新一代前端构建工具，原生 ESM，极致快          | Vue3、React 等现代框架开发    |
| Webpack      | 功能强大、可配置性极高的打包器               | 大型项目打包、多种插件扩展    |
| Rollup       | 专注于打包库、体积优化优先                   | 发布 npm 包、组件库开发       |
| Gulp         | 基于任务流的构建工具                         | 自动化构建流程，如拷贝压缩等 |

---

## 2. Create React App

### ✅ 作用
快速创建并启动 React 项目，零配置支持 Babel、Webpack 等。

### 📦 使用
```bash
npx create-react-app my-app
cd my-app
npm start
```

### 📌 特点
- 支持 JSX、ES6、CSS 模块
- 内置 Webpack、Babel、ESLint
- 可使用 `react-scripts` 覆盖配置（或 `eject`）

---

## 3. Next.js

### ✅ 作用
支持 SSR（服务器渲染）、静态生成（SSG）、API 路由的 React 框架。

### 📦 使用
```bash
npx create-next-app my-app
npm run dev
```

### 📌 特点
- 文件路由、SSR/SSG 支持
- 自动代码分割
- API 路由、全栈能力
- SEO 友好

---

## 4. Umi

### ✅ 作用
企业级 React 应用框架，内置路由、权限、构建等能力。

### 📦 使用
```bash
npm create umi
cd 项目目录
npm install
npm start
```

### 📌 特点
- 配置式 + 约定式路由
- 微前端支持
- 插件机制丰富

---

## 5. Webpack

### ✅ 作用
模块打包工具，处理 JS/CSS/图片等资源，实现模块化开发。

### 📦 安装
```bash
npm install webpack webpack-cli --save-dev
```

### 🧩 示例配置
```js
// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  }
};
```

### 📌 特点
- 支持多入口输出
- 插件机制强大（如 HtmlWebpackPlugin、MiniCssExtractPlugin）

---

## 6. vue-cli

### ✅ 作用
Vue 官方提供的项目脚手架工具。

### 📦 使用
```bash
npm install -g @vue/cli
vue create my-project
cd my-project
npm run serve
```

### 📌 特点
- 支持 Vue2，Vue3 请使用 Vite
- 图形化配置界面 `vue ui`

---

## 7. Gulp

### ✅ 作用
基于任务流的自动构建工具，用于处理 CSS、JS 压缩、文件拷贝等操作。

### 📦 安装
```bash
npm install gulp --save-dev
```

### 🧩 示例任务
```js
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');

gulp.task('minify-css', () => {
  return gulp.src('src/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'));
});
```

---

## 8. Vite

### ✅ 作用
基于原生 ESM 实现的极速开发服务器和构建工具，支持 Vue、React、TS 等。

### 📦 使用
```bash
npm create vite@latest
cd 项目目录
npm install
npm run dev
```

### 📌 特点
- 极速启动，热更新快
- 内置 TS、PostCSS、Alias 支持
- 多框架支持（Vue、React、Svelte 等）

---

## 9. Rollup

### ✅ 作用
专注于 JavaScript 库打包优化，生成体积更小、性能更佳的代码。

### 📦 安装
```bash
npm install rollup --save-dev
```

### 🧩 示例配置
```js
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm'
  },
  plugins: [resolve()]
};
```

### 📌 特点
- 用于打包库（npm 包）更合适
- 支持 tree-shaking 和 esm 输出

---

## 结语

前端工程化的核心目标是提升开发效率、代码质量与协作能力。选择合适的构建工具取决于项目规模、需求及技术栈。对于快速开发推荐 Vite，对于大型项目可选 Webpack，对于构建库使用 Rollup 更合适。

