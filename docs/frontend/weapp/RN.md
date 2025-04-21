# React Native 开发笔记

> 本文系统整理了 React Native 的基础知识、重难点解析、项目开发示例和总结，适合入门学习和项目开发参考。



## 一、React Native 基础知识

### ✅ 核心介绍
- React Native 是 Facebook 推出的跨平台移动开发框架。
- 使用 JavaScript 编写，生成原生组件，不依赖 WebView。
- 实现一次编写，多端运行（iOS 和 Android）。

### ✅ 基本特性
- 组件化：基于 React 的组件架构。
- 样式系统：基于 Flexbox 的布局，使用类 CSS 的语法。
- 状态管理：可使用 Context、Redux、MobX、Zustand 等。
- 支持热更新和热重载（Fast Refresh）。
- 支持调用原生模块（Native Module）。

### ✅ 核心组件
| 组件 | 用途 |
|------|------|
| `View` | 基础容器组件，类似 `<div>` |
| `Text` | 显示文本 |
| `Image` | 显示图片 |
| `ScrollView` | 可滚动容器 |
| `FlatList` / `SectionList` | 高性能列表组件 |
| `TouchableOpacity` / `TouchableHighlight` | 可点击区域 |

### ✅ 样式示例
```js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});
```

---

## 二、开发重难点

### 📌 导航与路由
- 推荐使用 `react-navigation`：
```bash
npm install @react-navigation/native
```
- 支持 Stack、Tab、Drawer 等导航类型。
- 必须搭配 `react-native-screens`、`react-native-gesture-handler` 使用。

### 📌 状态管理
- 小项目推荐使用 `useContext + useReducer`。
- 中大型项目推荐 Redux、MobX、Zustand 等。

### 📌 与原生模块交互
- 使用 NativeModule 自定义桥接模块调用原生代码（Android 用 Java/Kotlin，iOS 用 Swift/Obj-C）。
- 可通过第三方库复用已有能力。

### 📌 动画实现
- 简单动画：`Animated` API。
- 复杂动画推荐使用 `react-native-reanimated`，性能更好。

### 📌 样式兼容与适配
- 使用 `Dimensions` 或 `react-native-responsive-screen` 实现屏幕适配。
- 结合 `Platform.OS` 区分 iOS/Android 的样式逻辑。

### 📌 网络请求封装
```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
});

export default api;
```


## 三、项目实战示例

### ✅ 基础页面结构
```js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text>点击次数：{count}</Text>
      <Button title="点击我" onPress={() => setCount(count + 1)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
});
```

### ✅ 项目目录结构建议
```
├── src/
│   ├── components/
│   ├── screens/
│   ├── navigation/
│   ├── services/      # 网络请求封装
│   ├── stores/        # 状态管理
│   ├── utils/
│   └── App.tsx
```

### ✅ 常用开发库推荐
| 功能 | 推荐库 |
|------|--------|
| 路由导航 | `@react-navigation/native` |
| 状态管理 | `redux` / `mobx` / `zustand` |
| 网络请求 | `axios` |
| 动画 | `react-native-reanimated` |
| 图标库 | `react-native-vector-icons` |
| UI 框架 | `NativeBase` / `React Native Paper` / `Tamagui` |

---

## 四、开发工具与调试

### ✅ 常用工具
- `Expo`：适合快速原型开发，开箱即用。
- `React Native CLI`：适合需要自定义原生模块的项目。
- `Flipper`：强大的调试工具。
- `React Developer Tools`：调试组件状态。
- Chrome 调试 / Logcat 输出原生日志。

---

## 五、React Native 总结

### ✅ 优点
- 真正的原生渲染，性能优于 Hybrid。
- 极高的开发效率，代码复用性强。
- 跨平台统一体验，生态社区活跃。

### ✅ 缺点
- 底层升级频繁，可能引发兼容问题。
- 高性能需求场景下仍需编写原生模块。
- 调试与构建复杂度略高于 Web。

### ✅ 适用场景
- 中大型跨平台 App 开发
- 快速迭代 MVP 产品
- 原生与 Web 融合开发场景

---
