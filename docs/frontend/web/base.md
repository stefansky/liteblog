# HTML

## HTML 语法

- HTML 文档由标签（tags）组成
- 标签通常成对出现，如 `<p>内容</p>`
- 标签可以嵌套，但必须正确闭合
- 标签名不区分大小写，但建议使用小写
- 属性值可以用单引号或双引号包裹

## HTML 标签

### 基础标签

- `<html>`: 定义 HTML 文档
- `<head>`: 包含文档的元信息
- `<body>`: 包含文档的主体内容
- `<title>`: 定义文档标题
- `<meta>`: 提供文档的元数据
- `<link>`: 链接外部资源（如 CSS）
- `<script>`: 定义客户端脚本

### 文本标签

- `<h1>` 到 `<h6>`: 标题标签
- `<p>`: 段落
- `<br>`: 换行
- `<hr>`: 水平线
- `<strong>`: 加粗文本
- `<em>`: 强调文本
- `<span>`: 行内元素容器

### 列表标签

- `<ul>`: 无序列表
- `<ol>`: 有序列表
- `<li>`: 列表项
- `<dl>`: 定义列表
- `<dt>`: 定义术语
- `<dd>`: 定义描述

### 表格标签

- `<table>`: 定义表格
- `<tr>`: 表格行
- `<td>`: 表格单元格
- `<th>`: 表头单元格
- `<thead>`: 表格头部
- `<tbody>`: 表格主体
- `<tfoot>`: 表格底部

### 表单标签

- `<form>`: 表单容器
- `<input>`: 输入控件
- `<textarea>`: 多行文本输入
- `<select>`: 下拉列表
- `<option>`: 下拉选项
- `<button>`: 按钮
- `<label>`: 标签

## HTML 属性

- 全局属性：
  - `id`: 唯一标识符
  - `class`: 类名
  - `style`: 内联样式
  - `title`: 提示文本
  - `data-*`: 自定义数据属性
- 事件属性：
  - `onclick`: 点击事件
  - `onmouseover`: 鼠标悬停
  - `onload`: 加载完成
- 表单属性：
  - `name`: 表单控件名称
  - `value`: 表单控件值
  - `placeholder`: 占位文本
  - `required`: 必填项
  - `disabled`: 禁用状态

## HTML 注释

- 语法：`<!-- 注释内容 -->`
- 注释不会显示在浏览器中
- 可以用于：
  - 解释代码
  - 临时禁用代码
  - 标记代码区域

## HTML 文档结构

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>文档标题</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <!-- 页面内容 -->
  </body>
</html>
```

# HTML5

## HTML5 新特性

- 语义化标签
- 多媒体支持（audio, video）
- Canvas 绘图
- 本地存储（localStorage, sessionStorage）
- WebSocket 通信
- 地理位置 API
- 拖放 API
- 表单增强（新输入类型、验证）

## HTML5 新增标签

- 语义化标签：
  - `<header>`: 页眉
  - `<nav>`: 导航
  - `<section>`: 文档区域
  - `<article>`: 文章内容
  - `<aside>`: 侧边栏
  - `<footer>`: 页脚
  - `<main>`: 主要内容
  - `<figure>`: 图表
  - `<figcaption>`: 图表标题
- 多媒体标签：
  - `<audio>`: 音频
  - `<video>`: 视频
  - `<canvas>`: 画布
  - `<svg>`: 矢量图形
- 表单增强：
  - `<datalist>`: 数据列表
  - `<output>`: 计算结果
  - `<progress>`: 进度条
  - `<meter>`: 度量器
