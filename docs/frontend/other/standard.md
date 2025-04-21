# 前端开发规范与工具指南



## ESLint

### ✅ 作用
JavaScript/TypeScript 代码语法检查工具，用于统一团队编码风格、发现潜在错误。

### 🔧 安装
```bash
npm install eslint --save-dev
```

可使用官方初始化命令：
```bash
npx eslint --init
```

### 🧩 配置文件 `.eslintrc.js`
```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single']
  }
};
```

### 🧰 推荐 VS Code 插件
- ESLint（官方）：自动提示并修复 ESLint 错误

---

## Prettier

### ✅ 作用
代码格式化工具，负责缩进、空格、引号等统一化，搭配 ESLint 使用。

### 🔧 安装
```bash
npm install prettier --save-dev
```

### 🧩 配置 `.prettierrc`
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 100
}
```

可在 `.eslintrc.js` 中加入：
```js
extends: ['plugin:prettier/recommended']
```

### 🧰 推荐 VS Code 插件
- Prettier - Code formatter

---

## Husky

### ✅ 作用
Git 钩子工具，在 commit、push 等时机自动执行脚本，如 lint 检查、测试等。

### 🔧 安装
```bash
npm install husky --save-dev
npx husky install
```

启用 Git hook：
```bash
npx husky add .husky/pre-commit "npm run lint"
```

添加到 `package.json`：
```json
"scripts": {
  "prepare": "husky install"
}
```

---

## lint-staged

### ✅ 作用
结合 Husky 对暂存区的文件执行 lint、format，提高效率。

### 🔧 安装
```bash
npm install lint-staged --save-dev
```

### 🧩 配置 `package.json`
```json
"lint-staged": {
  "src/**/*.{js,ts,tsx,jsx}": [
    "eslint --fix",
    "prettier --write"
  ]
}
```

Husky 钩子文件中：
```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

---

## PostCSS

### ✅ 作用
CSS 预处理器，借助插件（如 autoprefixer）增强 CSS 能力。

### 🔧 安装
```bash
npm install postcss postcss-cli autoprefixer --save-dev
```

### 🧩 配置 `postcss.config.js`
```js
module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: ['>1%', 'last 2 versions']
    })
  ]
};
```

在构建脚本中加入处理步骤，如：
```bash
postcss src/styles.css -o dist/styles.css
```

---

## 总结推荐 VS Code 插件

| 插件名称               | 功能说明                   |
|------------------------|----------------------------|
| ESLint                 | 实时显示并修复 lint 错误   |
| Prettier               | 自动格式化代码             |
| EditorConfig           | 配合 `.editorconfig` 使用，统一编辑器配置 |
| Stylelint              | 用于 CSS/SCSS 的 lint 检查 |
| GitLens                | Git 历史追踪与 blame 查看 |
| vscode-husky           | Git hook 可视化管理插件     |

通过合理的规范和工具链配置，可以构建一套高效、自动化、标准统一的前端开发流程。