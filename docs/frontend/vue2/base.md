## 1.1 基本语法
- 插值表达式- 
- 指令系统
- 计算属性
- 侦听器
- 条件渲染
- 列表渲染
- 事件处理
- 表单输入绑定

### 1.1.1 插值表达式
- `{{ }}` 用于绑定文本内容

```html
<p>{{ message }}</p>
```

- 支持表达式：
```html
<p>{{ number + 1 }}</p>
```

### 1.1.2 指令系统

##### 条件渲染
```html
<p v-if="seen">现在你看到我了</p>
<p v-else>现在你看不到我</p>
```

##### 列表渲染
```html
<ul>
  <li v-for="(item, index) in items" :key="index">{{ item }}</li>
</ul>
```

##### 属性绑定
```html
<img :src="imageUrl">
```

##### 事件绑定
```html
<button @click="sayHi">点击</button>
```

### 1.1.3 计算属性
```js
computed: {
  reversedMessage() {
    return this.message.split('').reverse().join('');
  }
}
```

### 1.1.4 侦听器（watch）
```js
watch: {
  question(newQuestion) {
    this.getAnswer(newQuestion);
  }
}
```

### 1.1.5 表单输入绑定
```html
<input v-model="message">
```

支持修饰符：`.lazy`, `.number`, `.trim`

### 1.2 计算属性和侦听器

### 计算属性原理
- 具有缓存，依赖值不变则不重新计算

### 计算属性 vs 方法
- 方法每次调用都执行；计算属性有缓存

### 计算属性 vs 侦听器
- 侦听器适用于异步、复杂逻辑；计算属性适用于展示

### 深度监听
```js
watch: {
  obj: {
    handler(newVal) {
      console.log(newVal);
    },
    deep: true
  }
}
```

### 立即执行
```js
watch: {
  count: {
    handler(val) {
      console.log(val);
    },
    immediate: true
  }
}
```

### 1.3 生命周期钩子
- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed

### 1.4 混入 (Mixins)

### 使用方式
```js
const myMixin = {
  created() {
    console.log('混入的生命周期钩子');
  },
  methods: {
    sayHi() {
      console.log('Hello from mixin');
    }
  }
};

new Vue({
  mixins: [myMixin]
});
```

### 合并策略
- 生命周期钩子函数合并执行

### 全局混入
```js
Vue.mixin({
  mounted() {
    console.log('全局混入');
  }
});
```

### 注意事项
- 命名冲突可能带来副作用

### 1.5 自定义指令
- 指令的注册
- 钩子函数
- 指令参数
- 常用自定义指令示例
### 指令注册
```js
Vue.directive('focus', {
  inserted(el) {
    el.focus();
  }
});
```

### 参数与修饰符
```html
<input v-my-directive:someArg.modifier="value">
```

### 1.6 过滤器
- 过滤器的定义
- 过滤器的使用
- 全局过滤器
- 局部过滤器
```js
Vue.filter('capitalize', function (value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
});
```

### 使用
```html
<p>{{ name | capitalize }}</p>
```

### 1.7 异步组件
- 异步组件的定义
- 加载状态处理
- 错误处理
- 代码分割
```js
Vue.component('async-example', () => import('./MyComponent.vue'));
```

支持 loading/error 组件与延迟加载：
```js
Vue.component('async-example', () => ({
  component: import('./MyComponent.vue'),
  loading: LoadingComponent,
  error: ErrorComponent,
  delay: 200,
  timeout: 3000
}));
```

### 1.8 过渡和动画
- transition 组件
- 过渡类名
- 动画钩子
- 列表过渡
### transition 组件
```html
<transition name="fade">
  <p v-if="show">Hello</p>
</transition>
```

### CSS 类名
- `fade-enter-active`, `fade-leave-active`, `fade-enter`, `fade-leave-to`

### 动画钩子
```js
beforeEnter(el) {}, enter(el, done) {}, afterEnter(el) {}
```

### 列表过渡
```html
<transition-group name="list" tag="ul">
  <li v-for="item in items" :key="item.id">{{ item.text }}</li>
</transition-group>
```

### 插槽
```html
<slot></slot>
```

### 作用域插槽
```html
<slot :data="data"></slot>
```

### 动态组件
```html
<component :is="currentComponent"></component>
```
