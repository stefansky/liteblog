# CSS 语法知识

## CSS 基础语法

- 选择器 { 属性: 值; }
- 注释：`/* 注释内容 */`
- 大小写不敏感（建议使用小写）
- 多个声明用分号分隔
- 属性值可以用引号包裹（某些情况下必须）

## CSS 选择器

### 基础选择器

- 元素选择器：`p { }`
- 类选择器：`.class { }`
- ID 选择器：`#id { }`
- 通配符选择器：`* { }`

### 组合选择器

- 后代选择器：`div p { }`
- 子元素选择器：`div > p { }`
- 相邻兄弟选择器：`h2 + p { }`
- 通用兄弟选择器：`h2 ~ p { }`

### 属性选择器

- `[attr]`: 包含属性
- `[attr=value]`: 属性等于值
- `[attr~=value]`: 属性包含单词
- `[attr|=value]`: 属性以值开头
- `[attr^=value]`: 属性以值开始
- `[attr$=value]`: 属性以值结束
- `[attr*=value]`: 属性包含值

### 伪类选择器

- 链接伪类：
  - `:link`: 未访问链接
  - `:visited`: 已访问链接
  - `:hover`: 鼠标悬停
  - `:active`: 激活状态
- 表单伪类：
  - `:focus`: 获得焦点
  - `:checked`: 选中状态
  - `:disabled`: 禁用状态
- 结构伪类：
  - `:first-child`: 第一个子元素
  - `:last-child`: 最后一个子元素
  - `:nth-child(n)`: 第 n 个子元素
  - `:nth-of-type(n)`: 第 n 个指定类型元素

### 伪元素选择器

- `::before`: 元素前插入内容
- `::after`: 元素后插入内容
- `::first-letter`: 首字母
- `::first-line`: 首行
- `::selection`: 选中文本

## CSS 属性

### 文本属性

- `color`: 文本颜色
- `font-family`: 字体
- `font-size`: 字体大小
- `font-weight`: 字体粗细
- `font-style`: 字体样式
- `text-align`: 文本对齐
- `text-decoration`: 文本装饰
- `line-height`: 行高
- `letter-spacing`: 字符间距
- `word-spacing`: 单词间距

### 背景属性

- `background-color`: 背景颜色
- `background-image`: 背景图片
- `background-repeat`: 背景重复
- `background-position`: 背景位置
- `background-size`: 背景大小
- `background-attachment`: 背景固定

### 盒模型属性

- `width`: 宽度
- `height`: 高度
- `padding`: 内边距
- `margin`: 外边距
- `border`: 边框
- `box-sizing`: 盒模型计算方式

### 定位属性

- `position`: 定位方式
  - `static`: 默认定位
  - `relative`: 相对定位
  - `absolute`: 绝对定位
  - `fixed`: 固定定位
  - `sticky`: 粘性定位
- `top/right/bottom/left`: 定位偏移
- `z-index`: 层叠顺序

### 布局属性

- `display`: 显示方式
  - `block`: 块级元素
  - `inline`: 行内元素
  - `inline-block`: 行内块元素
  - `flex`: 弹性布局
  - `grid`: 网格布局
- `float`: 浮动
- `clear`: 清除浮动
- `overflow`: 溢出处理

### Flexbox 布局

- 容器属性：
  - `display: flex`
  - `flex-direction`: 主轴方向
  - `flex-wrap`: 换行方式
  - `justify-content`: 主轴对齐
  - `align-items`: 交叉轴对齐
  - `align-content`: 多行对齐
- 项目属性：
  - `order`: 排序
  - `flex-grow`: 放大比例
  - `flex-shrink`: 缩小比例
  - `flex-basis`: 初始大小
  - `align-self`: 自身对齐

### Grid 布局

- 容器属性：
  - `display: grid`
  - `grid-template-columns`: 列定义
  - `grid-template-rows`: 行定义
  - `grid-gap`: 网格间距
  - `justify-items`: 水平对齐
  - `align-items`: 垂直对齐
- 项目属性：
  - `grid-column`: 列位置
  - `grid-row`: 行位置
  - `justify-self`: 自身水平对齐
  - `align-self`: 自身垂直对齐

# CSS 重难点

## 盒模型

- 标准盒模型：width = content
- IE 盒模型：width = content + padding + border
- `box-sizing: border-box` 切换盒模型

## 浮动与清除浮动

- 浮动元素脱离文档流
- 清除浮动方法：
  - 空元素清除
  - 父元素 overflow
  - 伪元素清除
  - 父元素浮动

## 定位

- 相对定位：相对于自身位置
- 绝对定位：相对于最近定位祖先
- 固定定位：相对于视口
- 粘性定位：相对定位和固定定位的混合

## BFC（块级格式化上下文）

- 创建 BFC 的方法：
  - 根元素
  - float 不为 none
  - position 为 absolute/fixed
  - display 为 inline-block/table-cell
  - overflow 不为 visible
- BFC 特性：
  - 内部元素垂直排列
  - 不会与浮动元素重叠
  - 可以包含浮动元素

## 层叠上下文

- 创建层叠上下文：
  - 根元素
  - position 为 absolute/relative 且 z-index 不为 auto
  - position 为 fixed/sticky
  - flex/grid 容器的子元素且 z-index 不为 auto
- 层叠顺序：
  1. 背景和边框
  2. 负 z-index
  3. 块级元素
  4. 浮动元素
  5. 行内元素
  6. z-index: 0
  7. 正 z-index

## 响应式设计

- 媒体查询：
  ```css
  @media screen and (max-width: 768px) {
    /* 移动端样式 */
  }
  ```
- 视口单位：
  - vw: 视口宽度
  - vh: 视口高度
  - vmin: 较小值
  - vmax: 较大值
- 弹性布局：
  - 使用 flex 布局
  - 使用百分比单位
  - 使用 rem/em 单位

## CSS 动画

- 过渡（transition）：
  ```css
  transition: property duration timing-function delay;
  ```
- 动画（animation）：
  ```css
  @keyframes name {
    0% {
      /* 初始状态 */
    }
    100% {
      /* 结束状态 */
    }
  }
  animation: name duration timing-function delay iteration-count direction;
  ```

## CSS 预处理器

- 变量：
  ```scss
  $primary-color: #333;
  ```
- 嵌套：
  ```scss
  .parent {
    .child {
    }
  }
  ```
- 混合（Mixin）：
  ```scss
  @mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ```
- 函数：
  ```scss
  @function calculate($value) {
    @return $value * 2;
  }
  ```

## CSS 模块化

- BEM 命名规范：
  - Block: 块
  - Element: 元素
  - Modifier: 修饰符
  ```css
  .block__element--modifier {
  }
  ```
- CSS Modules
- CSS-in-JS
- 组件化样式


