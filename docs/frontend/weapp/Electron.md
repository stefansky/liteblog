# Electron 技术学习知识大纲



## 一、基本入门介绍

- **Electron 是什么**：基于 Chromium 和 Node.js 的桌面应用框架
- **核心特点**：跨平台（Windows/Mac/Linux）、Web 技术栈、原生 API 调用
- **应用场景**：IDE（VS Code）、聊天工具（Slack）、笔记软件（Notion）等



## 二、知识点梳理

### 2.1 主进程 (Main Process)
- 生命周期与入口文件（`main.js`）
- 创建与管理 BrowserWindow
- 应用菜单、系统托盘（Tray）
- App 事件：`ready`、`window-all-closed`、`activate`

### 2.2 渲染进程 (Renderer Process)
- 与 Web 页面等价，负责 UI 渲染
- 引入前端框架（React/Vue/Angular）
- 安全上下文：`contextIsolation`、`preload` 脚本

### 2.3 进程间通信 (IPC)
- `ipcMain` 与 `ipcRenderer`
- 同步 vs 异步通讯
- 使用 `contextBridge` 暴露安全接口

### 2.4 应用打包与分发
- `electron-builder` vs `electron-packager`
- 打包配置（平台、架构、签名）
- 自动更新（autoUpdater）

### 2.5 Node.js 与 Native 模块
- 在渲染进程中使用 Node.js API
- 原生模块编译：`node-gyp`、`prebuild` 等

### 2.6 安全与权限
- 启用沙盒、禁用远程模块
- CSP（Content Security Policy）
- 防止 XSS、任意代码执行

### 2.7 性能优化
- 渲染进程分包与懒加载
- 窗口资源复用、进程复用
- 内存与 CPU 使用监控


## 三、难点知识梳理

- **多进程协作**：主进程与多个渲染进程的数据同步与错误隔离
- **安全沙盒**：在保证安全的前提下实现 Node.js 功能
- **原生功能扩展**：如何桥接系统级功能（摄像头、蓝牙、文件访问）
- **自动更新**：跨平台发布、版本检测与差分更新策略
- **调试与打包差异**：开发环境与生产环境的配置和表现差异


## 四、快速开始入门

### 4.1 环境准备
- 安装 Node.js 与 npm/yarn
- 全局安装 Electron：`npm install -g electron`

### 4.2 创建项目
```bash
mkdir my-electron-app && cd my-electron-app
npm init -y
npm install --save-dev electron
```

### 4.3 编写最简示例
- **main.js**
  ```js
  const { app, BrowserWindow } = require('electron');
  function createWindow() {
    const win = new BrowserWindow({ width: 800, height: 600 });
    win.loadFile('index.html');
  }
  app.whenReady().then(createWindow);
  ```
- **index.html**
  ```html
  <!DOCTYPE html><html><body><h1>Hello Electron</h1></body></html>
  ```

### 4.4 运行与调试
```bash
npx electron .
```
- 使用 DevTools 调试渲染进程
- 在主进程中打印日志或启用 `--inspect` 调试

### 4.5 打包示例
```bash
npm install --save-dev electron-builder
# 在 package.json scripts 中添加:
"build": "electron-builder"
npm run build
```


## 五、项目开发难点

- **跨平台差异**：文件路径、系统托盘、原生对话框在各平台的不同行为
- **性能监控**：如何在运行时获取各进程的 CPU/内存信息
- **安全加固**：配置 CSP、禁用不安全选项、最小化暴露接口
- **自动更新冲突**：与不同分发渠道（GitHub、私服）的兼容性
- **调试与测试**：主进程端到端测试、渲染进程单元测试、UI 自动化测试



