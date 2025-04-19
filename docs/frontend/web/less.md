# Less 语法知识

## 基础语法

### 变量

```less
@primary-color: #007bff;
@font-size: 14px;

.header {
  color: @primary-color;
  font-size: @font-size;
}
```

### 嵌套

```less
.nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: inline-block;
  }
  a {
    text-decoration: none;
  }
}
```

### 混合（Mixins）

```less
.border-radius(@radius: 5px) {
  border-radius: @radius;
  -webkit-border-radius: @radius;
  -moz-border-radius: @radius;
}

.button {
  .border-radius(10px);
}
```

### 运算

```less
@base: 5%;
@filler: @base * 2;
@other: @base + @filler;

.box {
  width: @base + 10%;
  height: @other * 2;
}
```

### 函数

```less
@width: 0.5;

.box {
  width: percentage(@width);
  height: round(1.67);
  color: saturate(@primary-color, 5%);
}
```

### 导入

```less
@import "variables.less";
@import "mixins.less";
```

# Scss 重难点

## 基础特性

### 变量

```scss
$primary-color: #007bff;
$font-size: 14px;

.header {
  color: $primary-color;
  font-size: $font-size;
}
```

### 嵌套

```scss
.nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: inline-block;
  }
  a {
    text-decoration: none;
  }
}
```

### 混合（Mixins）

```scss
@mixin border-radius($radius: 5px) {
  border-radius: $radius;
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
}

.button {
  @include border-radius(10px);
}
```

### 继承

```scss
.message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  @extend .message;
  border-color: green;
}
```

### 条件语句

```scss
@mixin theme($theme: dark) {
  @if $theme == dark {
    background-color: #000;
    color: #fff;
  } @else {
    background-color: #fff;
    color: #000;
  }
}

.box {
  @include theme(dark);
}
```

### 循环

```scss
@for $i from 1 through 3 {
  .item-#{$i} {
    width: 2em * $i;
  }
}

@each $color in red, green, blue {
  .#{$color}-text {
    color: $color;
  }
}
```

# tailwind 语法使用

## 基础使用

### 安装

```bash
npm install -D tailwindcss
npx tailwindcss init
```

### 配置

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#007bff",
      },
    },
  },
  plugins: [],
};
```

### 常用类

```html
<!-- 布局 -->
<div class="container mx-auto px-4">
  <div class="flex flex-col md:flex-row">
    <div class="w-full md:w-1/2"></div>
    <div class="w-full md:w-1/2"></div>
  </div>
</div>

<!-- 间距 -->
<div class="p-4 m-4 space-x-4">
  <div class="mt-4 mb-4"></div>
</div>

<!-- 颜色 -->
<div class="bg-blue-500 text-white">
  <button class="bg-red-500 hover:bg-red-600"></button>
</div>

<!-- 响应式 -->
<div class="text-sm md:text-base lg:text-lg"></div>
```

## 自定义配置

### 主题扩展

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#e6f0ff",
          500: "#007bff",
          900: "#003d7a",
        },
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
    },
  },
};
```

### 插件开发

```javascript
// tailwind.config.js
const plugin = require("tailwindcss/plugin");

module.exports = {
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".skew-10deg": {
          transform: "skewY(-10deg)",
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};
```

# 项目实战

## 如何实现主题切换

### 1. CSS 变量方案

```css
:root {
  --primary-color: #007bff;
  --bg-color: #ffffff;
  --text-color: #333333;
}

[data-theme="dark"] {
  --primary-color: #00ff7f;
  --bg-color: #1a1a1a;
  --text-color: #ffffff;
}

.element {
  color: var(--text-color);
  background-color: var(--bg-color);
}
```

### 2. Less/Scss 方案

```scss
$themes: (
  light: (
    primary-color: #007bff,
    bg-color: #ffffff,
    text-color: #333333,
  ),
  dark: (
    primary-color: #00ff7f,
    bg-color: #1a1a1a,
    text-color: #ffffff,
  ),
);

@mixin themify($themes: $themes) {
  @each $theme, $map in $themes {
    .theme-#{$theme} & {
      $theme-map: () !global;
      @each $key, $submap in $map {
        $value: map-get($map, $key);
        $theme-map: map-merge(
          $theme-map,
          (
            $key: $value,
          )
        ) !global;
      }
      @content;
      $theme-map: null !global;
    }
  }
}

@function themed($key) {
  @return map-get($theme-map, $key);
}

.element {
  @include themify() {
    color: themed("text-color");
    background-color: themed("bg-color");
  }
}
```

### 3. Tailwind 方案

```javascript
// tailwind.config.js
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#007bff",
          dark: "#00ff7f",
        },
      },
    },
  },
};
```

```html
<div class="bg-white dark:bg-gray-800">
  <h1 class="text-gray-900 dark:text-white">标题</h1>
</div>
```

### 4. JavaScript 实现

```javascript
// 切换主题
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

// 初始化主题
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const theme = savedTheme || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
}

// 监听系统主题变化
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    const newTheme = e.matches ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
  });
```

# 总结

## 技术选型建议

1. 小型项目：

   - 使用原生 CSS 或 CSS 变量
   - 简单易维护
   - 无需构建工具

2. 中型项目：

   - 使用 Less/Scss
   - 提供变量、混合等功能
   - 需要构建工具支持

3. 大型项目：
   - 使用 Tailwind
   - 提供完整的工具类
   - 需要配置和构建工具

## 最佳实践

1. 代码组织：

   - 按功能模块组织代码
   - 使用有意义的命名
   - 保持代码简洁

2. 性能优化：

   - 减少嵌套层级
   - 避免重复代码
   - 使用压缩工具

3. 维护性：
   - 添加注释说明
   - 遵循团队规范
   - 定期重构代码
