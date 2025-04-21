# Webpack 知识笔记


## 1. Webpack

### 1.1 基础配置

#### 安装与初始化
```bash
npm install --save-dev webpack webpack-cli
# 初始化配置
npx webpack init  # webpack@5 提供交互式向导
```

#### 入口配置 (entry)
```js
// webpack.config.js
module.exports = {
  entry: './src/index.js',
  // 或者多入口：{ app: './src/app.js', vendor: './src/vendor.js' }
}
```

#### 输出配置 (output)
```js
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',       // 或 '[name].[contenthash].js'
    publicPath: '/',            // 资源引用的公共路径
  }
}
```

#### 加载器配置 (loaders)
```js
module.exports = {
  module: {
    rules: [
      // JavaScript/JSX
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      // CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // 图片/字体
      {
        test: /\.(png|jpg|svg|ttf)$/,
        type: 'asset',  // asset/resource | asset/inline
      }
    ]
  }
}
```

#### 插件配置 (plugins)
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: true,
    }),
    // DefinePlugin、HotModuleReplacementPlugin 等
  ]
}
```

---

### 1.2 高级特性

#### 代码分割 (Code Splitting)
- **入口分割**：多入口配置
- **动态分割**：`import()` 语法
- **SplitChunksPlugin**：自动提取公用模块
```js
optimization: {
  splitChunks: {
    chunks: 'all',
  },
  runtimeChunk: 'single',  // 提取 runtime
}
```

#### 懒加载 (Lazy Loading)
```js
// 在组件中
import React, { lazy, Suspense } from 'react';
const MyComponent = lazy(() => import('./MyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
}
```

#### 缓存优化
- 使用 `[contenthash]` 在文件名中生成哈希
- `cache: { type: 'filesystem' }` 打开持久化缓存
- `moduleIds: 'deterministic'` 保持 id 稳定

#### 性能优化
- **Tree Shaking**：开启 `mode: 'production'` 自动剔除无用代码
- **Scope Hoisting**：`optimization.concatenateModules: true`
- **压缩**：TerserPlugin、CssMinimizerPlugin
- **多线程/HappyPack**：`thread-loader`

#### 开发服务器
```bash
npm install --save-dev webpack-dev-server
```
```js
module.exports = {
  devServer: {
    static: './dist',
    hot: true,
    port: 3000,
    historyApiFallback: true,
  }
}
```

---

### 1.3 最佳实践

#### 配置优化
- 使用 `webpack-merge` 分离 `webpack.common.js`、`webpack.dev.js`、`webpack.prod.js`
- 提取公共配置，环境差异只保留必要配置

#### 构建优化
- 开启持久化缓存：`cache: { type: 'filesystem' }`
- 使用 `MiniCssExtractPlugin` 提取 CSS 文件
- 使用 `HardSourceWebpackPlugin` 或内置缓存降低二次构建时间

#### 开发体验
- 全局安装与本地安装版本一致，保证一致性
- 开启 Source Map：`devtool: 'eval-cheap-module-source-map'` (开发) / `source-map` (生产)
- 配置 HMR，提升调试效率

#### 生产部署
- 打包后静态资源上传 CDN
- 使用 `CompressionWebpackPlugin` 生成 `.gz` 或 `.br` 文件
- 生成 `asset-manifest.json` 供服务端渲染或预加载使用

---

## 2. 自定义 Loader & Plugin 示例

### 2.1 自定义 Loader
```js
// loaders/markdown-loader.js
module.exports = function(source) {
  const markdown = /* 将 source 转为 HTML 的逻辑 */;
  return `module.exports = ${JSON.stringify(markdown)}`;
};
```
```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      { test: /\.md$/, use: path.resolve(__dirname, 'loaders/markdown-loader.js') }
    ]
  }
}
```

### 2.2 自定义 Plugin
```js
// plugins/BuildTimePlugin.js
class BuildTimePlugin {
  apply(compiler) {
    compiler.hooks.done.tap('BuildTimePlugin', (stats) => {
      console.log('Build completed in', stats.endTime - stats.startTime, 'ms');
    });
  }
}
module.exports = BuildTimePlugin;
```
```js
// webpack.config.js
const BuildTimePlugin = require('./plugins/BuildTimePlugin');
module.exports = {
  plugins: [new BuildTimePlugin()]
};
```

