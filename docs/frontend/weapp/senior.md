# 微信小程序高级

## 自定义组件

### 组件通信

```javascript
// components/parent/parent.js
Component({
  methods: {
    onChildEvent(e) {
      console.log("子组件触发事件", e.detail);
    },
  },
});
```

```html
<!-- components/parent/parent.wxml -->
<child-component
  bind:myevent="onChildEvent"
  data-a="{{dataA}}"
  data-b="{{dataB}}"
/>
```

```javascript
// components/child/child.js
Component({
  properties: {
    dataA: String,
    dataB: String,
  },
  methods: {
    triggerEvent() {
      this.triggerEvent("myevent", {
        detail: "子组件数据",
      });
    },
  },
});
```

### 组件生命周期

```javascript
// components/custom/custom.js
Component({
  lifetimes: {
    created() {
      // 组件实例刚刚被创建
      console.log("组件创建");
    },
    attached() {
      // 组件实例进入页面节点树
      console.log("组件挂载");
    },
    ready() {
      // 组件布局完成
      console.log("组件就绪");
    },
    moved() {
      // 组件实例被移动到节点树另一个位置
      console.log("组件移动");
    },
    detached() {
      // 组件实例被从页面节点树移除
      console.log("组件卸载");
    },
  },
  pageLifetimes: {
    show() {
      // 页面被展示
      console.log("页面显示");
    },
    hide() {
      // 页面被隐藏
      console.log("页面隐藏");
    },
  },
});
```

### 组件扩展

```javascript
// behaviors/my-behavior.js
module.exports = Behavior({
  data: {
    sharedText: "共享数据",
  },
  methods: {
    sharedMethod() {
      console.log("共享方法");
    },
  },
});

// components/custom/custom.js
Component({
  behaviors: [require("../../behaviors/my-behavior")],
  methods: {
    onTap() {
      this.sharedMethod();
      console.log(this.data.sharedText);
    },
  },
});
```

## 性能优化

### 数据更新优化

```javascript
// pages/index/index.js
Page({
  data: {
    items: [],
  },
  updateData() {
    // 不推荐：频繁更新大量数据
    this.setData({
      items: new Array(1000).fill(0),
    });

    // 推荐：分批更新数据
    const batchSize = 100;
    const total = 1000;
    let current = 0;

    const updateBatch = () => {
      const batch = new Array(batchSize).fill(0);
      this.setData({
        [`items[${current}]`]: batch,
      });
      current += batchSize;
      if (current < total) {
        setTimeout(updateBatch, 0);
      }
    };
    updateBatch();
  },
});
```

### 图片优化

```javascript
// pages/index/index.js
Page({
  data: {
    images: [],
  },
  loadImages() {
    // 使用图片预加载
    const images = ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"];

    images.forEach((src) => {
      const img = wx.createImage();
      img.src = src;
      img.onload = () => {
        console.log("图片预加载完成", src);
      };
    });
  },
});
```

### 页面预加载

```javascript
// app.js
App({
  onLaunch() {
    // 预加载页面
    this.preloadPage("/pages/detail/detail");
  },
  preloadPage(url) {
    wx.preloadPage({
      url,
      success: () => {
        console.log("页面预加载成功");
      },
    });
  },
});
```

## 高级特性

### 自定义 TabBar

```javascript
// custom-tab-bar/index.js
Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath: "/images/home.png",
        selectedIconPath: "/images/home-active.png",
      },
      {
        pagePath: "/pages/user/index",
        text: "我的",
        iconPath: "/images/user.png",
        selectedIconPath: "/images/user-active.png",
      },
    ],
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({
        url,
        success: () => {
          this.setData({
            selected: data.index,
          });
        },
      });
    },
  },
});
```

### 自定义导航栏

```javascript
// pages/index/index.js
Page({
  data: {
    statusBarHeight: 0,
    navBarHeight: 44,
    menuButtonHeight: 32,
    menuButtonTop: 0,
  },
  onLoad() {
    const systemInfo = wx.getSystemInfoSync();
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();

    this.setData({
      statusBarHeight: systemInfo.statusBarHeight,
      menuButtonHeight: menuButtonInfo.height,
      menuButtonTop: menuButtonInfo.top,
    });
  },
});
```

```html
<!-- pages/index/index.wxml -->
<view class="custom-nav" style="height: {{statusBarHeight + navBarHeight}}px">
  <view
    class="nav-content"
    style="height: {{navBarHeight}}px; top: {{statusBarHeight}}px"
  >
    <view class="nav-title">自定义导航栏</view>
  </view>
</view>
```

### 自定义下拉刷新

```javascript
// pages/index/index.js
Page({
  data: {
    refreshStatus: false,
  },
  onPullDownRefresh() {
    this.setData({
      refreshStatus: true,
    });

    // 模拟数据加载
    setTimeout(() => {
      this.setData({
        refreshStatus: false,
      });
      wx.stopPullDownRefresh();
    }, 2000);
  },
});
```

```html
<!-- pages/index/index.wxml -->
<view class="refresh-container">
  <view class="refresh-content {{refreshStatus ? 'refreshing' : ''}}">
    <view class="refresh-icon"></view>
    <text>{{refreshStatus ? '刷新中...' : '下拉刷新'}}</text>
  </view>
  <view class="page-content">
    <!-- 页面内容 -->
  </view>
</view>
```

## 安全与权限

### 用户信息获取

```javascript
// pages/index/index.js
Page({
  getUserInfo() {
    wx.getUserProfile({
      desc: "用于完善用户资料",
      success: (res) => {
        console.log("用户信息", res.userInfo);
      },
      fail: (err) => {
        console.error("获取用户信息失败", err);
      },
    });
  },
});
```

### 敏感数据加密

```javascript
// utils/crypto.js
const crypto = require("crypto");

function encryptData(data, key) {
  const cipher = crypto.createCipher("aes-256-cbc", key);
  let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function decryptData(encrypted, key) {
  const decipher = crypto.createDecipher("aes-256-cbc", key);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return JSON.parse(decrypted);
}

module.exports = {
  encryptData,
  decryptData,
};
```

## 最佳实践

1. 组件设计

   - 单一职责原则
   - 组件复用性
   - 组件通信方式
   - 组件生命周期管理

2. 性能优化

   - 合理使用 setData
   - 避免不必要的渲染
   - 资源预加载
   - 内存管理

3. 安全实践

   - 数据加密
   - 权限控制
   - 输入验证
   - 错误处理

4. 工程化
   - 代码规范
   - 自动化测试
   - 持续集成
   - 监控告警
