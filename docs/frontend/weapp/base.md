# 微信小程序基础

## 项目结构

```
├── pages/                // 页面文件夹
│   ├── index/           // 首页
│   │   ├── index.js     // 页面逻辑
│   │   ├── index.wxml   // 页面结构
│   │   ├── index.wxss   // 页面样式
│   │   └── index.json   // 页面配置
│   └── logs/            // 日志页
├── utils/               // 工具函数
├── app.js               // 小程序逻辑
├── app.json             // 小程序公共配置
├── app.wxss             // 小程序公共样式
└── project.config.json  // 项目配置文件
```

## 生命周期

### 应用生命周期

```javascript
// app.js
App({
  onLaunch(options) {
    // 小程序初始化
    console.log("App Launch", options);
  },
  onShow(options) {
    // 小程序显示
    console.log("App Show", options);
  },
  onHide() {
    // 小程序隐藏
    console.log("App Hide");
  },
  onError(err) {
    // 小程序发生错误
    console.error("App Error", err);
  },
  onPageNotFound(res) {
    // 页面不存在
    console.log("Page Not Found", res);
  },
});
```

### 页面生命周期

```javascript
// pages/index/index.js
Page({
  data: {
    text: "Hello World",
  },
  onLoad(options) {
    // 页面加载
    console.log("Page Load", options);
  },
  onShow() {
    // 页面显示
    console.log("Page Show");
  },
  onReady() {
    // 页面初次渲染完成
    console.log("Page Ready");
  },
  onHide() {
    // 页面隐藏
    console.log("Page Hide");
  },
  onUnload() {
    // 页面卸载
    console.log("Page Unload");
  },
  onPullDownRefresh() {
    // 下拉刷新
    console.log("Pull Down Refresh");
    wx.stopPullDownRefresh();
  },
  onReachBottom() {
    // 上拉触底
    console.log("Reach Bottom");
  },
  onShareAppMessage() {
    // 用户点击右上角分享
    return {
      title: "自定义分享标题",
      path: "/pages/index/index",
    };
  },
});
```

## 组件

### 基础组件

```html
<!-- pages/index/index.wxml -->
<view class="container">
  <!-- 视图容器 -->
  <view class="box">
    <text>文本组件</text>
  </view>

  <!-- 表单组件 -->
  <form bindsubmit="formSubmit">
    <input name="username" placeholder="请输入用户名" />
    <button form-type="submit">提交</button>
  </form>

  <!-- 媒体组件 -->
  <image src="/images/logo.png" mode="aspectFit" />
  <video src="http://example.com/video.mp4" />

  <!-- 地图组件 -->
  <map longitude="113.324520" latitude="23.099994" scale="14" />
</view>
```

### 自定义组件

```javascript
// components/custom/custom.js
Component({
  properties: {
    // 属性定义
    title: {
      type: String,
      value: "默认标题",
    },
  },
  data: {
    // 私有数据
    count: 0,
  },
  methods: {
    // 自定义方法
    onTap() {
      this.setData({
        count: this.data.count + 1,
      });
      this.triggerEvent("customEvent", { count: this.data.count });
    },
  },
});
```

```html
<!-- components/custom/custom.wxml -->
<view class="custom-component">
  <text>{{title}}</text>
  <button bindtap="onTap">点击次数：{{count}}</button>
</view>
```

## 数据绑定

```html
<!-- pages/index/index.wxml -->
<view>
  <!-- 简单绑定 -->
  <text>{{message}}</text>

  <!-- 条件渲染 -->
  <view wx:if="{{condition}}">条件渲染</view>

  <!-- 列表渲染 -->
  <view wx:for="{{array}}" wx:key="id"> {{item.name}} </view>

  <!-- 模板 -->
  <template name="msgItem">
    <view>
      <text> {{index}}: {{msg}} </text>
      <text> Time: {{time}} </text>
    </view>
  </template>
</view>
```

```javascript
// pages/index/index.js
Page({
  data: {
    message: "Hello World",
    condition: true,
    array: [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ],
  },
});
```

## 事件处理

```html
<!-- pages/index/index.wxml -->
<view>
  <!-- 点击事件 -->
  <button bindtap="onTap">点击</button>

  <!-- 长按事件 -->
  <button bindlongpress="onLongPress">长按</button>

  <!-- 触摸事件 -->
  <view
    bindtouchstart="onTouchStart"
    bindtouchmove="onTouchMove"
    bindtouchend="onTouchEnd"
    >触摸区域</view
  >

  <!-- 表单事件 -->
  <input bindinput="onInput" bindblur="onBlur" />
</view>
```

```javascript
// pages/index/index.js
Page({
  onTap(e) {
    console.log("点击事件", e);
  },
  onLongPress(e) {
    console.log("长按事件", e);
  },
  onTouchStart(e) {
    console.log("触摸开始", e);
  },
  onTouchMove(e) {
    console.log("触摸移动", e);
  },
  onTouchEnd(e) {
    console.log("触摸结束", e);
  },
  onInput(e) {
    console.log("输入事件", e.detail.value);
  },
  onBlur(e) {
    console.log("失去焦点", e.detail.value);
  },
});
```

## 网络请求

```javascript
// pages/index/index.js
Page({
  getData() {
    wx.request({
      url: "https://api.example.com/data",
      method: "GET",
      data: {
        id: 1,
      },
      success(res) {
        console.log("请求成功", res.data);
      },
      fail(err) {
        console.error("请求失败", err);
      },
    });
  },

  uploadFile() {
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: "https://api.example.com/upload",
          filePath: tempFilePaths[0],
          name: "file",
          success(res) {
            console.log("上传成功", res.data);
          },
        });
      },
    });
  },
});
```

## 数据缓存

```javascript
// pages/index/index.js
Page({
  setStorage() {
    // 异步存储
    wx.setStorage({
      key: "key",
      data: "value",
      success() {
        console.log("存储成功");
      },
    });

    // 同步存储
    wx.setStorageSync("key", "value");
  },

  getStorage() {
    // 异步获取
    wx.getStorage({
      key: "key",
      success(res) {
        console.log("获取成功", res.data);
      },
    });

    // 同步获取
    const value = wx.getStorageSync("key");
    console.log("获取成功", value);
  },
});
```

## 路由

```javascript
// pages/index/index.js
Page({
  navigateTo() {
    // 保留当前页面，跳转到应用内的某个页面
    wx.navigateTo({
      url: "/pages/logs/logs?id=1",
    });
  },

  redirectTo() {
    // 关闭当前页面，跳转到应用内的某个页面
    wx.redirectTo({
      url: "/pages/logs/logs",
    });
  },

  switchTab() {
    // 跳转到 tabBar 页面
    wx.switchTab({
      url: "/pages/index/index",
    });
  },

  navigateBack() {
    // 返回上一页面
    wx.navigateBack({
      delta: 1,
    });
  },
});
```

## 最佳实践

1. 项目结构

   - 合理组织目录结构
   - 组件化开发
   - 公共资源管理

2. 性能优化

   - 合理使用 setData
   - 图片资源优化
   - 页面预加载
   - 数据缓存策略

3. 代码规范

   - 命名规范
   - 注释规范
   - 代码复用
   - 错误处理

4. 用户体验
   - 加载状态提示
   - 错误提示
   - 页面切换动画
   - 下拉刷新和上拉加载
