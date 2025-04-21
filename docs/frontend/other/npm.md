# 如何开发自己的 npm 包

> 本文将介绍如何从零开始开发一个 npm 包并发布到 npm 官网，适合希望封装自己的工具库、组件库或通用模块的开发者。

---

## 1. 创建项目

在任意目录下创建一个新的文件夹：

```bash
mkdir my-npm-package
cd my-npm-package
```

也可通过脚手架（如 `create-ts-lib`）快速生成模板。

---

## 2. 初始化项目

使用 npm 初始化项目结构：

```bash
npm init -y
```

此命令会生成一个 `package.json` 文件，包含如下关键字段：

- `name`：包名，需全局唯一，推荐加上组织前缀（如 `@your-scope/package-name`）
- `version`：版本号，遵循语义化版本
- `main`：入口文件路径（如 `dist/index.js`）
- `module`：ESM 模块入口（如 `dist/index.esm.js`）
- `types`：TypeScript 类型声明文件（如 `dist/index.d.ts`）
- `files`：需要发布的文件或文件夹（不包含测试、打包脚本等）
- `scripts`：构建/测试等脚本命令

可安装必要依赖：

```bash
npm install typescript --save-dev
npm install rollup -D
```

---

## 3. 开发项目

### 3.1 编写源代码

默认源文件存放在 `src/` 目录下，如：

```ts
// src/index.ts
export function sum(a: number, b: number): number {
  return a + b;
}
```

### 3.2 添加类型定义

使用 TypeScript 编写代码时，需要配置 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "declaration": true,
    "outDir": "dist",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strict": true
  },
  "include": ["src"]
}
```

### 3.3 配置打包工具

推荐使用 Rollup 进行打包：

```js
// rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm'
    }
  ],
  plugins: [typescript()]
};
```

添加构建脚本：

```json
"scripts": {
  "build": "rollup -c"
}
```

执行构建：

```bash
npm run build
```

---

## 4. 发布项目

### 4.1 注册 npm 账号

访问 https://www.npmjs.com/signup 创建账号。

登录账号：

```bash
npm login
```

### 4.2 发布包

确保入口文件正确，构建无误后运行：

```bash
npm publish
```

如需发布 `@scope/` 包，需要：

- `package.json` 中的 `name` 字段使用 `@scope/xxx`
- 添加 `--access public` 参数（默认作用域包为私有）

```bash
npm publish --access public
```

### 4.3 常见错误

- 包名重复：更换包名或增加作用域
- 没有构建输出：检查 `files` 字段或 `.npmignore`
- 没有版本更新：每次发布必须更新 `version` 字段

### 4.4 更新版本

```bash
npm version patch   # 或 minor, major
```

---

## 结语

开发和发布 npm 包是现代前端工程化的一部分。无论是工具函数库、React 组件库，还是 Node.js 公共模块，掌握封装与发布的流程对构建可复用、高内聚模块有很大帮助。

你可以将此流程模板化，用于快速生成和维护自己的 npm 库。

